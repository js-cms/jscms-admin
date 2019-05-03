<template>
  <div class="jscms-form" >
    <Form :label-width="labelWidth || 100" :model="formData.fields" ref="form" showErrorTip>
      <template v-for="(f, key, index) in formData.fields">
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
            <textarea :name="f.name" v-model="f.value" :rows="f.extra.rows || 6" :placeholder="f.placeholder"></textarea>
          </FormItem>
          <!-- 下拉选择框 -->
          <FormItem
            v-if="f.extra.comType==='select'"
            :label="f.displayName"
            :key="index"
          >
            <div v-width="300"><Select v-model="f.value" :datas="f.extra.options.options"></Select></div>
          </FormItem>
          <!-- 单选框 -->
          <FormItem
            v-if="f.extra.comType==='radio'"
            :label="f.displayName"
            :key="index"
          >
            <Radio v-model="f.value" :datas="f.extra.options.options" keyName="val" titleName="name"></Radio>
          </FormItem>
          <!-- markdown编辑器 -->
          <FormItem
            v-if="f.extra.comType==='markdown'"
            :label="f.displayName"
            :key="index"
          >
            <MarkdownEditor v-model="f.value" :readonly="false"/>
          </FormItem>
          <!-- 代码编辑器 -->
          <FormItem
            v-if="f.extra.comType==='codeEdit'"
            :label="f.displayName"
            :key="index"
          >
             <CodeEditor v-model="f.value" :height="f.extra.height" :mode="f.extra.lang||''"  />
          </FormItem>
        </template>
      </template>
    </Form>
  </div>
</template>

<script>
import CodeEditor from '@/components/common/code-editor';
import modelman from 'modelman';
import marked from 'marked';
import Select from './Select';
import Radio from './Radio';
import { setTimeout } from 'timers';
import _ from 'lodash';

export default {
  props: ['form', 'labelWidth', 'parent'],
  components: {
    CodeEditor 
  },
  data() {
    return {
      isShow: false,
      formData: {},
      modelman: modelman
    };
  },

  watch: {
    formData: {
      handler() {

      },
      deep: true
    }
  },

  created() {
    this.formData = this.form;
    // let data = this.form.to.json();
    // console.log(data);
    // this.formData = _.cloneDeep(this.form);
  },

  mounted() {
    let fs = this.formData.fields;
    for (const key in fs) {
      if (fs.hasOwnProperty(key)) {
        let item = fs[key];
        if (item.extra.comType === 'select') {
          if (item.extra.options) {
            if ( item.extra.options && typeof item.extra.options !== 'object') {
              item.extra.options = new Select(item.extra.options);
            }
          }
        } else if (item.extra.comType === 'radio') {
          if (item.extra.options) {
            if (item.extra.options && typeof item.extra.options !== 'object') {
              item.extra.options = new Radio(item.extra.options);
            }
          }
        }
      }
    }
    setTimeout(() => {
      this.isShow = true;
    });
  },

  methods: {
    change() {
      this.$emit('input', this.editValue);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
