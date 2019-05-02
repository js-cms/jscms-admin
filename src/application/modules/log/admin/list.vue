<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
    </div>
    <div class="h-panel-body">
      <div class="common-filter-bar">
      </div>
      <div class="table">
        <jscms-table :data="data" :parent="this"></jscms-table>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'store';
import util from '@/application/common/util/index.js';
import admin from './model/Admin';
import Table from '@/application/components/jscms-table/Table';
import jscmsTable from '@/application/components/jscms-table/jscms-table.vue';
import { req } from '@/application/common/request/index.js';

export default {
  components: {
    jscmsTable
  },
  data() {
    return {
      model: admin,
      page: {
        name: '后台操作日志'
      },
      data: {}
    };
  },
  mounted() { 
    this.model = admin;
    this.init();
  },
  methods: {
    async init() {
      this.page.name = this.model.model.displayName;
      this.data = new Table({
        model: this.model,
        fetchData: async function(reload) {
          if (reload) {
            this.data.pagination.page = 1;
          }
          let res = await req.get(`/api/log/list?type=3&pageSize=${this.pagination.size}&pageNumber=${this.pagination.page}`);
          if ( res.code === 0 ) {
            let _list = res.data.list;
            let list = [];
            _list.forEach((item, index) => {
              list.push({
                opName: item.info.opName,
                method: item.info.method,
                params: item.info.params,
                fullUrl: item.info.fullUrl,
                opIp: item.info.opIp,
                opReferer: item.info.opReferer,
                opUserAgent: item.info.opUserAgent,
                opHeaders: item.info.opHeaders,
                createTime: item.updateTime
              });
            });
            this.list = list;
            this.pagination.total = res.data.total;
          } else {
            this.pagination.total = 0;
          }
        },
        operation: {
          edit: false,
          view: false,
          fastEdit: false
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
