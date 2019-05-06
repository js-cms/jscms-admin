<style lang="less">
.app-menu {
  .h-menu {
    font-size: 14px;
    .h-menu-li-selected {
      .h-menu-show:after {
        width: 4px;
      }
    }
    > li > .h-menu-show {
      font-size: 15px;
      .h-menu-show-icon {
        font-size: 20px;
      }
      .h-menu-show-desc {
        transition: opacity 0.1s cubic-bezier(0.645, 0.045, 0.355, 1), width 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
  }
  .h-menu.h-menu-size-collapse > .h-menu-li > .h-menu-show {
    padding-left: 24px;
    .h-menu-show-icon {
      font-size: 20px;
    }
  }
  .h-menu.h-menu-white {
    color: rgb(49, 58, 70);
  }
}
</style>
<template>
  <div class="app-menu">
    <appLogo></appLogo>
    <Menu
      :datas="menus"
      :inlineCollapsed="siderCollapsed"
      @click="trigger"
      ref="menu"
      :className="`h-menu-${theme}`"
    ></Menu>
  </div>
</template>
<script>
import moment from 'moment';
import menuConfig from '../../js/config/menu-config';
import { mapState } from 'vuex';
import appLogo from './app-logo';

export default {
  props: {
    theme: String
  },
  data() {
    return {
      menus: menuConfig
    };
  },
  watch: {
    $route() {
      this.menuSelect();
      this.loadPv();
    }
  },
  mounted() {
    this.menuSelect();
    this.loadPv();
  },
  watch: {
    todayPv(val) {
      this.menus[0].count = val;
    }
  },
  computed: {
    ...mapState(['siderCollapsed']),
    todayPv: {
      get() {
        return this.$store.state.todayPv;
      },
      set(value) {
        this.$store.commit('updateTodayPv', value);
      }
    }
  },
  methods: {
    async loadPv() {
      let res = await this.req$.get('/api/back/analysis/pv');
      let today = moment(new Date().getTime()).format('YYYY-MM-DD');
      let count = 0;
      res.data.forEach(item => {
        let date = moment(item.createTime).format('YYYY-MM-DD');
        if (date === today) count++;
      });
      this.todayPv = count;
    },
    menuSelect() {
      if (this.$route.name) {
        this.$refs.menu.select(this.$route.name);
      }
    },
    trigger(data) {
      if (data.children.length > 0) return;
      this.$router.push({ name: data.key });
    }
  },
  components: {
    appLogo
  }
};
</script>
