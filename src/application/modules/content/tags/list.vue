<template>
  <div class="frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">标签列表</span>
    </div>
    <div class="h-panel-body">
      <div class="container">
        <template v-for="(i, idx) in data">
          <span class="h-tag" v-if="i.classNum==0" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-primary" v-if="i.classNum==1" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-red" v-if="i.classNum==2" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-blue" v-if="i.classNum==3" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-green" v-if="i.classNum==4" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-yellow" v-if="i.classNum==5" :key="idx">{{i.name}}</span>
          <span class="h-tag h-tag-gray" v-if="i.classNum==6" :key="idx">{{i.name}}</span>
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
      let res = await req.get('/api/config?alias=tags');
      let info = res.data.info;
      let data = [];
      info.forEach(i => {
        data.push({
          name: i,
          classNum: Math.floor(Math.random() * 6)
        });
      });
      this.data = data;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  min-height: 500px;
}
</style>
