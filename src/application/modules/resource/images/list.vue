<template>
  <div class="frame-page images-page">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">图片管理</span>
        <span style="float: right">
          <button class="h-btn h-btn-primary">上传新图片</button>
        </span>
      </div>
      <div class="h-panel-body">
        <ImagePreview
          :width="80"
          :borderRadius="5"
          :distance="15"
          :datas="datas"
          @click="openPreview"
        />
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import ImagePreview from '@/application/components/image-preview';

const link = 'https://lokeshdhakar.com/projects/lightbox2/images/';
export default {
  components: {
    ImagePreview
  },
  data() {
    return {
      datas: [
        { thumbUrl: `${link}thumb-4.jpg`, url: `${link}image-4.jpg` },
        { thumbUrl: `${link}thumb-5.jpg`, url: `${link}image-5.jpg` },
        { thumbUrl: `${link}thumb-6.jpg`, url: `${link}image-6.jpg` }
      ]
    };
  },
  mounted() {
    this.containerLoading = false;
  },
  methods: {
    openPreview(index = 0, data) {
      this.$ImagePreview(this.datas, index);
    }
  }
};
</script>

<style scoped>
.images-page {
  min-height: 500px;
}
</style>
