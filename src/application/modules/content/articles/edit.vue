<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{`${id ? '编辑' : '新建'}${page.name}`}}</span>
        <span style="float: right">
          <button class="h-btn" @click="dialog.draftArticle.show()">导入草稿</button>
          <button class="h-btn" @click="saveDraft()">保存草稿</button>
          <button class="h-btn" @click="()=>{ dialog.image.isShow = true }">图片管理</button>
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
                          @complete="(type, res) => {
                            if (type === 'success') {
                              $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                              form.fields.indepUserAvatar.value = res.data.imageUrl;
                            } else {
                              $Message.error('未知错误');
                            }
                          }"
                        ></upload-avatar>
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
                  <TagInput
                    v-model="form.fields.keywords.value"
                    :limit="20"
                    :wordlimit="20"
                    placeholder="输入标签，回车键确认"
                  ></TagInput>
                </FormItem>
                <FormItem label="文章摘要">
                  <textarea
                    :name="form.fields.description.name"
                    v-model="form.fields.description.value"
                    :rows="form.fields.description.extra.rows || 6"
                    :placeholder="form.fields.description.placeholder"
                  ></textarea>
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

    <!-- 草稿箱 -->
    <div v-if="dialog.draftArticle">
      <dialog-draft-article :options="dialog.draftArticle" @importDraft="importDraft"></dialog-draft-article>
    </div>

    <!-- 图片管理 -->
    <Modal v-model="dialog.image.isShow" :hasCloseIcon="true" :className="'nopadding'">
      <div v-width="900">
        <resource-list :isDialog="true"></resource-list>
      </div>
    </Modal>
  </div>
</template>
<script>
import storejs from 'store';

import util from '@/application/common/util/index.js';
import Select from '@/application/components/jscms-form/Select.js';
import uploadAvatar from '@/application/components/upload-avatar';
import dialogDraftArticle from '@/application/components/dialogs/draft-article/index.js';

import resourceList from '@/application/modules/resource/images/list.vue';

export default {
  components: {
    uploadAvatar,
    resourceList,
    dialogDraftArticle: dialogDraftArticle.component
  },
  data() {
    return {
      id: this.$route.query.id,
      uploadAction: storejs.get('origin') + '/api/back/resource/uploader',
      dialog: {
        draftArticle: new dialogDraftArticle.DraftArticle(this),
        image: {
          isShow: false
        }
      },
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
        await this.mixinCategory(model);
        this.form = model;
        this.parseOptions();
        if (this.id) {
          this.fetchData(() => {
            this.containerLoading = false;
          });
        } else {
          this.containerLoading = false;
        }
      });
    },

    /**
     * 处理分类数据
     */
    async mixinCategory(model) {
      let categoriesRes = await this.fetchCategory();
      let categories = categoriesRes.map(i => `${i._id}:${i.name}`);
      model._iterator(f => {
        if (f.extra.comType === 'select') {
          if (f.extra.options === 'categories') {
            f.extra.options = categories.join(',');
          }
        }
      });
    },

    /**
     * 解析选项
     */
    parseOptions() {
      this.options.category = new Select(this.form.fields.categoryId.extra.options);
      this.options.type = new Select(this.form.fields.type.extra.options);
      this.options.topType = new Select(this.form.fields.topType.extra.options);
    },

    /**
     * 提交数据
     */
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

    /**
     * 其他校验
     */
    otherCheck(params) {
      if (params.contentType === 0) {
        if (!params.mdContent) {
          return '你选择的编辑器是‘markdown编辑器’，请填写内容。';
        }
      }
      if (params.contentType === 1) {
        if (!params.htmlContent) {
          return '你选择的编辑器是‘纯html编辑器’，请填写内容。';
        }
      }
      if (params.contentType === 2) {
        if (!params.richContent) {
          return '你选择的编辑器是‘富文本编辑器’，请填写内容。';
        }
      }
      return false;
    },

    /**
     * 保存数据
     */
    async saveData(article, callback) {
      let url = '/api/back/article/';
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

    /**
     * 保存到草稿
     */
    async saveDraft() {
      let params = this.form.to.json({ formField: true });
      let res = await this.req$.get(`/api/back/article/draft?name=${params.title}`);
      if (res.code === 0 && res.data) {
        this.$Confirm('发现存在同名文章的草稿，是否要覆盖？如果取消的话本次将不会进行保存。', '询问')
          .then(async () => {
            let updateRes = await this.req$.post('/api/back/article/draft/update', {
              name: params.title,
              info: params
            });
            this.$Message({
              text: updateRes.msg,
              type: updateRes.code === 0 ? 'success' : 'error'
            });
          })
          .catch(() => {
            this.$Message.error('取消操作');
          });
      } else {
        let createRes = await this.req$.post('/api/back/article/draft/create', {
          name: params.title,
          info: params
        });
        this.$Message({
          text: createRes.msg,
          type: createRes.code === 0 ? 'success' : 'error'
        });
      }
    },

    /**
     * 导入草稿钩子
     */
    async importDraft(data) {
      this.$Confirm(`确定要导入文章【${data.name}】吗？会覆盖现在正在编辑的文章。`, '提醒')
        .then(() => {
          this.form.setData(data.info);
          this.dialog.draftArticle.close();
          this.$Message.success('导入完成');
        })
        .catch(() => {
          this.$Message.error('取消导入');
        });
    },

    /**
     * 抓取文章数据
     */
    async fetchData(callback) {
      let res = await this.req$.get('/api/back/article', {
        id: this.id
      });
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      if (res.code === 0) {
        let data = res.data;
        data.id = data._id;
        this.form.setData(res.data);
        typeof callback === 'function' ? callback() : void 0;
      }
    },

    /**
     * 抓取分类数据
     */
    async fetchCategory(callback) {
      let res = await this.req$.get('/api/back/category/all');
      return res.data.list;
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

.nopadding {
  .h-notify-content {
    padding-top: 30px;
    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
  }
}
</style>
