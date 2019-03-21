<template>
  <d2-container v-loading="loading">
    <template slot="header">
      <div>文章列表</div>
      <div class="tools">
        <el-select style="width: 240px;" @change="onFilterChange" v-model="filter.categoryId" placeholder="请选择要筛选的文章分类">
          <el-option label="全部" value="0"></el-option>
          <el-option :label="category.name" :value="category.id" v-for="(category, i) in categoryList" :key="i"></el-option>
        </el-select>
        <el-input style="margin-left: 15px; width: 400px;" placeholder="搜索标题" v-model="filter.keyword" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="onFilterChange()"></el-button>
        </el-input>
      </div>
    </template>
    <el-dialog
      title="快速修改文章"
      :visible.sync="articleDialog.isShow"
      width="600px"
      :before-close="articleDialogHandleClose">
      <div class="pop-body">
        <el-form :model="articleDialog.data" label-width="100px" class="articleDialog-form">
          <el-form-item label="置顶方式">
            <el-select v-model="articleDialog.data.topType" placeholder="请选择置顶方式">
              <el-option :label="type.name" :value="type.id" v-for="(type, i) in topTypeOptions" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章分类">
            <el-select v-model="articleDialog.data.categoryId" placeholder="请选择文章分类">
              <el-option :label="category.name" :value="category.id" v-for="(category, i) in categoryList" :key="i"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="articleDialog.data.title"></el-input>
          </el-form-item>
          <el-form-item label="修改时间" prop="updateTime">
            <el-input v-model="articleDialog.data.updateTime"></el-input>
          </el-form-item>
          <el-form-item label="发布时间" prop="createTime">
            <el-input v-model="articleDialog.data.createTime"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="articleDialogHandleClose">取 消</el-button>
        <el-button type="primary" @click="articleDialogHandleCertain()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="list-warp">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="serialNumber"
        label="文章序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="_title"
        label="文章标题">
      </el-table-column>
      <el-table-column
        prop="categoryName"
        label="文章分类"
        width="100">
      </el-table-column>
      <el-table-column
        prop="authorNickname"
        label="发布者昵称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="文章类型"
        width="80">
      </el-table-column>
      <el-table-column
        prop="visNumber"
        label="浏览数量"
        width="80">
      </el-table-column>
      <el-table-column
        prop="_updateTime"
        label="修改时间"
        width="150">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewWeb(scope.row)">查看</el-button>
          <el-button type="text" size="small" @click="changeArticle(scope.row)">快速编辑</el-button>
          <el-button type="text" size="small" @click="toEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" style="color: red" @click="deleteArticle(scope)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-warp">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.pageNumber"
        :page-size="page.pageSize"
        @current-change="onPageChange"
        :total="page.totalCount">
      </el-pagination>
    </div>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="newArticle()">新增文章</el-button>
    </template>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request";
import moment from "moment";
import store from 'store';

export default {
  name: "articleList",
  data() {
    return {
      loading: true,
      moment: moment,
      topTypeOptions: [
        {
          id: 0,
          name: "无置顶"
        },
        {
          id: 1,
          name: "主要置顶"
        },
        {
          id: 2,
          name: "次要置顶"
        }
      ],
      // 快捷编辑窗口
      articleDialog: {
        isShow: false,
        data: {}
      },
      list: [],
      categoryList: [],
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 100
      },
      filter: {
        categoryId: "0",
        keyword: ""
      }
    };
  },
  mounted() {
    this.getCategory(() => {
      this.getData();
    });
  },
  methods: {
    newArticle() {
      store.set("draft-article", null);
      this.$router.push({
        name: "article-edit"
      });
    },

    changeArticle(item) {
      let data = {
        id: item._id,
        categoryId: item.categoryId._id,
        title: item.title,
        updateTime: item.updateTime,
        createTime: item.createTime,
        topType: item.topType
      };
      this.articleDialog.data = data;
      this.articleDialog.isShow = true;
    },

    async deleteArticle(scope) {
      console.log(scope);
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await req.post("/api/article/delete", {
            id: scope.row._id
          });
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.list.splice(scope.$index, 1);
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async getCategory(callback) {
      let res = await req.get("/api/category/list");
      let categoryList = [];
      let data = res.data.data;
      data.forEach(item => {
        categoryList.push({
          id: item._id,
          name: item.name
        });
      });
      this.categoryList = categoryList;
      if (typeof callback === "function") {
        callback();
      }
    },

    async getData(filter) {
      this.loading = true;
      let url = "/api/article/list";
      if (filter) {
        url =
          url +
          `?categoryId=${filter.categoryId}&keyword=${encodeURIComponent(
            filter.keyword
          )}&pageSize=${this.page.pageSize}&pageNumber=${this.page.pageNumber - 1}`;
      } else {
        url =
          url +
          `?pageSize=${this.page.pageSize}&pageNumber=${this.page.pageNumber - 1}`;
      }
      let res = await req.get(url);
      this.page.totalCount = res.data.data.total;
      let list = res.data.data.list;
      list.forEach(item => {
        item.topTypeName = this.getTopName(item.topType);
        item._title = `[${item.topTypeName}]` + item.title;
        item.typeName = item.type === 1 ? "单封面" : "多封面";
        item.authorNickname = item.userId.nickname;
        item.categoryName = item.categoryId.name;
        item._createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm");
        item._updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm");
      });
      this.list = list;
      this.loaded();
    },

    async saveData() {
      let res = await req.post("/api/config", this.configObj);
      if (res.data.code === 0) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }
    },

    //弹出框点了取消
    articleDialogHandleClose() {
      let that = this;
      this.$confirm("确认关闭？")
        .then(_ => {
          that.articleDialog.isShow = false;
        })
        .catch(_ => {});
    },

    //弹出框点了确定
    async articleDialogHandleCertain() {
      let res = await req.post("/api/article/update", this.articleDialog.data);
      let msg = res.data.msg;
      if (res.data.code === 1) {
        if (typeof msg === "object") {
          this.$message.error(JSON.stringify(msg));
        } else {
          this.$message.error(msg);
        }
      } else {
        this.$message.success(msg);
        this.articleDialog.data = {};
        this.articleDialog.isShow = false;
        this.getData();
      }
    },

    // 查看前台
    viewWeb(item) {
      window.open(baseURL + item.serialNumber + ".html");
    },

    // 去编辑页
    toEdit(item) {
      store.set("draft-article", null);
      this.$router.push({
        name: "article-edit",
        query: {
          id: item._id
        }
      });
    },

    onFilterChange() {
      this.list = [];
      this.page = {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 100
      };
      this.getData(this.filter);
    },

    getTopName(id) {
      let topName = "无置顶";
      this.topTypeOptions.forEach((item)=>{
        if ( item.id === id ) {
          topName = item.name;
        }
      });
      return topName;
    },

    onPageChange(num) {
      this.page.pageNumber = num
      this.getData(this.filter)
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false
      }, 1000)
    }
  }
};
</script>

<style scoped>
.tools {
  margin-top: 15px;
}

.pagination-warp {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
