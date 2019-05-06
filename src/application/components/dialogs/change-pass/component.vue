<template>
  <Modal v-model="show">
    <div slot="header">修改密码</div>
    <div>
      <Form ref="passForm" :labelPosition="'left'" :model="passForm" :labelWidth="90">
        <FormItem label="旧的密码" prop="oldpass">
          <div class="h-input-group">
            <input
              type="password"
              name="changepassOldpass"
              v-model="passForm.fields.oldpass.value"
              placeholder="输入旧的密码"
            >
          </div>
        </FormItem>
        <FormItem label="新的密码" prop="newpass">
          <div class="h-input-group">
            <input
              type="password"
              name="changepassNewpass"
              v-model="passForm.fields.newpass.value"
              placeholder="输入新的密码"
            >
          </div>
        </FormItem>
        <FormItem label="确认密码" prop="newpass">
          <div class="h-input-group">
            <input
              type="password"
              name="changepassNewpass2"
              v-model="passForm.fields.newpass2.value"
              placeholder="再次输入新密码"
            >
          </div>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
      <button class="h-btn h-btn-primary" @click="confirm()">确定</button>
      <button class="h-btn" @click="$emit('close')">取消</button>
    </div>
  </Modal>
</template>

<script>
import modelman from 'modelman';
let model = new modelman.Model();
model.assign({
  oldpass: {n: '旧密码', type: 'Password', r: true},
  newpass: {n: '新密码', type: 'Password', r: true},
  newpass2: {n: '确认密码', type: 'Password', r: true}
});

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      passForm: model
    };
  },
  mounted() {
  },
  methods: {
    async confirm() {
      let vRes = this.passForm.validator.all();
      if (vRes.length) {
        this.$Message({
          text: vRes[0].displayName + '不能为空且必须包含字母或数字，字符数要大于8位。',
          type: 'error'
        });
        return;
      }
      let res = await this.req$.post('/api/back/user/password', this.passForm.to.json());
      if ( res.code === 0 ) {
        this.$Message({
          text: res.msg,
          type: 'success'
        });
        this.logout$();
      } else {
        this.$Message({
          text: res.msg,
          type: 'error'
        });
      }
    }
  }
};
</script>
