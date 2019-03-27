<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">域名配置列表</span>
    </div>
    <div class="h-panel-body">
      <div class="common-filter-bar">
        <Row :space-x="19" :space-y="5">
          <Cell style="float: right">
            <div>
              <Button color="primary" @click="dialog.generalEdit.show({title: '新增域名配置'})">新增域名配置</Button>
            </div>
          </Cell>
        </Row>
      </div>
      <div class="table">
        <jscms-table :data="data" :that="this"></jscms-table>
      </div>
    </div>
    <dialog-general-edit :options="dialog.generalEdit"></dialog-general-edit>
  </div>
</template>
<script>
import domain from './model/Domain';
import Table from './Table';
import dialogGeneralEdit from '@/application/components/dialogs/general-edit/index.js';
import jscmsTable from '@/application/components/jscms-table/jscms-table.vue';
import { req } from '@/application/common/request/index.js';

export default {
  components: {
    dialogGeneralEdit: dialogGeneralEdit.component,
    jscmsTable
  },
  data() {
    return {
      data: new Table(this, {
        model: domain
      }),
      dialog: {
        generalEdit: new dialogGeneralEdit.GeneralEdit(this, {
          form: domain,
          createUrl: '/config/create',
          updateUrl: '/config/update',
          success: 'reload'
        })
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(reload = false) {
      if (reload) {
        this.data.pagination.page = 1;
      }
      this.data.loading = true;
      let res = await req.get('/api/config?alias=domainBase');
      console.log(res);
      this.data.pagination.total = 100;
      this.data.loading = false;
    },

    reload() {
      this.fetchData(true);
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
