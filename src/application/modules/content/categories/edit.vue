<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{`${id ? '编辑' : '新建'}${page.name}`}}</span>
        <span style="float: right">
          <button class="h-btn h-btn-primary" @click="submit">{{`${id ? '保存修改' : '确认新建'}`}}</button>
        </span>
      </div>
      <div class="h-panel-body">
        <Loading text="Loading" :loading="containerLoading"></Loading>
        <!-- 选填信息 -->
        <div v-width="'100%'" v-if="form">
          <Row :space="16">
            <Cell width="24">
              <div v-width="'100%'">
                <div class="h-panel">
                  <div class="h-panel-bar">
                    <span class="h-panel-title">开启独立元信息</span>
                    <span class="h-panel-right">
                      <Checkbox v-model="form.fields.isIndepMeta.value">勾选开启独立元信息</Checkbox>
                    </span>
                  </div>
                  <div class="h-panel-body" v-show="form.fields.isIndepMeta.value">
                    <Form :label-width="110">
                      <FormItem label="元信息标题">
                        <input
                          type="text"
                          v-model="form.fields.indepMetaTitle.value"
                          placeholder="请输入元信息标题"
                        >
                      </FormItem>
                      <FormItem label="元信息关键字">
                        <input
                          type="text"
                          v-model="form.fields.indepMetaKeywords.value"
                          placeholder="请输入元信息关键字"
                        >
                      </FormItem>
                      <FormItem label="元信息描述">
                        <textarea
                          :name="form.fields.indepMetaDescription.name"
                          v-model="form.fields.indepMetaDescription.value"
                          :rows="6"
                          :placeholder="form.fields.indepMetaDescription.placeholder"
                        ></textarea>
                      </FormItem>
                    </Form>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
        </div>

        <!-- 分类主要信息 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">分类主要信息</span>
            </div>
            <div class="h-panel-body">
              <Form :label-width="110">
                <FormItem label="分类的封面">
                  <upload-avatar
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.poster.value"
                    :height="198"
                    :width="300"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.poster.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }" 
                  ></upload-avatar>
                </FormItem>
                <FormItem label="中文分类名称">
                  <input type="text" v-model="form.fields.name.value" :placeholder="form.fields.name.placeholder">
                </FormItem>
                <FormItem label="英文分类别名">
                  <input type="text" v-model="form.fields.alias.value" :placeholder="form.fields.alias.placeholder">
                </FormItem>
                <FormItem label="分类标签">
                  <TagInput
                    v-model="form.fields.tags.value"
                    :limit="20"
                    :wordlimit="20"
                    placeholder="输入标签，回车键确认"
                  ></TagInput>
                </FormItem>
                <FormItem label="分类简介">
                  <textarea
                    :name="form.fields.intro.name"
                    v-model="form.fields.intro.value"
                    :rows="form.fields.intro.extra.rows || 6"
                    :placeholder="form.fields.intro.placeholder"
                  ></textarea>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'store';

import util from '@/application/common/util/index.js';
import Select from '@/application/components/jscms-form/Select.js';
import uploadAvatar from '@/application/components/upload-avatar';

export default {
  components: {
    uploadAvatar
  },
  data() {
    return {
      id: this.$route.query.id,
      uploadAction: storejs.get('origin') + '/api/back/resource/uploader',
      uploadData: {
        token: storejs.get('token')
      },
      selected: 0,
      page: {
        name: ''
      },
      form: ''
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.fetchModel$('分类', 'category', async model => {
        this.page.name = model.model.displayName;
        model._iterator(f => {
          if (f.extra.comType === 'select') {
            if (f.extra.options === 'categories') {
              f.extra.options = categories.join(',');
            }
          }
        });
        this.form = model;
        if (this.id) {
          this.fetchData(() => {
            this.containerLoading = false;
          });
        } else {
          this.containerLoading = false;
        }
      });
    },

    submit() {
      let validResult = this.form.validator.all({ formField: true });
      console.log('validResult', validResult);
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: validResult[0].displayName + '格式不正确且不能为空'
        });
        return;
      }
      let params = this.form.to.json({ formField: true });
      let checkRes = this.otherCheck(params);
      if (checkRes) {
        this.$Message({
          type: 'error',
          text: checkRes
        });
      } else {
        this.saveData(params);
      }
    },

    otherCheck(params) {
      return false;
    },

    async saveData(category, callback) {
      let url = '/api/back/category/';
      if (this.id) {
        category.id = this.id;
        url += 'update';
      } else {
        url += 'create';
      }
      let res = await this.req$.post(url, category);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchData(callback) {
      let res = await this.req$.get('/api/back/category', {
        id: this.id
      });
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      if ( res.code === 0 ) {
        let data = res.data;
        data.id = data._id;
        this.form.setData(res.data);
        typeof callback === 'function' ? callback() : void 0;
      }
    }
  }
};
</script>

<style lang="less">
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }
}

.form-btns {
  padding-left: 100px;
}

.main-block-warp {
  width: 100%;
  margin-top: 20px;

  .editor-warp {
    padding: 20px;
  }
}
</style>
