<template>
  <div class="upload-image" @click.stop="activeUpload" :style="style">
    <div class="cross" @click.stop="activeUpload" v-show="!imgUrl">
      <div class="across"></div>
      <div class="upright"></div>
    </div>
    <img class="preview" @click.stop="activeUpload" :src="imgUrl" v-show="imgUrl" title="重新上传" />
    <input id="uploadInput" type="file" @change="handleFileChange">
  </div>
</template>

<script>
import upload from "uploadman";
import storejs from "store";

export default {
  props: {
    imageUrl: {
      type: String
    },
    height: {
      type: Number,
      default: 70
    },
    width: {
      type: Number,
      default: 70
    },
    buttonName: {
      type: String,
      default: '上传'
    },
    action: {
      type: String,
      default: ''
    },
    uploadKey: {
      type: String,
      default: "file"
    },
    extraData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    headers: {
      type: Object,
      default: function() {
        return {}
      }
    },
    withCookie: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      uploadLoading: false,
      file: "",
      imgUrl: "",
      style: {
        height: this.height + 'px',
        width: this.width + 'px'
      }
    };
  },
  created() {
    this.imgUrl = this.imageUrl;
  },
  watch: {
    imageUrl(val) {
      if (val) {
        if (val.substring(0, 4) !== 'http') {
          this.imgUrl = storejs.get('origin') + val;
        } else {
          this.imgUrl = val
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    handleFileChange(e) {
      this.uploadLoading = true;
      if (typeof e.target === "undefined") {
        this.file = e[0];
      } else {
        this.file = e.target.files[0];
      }
      if ( this.file ) {
        this.request(this.file);
      }
    },

    getExtName(file) {
      let tempArr = file.name.split(".");
      return tempArr[tempArr.length - 1];
    },

    request(file) {
      const { headers, withCookie, extraData, uploadKey, action } = this;
      let data = JSON.parse(JSON.stringify(extraData));
      data.originalImageUrl = this.imgUrl;
      const options = {
        headers: headers,
        withCredentials: withCookie,
        file,
        data: data,
        filename: uploadKey,
        action,
        onProgress: e => {
          this.uploadPercent = ~~e.percent;
          this.onProgress(e, file);
        },
        onSuccess: res => {
          this.uploadLoading = false;
          this.onSuccess(res);
        },
        onError: err => {
          this.uploadLoading = false;
          this.onError(err, file);
        }
      };
      upload(options);
    },

    onProgress(e, file) {
      console.log("==onProgress==");
    },

    onSuccess(res) {
      console.log("==onSuccess==");
      this.imgUrl = res.data.imageUrl;
      this.$emit("complete", 'success', res);
      this.removeFile();
    },

    onError(err, file) {
      console.log("==onError==");
      this.$emit("complete", 'error', err, file);
      this.removeFile();
    },

    removeFile() {
      this.$el.querySelector('#uploadInput').value = '';
    },

    activeUpload() {
      if ( this.uploadLoading === false ) {
        this.$el.querySelector('#uploadInput').click();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upload-image {
  height: 70px;
  width: 70px;
  background-color: transparent;
  border: 1px dashed #eeeeee;
  display: inline-block;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;

  &:hover {
    border: 1px dashed #3788ee;
  }

  .cross {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .across {
      position: absolute;
      width: 50%;
      height: 2px;
      top: 50%;
      background: #eeeeee;
    }

    .upright {
      position: absolute;
      width: 2px;
      height: 50%;
      left: 50%;
      background: #eeeeee;
    }
  }

  .preview {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }

  input {
    position: absolute;
    appearance: none;
    cursor: pointer;
    display: inline-block;
    left: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
}
</style>
