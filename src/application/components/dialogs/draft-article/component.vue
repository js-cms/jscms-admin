<template>
  <div class="dialog">
    <Modal v-model="isShow" :closeOnMask="false">
      <div slot="header">{{title}}</div>
      <div v-width="width">
        <div v-width="'100%'">
          test
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
        >导入</Button>
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
      title: '文章草稿箱',
      width: 700
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
