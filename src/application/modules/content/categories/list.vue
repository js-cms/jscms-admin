<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
      <span style="float: right">
        <Button
          color="primary"
          @click="()=>{
          $router.push({
            name: 'ContentCategoriesEdit'
          });
        }"
        >新建{{page.name}}</Button>
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
import category from './model/Category';
import Table from '@/application/components/jscms-table/Table';
import dialogGeneralEdit from '@/application/components/dialogs/general-edit/index.js';
import jscmsTable from '@/application/components/jscms-table/jscms-table.vue';
import { req } from '@/application/common/request/index.js';
import Select from '@/application/components/jscms-form/Select';

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
      },
      params: {}
    };
  },
  mounted() {
    this.fetchModel$('分类', 'category', model => {
      this.model = model;
      this.init();
    });
  },
  methods: {
    async init() {
      this.dialog.generalEdit = new dialogGeneralEdit.GeneralEdit(this, {
        form: category,
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
                name: 'ContentCategoriesEdit',
                query: {
                  id: data._id
                }
              });
            }
          },
          view: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-link',
            name: '前台查看分类',
            click: function(data, index) {
              window.open(`${storejs.get('origin')}/${data.alias}.html`);
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
        },
        async fetchData() {
          this.data.pagination.size = 10;
          let { keyword, categoryId } = this.$parent.params;
          let res = await this.req$.get(
            `
          /api/back/category/list?
          pageSize=${this.data.pagination.size}
          &pageNumber=${this.data.pagination.page}`
              .replace(/\ +/g, '')
              .replace(/[\r\n]/g, '')
          );
          this.data.list = res.data.list;
          this.data.pagination.total = res.data.total;
        }
      });
    },

    async updateData(category, callback) {
      let res = await req.post('/api/back/category/fastUpdate', category);
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
