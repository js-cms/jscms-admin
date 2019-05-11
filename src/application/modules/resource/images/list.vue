<template>
  <div class="frame-page images-page">
    <div class="h-panel" :class="{'noborder': isDialog}">
      <div class="h-panel-bar">
        <span class="h-panel-title">
          图片管理
        </span>
        <span style="float: right">
          <upload-button
            buttonName="上传图片"
            :action="uploadAction"
            :extraData="uploadData"
            @complete="uploadComplete"
          ></upload-button>
        </span>
      </div>
      <div class="h-panel-bar">
        <div class="h-input-group" v-width="500">
          <input type="text" placeholder="输入文件名进行模糊搜索" v-model="params.keyword"/>
          <Button color="primary" @click="()=>{
            params.pageNumber = 0;
            fetchData();
          }">确定搜索</Button>
        </div>
      </div>
      <div class="h-panel-body">
        <ImagePreview
          :width="80"
          :borderRadius="5"
          :distance="15"
          :datas="datas"
          @click="panelShow"
          @close="deleteImage"
        />
        <Loading text="Loading" :loading="containerLoading"></Loading>
        <div class="no-data" v-show="datas.length===0||!datas">没有数据</div>
        <div class="load-more">
          <button @click="()=>{
            if (isNoMore===false) {
              params.pageNumber++;
              fetchData()
            }
          }" class="h-btn h-btn-primary" :class="{'h-btn-loading': isNoMore===true}">
            <i class="h-icon-loading" v-if="containerLoading===true"></i>
            <i class="h-icon-refresh" v-if="containerLoading===false"></i>
            <span>{{isNoMore === false ? '加载更多' : '没有更多了'}}</span>
          </button>
        </div>
      </div>
    </div>
    <Modal v-model="panel.show">
      <div slot="header">图片操作</div>
      <div class="panel">
        <ul>
          <li>
            <div class="h-input-group">
              <input type="text" v-model="panel.data.url" placeholder="内容">
              <Button
                @click="()=>{
                $Clipboard({
                  text: panel.data.url
                });
              }"
                color="primary"
              >复制URL</Button>
            </div>
          </li>
          <li>
            <button class="h-btn h-btn-block" @click="panelPreview">
              <i class="h-icon-search"></i>
              <span>预览</span>
            </button>
          </li>
          <li>
            <button class="h-btn h-btn-block" @click="deleteImage(panel.index)">
              <i class="h-icon-trash"></i>
              <span>删除</span>
            </button>
          </li>
        </ul>
      </div>
    </Modal>
  </div>
</template>

<script>
import storejs from 'store';

import ImagePreview from '@/application/components/image-preview';
import uploadButton from '@/application/components/upload-button';

const link = 'https://lokeshdhakar.com/projects/lightbox2/images/';
export default {
  props: [ 'isDialog' ],
  components: {
    ImagePreview,
    uploadButton
  },
  data() {
    return {
      datas: [],
      uploadAction: storejs.get('origin') + '/api/back/resource/uploader',
      uploadData: {
        token: storejs.get('token')
      },
      isNoMore: false,
      params: {
        type: 1,
        pageSize: 30,
        pageNumber: 0,
        keyword: ''
      },
      panel: {
        show: false,
        index: 0,
        data: ''
      }
    };
  },
  mounted() {
    this.fetchData(() => {
      this.containerLoading = false;
    });
  },
  methods: {
    /**
     * 预览图片
     */
    panelPreview() {
      this.$ImagePreview(this.datas, this.panel.index);
    },

    /**
     * 显示图片操作菜单
     */
    panelShow(index = 0, data) {
      this.panel.index = index;
      this.panel.data = this.datas[this.panel.index];
      this.panel.show = true;
    },

    /**
     * 拉取图片资源列表
     */
    async fetchData(callback) {
      let { type, pageSize, pageNumber, keyword } = this.params;
      this.containerLoading = true;
      let res = await this.req$.get(`/api/back/resource/list?type=${type}&keyword=${keyword}&pageSize=${pageSize}&pageNumber=${pageNumber}`);
      let list = res.data.list;
      if (res.code === 0) {
        if ( pageNumber === 0 ) {
          this.datas = list;
        } else {
          if ( list.length === 0 ) {
            this.isNoMore = true;
          } else {
            this.datas = [...this.datas, ...list];
          }
        }
      }
      typeof callback === 'function' ? callback() : void 0;
      setTimeout(() => {
        this.containerLoading = false;
      }, 1000);
    },

    /**
     * 删除图片
     */
    deleteImage(index) {
      this.$Confirm('确定删除？', '提醒')
        .then(() => {
          this.req$
            .post('/api/back/resource/delete', {
              id: this.datas[index]._id,
              filename: this.datas[index].filename
            })
            .then(res => {
              this.$Message[res.code === 0 ? 'success' : 'error'](res.msg);
              this.reload();
            });
        })
        .catch(() => {});
    },

    /**
     * 图片上传成功回调
     */
    uploadComplete(type, res) {
      if (type === 'success') {
        this.$Message[res.code === 0 ? 'success' : 'error'](res.msg);
        if (res.code === 0) {
          this.reload();
        }
      } else {
        this.$Message.error('未知错误');
      }
    },

    /**
     * 重新加载
     */
    reload() {
      this.datas = [];
      this.isNoMore = false;
      this.params.pageNumber = 0;
      this.fetchData(() => {
        this.containerLoading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.images-page {
  min-height: 500px;
}

.panel {
  ul {
    li {
      margin-top: 10;
      margin-bottom: 10px;
    }
  }
}

.h-panel-body {
  min-height: 300px;
}

.no-data {
  padding: 100px;
  font-size: 14px;
  text-align: center;
  color: gray;
}

.load-more {
  text-align: center;
  padding: 40px;
}

.noborder {
  border: none;
}
</style>
