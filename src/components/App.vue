<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>

import store from 'js/vuex/store';
import storejs from 'store';

export default {
  store,
  mounted() {
    //let origin = window.location.origin;
    let origin = 'http://127.0.0.1:7011';
    storejs.set('origin', origin);
  }
};
</script>
