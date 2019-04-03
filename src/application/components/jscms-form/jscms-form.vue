<template>
  <div class="jscms-form">
    <Form :label-width="labelWidth || 100" :model="form.fields" ref="form" showErrorTip>
      <template v-for="(f, key, index) in form.fields">
        <template v-if="f.formField===true">
          <!-- 普通输入框 -->
          <FormItem :label="f.displayName" v-if="!f.extra.comType" :key="index">
            <input :name="f.name" type="text" v-model="f.value" :placeholder="f.placeholder">
          </FormItem>
          <!-- 标签输入框 -->
          <FormItem
            v-if="f.extra.comType==='tagInput'"
            :label="f.displayName"
            :key="index"
          >
            <TagInput v-model="f.value" :limit="20" :wordlimit="20" placeholder="输入标签，回车键确认"></TagInput>
          </FormItem>
          <!-- 文本域输入框 -->
          <FormItem
            :label="f.displayName"
            v-if="f.extra.comType==='textarea'"
            :key="index"
          >
            <textarea :name="f.name" v-model="f.value" rows="6" :placeholder="f.placeholder"></textarea>
          </FormItem>
          <!-- 下拉选择框 -->
          <FormItem
            v-if="f.extra.comType==='select'"
            :label="f.displayName"
            :key="index"
          >
            <div v-width="300"><Select v-model="f.value" :datas="f.extra.options.options"></Select></div>
          </FormItem>
          <!-- markdown编辑器 -->
          <FormItem
            v-if="f.extra.comType==='markdown'"
            :label="f.displayName"
            :key="index"
          >
            <MarkdownEditor v-model="f.value" :readonly="false"/>
          </FormItem>
        </template>
      </template>
    </Form>
  </div>
</template>

<script>
import modelman from 'modelman';
import marked from 'marked';
import Select from './Select';

export default {
  props: ['form', 'labelWidth', 'parent'],
  data() {
    return {
      modelman: modelman,
      select: null,
      param: [
        { title: '选择1', key: 'a1', other: '其他值' },
        { title: '选择2', key: 'a2' },
        { title: '选择3', key: 'a3' }
      ]
    };
  },

  mounted() {
    let fs = this.form.fields;
    for (const key in fs) {
      if (fs.hasOwnProperty(key)) {
        let item = fs[key];
        if (item.extra.comType === 'select') {
          if (item.extra.options) {
            if ( item.extra.options && typeof item.extra.options !== 'object') {
              item.extra.options = new Select(item.extra.options);
            }
          }
        }
      }
    }
  },

  methods: {
    parse() {
      
    },

    submit() {
      console.log(this.form);
    },

    change() {
      this.$emit('input', this.editValue);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
