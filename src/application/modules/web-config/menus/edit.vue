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
        <div class="from-warp">
          <div class="menu-item" v-for="(item, index) in config.info" :key="index">
            <div class="input-warp">
              <div class="label">菜单名称</div>
              <div class="value">
                <input type="text" v-model="item.name">
              </div>
            </div>
            <div class="input-warp">
              <div class="label">链接类型</div>
              <div class="value options">
                <Select v-model="item.type" :datas="typeOptions.options"></Select>
              </div>
            </div>
            <div class="input-warp" v-if="item.type==0">
              <div class="label">选择分类</div>
              <div class="value options">
                <Select v-model="item.categoryId" :datas="categories.options"></Select>
              </div>
            </div>
            <div class="input-warp" v-if="item.type==1">
              <div class="label">自定义链接</div>
              <div class="value">
                <input type="text" v-model="item.link">
              </div>
            </div>
            <div class="input-warp">
              <button class="h-btn h-btn-primary" @click="addMenu()" >新增主菜单</button>
              <button class="h-btn h-btn-primary" @click="addSubMenu(item)" >新增子菜单</button>
              <button class="h-btn h-btn-text-red" @click="removeMenu(index)" >删除</button>
            </div>
          </div>
        </div>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from './model/Menu';
import SubMenu from './model/SubMenu';
import MenuTypes from './model/MenuTypes';
import util from '@/application/common/util/index.js';
import Select from '@/application/components/jscms-form/Select.js';

export default {
  data() {
    return {
      page: {
        name: '菜单编辑'
      },
      config: {
        name: '',
        alias: 'menus',
        info: {},
        _id: '',
        id: ''
      },
      typeOptions: new Select(MenuTypes),
      categories: {},
      isLoading: false
    };
  },

  mounted() {
    this.fetchConfig();
    this.fetchCategory();
    console.log(this.typeOptions);
  },

  methods: {
    submit() {
      this.isLoading = true;
      let validResult = this.form.validator.all();
      if (validResult.length > 0) {
        this.$Message({
          type: 'error',
          text: res[0].displayName + '的格式不正确且不能为空'
        });
        return;
      }
      this.saveData(this.form.to.json().robots);
      this.isLoading = false;
    },

    addSubMenu(item) {
      this.item.children.push(new SubMenu());
    },

    addMenu() {
      this.config.info.push(new Menu());
    },

    removeMenu(index) {
      if (this.config.info.length > 1) {
        this.config.info.splice(index, 1);
      }
    },

    async saveData(info, callback) {
      this.config.info = info;
      let res = await this.req$.post('/api/back/config', this.config);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
    },

    /**
     * 获取配置
     */
    async fetchConfig(reload = false) {
      this.containerLoading = true;
      let res = await this.req$.get(`/api/back/config?alias=${this.config.alias}`);
      let config = res.data;
      util.setData(this.config, config);
      this.config.id = this.config._id;
      console.log(this.config);
      setTimeout(() => {
        this.containerLoading = false;
      });
    },

    /**
     * 获取分类
     */
    async fetchCategory() {
      let res = await this.req$.get('/api/back/category/all');
      let categoriesRes = res.data.list;
      let categories = categoriesRes.map(i => `${i._id}:${i.name}`);
      this.categories = new Select(categories.join(','));
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

.from-warp {
  .menu-item {
    margin-bottom: 10px;
    box-sizing: border-box;

    &::after {
      content: '';
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .input-warp {
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;

      .options {
        width: 130px;
      }

      .label {
        padding-right: 10px;
      }
    }
  }
}
</style>
