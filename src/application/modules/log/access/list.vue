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
import access from './model/Access';
import Table from '@/application/components/jscms-table/Table';
import jscmsTable from '@/application/components/jscms-table/jscms-table.vue';
import { req } from '@/application/common/request/index.js';

export default {
  components: {
    jscmsTable
  },
  data() {
    return {
      model: access,
      page: {
        name: '访问记录'
      },
      data: {}
    };
  },
  mounted() { 
    this.model = access;
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
          let res = await req.get(`/api/log/list?type=1&pageSize=${this.pagination.size}&pageNumber=${this.pagination.page}`);
          if (res.count && res.data) {
            let _list = res.data;
            let list = [];
            _list.forEach((item, index) => {
              list.push({
                params: item.info.params,
                fullUrl: item.info.fullUrl,
                visitorIp: item.info.visitorIp,
                visitorReferer: item.info.visitorReferer,
                visitorUserAgent: item.info.visitorUserAgent,
                headers: item.info.headers,
                createTime: item.updateTime,
                updateTime: item.updateTime
              });
            });
            this.list = list;
            this.pagination.total = res.count;
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
