<template>
  <d2-container v-loading="loading">
    <template slot="header">查看标签</template>
    <div class="tag-list">
      <div class="tag-item" v-for="(tag, index) in tags" :key="index">
        <el-button :type="randomType()" round @click="viewWeb(tag)">{{tag}}</el-button>
      </div>
    </div>
    <template slot="footer"></template>
  </d2-container>
</template>

<script>
import { req, baseURL } from '@/api/request'

export default {
  name: "tagList",
  data() {
    return {
      loading: true,
      types: ['primary', 'success', 'info', 'warning', 'danger'],
      tags: []
    }
  },
  mounted () {
    this.getData();
  },
  methods: {
    randomType() {
      let len = this.types.length;
      let item = this.types[Math.floor(Math.random()*len)];
      return item
    },

    async getData () {
      let res = await req.get('/api/config?alias=tags')
      this.tags = res.data.data.info
      this.loaded()
    },

    //查看前台
    viewWeb(tag) {
      window.open(baseURL + `tags/${tag}.html`)
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
.tag-list::after {
  display:block; 
  content:"clear"; 
  height:0; 
  clear:both; 
  overflow:hidden; 
  visibility:hidden;
}

.tag-item {
  padding: 5px;
  float: left; 
}
</style>


