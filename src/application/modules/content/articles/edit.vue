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
            <Cell width="12">
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
            <Cell width="12">
              <div v-width="'100%'">
                <div class="h-panel">
                  <div class="h-panel-bar">
                    <span class="h-panel-title">开启独立发布者</span>
                    <span class="h-panel-right">
                      <Checkbox v-model="form.fields.isIndepUser.value">勾选开启独立发布者</Checkbox>
                    </span>
                  </div>
                  <div class="h-panel-body" v-show="form.fields.isIndepUser.value">
                    <Form :label-width="110">
                      <FormItem label="发布者头像">
                        <upload-avatar
                          buttonName="上传图片"
                          :action="uploadAction"
                          :extraData="uploadData"
                          :imageUrl="form.fields.indepUserAvatar.value"
                          @complete="uploadComplete"
                        ></upload-avatar>
                        <!-- <Qiniu :options="options" type="image" data-type="url" v-model="form.fields.indepUserAvatar.value"></Qiniu> -->
                      </FormItem>
                      <FormItem label="发布者昵称">
                        <input
                          type="text"
                          v-model="form.fields.indepUserNickname.value"
                          placeholder="请输入发布者昵称"
                        >
                      </FormItem>
                      <FormItem label="发布者简介">
                        <textarea
                          :name="form.fields.indepUserAbout.name"
                          v-model="form.fields.indepUserAbout.value"
                          :rows="6"
                          :placeholder="form.fields.indepUserAbout.placeholder"
                        ></textarea>
                      </FormItem>
                    </Form>
                  </div>
                </div>
              </div>
            </Cell>
          </Row>
          <!-- <jscms-form :form="form" :parent="this"></jscms-form> -->
        </div>

        <!-- 主要信息 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">主要信息</span>
            </div>
            <div class="h-panel-body">
              <Form :label-width="110">
                <FormItem label="文章的封面">
                  <input type="text" v-model="form.fields.poster.value" placeholder="请输入文章的封面">
                </FormItem>
                <FormItem label="文章的标题">
                  <input type="text" v-model="form.fields.title.value" placeholder="请输入文章的标题">
                </FormItem>
                <FormItem label="所属分类">
                  <Select v-model="form.fields.categoryId.value" :datas="options.category.options"></Select>
                </FormItem>
                <FormItem label="文章类型">
                  <Select v-model="form.fields.type.value" :datas="options.type.options"></Select>
                </FormItem>
                <FormItem label="置顶方式">
                  <Select v-model="form.fields.topType.value" :datas="options.topType.options"></Select>
                </FormItem>
                <FormItem label="文章关键字">
                  <TagInput v-model="form.fields.keywords.value" :limit="20" :wordlimit="20" placeholder="输入标签，回车键确认"></TagInput>
                </FormItem>
                <FormItem label="文章摘要">
                  <textarea :name="form.fields.description.name" v-model="form.fields.description.value" :rows="form.fields.description.extra.rows || 6" :placeholder="form.fields.description.placeholder"></textarea>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>

        <!-- 内容信息 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">编辑文章内容</span>
            </div>
            <div class="h-panel-body" style="padding: 0px;">
              <Tabs
                :datas="{0: 'Markdown', 1: '纯html代码', 2: '富文本编辑器'}"
                v-model="form.fields.contentType.value"
              ></Tabs>
              <div class="editor-warp">
                <!-- markddown 编辑器 -->
                <div class="editor-markdown" v-show="form.fields.contentType.value==0">
                  <MarkdownEditor v-model="form.fields.mdContent.value" :readonly="false"/>
                </div>
                <!-- 纯html代码编辑器 -->
                <div class="editor-html" v-show="form.fields.contentType.value==1">
                  <CodeEditor v-model="form.fields.htmlContent.value" mode="html"/>
                </div>
                <!-- 富文本编辑器 -->
                <div class="editor-richtext" v-show="form.fields.contentType.value==2">
                  <RichTextEditor v-model="form.fields.richContent.value"></RichTextEditor>
                </div>
              </div>
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
import jscmsForm from '@/application/components/jscms-form/jscms-form.vue';
import Select from '@/application/components/jscms-form/Select.js';
import uploadAvatar from '@/application/components/upload-avatar';

export default {
  components: {
    jscmsForm,
    uploadAvatar
  },
  data() {
    return {
      id: this.$route.query.id,
      uploadAction: storejs.get('origin') + '/api/resource/uploader',
      uploadData: {
        token: storejs.get('token')
      },
      selected: 0,
      page: {
        name: ''
      },
      form: '',
      options: {
        category: []
      }
    };
  },

  mounted() {
    this.init();
  },

  methods: {
    async init() {
      this.fetchModel$('文章', 'article', async model => {
        this.page.name = model.model.displayName;
        let categoriesRes = await this.fetchCategory();
        let categories = categoriesRes.map(i => `${i._id}:${i.name}`);
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
            this.parseOptions();
          });
        } else {
          this.containerLoading = false;
          this.parseOptions();
        }
      });
    },

    parseOptions() {
      this.options.category = new Select(this.form.fields.categoryId.extra.options);
      this.options.type = new Select(this.form.fields.type.extra.options);
      this.options.topType = new Select(this.form.fields.topType.extra.options);
    },

    submit() {
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: validResult[0].displayName + '格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json({ formField: true }));
    },

    async saveData(article, callback) {
      let url = '/api/article/';
      if (this.id) {
        article.id = this.id;
        url += 'update';
      } else {
        url += 'create';
      }
      let res = await this.req$.post(url, article);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchData(callback) {
      let res = await this.req$.get('/api/article', {
        id: this.id
      });
      this.form.setData(res.data);
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchCategory(callback) {
      let res = await this.req$.get('/api/category/list');
      return res.data;
    },

    /**
     * 图片上传成功回调
     */
    uploadComplete(type, res) {
      if (type === 'success') {
        this.$Message[res.code === 0 ? 'success' : 'error'](res.msg);
        this.form.fields.indepUserAvatar.value = res.data.imageUrl;
      } else {
        this.$Message.error('未知错误');
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
