<template>
  <d2-container v-loading="loading">
    <template slot="header">评论列表</template>
    <el-dialog
      :title="(commentDialog.type === 1 ? '新建' : '修改') + '评论'"
      :visible.sync="commentDialog.isShow"
      width="600px">
      <div class="pop-body">
        <el-form :model="commentDialog.data" label-width="100px" class="commentDialog-form">
          <el-form-item label="作者昵称" prop="authorNickname">
            <el-input v-model="commentDialog.data.authorNickname"></el-input>
          </el-form-item>
          <el-form-item label="作者url" prop="authorUrl">
            <el-input v-model="commentDialog.data.authorUrl"></el-input>
          </el-form-item>
          <el-form-item label="作者email" prop="authorEmail">
            <el-input v-model="commentDialog.data.authorEmail"></el-input>
          </el-form-item>
          <el-form-item label="评论内容" prop="mdContent">
            <el-input type="textarea" :rows="4" v-model="commentDialog.data.mdContent"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialog.isShow=false">取 消</el-button>
        <el-button type="primary" @click="commentDialogHandleCertain()">确 定</el-button>
      </span>
    </el-dialog>
    <div class="list-warp">
      <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
          prop="_articleTitle"
          label="所属文章标题"
          width="180"> 
        </el-table-column>
        <el-table-column
          prop="_authorNickname"
          label="作者昵称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="_authorUrl"
          label="作者url">
        </el-table-column>
        <el-table-column
          prop="_authorEmail"
          label="作者email">
        </el-table-column>
        <el-table-column
          prop="mdContent"
          label="内容">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewWeb(scope.row)">查看</el-button>
            <el-button type="text" size="small" @click="changeComment(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color: red" @click="deleteComment(scope)" >删除</el-button>
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
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request"
import moment from "moment"

const getBodyHeight = function() {
  const bodyEl = document.querySelector(".d2-container-full__body")
  if (bodyEl) {
    return bodyEl.offsetHeight - 50
  } else {
    return 0
  }
}

export default {
  name: "commentList",
  data() {
    return {
      loading: true,
      moment: moment,
      commentDialog: {
        type: 1, //1新建 2编辑
        isShow: false,
        data: {}
      },
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 100
      },
      list: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {

    changeComment(item) {
      console.log(item);
      this.commentDialog.data = item
      this.commentDialog.type = 2
      this.commentDialog.isShow = true
    },

    async deleteComment(scope) {
      this.$confirm("此操作将永久删除该评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await req.post("/api/comment/delete", {
            id: scope.row._id
          })
          if (res.data.code === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            })
            this.list.splice(scope.$index, 1)
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    },

    async getData() {
      let res = await req.get(`/api/comment/list?pageSize=${this.page.pageSize}&pageNumber=${this.page.pageNumber - 1}`)
      let list = res.data.data.list;
      this.page.totalCount = res.data.data.total;
      list.forEach(item => {
        if ( item.articleId ) {
          item._articleTitle = item.articleId.title
        } else {
          item._articleTitle = "所属文章不存在"
        }
        if ( !item.authorNickname ) {
          item._authorNickname = "无"
        } else {
          item._authorNickname = item.authorNickname
        }
        if ( !item.authorUrl ) {
          item._authorUrl = "无url"
        } else {
          item._authorUrl = item.authorUrl
        }
        if ( !item.authorEmail ) {
          item._authorEmail = "无email"
        } else {
          item._authorEmail = item.authorEmail
        }
        item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm")
        item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm")
      })
      this.list = list;
      this.loaded()
    },

    async saveData() {
      let res = await req.post("/api/config", this.configObj)
      if (res.data.code === 0) {
        this.$message({
          message: "保存成功",
          type: "success"
        })
      }
    },

    //弹出框点了确定
    async commentDialogHandleCertain() {
      let res = {}
      let data = {
        authorNickname: this.commentDialog.data.authorNickname,
        authorUrl: this.commentDialog.data.authorUrl,
        authorEmail: this.commentDialog.data.authorEmail,
        mdContent: this.commentDialog.data.mdContent
      }
      if (this.commentDialog.type === 1) {
        res = await req.post(
          "/api/comment/create",
          data
        )
      } else if (this.commentDialog.type === 2) {
        data._id = this.commentDialog.data._id;
        res = await req.post(
          "/api/comment/update",
          data
        )
      }
      let msg = res.data.msg
      if (res.data.code === 1) {
        if (typeof msg === "object") {
          this.$message.error(JSON.stringify(msg))
        } else {
          this.$message.error(msg)
        }
      } else {
        this.$message.success(msg)
        this.commentDialog.data = {}
        this.commentDialog.isShow = false
        this.getData()
      }
    },

    onPageChange(num) {
      this.page.pageNumber = num
      this.getData(this.filter)
    },

    //查看前台
    viewWeb(item) {
      window.open(baseURL + item.articleId.serialNumber + ".html#comment")
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false
      }, 1000)
    }
  }
}
</script>

<style scoped>
.pagination-warp {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

