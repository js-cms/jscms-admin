<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
      <span style="float: right;">
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
import notice from './model/Notice';
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
        name: notice.model.displayName
      },
      config: {
        name: '',
        alias: 'notices',
        info: {
          showId: '',
          data: []
        },
        _id: ''
      },
      data: new Table({
        auto: false,
        model: notice,
        operation: {
          delete: {
            click: function(item, index) {
              this.data.list.splice(index, 1);
              this.saveData(this.data.list);
            }
          }
        }
      }),
      dialog: {
        generalEdit: new dialogGeneralEdit.GeneralEdit(this, {
          form: notice,
          width: '450',
          create: function(formData, form) {
            let json = form.to.json({ formField: true });
            json.id = String(this.data.list.length || 0);
            json.createTime = new Date().getTime();
            json.updateTime = new Date().getTime();
            this.data.list.push(json);
            this.saveData(this.data.list);
          },
          update: function(formData, form, index) {
            let json = form.to.json();
            json.updateTime = new Date().getTime();
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
      this.data.list = [];
      let res = await req.get(`/api/back/config?alias=${this.config.alias}`);
      let config = res.data;
      util.setData(this.config, config);
      this.config.id = this.config._id;
      let data = [];
      let showId = '';
      if (res.data.info.data) data = res.data.info.data;
      if (res.data.info.showId) showId = res.data.info.showId;
      this.config.info.data = data || [];
      this.config.info.showId = showId;
      this.unshiftShow(data);
      this.data.list = data;
      this.data.pagination.total = 1000;
      this.data.pagination.size = 1000;
    },

    async deleteData(data, index) {
      this.data.list.splice(index, 1);
      this.saveData(this.data.list);
    },

    async saveData(info) {
      let params = _.cloneDeep(this.config);
      let { item, index } = this.getShow(info);
      params.info.showId = item.id || '';
      this.clearShow(info, index);
      params.info.data = info;
      let res = await req.post('/api/back/config', params);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      if (res.code === 0) this.fetchConfig();
    },

    getShow(data) {
      let item = {};
      let index = '';
      data.forEach((i, idx) => {
        if (i.isShow) {
          item = i;
          index = idx;
        }
      });
      return {
        item,
        index
      }
    },

    unshiftShow(data) {
      let { item, index } = this.getShow(data);
      if (index) {
        data.splice(index, 1);
        data.unshift(item);
      }
    },

    clearShow(data, showIndex) {
      data.forEach((i, idx) => {
        if (String(idx) != showIndex) {
          i.isShow = false;
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
