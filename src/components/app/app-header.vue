<style lang="less">
.app-header {
  color: rgba(49, 58, 70, 0.8);
  .h-autocomplete {
    line-height: 1.5;
    float: left;
    margin-top: 15px;
    margin-right: 20px;
    width: 120px;
    &-show,
    &-show:hover,
    &-show.focusing {
      outline: none;
      box-shadow: none;
      border-color: transparent;
      border-radius: 0;
    }
    &-show.focusing {
      border-bottom: 1px solid #eee;
    }
  }
  &-info &-icon-item {
    cursor: pointer;
    display: inline-block;
    float: left;
    padding: 0 15px;
    height: @layout-header-height;
    line-height: @layout-header-height;
    margin-right: 10px;
    &:hover {
      background: @hover-background-color;
    }
    i {
      font-size: 18px;
    }
    a {
      color: inherit;
    }
    .h-badge {
      margin: 20px 0;
      display: block;
    }
  }
  .h-dropdownmenu {
    float: left;
  }
  &-dropdown {
    float: right;
    margin-left: 10px;
    padding: 0 20px 0 15px;
    .h-icon-down {
      right: 20px;
    }
    cursor: pointer;
    &:hover,
    &.h-pop-trigger {
      background: @hover-background-color;
    }
    &-dropdown {
      padding: 5px 0;
      .h-dropdownmenu-item {
        padding: 8px 20px;
      }
    }
  }
  &-menus {
    display: inline-block;
    vertical-align: top;
    > div {
      display: inline-block;
      font-size: 15px;
      padding: 0 25px;
      color: @dark-color;
      &:hover {
        color: @primary-color;
      }
      + div {
        margin-left: 5px;
      }
      &.h-tab-selected {
        color: @white-color;
        background-color: @primary-color;
      }
    }
  }
}
</style>

<template>
  <div class="app-header">
    <div style="width:100px;float:left;">
      <Button
        :icon="siderCollapsed ? 'icon-align-right':'icon-align-left'"
        size="l"
        noBorder
        class="font20"
        @click="siderCollapsed=!siderCollapsed"
      ></Button>
    </div>
    <div class="float-right app-header-info">
      <!-- <AutoComplete :showDropdownWhenNoResult="false" v-model="searchText" config="globalSearch" placeholder="全局搜索.."></AutoComplete> -->
      <div
        class="app-header-icon-item"
        v-tooltip
        content="系统布局配置"
        theme="white"
        @click="showSettingModal"
      >
        <i class="icon-content-left"></i>
      </div>
      <!-- <appHeaderMessage></appHeaderMessage> -->
      <DropdownMenu
        class="app-header-dropdown"
        trigger="hover"
        offset="0 5"
        :width="150"
        placement="bottom-end"
        :datas="infoMenu"
        @onclick="trigger"
      >
        <Avatar :src="userInfo.avatar" :width="30">
          <span>{{userInfo.nickname}}</span>
        </Avatar>
      </DropdownMenu>
    </div>
    <dialog-change-pass :show="dialogChangePass.show" @close="()=>{dialogChangePass.show=false}"></dialog-change-pass>
  </div>
</template>
<script>
import dialogChangePass from '@/application/components/dialogs/change-pass';
import { mapState } from 'vuex';
import appHeaderMessage from './modules/app-header-message';
import storejs from 'store';
let userInfo = storejs.get('userInfo');
let origin = storejs.get('origin');

export default {
  components: {
    appHeaderMessage,
    dialogChangePass
  },
  data() {
    return {
      dialogChangePass: {
        show: false
      },
      searchText: '',
      infoMenu: [
        { key: 'info', title: '个人信息', icon: 'h-icon-user' },
        { key: 'changepass', title: '修改密码', icon: 'icon-unlock' },
        { key: 'logout', title: '退出登录', icon: 'h-icon-outbox' }
      ],
      userInfo: userInfo || {}
    };
  },
  computed: {
    ...mapState(['User']),
    siderCollapsed: {
      get() {
        return this.$store.state.siderCollapsed;
      },
      set(value) {
        this.$store.commit('updateSiderCollapse', value);
      }
    }
  },
  methods: {
    goGithub() {
      window.open('https://github.com/heyui/heyui-admin');
    },
    goBook() {
      window.open('https://heyui.github.io/heyui-admin-docs');
    },
    trigger(data) {
      if (data == 'logout') {
        this.req$.get(`/api/logout?token=${storejs.get('token')}&userId=${storejs.get('uuid')}`).then(res => {
          if (res.code === 0) {
            this.$Message({
              type: 'success',
              text: res.msg,
              timeout: 3000
            });
            this.logout$();
          }
        });
      } else if (data === 'changepass') {
        this.dialogChangePass.show = true;
      } else if (data === 'info') {
        this.$router.push({
          name: 'AccountUsersEdit',
          query: {
            id: storejs.get('uuid')
          }
        });
      }
    },
    showSettingModal() {
      this.$emit('openSetting');
    }
  }
};
</script>