<template>
  <d2-container v-loading="loading">
    <template slot="header">菜单配置</template>
    <div class="form">
      <el-dialog
        :title="(dialogMenu.type === 1 ? '新建' : '修改') + '菜单'"
        :visible.sync="dialogMenu.isShow"
        width="600px"
      >
        <div class="pop-body">
          <el-form :model="dialogMenu.menu" label-width="80px">
            <el-form-item label="菜单顺序">
              <el-input v-model="dialogMenu.menu.order" placeholder="输入菜单顺序，值越小越靠前"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称">
              <el-input v-model="dialogMenu.menu.name" placeholder="输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="菜单别名">
              <el-input v-model="dialogMenu.menu.alias" placeholder="输入菜单别名"></el-input>
            </el-form-item>
            <el-form-item label="菜单链接">
              <el-input v-model="dialogMenu.menu.link" placeholder="输入菜单链接"></el-input>
            </el-form-item>
            <el-form-item label="高亮匹配">
              <el-input
                v-model="dialogMenu.menu.activeUrl"
                placeholder="高亮匹配的链接，英文逗号分割，如：@/index.html"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogMenu.isShow=false">取 消</el-button>
          <el-button type="primary" @click="dialogMenuHandleCertain()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="list-warp">
      <el-table :data="list" style="width: 100%">
        <el-table-column prop="order" label="菜单顺序" width="180"></el-table-column>
        <el-table-column prop="name" label="菜单名称" width="180"></el-table-column>
        <el-table-column prop="alias" label="菜单别名"></el-table-column>
        <el-table-column prop="link" label="菜单链接"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="showChangeMenuDialog(2, scope.row)">编辑</el-button>
            <el-button
              type="text"
              size="small"
              style="color: red;"
              @click="deleteMenu(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <template slot="footer">
      <el-button type="success" @click="saveData()">保存全部更改</el-button>
      <el-button type="primary" @click="showChangeMenuDialog()">新增一个菜单</el-button>
    </template>
  </d2-container>
</template>

<script>
import { req } from "@/api/request";

class Menu {
  constructor() {
    this.order = 0;
    this.name = "";
    this.alias = "";
    this.link = "";
    this.activeUrl = "";
  }
}

export default {
  name: "menuList",
  data() {
    return {
      id: "",
      loading: true,
      list: [],
      dialogMenu: {
        type: 1,
        isShow: false,
        menu: {}
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    showChangeMenuDialog(type = 1, obj) {
      this.dialogMenu.type = type;
      this.dialogMenu.isShow = true;
      if ( type === 1 ) {
        this.dialogMenu.menu = new Menu();
      } else {
        this.dialogMenu.menu = obj
      }
    },

    deleteMenu(index) {
      this.$confirm('确定要删除该菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.list.length === 1) {
          this.$message.error("请至少保留一个菜单");
        } else {
          this.list.splice(index, 1);
        }
      })
    },

    async getData() {
      let res = await req.get("/api/config?alias=menu");
      this.list = res.data.data.info;
      this.id = res.data.data._id;
      this.loaded();
    },

    async saveData() {
      let res = await req.post("/api/config", {
        id: this.id,
        info: this.list
      });
      if (res.data.code === 0) {
        this.$message({
          message: "保存成功",
          type: "success"
        });
      }
    },

    dialogMenuFormCheck() {
      if ( this.dialogMenu.menu.name === '' ) {
        this.$message.error('菜单名称必填');
        return false;
      }
      if ( this.dialogMenu.menu.alias === '' ) {
        this.$message.error('菜单别名必填');
        return false;
      }
      if ( this.dialogMenu.menu.link === '' ) {
        this.$message.error('菜单链接必填');
        return false;
      }
      return true;
    },

    dialogMenuHandleCertain() {
      let res = this.dialogMenuFormCheck();
      if ( res === false ) {
        return
      }
      if ( this.dialogMenu.type === 1 ) {
        this.list.push(this.dialogMenu.menu);
      }
      this.dialogMenu.isShow = false;
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
</style>