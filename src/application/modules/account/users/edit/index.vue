<template>
  <div class="account-vue frame-page">
    <Row :space="30">
      <Cell :xs="24" :sm="24" :md="7" :lg="7" :xl="7" v-if="isShowForm">
        <account-show :account="showData"></account-show>
      </Cell>
      <Cell :xs="24" :sm="24" :md="17" :lg="17" :xl="17" v-if="isShowForm">
        <div class="h-panel">
          <div class="h-panel-tabs-bar">
            <Tabs v-model="tab" :datas="tabs"></Tabs>
          </div>
          <account-edit v-if="tab == 'info'" :account="form"></account-edit>
        </div>
      </Cell>
    </Row>
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
import bcrypt from 'bcryptjs';
import moment from 'moment';
import storejs from 'store';

import util from '@/application/common/util/index.js';
import accountShow from './show.vue';
import accountEdit from './edit.vue';

const pre = function(data) {
  let origin = storejs.get('origin');
  data.birthday = moment(data.birthday || 0).format('YYYY-MM-DD');
  data.avatar = data.avatar.indexOf('http') === -1 ? origin + data.avatar : data.avatar;
  return data;
}

export default {
  components: {
    accountShow,
    accountEdit
  },
  data() {
    return {
      id: this.$route.query.id,
      page: {
        name: ''
      },
      isShowForm: false,
      showData: {},
      form: '',
      generatePassword: {
        show: false,
        width: 500,
        password: '',
        ciphertext: ''
      },
      tabs: {
        info: '基本设置'
      },
      tab: 'info'
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
          let data = pre(this.form.to.json());
          this.form.setData(data);
          this.isShowForm = true;
        }
      });
    },

    generate() {
      this.generatePassword.ciphertext = bcrypt.hashSync(this.generatePassword.password, 10);
    },

    async fetchData(callback) {
      let res = await this.req$.get('/api/back/user', {
        id: this.id
      });
      if (res.code === 0) {
        this.form.setData(pre(res.data));
        this.showData = this.form.to.json();
        this.isShowForm = true;
        typeof callback === 'function' ? callback() : void 0;
      } else {
        this.$Message({
          type: 'error',
          text: res.msg
        });
      }
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
