<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{`${id ? '编辑' : '新建'}${page.name}`}}</span>
        <span style="float: right">
          <button class="h-btn h-btn-text-primary" @click="()=>{generatePassword.show=true}">密码密文生成</button>
          <button class="h-btn h-btn-primary" @click="submit">{{`${id ? '保存修改' : '确认新建'}`}}</button>
        </span>
      </div>
      <div class="h-panel-body">
        <div v-width="'100%'" v-if="form!==''">
          <jscms-form :form="form" :labelWidth="120" :parent="this"></jscms-form>
        </div>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
    <Modal v-model="generatePassword.show">
      <div slot="header">密码密文生成</div>
      <div v-width="generatePassword.width">
        <Form
          ref="generatePassword"
          :labelPosition="'left'"
          :model="generatePassword"
          :labelWidth="90"
        >
          <FormItem label="密码明文" prop="password">
            <div class="h-input-group">
              <input type="text" v-model="generatePassword.password" placeholder="密码密文">
              <Button color="primary" @click="generate">生成</Button>
            </div>
          </FormItem>
          <FormItem label="密码密文" prop="ciphertext">
            <div class="h-input-group">
              <input type="text" v-model="generatePassword.ciphertext" placeholder="密码密文">
              <Button
                color="primary"
                @click="()=>{this.$Clipboard({
                text: generatePassword.ciphertext,
                showSuccessTip: '复制成功！'
              });}"
              >复制</Button>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <button class="h-btn" @click="generatePassword.show=false">关闭</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import util from '@/application/common/util/index.js';
import jscmsForm from '@/application/components/jscms-form/jscms-form.vue';
import bcrypt from 'bcryptjs';

export default {
  components: {
    jscmsForm
  },
  data() {
    return {
      id: this.$route.query.id,
      page: {
        name: ''
      },
      form: '',
      generatePassword: {
        show: false,
        width: 500,
        password: '',
        ciphertext: ''
      },
      mode: 'single'
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.fetchModel$('用户', 'user', async model => {
        this.page.name = model.model.displayName;
        this.form = model;
        if (this.id) {
          this.fetchData(() => {
            this.containerLoading = false;
          });
        } else {
          this.containerLoading = false;
        }
      });
    },

    submit() {
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: validResult[0].displayName + '格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json({ formField: true }));
    },

    generate() {
      this.generatePassword.ciphertext = bcrypt.hashSync(this.generatePassword.password, 10);
    },

    async saveData(page, callback) {
      let url = '/api/user/';
      if (this.id) {
        page.id = this.id;
        url += 'update';
      } else {
        url += 'create';
      }
      let res = await this.req$.post(url, page);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchData(callback) {
      let res = await this.req$.get('/api/user', {
        id: this.id
      });
      this.form.setData(res.data);
      typeof callback === 'function' ? callback() : void 0;
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

.form-btns {
  padding-left: 100px;
}
</style>
