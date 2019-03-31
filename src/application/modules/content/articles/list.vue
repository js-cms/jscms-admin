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
              <Button color="primary" @click="()=>{
                $router.push({
                  name: 'ContentArticlesEdit'
                });
              }">新增{{page.name}}</Button>
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
import util from '@/application/common/util/index.js';
import domain from './model/Article';
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
            console.log('index', index);
            console.log(this.data.list);
            this.saveData(this.data.list, '更新');
          }
        })
      }
    };
  },
  mounted() {
    this.fetchModel$('文章', 'article', (model) => {
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
          edit: {
            click: function (data, index) {
              this.$router.push({
                name: 'ContentArticlesEdit',
                query: {
                  id: data._id
                }
              });
            }
          },
          view: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-link',
            name: '前台查看文章',
            click: function (data, index) {
              window.open(`${storejs.get('origin')}/${data.numberId}.html`)
            }
          },
          fastEdit: {
            btnClass: 'h-btn h-btn-s h-btn-text-primary',
            iClass: 'h-icon-edit',
            name: '快速编辑',
            click: function (data, index) {
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
    }

  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
