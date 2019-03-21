<template>
  <d2-container v-loading="loading">
    <template slot="header">图片管理</template>
    <div class="list">
      <el-row>
        <el-col :span="6" v-for="(item, index) in resourceList" :key="index">
          <el-card class="card-box" :body-style="{ padding: '0px' }">
            <img :src="item.url" class="image" :preview="index">
            <div style="padding: 14px;">
              <span>{{item.remarks}}</span>
              <div class="bottom clearfix">
                <time class="time">{{item.createTime}}</time>
                <el-dropdown @command="handleDropdownCommand" style="float:right;">
                  <span class="el-dropdown-link">下拉菜单
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="[1,item]">查看链接</el-dropdown-item>
                    <el-dropdown-item :command="[2,item]">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
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
      </el-row>
    </div>
    <template slot="footer">
      <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :on-preview="handlePreview"
        :on-success="handleUploadSuccess"
        multiple
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </template>
  </d2-container>
</template>

<script>
import { req, baseURL } from "@/api/request";
import moment from "moment";

export default {
  name: "resourceImage",
  data() {
    return {
      loading: true,
      moment: moment,
      currentDate: new Date().getTime(),
      resourceList: [],
      fileList: [],
      page: {
        pageSize: 8,
        pageNumber: 1,
        totalCount: 100
      },
      uploadUrl: baseURL + "api/resource/uploader"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      let res = await req.get(
        `/api/resource/list?type=1&pageSize=${this.page.pageSize}&pageNumber=${this.page.pageNumber - 1}`
      );
      let list = res.data.data.list;
      this.page.totalCount = res.data.data.total;
      list.forEach(item => {
        item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm");
        item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm");
      });
      this.resourceList = list;
      this.loaded();
    },
    submitUpload() {
      this.loading = true;
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleUploadSuccess() {
      this.getData();
      this.loading = false;
    },
    handleDropdownCommand(command) {
      let type = command[0];
      let item = command[1];
      switch (type) {
        case 1:
          this.showUrl(item.url);
          break;
        case 2:
          this.deleteResource(item);
          break;
      }
    },
    showUrl(url) {
      this.$prompt("请自行复制", "资源链接", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: url
      })
        .then(({ value }) => {})
        .catch(() => {});
    },
    deleteResource(item) {
      this.$confirm("此操作将永久删除该资源, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let res = await req.post("/api/resource/delete", {
          id: item._id,
          fileName: item.remarks
        });
        if (res.data.code === 0) {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.resourceList.splice(this.resourceList.$index, 1);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },

    onPageChange(num) {
      this.page.pageNumber = num;
      this.getData(this.filter);
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
.card-box {
  margin: 20px;
}

.card-box .image {
  height: 14vw;
  object-fit: cover;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.pagination-warp {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

