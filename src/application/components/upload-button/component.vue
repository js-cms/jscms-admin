<template>
  <div class="upload-button">
    <input id="uploadInput" type="file" @change="handleFileChange">
    <button style="z-index: 100" @click.stop="activeUpload" class="h-btn h-btn-primary">
      <i class="h-icon-loading" v-if="uploadLoading===true"></i>
      <i class="h-icon-upload" v-if="uploadLoading===false"></i>
      <span>{{buttonName}}</span>
    </button>
  </div>
</template>

<script>
import upload from "uploadman";

export default {
  props: {
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
      file: ""
    };
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
      this.$emit("complete", 'success', res);
      this.removeFile();
    },

    onError(err, file) {
      console.log("==onError==");
      this.$emit("complete", 'error', err, file);
      this.removeFile();
    },

    removeFile() {
      document.getElementById('uploadInput').value = '';
    },

    activeUpload() {
      if ( this.uploadLoading === false ) {
        document.getElementById('uploadInput').click();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.upload-button {
  background-color: transparent;
  border: none;
  display: inline-block;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;

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
