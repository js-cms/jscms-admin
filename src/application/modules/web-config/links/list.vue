<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
      <span style="float: right">
        <Button
          color="primary"
          @click="dialog.generalEdit.create({title: '新增' + page.name})"
        >新增{{page.name}}</Button>
      </span>
    </div>
    <div class="h-panel-body">
      <div class="table">
        <jscms-table :data="data" :parent="this"></jscms-table>
      </div>
    </div>
    <dialog-general-edit :options="dialog.generalEdit"></dialog-general-edit>
  </div>
</template>
<script>
import _ from 'lodash';

import util from '@/application/common/util/index.js';
import link from './model/Link';
import Table from '@/application/components/jscms-table/Table';
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
        name: link.model.displayName
      },
      config: {
        name: "",
        alias: "links",
        info: {},
        _id: ""
      },
      data: new Table({
        auto: false,
        model: link
      }),
      dialog: {
        generalEdit: new dialogGeneralEdit.GeneralEdit(this, {
          form: link,
          width: '450',
          create: function(formData, form) {
            let json = form.to.json();
            this.data.list.push(json);
            this.saveData(this.data.list);
          },
          update: function(formData, form, index) {
            let json = form.to.json();
            this.data.list[index] = json;
            this.saveData(this.data.list);
          }
        })
      }
    };
  },
  mounted() {
    this.fetchConfig();
  },
  methods: {
    async fetchConfig() {
      let res = await req.get(`/api/config?alias=${this.config.alias}`);
      let config = res.data;
      util.setData(this.config, config);
      this.config.id = this.config._id;
      this.data.list = res.data.info;
      this.data.pagination.total = 1000;
      this.data.pagination.size = 1000;
    },

    async deleteData(data, index) {
      this.data.list.splice(index, 1);
      this.saveData(this.data.list);
    },

    async saveData(info) {
      let params = _.cloneDeep(this.config);
      params.info = info;
      let res = await req.post('/api/config', params);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      if (res.code === 0) this.fetchConfig();
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
