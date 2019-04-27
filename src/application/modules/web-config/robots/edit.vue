<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{page.name}}</span>
        <span style="float: right">
          <Button color="primary" :loading="isLoading" @click="submit">保存修改</Button>
        </span>
      </div>
      <div class="h-panel-body">
        <jscms-form :form="form" :parent="this" :labelWidth="130"></jscms-form>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>
<script>
import robots from './model/Robots';
import util from '@/application/common/util/index.js';
import jscmsForm from '@/application/components/jscms-form/jscms-form';
import { setTimeout } from 'timers';

export default {
  components: {
    jscmsForm
  },
  data() {
    return {
      page: {
        name: robots.model.displayName
      },
      config: {
        name: '',
        alias: '',
        info: {},
        _id: ''
      },
      mode: 'single',
      form: robots,
      isLoading: false
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    submit() {
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: res[0].displayName + '格式的格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json().robots);
    },

    async saveData(info, callback) {
      this.config.info = info;
      let type = '保存';
      let res = await this.req$.post('/api/config', this.config);
      if (res.code === 0) {
        this.$Message({
          text: type + '成功',
          type: 'success'
        });
        typeof callback === 'function' ? callback() : void 0;
      } else {
        this.$Message({
          text: type + '失败',
          type: 'error'
        });
      }
    },

    async fetchData(reload = false) {
      this.containerLoading = true;
      if (reload) {
        this.data.pagination.page = 1;
      }
      let res = await this.req$.get('/api/config?alias=robots');
      let config = res.data;
      util.setData(this.config, config);
      this.form.setData({
        robots: this.config.info
      });
      setTimeout(() => {
        this.containerLoading = false;
      }, 1000);
      console.log(this.config);
    }
  }
};
</script>

<style lang="less">
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }
}
</style>