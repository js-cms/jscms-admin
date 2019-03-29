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
import util from '@/application/common/util/index.js';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      id: this.$route.query.id,
      page: {
        name: ''
      },
      form: {},
      isLoading: false,
      mode: 'single',
    };
  },

  mounted() {
    this.fetchModel$('文章', 'article', (model) => {
      this.form = model;
      this.init();
      this.fetchData();
    });
    this.fetchData();
  },

  methods: {
    init() {
      this.page.name = this.form.model.displayName;
    },

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
      let res = await this.req$.get('/api/article', {
        id: this.id
      });
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
      let res = await this.req$.get('/api/article', {
        id: this.id
      });
      this.form.setData(res.data);
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