<template>
  <div class="account-info-vue">
    <Form :model="account" ref="form" :labelWidth="100">
      <FormItem label="头像" prop="avatar">
        <upload-avatar
          buttonName="上传图片"
          :action="uploadAction"
          :extraData="uploadData"
          :imageUrl="account.fields.avatar.value"
          @complete="(type, res) => {
            if (type === 'success') {
              $Message[res.code === 0 ? 'success' : 'error'](res.msg);
              account.fields.avatar.value = res.data.imageUrl;
            } else {
              $Message.error('未知错误');
            }
          }"
        ></upload-avatar>
      </FormItem>
      <FormItem label="手机号">
        <input type="text" v-model="account.fields.phone.value">
      </FormItem>
      <FormItem label="邮箱">
        <input type="text" v-model="account.fields.email.value">
      </FormItem>
      <FormItem label="昵称">
        <input type="text" v-model="account.fields.nickname.value">
      </FormItem>
      <FormItem label="密码密文">
        <div class="h-input-group">
          <input type="text" v-model="account.fields.password.value" placeholder="密码密文">
          <Button color="primary" @click="generate()">生成密文</Button>
        </div>
      </FormItem>
      <FormItem label="权限">
        <TagInput v-model="account.fields.power.value"></TagInput>
      </FormItem>
      <FormItem label="积分">
        <NumberInput v-model="account.fields.score.value"></NumberInput>
      </FormItem>
      <FormItem label="性别">
        <Radio
          v-model="account.fields.sex.value"
          :datas="[{ name: '男', code: 1 }, { name: '女', code: 2}]"
          keyName="code"
          titleName="name"
        ></Radio>
      </FormItem>
      <FormItem label="生日">
        <DatePicker v-model="account.fields.birthday.value" type="date"></DatePicker>
      </FormItem>
      <FormItem label="qq号">
        <input type="text" v-model="account.fields.qq.value">
      </FormItem>
      <FormItem label="微信号">
        <input type="text" v-model="account.fields.wx.value">
      </FormItem>
      <FormItem label="地址">
        <input type="text" v-model="account.fields.location.value">
      </FormItem>
      <FormItem label="工作">
        <input type="text" v-model="account.fields.work.value">
      </FormItem>
      <FormItem label="关于">
        <textarea rows=3 v-autosize v-model="account.fields.about.value"/>
      </FormItem>
      <FormItem label="标签">
        <TagInput v-model="account.fields.tags.value"></TagInput>
      </FormItem>
      <FormItem label="激活状态">
        <Radio
          v-model="account.fields.active.value"
          :datas="[{ name: '已激活', value: true }, { name: '未激活', value: false}]"
          keyName="value"
          titleName="name"
        ></Radio>
      </FormItem>
      <FormItem>
        <Button color="primary" @click="submit" :loading="saveloading">保存</Button>
        <Button @click="reset">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import store from 'js/vuex/store';
import storejs from 'store';
import moment from 'moment';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

import uploadAvatar from '@/application/components/upload-avatar';

export default {
  props: {
    account: Object
  },
  components: {
    uploadAvatar
  },
  data() {
    return {
      id: this.$route.query.id,
      uploadAction: storejs.get('origin') + '/api/resource/uploader',
      defaultData: {},
      uploadData: {
        token: storejs.get('token')
      },
      saveloading: false
    };
  },
  created() {
    this.defaultData = this.account.to.json();
  },
  methods: {
    generate() {
      this.account.fields.password.value = bcrypt.hashSync(this.account.fields.password.value, 10);
    },

    submit() {
      let validResult = this.account.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: validResult[0].displayName + '格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.account.to.json());
    },

    async saveData(user, callback) {
      this.saveloading = true;
      let url = '/api/user/';
      user.birthday = moment(user.birthday).valueOf();
      if (this.id) {
        user.id = this.id;
        url += 'update';
      } else {
        url += 'create';
      }
      let res = await this.req$.post(url, user);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
      this.saveloading = false;
    },

    reset() {
      this.account.setData(this.defaultData);
    }
  }
};
</script>

<style lang='less'>
.account-info-vue {
  padding: 30px 30px 30px 0;
  width: 600px;
}
</style>
