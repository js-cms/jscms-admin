<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{page.name}}</span>
        <span style="float: right">
          <Button color="primary" :loading="isLoading" @click="submit">保存修改</Button>
        </span>
      </div>
      <div class="h-panel-body">

        <!-- 元信息设置 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">元信息设置</span>
            </div>
            <div class="h-panel-body">
              <Form :label-width="110">
                <FormItem label="站点首页标题">
                  <input type="text" v-model="form.fields.title.value" :placeholder="form.fields.title.placeholder">
                </FormItem>
                <FormItem label="站点标题分割符">
                  <input type="text" v-model="form.fields.separator.value" :placeholder="form.fields.separator.placeholder">
                </FormItem>
                <FormItem label="站点副标题">
                  <input type="text" v-model="form.fields.subtitle.value" :placeholder="form.fields.subtitle.placeholder">
                </FormItem>
                <FormItem label="站点首页关键字">
                  <input type="text" v-model="form.fields.keywords.value" :placeholder="form.fields.keywords.placeholder">
                </FormItem>
                <FormItem label="站点图标地址（favicon.ico）">
                  <input type="text" v-model="form.fields.favicon.value" :placeholder="form.fields.favicon.placeholder">
                </FormItem>
                <FormItem label="站点描述">
                  <textarea v-model="form.fields.description.value" :rows="6" :placeholder="form.fields.description.placeholder"></textarea>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>

        <!-- 基本信息设置 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">基本信息设置</span>
            </div>
            <div class="h-panel-body">
              <Form :label-width="130">
                <FormItem label="站点logo地址">
                  <input type="text" v-model="form.fields.logo.value" :placeholder="form.fields.logo.placeholder">
                </FormItem>
                <FormItem label="icp备案信息">
                  <input type="text" v-model="form.fields.icp.value" :placeholder="form.fields.icp.placeholder">
                </FormItem>
                <FormItem label="微博地址">
                  <input type="text" v-model="form.fields.weibo.value" :placeholder="form.fields.weibo.placeholder">
                </FormItem>
                <FormItem label="邮箱地址">
                  <input type="text" v-model="form.fields.email.value" :placeholder="form.fields.email.placeholder">
                </FormItem>
                <FormItem label="qq号">
                  <input type="text" v-model="form.fields.qq.value" :placeholder="form.fields.qq.placeholder">
                </FormItem>
                <FormItem label="电话号码">
                  <input type="text" v-model="form.fields.phone.value" :placeholder="form.fields.phone.placeholder">
                </FormItem>
                <FormItem label="关于网站">
                  <textarea type="text" v-model="form.fields.about.value" :rows="6" :placeholder="form.fields.about.placeholder"></textarea>
                </FormItem>
                <FormItem label="文章页声明">
                  <CodeEditor v-model="form.fields.articleStatement.value" :height="form.fields.articleStatement.extra.height" :mode="form.fields.articleStatement.extra.lang||''"  />
                </FormItem>
                <FormItem label="网站底部代码">
                  <CodeEditor v-model="form.fields.footHTML.value" :height="form.fields.footHTML.extra.height" :mode="form.fields.footHTML.extra.lang||''"  />
                </FormItem>
              </Form>
            </div>
          </div>
        </div>

        <!-- 二维码设置 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">二维码设置</span>
            </div>
            <div class="h-panel-body"> 
              <Form :label-width="150">
                <FormItem label="客服微信二维码">
                  <upload-image
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.qrWxservice.value"
                    :height="200"
                    :width="200"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.qrWxservice.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }"
                  ></upload-image>
                </FormItem>
                <FormItem label="微信收款二维码">
                  <upload-image
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.qrWxpay.value"
                    :height="200"
                    :width="200"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.qrWxpay.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }"
                  ></upload-image>
                </FormItem>
                <FormItem label="微信公众号二维码">
                  <upload-image
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.qrWxpub.value"
                    :height="200"
                    :width="200"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.qrWxpub.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }"
                  ></upload-image>
                </FormItem>
                <FormItem label="支付宝收款二维码">
                  <upload-image
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.qrAlipay.value"
                    :height="200"
                    :width="200"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.qrAlipay.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }"
                  ></upload-image>
                </FormItem>
                <FormItem label="银联云闪付收款二维码">
                  <upload-image
                    buttonName="上传图片"
                    :action="uploadAction"
                    :extraData="uploadData"
                    :imageUrl="form.fields.qrUnionpay.value"
                    :height="200"
                    :width="200"
                    @complete="(type, res) => {
                      if (type === 'success') {
                        $Message[res.code === 0 ? 'success' : 'error'](res.msg);
                        form.fields.qrUnionpay.value = res.data.imageUrl;
                      } else {
                        $Message.error('未知错误');
                      }
                    }"
                  ></upload-image>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>

        <!-- 开关配置信息 -->
        <div class="main-block-warp" v-if="form">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">开关配置信息</span>
            </div>
            <div class="h-panel-body">
              <Form :label-width="150">
                <FormItem label="开启前台注册登录">
                  <Radio v-model="form.fields.boolWebReg.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem>
                <FormItem label="开启邮箱注册登录">
                  <Radio v-model="form.fields.boolWebRegEmail.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem>
                <FormItem label="开启邮箱注册激活">
                  <Radio v-model="form.fields.boolWebRegEmailActive.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem> 
                <FormItem label="开启手机注册登录">
                  <Radio v-model="form.fields.boolWebRegPhone.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem>
                <FormItem label="开启登录才能评论">
                  <Radio v-model="form.fields.boolCommentLogin.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem>
                <FormItem label="开启注册登录验证码">
                  <Radio v-model="form.fields.boolLoginVercode.value" :datas="[{val: true, name: '开启'}, {val: false, name: '关闭'}]" keyName="val" titleName="name"></Radio>
                </FormItem>
                <FormItem label="邮箱服务器主机">
                  <input type="text" v-model="form.fields.confEmailService.value" :placeholder="form.fields.confEmailService.placeholder">
                </FormItem>
                <FormItem label="邮箱服务账号">
                  <input type="text" v-model="form.fields.confEmailUser.value" :placeholder="form.fields.confEmailUser.placeholder">
                </FormItem>
                <FormItem label="邮箱服务密码">
                  <input type="text" v-model="form.fields.confEmailPass.value" :placeholder="form.fields.confEmailPass.placeholder">
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'store';
import site from './model/Site';
import util from '@/application/common/util/index.js';
import jscmsForm from '@/application/components/jscms-form/jscms-form';
import uploadImage from '@/application/components/upload-image';

export default {
  components: {
    jscmsForm,
    uploadImage
  },
  data() {
    return {
      uploadAction: storejs.get('origin') + '/api/back/resource/uploader',
      uploadData: {
        token: storejs.get('token')
      },
      page: {
        name: site.model.displayName
      },
      config: {
        name: '',
        alias: '',
        info: {},
        _id: ''
      },
      mode: 'single',
      form: site,
      isLoading: false
    };
  },

  mounted() {
    this.fetchConfig();
  },

  methods: {
    submit() {
      this.isLoading = true;
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: res[0].displayName + '格式的格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json({ formField: true }));
      this.isLoading = false;
    },

    async saveData(info, callback) {
      this.config.info = info;
      let type = '保存';
      let res = await this.req$.post('/api/back/config', this.config);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchConfig() {
      this.containerLoading = true;
      let res = await this.req$.get('/api/back/config?alias=site');
      let config = res.data;
      util.setData(this.config, config);
      this.config.id = this.config._id;
      this.form.setData(this.config.info);
      setTimeout(() => {
        this.containerLoading = false;
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.basic-form-vue {
  .h-panel-body {
    padding-right: 60px;
  }

  .main-block-warp {
    margin-bottom: 15px;
  }
}
</style>