<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
      <span style="float: right;">
        <Button
          color="primary"
          @click="()=>{
          $router.push({
            name: 'PageCustomEdit'
          });
        }"
        >新增{{page.name}}</Button>
      </span>
    </div>
    <div class="h-panel-body">
      <div class="table">
        <jscms-table :data="data" :parent="this"></jscms-table>
      </div>
    </div>
    <div v-if="dialog.generalEdit">
      <dialog-general-edit :options="dialog.generalEdit"></dialog-general-edit>
    </div>
  </div>
</template>
<script>
import storejs from 'store';
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
        generalEdit: ''
      }
    };
  },
  mounted() {
    this.fetchModel$('自定义页面', 'page', model => {
      this.model = model;
      this.init();
    });
  },
  methods: {
    async init() {
      this.dialog.generalEdit = new dialogGeneralEdit.GeneralEdit(this, {
        form: this.model,
        width: '500',
        update: (formData, form, index) => {
          let json = form.to.json();
          let id = formData._id;
          json.id = id;
          this.updateData(json);
        }
      });

      this.page.name = this.model.model.displayName;
      this.data = new Table({
        model: this.model,
        operation: {
          edit: {
            click: function(data, index) {
              this.$router.push({
                name: 'PageCustomEdit',
                query: {
                  id: data._id
                }
              });
            }
          },
          view: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-link',
            name: '前台查看页面',
            click: function(data, index) {
              let baseURL = storejs.get('origin');
              window.open(`${baseURL}/page/${data.alias}.html`);
            }
          },
          fastEdit: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-edit',
            name: '快速编辑',
            click: function(data, index) {
              this.dialog.generalEdit.update({
                title: '快速编辑' + this.page.name,
                index: index,
                formData: data
              });
            }
          }
        }
      });
    },

    async updateData(page, callback) {
      let res = await req.post('/api/back/page/update', page);     
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      this.reload();
      typeof callback === 'function' ? callback() : void 0; 
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
