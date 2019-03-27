<template>
  <div class="dialog">
    <Modal v-model="isShow" :closeOnMask="false">
      <div slot="header">{{title}}</div>
      <div v-width="width" v-if="form">
        <Form :label-width="labelWidth" labelPosition="left" :model="form.fields" ref="form" showErrorTip>
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
        <button class="h-btn" @click="() => {
          options.onCancel.call(options.me);
        }">取消</button>
        <Button color="primary" @click="() => {
          options.onConfirm.call(options.me, form);
        }">确定</Button>
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
      width: 700,
      labelWidth: 60,
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
      this.width = this.options.width || 700;
      this.getLabelWidth();
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
    },

    getLabelWidth() {
      let labelWidth = 30;
      for (const key in this.form.fields) {
        if (this.form.fields.hasOwnProperty(key)) {
          const element = this.form.fields[key];
          labelWidth = 30 + (15 * element.displayName.length);
        }
      }
      this.labelWidth = labelWidth;
    }
  }
};
</script>
