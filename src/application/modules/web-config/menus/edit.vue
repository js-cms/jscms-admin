<template>
  <div class="app-form frame-page basic-form-vue">
    <div class="h-panel">
      <div class="h-panel-bar">
        <span class="h-panel-title">{{page.name}}（最多支持二级）</span>
        <span style="float: right">
          <Button :loading="isLoading" @click="dialogMenuShow('newMain')">新增主菜单</Button>
          <Button color="primary" :loading="isLoading" @click="reset">重置</Button>
          <Button color="primary" :loading="isLoading" @click="submit">保存修改</Button>
        </span>
      </div>
      <div class="h-panel-body">
        
        <!-- 顶部菜单配置 -->
        <div class="main-block-warp">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">顶部菜单配置</span>
            </div>
            <div class="h-panel-body">
              <div class="from-warp">
                <div v-for="(item, index) in top" :key="index">
                  <div class="menu-item">
                    <div class="input-warp">
                      <div class="label">{{item.order}}&nbsp;{{item.name}}</div>
                    </div>
                    <div class="input-warp">
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="dialogMenuShow('editMain', top, item, index)"
                      >编辑</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="addSubMenu(top, item)"
                      >增加子菜单</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="childenDisplay(item)"
                      >{{item.showChildren ? '收起子菜单' : '展开子菜单'}}</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-red"
                        @click="removeMenu(top, index)"
                      >删除</button>
                    </div>
                  </div>
                  <div v-if="item.children && item.children.length">
                    <div v-show="item.showChildren===true">
                      <div v-for="(subItem, idx) in item.children" :key="idx">
                        <div class="menu-item sub-menu">
                          <div class="menu-item">
                            <div class="input-warp">
                              <div class="label">{{subItem.order}}&nbsp;{{subItem.name}}</div>
                            </div>
                            <div class="input-warp">
                              <button
                                class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                                @click="dialogMenuShow('editSub', item.children, subItem, idx)"
                              >编辑</button>
                              <button
                                class="h-btn h-btn-text h-btn-xs h-btn-text-red"
                                @click="removeMenu(item.children, idx)"
                              >删除</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部菜单配置 -->
        <div class="main-block-warp">
          <div class="h-panel">
            <div class="h-panel-bar">
              <span class="h-panel-title">底部菜单配置</span>
            </div>
            <div class="h-panel-body">
              <div class="from-warp">
                <div v-for="(item, index) in bottom" :key="index">
                  <div class="menu-item">
                    <div class="input-warp">
                      <div class="label">{{item.order}}&nbsp;{{item.name}}</div>
                    </div>
                    <div class="input-warp">
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="dialogMenuShow('editMain', bottom, item, index)"
                      >编辑</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="addSubMenu(top, item)"
                      >增加子菜单</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                        @click="childenDisplay(item)"
                      >{{item.showChildren ? '收起子菜单' : '展开子菜单'}}</button>
                      <button
                        class="h-btn h-btn-text h-btn-xs h-btn-text-red"
                        @click="removeMenu(top, index)"
                      >删除</button>
                    </div>
                  </div>
                  <div v-if="item.children && item.children.length">
                    <div v-show="item.showChildren===true">
                      <div v-for="(subItem, idx) in item.children" :key="idx">
                        <div class="menu-item sub-menu">
                          <div class="menu-item">
                            <div class="input-warp">
                              <div class="label">{{subItem.order}}&nbsp;{{subItem.name}}</div>
                            </div>
                            <div class="input-warp">
                              <button
                                class="h-btn h-btn-text h-btn-xs h-btn-text-primary"
                                @click="dialogMenuShow('editSub', item.children, subItem, idx)"
                              >编辑</button>
                              <button
                                class="h-btn h-btn-text h-btn-xs h-btn-text-red"
                                @click="removeMenu(item.children, idx)"
                              >删除</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Loading text="Loading" :loading="containerLoading"></Loading>
      </div>
    </div>

    <Modal v-model="dialog.menu.isShow" :width="500">
      <div slot="header">{{dialog.menu.title}}</div>
      <div class="dialog-form">
        <Form :label-width="100">
          <FormItem label="序号">
            <NumberInput v-model="dialog.menu.form.order"></NumberInput>
          </FormItem>
          <FormItem label="菜单名称">
            <input type="text" v-model="dialog.menu.form.name">
          </FormItem>
          <FormItem label="菜单别名">
            <input type="text" v-model="dialog.menu.form.alias">
          </FormItem>
          <FormItem label="菜单类型">
            <Select v-model="dialog.menu.form.type" :datas="typeOptions.options"></Select>
          </FormItem>
          <FormItem label="选择分类" v-if="dialog.menu.form.type=='category'">
            <Select v-model="dialog.menu.form.categoryId" :datas="categories.options"></Select>
          </FormItem>
          <FormItem label="自定义链接" v-if="dialog.menu.form.type=='link'">
            <input
              type="text"
              v-model="dialog.menu.form.link"
              placeholder="例如：http://www.baidu.com/"
            >
          </FormItem>
          <FormItem label="高亮匹配">
            <input
              type="text"
              v-model="dialog.menu.form.activeUrl"
              placeholder="例如：@/page/custom.html"
            >
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <button class="h-btn h-btn-primary" @click="dialogMenuConfirm">确定</button>
        <button class="h-btn" @click="dialog.menu.isShow=false">取消</button>
      </div>
    </Modal>
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
      top: [],
      bottom: [],
      config: {
        name: '',
        alias: 'menus',
        info: {},
        _id: '',
        id: ''
      },
      typeOptions: new Select(MenuTypes),
      categories: {},
      dialog: {
        menu: {
          title: '编辑菜单',
          isShow: false,
          form: {},
          sourceMenu: '',
          sourceIndex: 0
        }
      },
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
      let config = _.cloneDeep(this.oriConfig);
      this.top = config.info.top;
      this.bottom = config.info.bottom;
    },

    /**
     * 提交保存
     */
    submit() {
      this.$Confirm('确定要保存更改？', '询问')
        .then(() => {
          this.isLoading = true;
          this.saveData(this.config.info);
        })
        .catch(() => {});
    },

    /**
     * 子菜单显示隐藏
     */
    childenDisplay(item) {
      item.showChildren = !item.showChildren;
    },

    /**
     * 增加一个主菜单
     */
    dialogMenuShow(type, datas, item, index) {
      switch (type) {
        case 'newMain':
          this.dialog.menu.title = '新建主菜单';
          this.dialog.menu.form = new Menu();
          break;
        case 'editMain':
          this.dialog.menu.title = '编辑主菜单';
          this.dialog.menu.form = _.cloneDeep(item);
          this.dialog.sourceMenu = datas;
          this.dialog.sourceIndex = index;
          break;
        case 'newSub':
          this.dialog.menu.title = '新建子菜单';
          this.dialog.menu.form = new SubMenu();
          break;
        case 'editSub':
          this.dialog.menu.title = '编辑子菜单';
          this.dialog.menu.form = _.cloneDeep(item);
          this.dialog.sourceMenu = datas;
          this.dialog.sourceIndex = index;
          break;
      }
      this.dialog.menu.isShow = true;
    },

    /**
     * 菜单确定钩子
     */
    dialogMenuConfirm() {
      if (this.dialog.sourceMenu) {
        this.dialog.sourceMenu[this.dialog.sourceIndex||0] = this.dialog.menu.form;
      }
      this.dialog.menu.isShow = false;
    },

    /**
     * 增加一个主菜单
     */
    addSubMenu(datas, item) {
      if (!item.children) item.children = [];
      item.showChildren = true;
      item.children.push(new SubMenu('新的子菜单'));
    },

    /**
     * 移除一个菜单
     */
    removeMenu(datas, index) {
      this.$Confirm('确定删除该菜单吗？', '提醒').then(() => {
        datas.splice(index, 1);
      }).catch(() => {});
    },

    /**
     * 保存数据
     */
    async saveData(info, callback) {
      this.config.info = info;
      this.config.info.top = _.cloneDeep(this.top);
      this.config.info.bottom = _.cloneDeep(this.bottom);
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
      this.top = _.cloneDeep(this.config.info.top || []);
      this.bottom = _.cloneDeep(this.config.info.bottom || []);
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
.main-block-warp {
  margin-bottom: 15px;
}

.from-warp {
  .menu-item {
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
      height: 41px;
      padding: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;

      .label {
        padding-right: 10px;
      }

      button {
        margin-left: 4px;
        margin-right: 4px;
      }
    }
  }
}

.dialog-form {
  width: 400px;
}
</style>
