<template>
  <d2-container v-loading="loading">
    <template slot="header">
      <div>访问记录</div>
    </template>
    <div class="list-warp">
    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="visitorIp"
        label="访问ip">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方式"
      >
      </el-table-column>
      <el-table-column
        prop="_params"
        label="请求参数"
      >
      </el-table-column>
      <el-table-column
        prop="fullUrl"
        label="请求地址"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="visitorUserAgent"
        label="访问环境"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="_updateTime"
        label="访问时间"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewWeb(scope.row)">查看</el-button>
          <el-button type="text" size="small" style="color: red" @click="deleteSearch(scope)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-warp">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="page.pageNumber"
        @current-change="onPageChange"
        :total="page.totalCount">
      </el-pagination>
    </div>
    </div>
    <template slot="footer">
    </template>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request";
import moment from "moment";

export default {
  name: "articleList",
  data() {
    return {
      loading: true,
      moment: moment,
      list: [],
      page: {
        pageSize: 10,
        pageNumber: 1,
        totalCount: 100
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {

    async deleteSearch(scope) {
      console.log(scope);
      this.$confirm("此操作将永久删除该搜索记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await req.post("/api/log/delete", {
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

    async getData(filter) {
      let url = "/api/log/list";
      url = url + `?type=1&pageSize=${this.page.pageSize}&pageNumber=${this.page.pageNumber - 1}`;
      let res = await req.get(url);
      this.page.totalCount = res.data.data.total;
      let list = res.data.data.list;
      let newList = [];
      list.forEach(info => {
        let item = info.info;
        if ( item.params ) {
          item._params = JSON.stringify(item.params);
        } else {
          item._params = "没有参数";
        }
        item._updateTime = moment(info.updateTime).format("YYYY-MM-DD HH:mm");
        item._id = info._id;
        newList.push(item);
      });
      this.list = newList
      this.loaded()
    },

    // 查看前台
    viewWeb(item) {
      window.open(item.fullUrl);
    },

    onPageChange(num) {
      this.page.pageNumber = num;
      this.getData();
    },

    loaded() {
      setTimeout(()=>{
        this.loading = false;
      }, 1000);
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
