import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    User: {},
    msgCount: {
      messages: 2
    },
    siderCollapsed: false,
    todayPv: 0
  },
  mutations: {
    updateAccount(state, data) {
      state.User = data;
    },
    updateSiderCollapse(state, isShow) {
      console.log('updateSiderCollapse');
      setTimeout(() => {
        G.trigger('page_resize');
      }, 600)
      state.siderCollapsed = isShow;
    },
    updateMsgCount(state, data) {
      state.msgCount = data;
    },
    updateTodayPv(state, data) {
      state.todayPv = data;
    }
  },
  actions: {
    updateAccount(context, data) {
      context.commit('updateAccount', data);
    },
    updateSiderCollapse(context, data) {
      context.commit('updateSiderCollapse', data);
    },
    updateMsgCount(context, data) {
      context.commit('updateMsgCount', data);
    },
    updateTodayPv(context, data) {
      context.commit('updateTodayPv', data);
    }
  },
  getters: {
    account: state => {
      return state.User;
    },
    siderCollapsed: state => {
      return state.siderCollapsed;
    },
    msgCount: state => {
      return state.msgCount;
    },
    updateTodayPv: state => {
      return state.todayPv;
    }
  }
});
