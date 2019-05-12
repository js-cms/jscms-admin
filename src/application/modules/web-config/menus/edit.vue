<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{page.name}}（最多支持二级）</span>
        <span style="float: right">
          <Button :loading="isLoading" @click="addMenu">新增主菜单</Button>
          <Button color="primary" :loading="isLoading" @click="reset">重置</Button>
          <Button color="primary" :loading="isLoading" @click="submit">保存修改</Button>
        </span>
      </div>
      <div class="h-panel-body">
        <div class="from-warp">
          <div v-for="(item, index) in config.info" :key="index">
            <div class="menu-item">
              <div class="input-warp">
                <div class="label">序号</div>
                <div class="value order">
                  <NumberInput v-model="item.order"></NumberInput>
                </div>
              </div>
              <div class="input-warp">
                <div class="label">菜单名称</div>
                <div class="value name">
                  <input type="text" v-model="item.name">
                </div>
              </div>
              <div class="input-warp">
                <div class="label">链接类型</div>
                <div class="value options">
                  <Select v-model="item.type" :datas="typeOptions.options"></Select>
                </div>
              </div>
              <div class="input-warp" v-if="item.type=='category'">
                <div class="label">选择分类</div>
                <div class="value options">
                  <Select v-model="item.categoryId" :datas="categories.options"></Select>
                </div>
              </div>
              <div class="input-warp" v-if="item.type=='link'">
                <div class="label">自定义链接</div>
                <div class="value">
                  <input type="text" v-model="item.link" placeholder="例如：http://www.baidu.com/">
                </div>
              </div>
              <div class="input-warp" v-if="item.type=='link'">
                <div class="label">高亮匹配</div>
                <div class="value">
                  <input type="text" v-model="item.link" placeholder="例如：@/page/custom.html">
                </div>
              </div>
              <div class="input-warp">
                <button class="h-btn" @click="addSubMenu(config.info, item)">增子</button>
                <button class="h-btn h-btn-text-red" @click="removeMenu(config.info, index)">删</button>
              </div>
            </div>
            <div v-if="item.children && item.children.length">
              <div v-for="(subItem, idx) in item.children" :key="idx">
                <div class="menu-item sub-menu">
                  <div class="input-warp">
                    <div class="label">序号</div>
                    <div class="value order">
                      <NumberInput v-model="subItem.order"></NumberInput>
                    </div>
                  </div>
                  <div class="input-warp">
                    <div class="label">子菜单名称</div>
                    <div class="value name">
                      <input type="text" v-model="subItem.name">
                    </div>
                  </div>
                  <div class="input-warp">
                    <div class="label">链接类型</div>
                    <div class="value options">
                      <Select v-model="subItem.type" :datas="typeOptions.options"></Select>
                    </div>
                  </div>
                  <div class="input-warp" v-if="subItem.type=='category'">
                    <div class="label">选择分类</div>
                    <div class="value options">
                      <Select v-model="subItem.categoryId" :datas="categories.options"></Select>
                    </div>
                  </div>
                  <div class="input-warp" v-if="subItem.type=='link'">
                    <div class="label">自定义链接</div>
                    <div class="value">
                      <input type="text" v-model="subItem.link">
                    </div>
                  </div>
                  <div class="input-warp" v-if="subItem.type=='link'">
                    <div class="label">高亮匹配</div>
                    <div class="value">
                      <input type="text" v-model="item.link" placeholder="例如：@/page/custom.html">
                    </div>
                  </div>
                  <div class="input-warp">
                    <button class="h-btn h-btn-text-red" @click="removeMenu(item.children, idx)">删</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

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
      oriConfig: {},
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
  },

  methods: {

    /**
     * 重置
     */
    reset() {
      this.config = _.cloneDeep(this.oriConfig);
    },

    /**
     * 提交保存
     */
    submit() {
      this.$Confirm('确定要保存更改？', '询问').then(() => {
        this.isLoading = true;
        this.saveData(this.config.info);
      }).catch(() => {
      });
    },

    /**
     * 增加一个主菜单
     */
    addMenu(datas, item) {
      this.config.info.push(new Menu());
    },

    /**
     * 增加一个主菜单
     */
    addSubMenu(datas, item) {
      if (!item.children) item.children = [];
      item.children.push(new SubMenu());
    },

    /**
     * 移除一个菜单
     */
    removeMenu(datas, index) {
      datas.splice(index, 1);
    },

    /**
     * 保存数据
     */
    async saveData(info, callback) {
      this.config.info = info;
      let res = await this.req$.post('/api/back/config', this.config);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      typeof callback === 'function' ? callback() : void 0;
      this.isLoading = false;
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
      this.oriConfig = _.cloneDeep(this.config);
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
    padding: 5px;
    box-sizing: border-box;
  }
}

.from-warp {
  .menu-item {
    margin-bottom: 10px;
    box-sizing: border-box;

    &.sub-menu {
      padding-left: 20px;
    }

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

      .name {
        width: 100px;

        input {
          width: 100%;
        }
      }

      .order {
        width: 85px;
      }

      .options {
        width: 100px;
      }

      .label {
        padding-right: 10px;
      }
    }
  }
}
</style>
