<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
    </div>
    <div class="h-panel-body">
      <div class="table">
        <jscms-table :data="data" :parent="this"></jscms-table>
      </div>
    </div>
  </div>
</template>
<script>
import storejs from 'store';
import util from '@/application/common/util/index.js';
import search from './model/Search';
import Table from '@/application/components/jscms-table/Table';
import jscmsTable from '@/application/components/jscms-table/jscms-table.vue';
import { req } from '@/application/common/request/index.js';

export default {
  components: {
    jscmsTable
  },
  data() {
    return {
      model: search,
      page: {
        name: '搜索记录'
      },
      data: {}
    };
  },
  mounted() { 
    this.model = search;
    this.init();
  },
  methods: {
    async init() {
      this.page.name = this.model.model.displayName;
      this.data = new Table({
        model: this.model,
        fetchData: async function(reload) {
          if (reload) {
            this.list = [];
            this.data.pagination.page = 1;
          }
          let res = await req.get(`/api/back/log/list?type=2&pageSize=${this.pagination.size}&pageNumber=${this.pagination.page}`);
          if ( res.code === 0 ) {
            let _list = res.data.list;
            let list = [];
            _list.forEach((item, index) => {
              list.push({
                id: item._id,
                params: item.info.params,
                fullUrl: item.info.fullUrl,
                visitorIp: item.info.visitorIp,
                visitorReferer: item.info.visitorReferer,
                visitorUserAgent: item.info.visitorUserAgent,
                headers: item.info.headers,
                createTime: item.updateTime
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
          fastEdit: false,
          delete: {
            click: function(data, index) {
              req.post('/api/back/log/delete', {
                id: data.id
              })
              .then((res) => {
                this.$Message({
                  text: res.msg,
                  type: res.code === 0 ? 'success' : 'error'
                });
                if (res.code === 0) {
                  this.$children[0].fetchData(true);
                }
              });
            }
          }
        },
        pagination: {
          page: 1,
          size: 20,
          total: 0
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
