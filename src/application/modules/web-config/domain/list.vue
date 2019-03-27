<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
    </div>
    <div class="h-panel-body">
      <div class="common-filter-bar">
        <Row :space-x="19" :space-y="5">
          <Cell style="float: right">
            <div>
              <Button color="primary" @click="dialog.generalEdit.create({title: '新增' + page.name})">新增{{page.name}}</Button>
            </div>
          </Cell>
        </Row>
      </div>
      <div class="table">
        <jscms-table :data="data" :parent="this"></jscms-table>
      </div>
    </div>
    <dialog-general-edit :options="dialog.generalEdit"></dialog-general-edit>
  </div>
</template>
<script>
import util from '@/application/common/util/index.js';
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
      page: {
        name: domain.model.displayName
      },
      config: {
        name: "",
        alias: "",
        info: {},
        _id: ""
      },
      data: new Table({
        model: domain
      }),
      dialog: {
        generalEdit: new dialogGeneralEdit.GeneralEdit(this, {
          form: domain,
          width: '450',
          create: function(form) {
            let json = form.to.json();
            this.data.list.push(json);
            this.saveData(this.data.list, '新建');
          },
          update: function(form, index) {
            let json = form.to.json();
            this.data.list[index] = json;
            this.saveData(this.data.list, '更新');
          }
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
      let res = await req.get('/api/config?alias=domainBase');
      let config = res.data;
      util.setData(this.config, config);
      this.data.list = res.data.info;
      this.data.pagination.total = 100;
    },

    async deleteData(data, index) {
      this.data.list.splice(index, 1);
      this.saveData(this.data.list, '删除');
    },

    async saveData(info, type, callback) {
      this.config.info = info;
      let res = await req.post('/api/config', this.config);
      if ( res.code === 0 ) {
        this.$Message({
          text: type + '成功',
          type: 'success'
        });
        this.reload();
        typeof callback === 'function' ? callback() : void(0);
      } else {
        this.$Message({
          text: type + '失败',
          type: 'error'
        });
      }
    },

    reload() {
      this.fetchData(true);
    },
    
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
