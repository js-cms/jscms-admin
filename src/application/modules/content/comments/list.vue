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
              <Button
                color="primary"
                @click="dialog.generalEdit.create({title: '新增' + page.name})"
              >新增{{page.name}}</Button>
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
import storejs from 'store';
import _ from 'lodash';
import util from '@/application/common/util/index.js';
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
      model: {},
      page: {
        name: ''
      },
      data: {},
      dialog: {
        generalEdit: {}
      }
    };
  },
  mounted() {
    this.fetchModel$('评论', 'comment', model => {
      this.model = model;
      this.init();
    });
  },
  methods: {
    init() {
      this.page.name = this.model.model.displayName;
      this.data = new Table({
        model: this.model,
        operation: {
          edit: false,
          view: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-link',
            name: '前台查看',
            click: function(data, index) {
              let baseURL = storejs.get('origin');
              window.open(baseURL + '/' + data.articleId.numberId + '.html#comment');
            }
          },
          fastEdit: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-edit',
            name: '快速编辑',
            click: function(data, index) {
              this.dialog.generalEdit.update({
                title: '快速编辑' + this.page.name,
                width: '600',
                index: index,
                formData: data
              });
            }
          }
        }
      });
      this.dialog = {
        generalEdit: new dialogGeneralEdit.GeneralEdit(this, {
          form: this.model,
          width: '500',
          create: async function(formData, form) {
            let json = form.to.json({ formField: true });
            await this.saveData(json, 1);
            this.fetchData(true);
          },
          update: async function(formData, form, index) {
            let json = form.to.json({ formField: true });
            json.id = formData._id;
            await this.saveData(json, 2);
            this.fetchData(true);
          }
        })
      };
    },

    async saveData(params, type) {
      let res = await req.post(`/api/comment/${type === 1 ? 'create' : 'update'}`, params);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
    },

    async fetchData(reload) {
      if (reload) {
        this.data.pagination.page = 1;
      }
      let res = await req.get(`/api/comment/list?pageSize=${10}&pageNumber=${0}`);
      let list = res.data.list;
      let total = res.data.total;
      this.data.list = list;
      this.data.pagination.total = total;
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
