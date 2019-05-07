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
import site from './model/Site';
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
        name: site.model.displayName
      },
      config: {
        name: '',
        alias: '',
        info: {},
        _id: ''
      },
      mode: 'single',
      form: site,
      isLoading: false
    };
  },

  mounted() {
    this.fetchConfig();
  },

  methods: {
    submit() {
      this.isLoading = true;
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: res[0].displayName + '格式的格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json({ formField: true }));
      this.isLoading = false;
    },

    async saveData(info, callback) {
      this.config.info = info;
      let type = '保存';
      let res = await this.req$.post('/api/back/config', this.config);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchConfig() {
      this.containerLoading = true;
      let res = await this.req$.get('/api/back/config?alias=site');
      let config = res.data;
      util.setData(this.config, config);
      this.config.id = this.config._id;
      this.form.setData(this.config.info);
      setTimeout(() => {
        this.containerLoading = false;
      }, 1000);
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