<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{page.name}}</span>
      </div>
      <div class="h-panel-body" >
        <Row>
          <Cell width="12" >
            <Form
              :label-width="150"
              :model="form.fields"
              ref="form"
              showErrorTip
            >
              <template v-for="(f, key, index) in form.fields" >
                <FormItem :label="f.displayName" prop="input" v-if="!f.extra.comType" :key="index">
                  <input :name="f.name" type="text" v-model="f.value" >
                </FormItem>
                <FormItem :label="f.displayName" prop="input" v-if="f.extra.comType==='textarea'" :key="index">
                  <textarea :name="f.name" v-model="f.value" rows=4 ></textarea>
                </FormItem>
              </template>
              <FormItem>
                <Button color="primary" :loading="isLoading" @click="submit">保存修改</Button>
              </FormItem>
            </Form>
          </Cell>
        </Row>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>
<script>
import site from './model/Site';
import util from '@/application/common/util/index.js';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      page: {
        name: site.model.displayName
      },
      config: {
        name: "",
        alias: "",
        info: {},
        _id: ""
      },
      mode: 'single',
      form: site,
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
      this.saveData(this.form.to.json());
    },

    async saveData(info, callback) {
      this.config.info = info;
      let type = '保存';
      let res = await this.req$.post('/api/config', this.config);
      if ( res.code === 0 ) {
        this.$Message({
          text: type + '成功',
          type: 'success'
        });
        typeof callback === 'function' ? callback() : void(0);
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
      let res = await this.req$.get('/api/config?alias=site');
      let config = res.data;
      util.setData(this.config, config);
      this.form.setData(this.config.info);
      setTimeout(()=>{
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