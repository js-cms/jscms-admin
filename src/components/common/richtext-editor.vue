<style lang="less">
</style>

<template>
  <div class="rich-text-editor-vue">
  </div>
</template>

<script>
import WangEditor from 'wangeditor';
import storejs from 'store';

import '../../css/richtext-editor.less';

export default {
  name: 'RichTextEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'html' // html, text
    },
    cache: {
      type: Boolean,
      default: true // 是否开启本地存储
    }
  },
  mounted() {
    this.editor = new WangEditor(this.$el);
    this.uploadConfig();
    // 开启图片复制
    this.editor.customConfig.onchange = (html) => {
      let text = this.editor.txt.text();
      if (this.cache) localStorage.editorCache = html;
      this.$emit('input', this.valueType === 'html' ? html : text);
      this.$emit('change', html, text);
    };
    this.editor.create();
    let html = this.value || localStorage.editorCache;
    if (html) this.editor.txt.html(html);
  },
  methods: {
    setHtml(val) {
      this.editor.txt.html(val);
    },

    uploadConfig() {
      let origin = storejs.get('origin');
      this.editor.customConfig.uploadImgHeaders = {
        'authorization': storejs.get('token')
      }
      this.editor.customConfig.uploadImgServer = `${origin}/api/back/resource/wangeditor/uploader`;
      this.editor.customConfig.uploadImgShowBase64 = true;
    }
  }
};
</script>
