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
                @click="()=>{
                $router.push({
                  name: 'AccountUsersEdit'
                });
              }"
              >新增{{page.name}}</Button>
            </div>
          </Cell>
        </Row>
      </div>
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
import page from './model/Page';
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
    this.fetchModel$('用户', 'user', model => {
      this.model = model;
      this.init();
    });
  },
  methods: {
    async init() {
      this.dialog.generalEdit = new dialogGeneralEdit.GeneralEdit(this, {
        form: page,
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
                name: 'AccountUsersEdit',
                query: {
                  id: data._id
                }
              });
            }
          },
          view: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-link',
            name: '前台查看用户',
            click: function(data, index) {
              let baseURL = storejs.get('origin');
              window.open(`${baseURL}/author/${data.nickname}.html`);
            }
          },
          delete: {
            click: function(data, index) {
              req.post('/api/user/delete', {
                id: data._id
              }).then((res)=>{
                console.log(res);
              });
            }
          },
          fastEdit: false
        }
      });
    },

    async updateData(page, callback) {
      let res = await req.post('/api/user/update', page);     
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : '失败'
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
