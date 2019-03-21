<template>
  <d2-container v-loading="loading">
    <template slot="header">自定义页面列表</template>
    <div class="form">
      <el-dialog
        :title="(dialogPage.type === 1 ? '新建' : '修改') + '页面'"
        :visible.sync="dialogPage.isShow"
        width="90%"
      >
        <div class="pop-body">
          <el-form :model="dialogPage.page" label-width="120px">
            <template v-for="(field, key, index) in dialogPage.page">
              <el-form-item
                :label="field.name"
                :key="index"
                v-if="field.formRequired===true"
              >
                <el-input v-if="field.type === 'input-text'" v-model="field.value" :placeholder="field.placeholder"></el-input>
                <el-input
                  v-if="field.type === 'input-textarea'"
                  type="textarea"
                  :autosize="{minRows: 20}"
                  v-model="field.value"
                  :placeholder="field.placeholder"
                ></el-input>
              </el-form-item>
            </template>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogPage.isShow=false">取 消</el-button>
          <el-button type="primary" @click="dialogPageHandleCertain()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="list-warp">
      <el-table :data="list" style="width: 100%">
        <template v-for="(field, key, index) in tableModel" >
          <el-table-column v-if="field.tableField === true" :key="index" :prop="key" :label="field.name"></el-table-column>
        </template>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewWeb(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="showChangePageDialog(2, scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              style="color: red;"
              @click="showDeleteAsking(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-warp">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.pageNumber"
        :page-size="page.pageSize"
        @current-change="onPageChange"
        :total="page.totalCount"
      ></el-pagination>
    </div>
    <template slot="footer">
      <el-button type="primary" @click="showChangePageDialog()">新增一个页面</el-button>
    </template>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request";
import model from "@/libs/model";

export default {
  name: "pageList",

  data() {
    return {
      id: "",
      loading: true,
      Page: "",
      tableModel: {},
      dialogPage: {
        type: 1,
        id: "",
        isShow: false,
        page: {}
      },
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 100
      },
      list: []
    };
  },

  mounted() {
    this.loadModel("Page", () => {
      this.getPageList();
    });
  },

  methods: {
    showChangePageDialog(type = 1, obj) {
      this.dialogPage.type = type;
      this.dialogPage.isShow = true;
      if (type === 1) {
        this.dialogPage.page = new this.Page();
      } else {
        this.dialogPage.id = obj._id;
        let page = new this.Page();
        page.setValues(obj);
        this.dialogPage.page = page;
      }
    },

    async deletePage(id, successFn) {
      let res = await req.post("/api/page/delete", {
        id: id
      });
      if (res.data.code === 0) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        if (typeof successFn === "function") {
          successFn();
        }
      } else {
        this.$message.error(res.data.msg);
      }
    },

    async getPageList() {
      let res = await req.get(
        `/api/page/list?pageSize=${this.page.pageSize}&pageNumber=${this.page
          .pageNumber - 1}`
      );
      let list = res.data.data.list;
      this.page.totalCount = res.data.data.total;
      this.list = list;
      this.loaded();
    },

    async savePage(data, successFn) {
      let res = await req.post("/api/page/create", data);
      if (res.data.code === 0) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.getPageList();
        if (typeof successFn === "function") {
          successFn();
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "error"
        });
      }
    },

    async updatePage(data, successFn) {
      let params = Object.assign(data, {
        id: this.dialogPage.id
      })
      let res = await req.post("/api/page/update", params);
      if (res.data.code === 0) {
        this.$message({
          message: "更新成功",
          type: "success"
        });
        if (typeof successFn === "function") {
          successFn();
        }
      } else {
        this.$message({
          message: res.data.msg,
          type: "error"
        });
      }
    },

    async loadModel(modelName, callback) {
      let res = await req.get(`/api/model?name=${modelName}`);
      let _model = res.data.data.model;
      this.Page = model.getModel(_model);
      this.tableModel = new this.Page();
      console.log(this.tableModel);
      if (typeof callback === "function") {
        callback();
      }
    },

    dialogPageFormCheck() {
      if (this.dialogPage.page.name === "") {
        this.$message.error("页面名称必填");
        return false;
      }
      if (this.dialogPage.page.alias === "") {
        this.$message.error("页面别名必填");
        return false;
      }
      return true;
    },

    dialogPageHandleCertain() {
      let page = this.dialogPage.page;
      let checkRes = page.checkValues();
      if ( checkRes !== true ) {
        this.$message.error(checkRes.msg);
        return;
      }
      if (this.dialogPage.type === 1) {
        this.savePage(page.getValues(), () => {
          this.dialogPage.isShow = false;
        });
      } else {
        this.updatePage(page.getValues(), () => {
          this.dialogPage.isShow = false;
          this.reload();
        });
      }
    },

    showDeleteAsking(index, obj) {
      this.$confirm("确定要删除该自定义页面？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.deletePage(obj._id, () => {
          this.list.splice(index, 1);
        });
      });
    },

    reload() {
      this.list = [];
      this.loading = true;
      setTimeout(()=>{
        this.getPageList();
      }, 1000);
    },

    viewWeb(obj) {
      window.open(`${baseURL}page/${obj.alias}.html`);
    },

    onPageChange(num) {
      this.page.pageNumber = num;
      this.getData(this.filter);
    },

    loaded() {
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  padding: 10px;
}
.form {
  width: 70%;
}
.card-box {
  margin-bottom: 10px;
}
.pagination-warp {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>