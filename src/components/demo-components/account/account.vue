<style lang='less'>
.account-vue {
}
</style>
<template>
  <div class="account-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='7' :lg='7' :xl='7'>
        <AccountInfoShow :account="account"></AccountInfoShow>
      </Cell>
      <Cell :xs='24' :sm='24' :md='17' :lg='17' :xl='17'>
        <div class="h-panel">
          <div class="h-panel-tabs-bar">
            <Tabs v-model="tab" :datas="tabs"></Tabs>
          </div>
          <AccountInfoEdit v-if="tab == 'info'" :account="account"></AccountInfoEdit>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import AccountInfoEdit from './modules/account-info-edit';
import AccountInfoShow from './modules/account-info-show';
import { mapState } from 'vuex';
import storejs from 'store';
import moment from 'moment';

const birthday = function(data) {
  data.birthday = moment(data.birthday).format('YYYY-MM-DD');
  return data;
}

export default {
  components: {
    AccountInfoEdit,
    AccountInfoShow
  },
  data() {
    return {
      account: birthday(storejs.get('userInfo')),
      tabs: {
        info: '基本设置'
      },
      tab: 'info'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {

    }
  }
};
</script>
