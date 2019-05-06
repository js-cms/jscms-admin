<template>
  <div class="frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">标签列表</span>
    </div>
    <div class="h-panel-body">
      <div class="container">
        <template v-for="(i, idx) in data">
          <span :key="idx" @click="goWeb(i)">
            <span class="h-tag" v-if="i.classNum==0" >{{i.name}}</span>
            <span class="h-tag h-tag-primary" v-if="i.classNum==1">{{i.name}}</span>
            <span class="h-tag h-tag-red" v-if="i.classNum==2">{{i.name}}</span>
            <span class="h-tag h-tag-blue" v-if="i.classNum==3">{{i.name}}</span>
            <span class="h-tag h-tag-green" v-if="i.classNum==4">{{i.name}}</span>
            <span class="h-tag h-tag-yellow" v-if="i.classNum==5">{{i.name}}</span>
            <span class="h-tag h-tag-gray" v-if="i.classNum==6">{{i.name}}</span>
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'store';

export default {
  data() {
    return {
      data: []
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let res = await req.get('/api/back/config?alias=tags');
      let info = res.data.info;
      let data = [];
      info.forEach(i => {
        data.push({
          name: i,
          classNum: Math.floor(Math.random() * 6)
        });
      });
      this.data = data;
    },

    goWeb(item) {
      let baseURL = storejs.get('origin');
      window.open(baseURL + `/tags/${item.name}.html`)
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-height: 500px;

  .h-tag {
    cursor: pointer;
    margin-bottom: 5px;
  }
}
</style>
