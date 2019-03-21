<template>
  <d2-container v-loading="loading">
    <template slot="header">分类列表</template>
    <el-dialog
      :title="(catDialog.type === 1 ? '新建' : '修改') + '分类'"
      :visible.sync="catDialog.isShow"
      width="600px"
      :before-close="catDialogHandleClose">
      <div class="pop-body">
        <el-form :model="catDialog.data" label-width="100px" class="catDialog-form">
          <el-form-item label="排序序号" prop="order">
            <el-input v-model="catDialog.data.order"></el-input>
          </el-form-item>
          <el-form-item label="分类名称" prop="name">
            <el-input v-model="catDialog.data.name"></el-input>
          </el-form-item>
          <el-form-item label="分类别名" prop="alias">
            <el-input v-model="catDialog.data.alias"></el-input>
          </el-form-item>
          <el-form-item label="网页标题" prop="title">
            <el-input v-model="catDialog.data.title"></el-input>
          </el-form-item>
          <el-form-item label="网页关键字" prop="keywords">
            <el-input v-model="catDialog.data.keywords"></el-input>
          </el-form-item>
          <el-form-item label="网页描述" prop="description">
            <el-input v-model="catDialog.data.description"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="catDialogHandleClose">取 消</el-button>
        <el-button type="primary" @click="catDialogHandleCertain()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="list-warp">
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="order"
          label="排序序号"
          width="180"> 
        </el-table-column>
        <el-table-column
          prop="name"
          label="类名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="alias"
          label="别名">
        </el-table-column>
        <el-table-column
          prop="articleCount"
          label="文章数量">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewWeb(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="changeCategory(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color: red;" @click="deleteCategory(scope)" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="newCategory()">新增分类</el-button>
    </template>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request";
import moment from "moment";

class Category {
  constructor() {
    this.order = 0; //排序权重。
    this.name = ""; //分类的中文类名，用于展示。
    this.alias = ""; //分类的英文名，用于在url上展示。
    this.title = ""; //分类网页标题
    this.keywords = ""; //分类网页关键字
    this.description = ""; //分类网页描述
  }
}

const getBodyHeight = function() {
  const bodyEl = document.querySelector(".d2-container-full__body");
  if (bodyEl) {
    return bodyEl.offsetHeight - 50;
  } else {
    return 0;
  }
};

export default {
  name: "categoryList",
  data() {
    return {
      loading: true,
      moment: moment,
      catDialog: {
        type: 1, //1新建 2编辑
        isShow: false,
        data: {}
      },
      list: [new Category()]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    newCategory() {
      this.catDialog.data = new Category();
      this.catDialog.type = 1;
      this.catDialog.isShow = true;
    },

    changeCategory(item) {
      this.catDialog.data = item;
      this.catDialog.type = 2;
      this.catDialog.isShow = true;
    },

    async deleteCategory(scope) {
      console.log(scope);
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await req.post("/api/category/delete", {
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

    async getData() {
      let res = await req.get("/api/category/list");
      let list = res.data.data;
      list.forEach(item => {
        item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm");
        item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm");
      });
      this.list = res.data.data;
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
    catDialogHandleClose() {
      let that = this;
      this.$confirm("确认关闭？")
        .then(_ => {
          that.catDialog.isShow = false;
        })
        .catch(_ => {});
    },

    //弹出框点了确定
    async catDialogHandleCertain() {
      let res = {};
      if (this.catDialog.type === 1) {
        res = await req.post("/api/category/create", this.catDialog.data);
      } else if (this.catDialog.type === 2) {
        res = await req.post("/api/category/update", this.catDialog.data);
      }
      let msg = res.data.msg;
      if (res.data.code === 1) {
        if (typeof msg === "object") {
          this.$message.error(JSON.stringify(msg));
        } else {
          this.$message.error(msg);
        }
      } else {
        this.$message.success(msg);
        this.catDialog.data = {};
        this.catDialog.isShow = false;
        this.getData();
      }
    },

    //查看前台
    viewWeb(item) {
      window.open(baseURL + item.alias + ".html");
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false
      }, 1000)
    }
  }
};
</script>
