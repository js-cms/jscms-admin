<template>
  <div class="dialog">
    <Modal v-model="isShow" :closeOnMask="false">
      <div slot="header">{{title}}</div>
      <div v-width="width" v-if="form">
        <div v-width="'100%'" v-if="form!==''">
          <jscms-form :form="form" :labelWidth="labelWidth" :parent="this"></jscms-form>
        </div>
      </div>
      <div slot="footer">
        <button
          class="h-btn"
          @click="() => {
          options.onCancel.call(options.me);
        }"
        >取消</button>
        <Button
          color="primary"
          @click="() => {
          options.onConfirm.call(options.me, form, index);
        }"
        >确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import jscmsForm from '@/application/components/jscms-form/jscms-form.vue';
import util from '@/application/common/util/index.js';

export default {
  props: ['options'],
  components: {
    jscmsForm
  },
  data() {
    return {
      isShow: false,
      title: '编辑',
      width: 700,
      labelWidth: 60,
      index: 0,
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
      this.form = '';
      this.title = this.options.title || '编辑';
      this.form = this.options.form || '';
      this.width = this.options.width || 700;
      this.index = this.options.index;
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
      let labelWidth = 0;
      for (const key in this.form.fields) {
        if (this.form.fields.hasOwnProperty(key)) {
          const element = this.form.fields[key];
          if (element.formField === true) {
            let width = util.textSize('13px', element.displayName).width;
            if (width > labelWidth) {
              labelWidth = width;
            }
          }
        }
      }
      labelWidth = labelWidth < 60 ? 85 : labelWidth + 30;
      this.labelWidth = labelWidth;
    }
  }
};
</script>
