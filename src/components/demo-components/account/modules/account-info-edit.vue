<style lang='less'>
.account-info-vue {
  padding: 30px 30px 30px 0;
  width: 500px;
}
</style>
<template>
  <div class="account-info-vue">
    <Form :model="acc" :rules="rules" ref="form" showErrorTip>
      <FormItem label="头像" prop="avatar">
        <Qiniu :options="options" type="image" data-type="url" v-model="acc.avatar"></Qiniu>
      </FormItem>
      <FormItem label="邮箱" prop="email">
        <input type="text" v-model="acc.email">
      </FormItem>
      <FormItem label="昵称" prop="nickname">
        <input type="text" v-model="acc.nickname">
      </FormItem>
      <FormItem label="性别" prop="sex">
        <Radio
          v-model="acc.sex"
          :datas="[{ name: '男', code: 1 }, { name: '女', code: 2}]"
          keyName="code"
          titleName="name"
        ></Radio>
      </FormItem>
      <FormItem label="生日" prop="birthday">
        <DatePicker v-model="acc.birthday" type="date"></DatePicker>
      </FormItem>
      <FormItem label="qq号" prop="qq">
        <input type="text" v-model="acc.qq">
      </FormItem>
      <FormItem label="微信号" prop="wx">
        <input type="text" v-model="acc.wx">
      </FormItem>
      <FormItem label="地址" prop="location">
        <input type="text" v-model="acc.location">
      </FormItem>
      <FormItem label="工作" prop="work">
        <input type="text" v-model="acc.work">
      </FormItem>
      <FormItem label="关于" prop="desc">
        <textarea v-autosize v-model="acc.about"/>
      </FormItem>
      <FormItem label="标签" prop="tags">
        <TagInput v-model="acc.tags"></TagInput>
      </FormItem>
      <FormItem label>
        <Button color="primary" @click="save" :loading="saveloading">保存</Button>
        <Button @click="reset">重置</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import store from 'js/vuex/store';
import moment from 'moment';

export default {
  props: {
    account: Object
  },
  data() {
    return {
      acc: Utils.copy(this.account),
      rules: {
        required: ['name', 'email', 'org'],
        email: ['email']
      },
      options: {
        max_file_size: '1mb',
        filters: {
          mime_types: [{ title: 'Image files', extensions: 'jpg,gif,png' }]
        }
      },
      saveloading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    async save() {
      if (!this.$refs.form.valid().result) return;
      let user = Utils.copy(this.acc);
      user.birthday = moment(user.birthday).valueOf();
      delete user._id;
      delete user.__v;
      this.saveloading = true;
      let res = await this.req$.post('/api/user/updateme', user);
      this.$Message({
        type: res.code === 0 ? 'success' : 'error',
        text: res.msg,
        timeout: 3000
      });
      this.saveloading = false;
    },
    reset() {
      this.$refs.form.reset();
      this.acc = Utils.copy(this.account);
    }
  },
  computed: {}
};
</script>
