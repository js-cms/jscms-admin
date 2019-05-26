<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
    </div>
    <div class="h-panel-bar">
      <div class="filter-item" v-width="200">
        <Select v-model="params.opName" :datas="[{ title: '其他操作', key: '其他操作' }, { title: '登录', key: '登录' }, { title: '登出', key: '登出' }]" placeholder="筛选操作名称"></Select>
      </div>
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
      data: {},
      params: {
        opName: ''
      }
    };
  },
  watch: {
    'params.opName': function() {
      this.search();
    }
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
            this.list = [];
            this.data.pagination.page = 1;
          }
          let res = await req.get(`
          /api/back/log/list?
          type=3
          &pageSize=${this.pagination.size}
          &pageNumber=${this.pagination.page}
          &opName=${this.$parent.params.opName}`
            .replace(/\ +/g, '')
            .replace(/[\r\n]/g, '')
          );
          if ( res.code === 0 ) {
            let _list = res.data.list;
            let list = [];
            _list.forEach((item, index) => {
              list.push({
                id: item._id,
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
                  this.$children[1].fetchData(true);
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
    },

    search() {
      this.$children[1].pagination.page = 1;
      this.$children[1].fetchData();
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
