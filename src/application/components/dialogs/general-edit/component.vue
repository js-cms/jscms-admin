<template>
  <div class="dialog">
    <Modal v-model="isShow" :closeOnMask="false" >
      <div slot="header">{{title}}</div>
      <div v-width="700" v-if="form">
        <Form :label-width="110" :model="form.fields" ref="form" showErrorTip>
          <template v-for="(f, key, index) in form.fields">
            <FormItem :label="f.displayName" prop="input" v-if="!f.extra.comType" :key="index">
              <input :name="f.name" type="text" v-model="f.value">
            </FormItem>
            <FormItem
              :label="f.displayName"
              prop="input"
              v-if="f.extra.comType==='textarea'"
              :key="index"
            >
              <textarea :name="f.name" v-model="f.value" rows="4"></textarea>
            </FormItem>
          </template>
        </Form>
      </div>
      <div slot="footer">
        <button class="h-btn">取消</button>
        <Button color="primary">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data() {
    return {
      isShow: false,
      title: '编辑',
      form: ''
    };
  },

  watch: {
    'options.isShow': function(val) {
      if (val === true) {
        this.isShow = true;
        this.onShow();
      } else if (val === false) {
        this.isShow = false;
      }
    }
  },

  methods: {
    onShow() {
      this.title = this.options.title || '编辑';
      this.form = this.options.form || '';
    },

    handlerEvent(handlerName) {
      switch (handlerName) {
        case 'onCancel':
          this.options.onCancel.call(this.options.me);
          break;
        case 'onConfirm':
          this.options.onConfirm.call(this.options.me);
          break;
        default:
          this.options.onClose.call(this.options.me);
          break;
      }
    }
  }
};
</script>
