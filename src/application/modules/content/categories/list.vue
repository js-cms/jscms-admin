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
        generalEdit: {}
      }
    };
  },
  mounted() {
    this.fetchModel$('分类', 'category', model => {
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
              let catAlias = data.alias;
              if (catAlias) {
                window.open(`${storejs.get('origin')}/${catAlias}.html`);
              } else {
                this.$Message({
                  type: 'error',
                  text: '没有这个分类。'
                });
              }
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
          width: '450'
          // create: function(form) {
          //   let json = form.to.json();
          //   this.saveData(json, 1);
          // },
          // update: function(form, index) {
          //   let json = form.to.json();
          //   let id = this.data.list[index]._id;
          //   let category = Object.assign(json, {
          //     _id: id
          //   });
          //   this.saveData(category, 2);
          // }
        })
      };
    },

    async fetchData(reload = false) {
      if (reload) {
        this.data.pagination.page = 1;
      }
      let res = await req.get(`/api/back/category/list?pageSize=${10}&pageNumber=${0}`);
      let list = res.data;
      this.data.list = list;
      this.data.pagination.total = 100;
    },

    // async deleteData(data, index) {
    //   let res = await req.post('/api/back/category/delete', {
    //     id: data._id
    //   });
    //   if ( res.code === 0 ) {
    //     this.$Message({
    //       text: res.msg,
    //       type: 'success'
    //     });
    //     this.reload();
    //     typeof callback === 'function' ? callback() : void(0);
    //   } else {
    //     this.$Message({
    //       text: res.msg,
    //       type: 'error'
    //     });
    //   }
    // },

    // async saveData(category, type, callback) {
    //   let url = `/api/back/category/${type === 1 ? 'create' : 'update'}`;
    //   let res = await req.post(url, category);
    //   this.$Message({
    //     text: res.msg,
    //     type: res.code === 0 ? 'success' : 'error'
    //   });
    //   this.reload();
    //   typeof callback === 'function' ? callback() : void(0);
    // },

    reload() {
      this.fetchData(true);
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
