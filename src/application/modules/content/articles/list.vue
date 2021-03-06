<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">{{page.name}}列表</span>
      <span style="float: right">
        <Button
          color="primary"
          @click="()=>{
          $router.push({
            name: 'ContentArticlesEdit'
          });
        }"
        >新建{{page.name}}</Button>
      </span>
    </div>
    <div class="h-panel-bar">
      <div class="filter-item" v-width="150">
        <Select v-model="params.categoryId" :datas="categories.options" placeholder="筛选文章分类"></Select>
      </div>
      <div class="filter-item" v-width="150">
        <Select v-model="params.topType" :datas="topTypeOptions.options" placeholder="筛选文章置顶方式"></Select>
      </div>
      <div class="filter-item" v-width="150">
        <Select v-model="params.status" :datas="statusOptions.options" placeholder="筛选文章状态"></Select>
      </div>
      <div class="filter-item">
        <div class="h-input-group" v-width="300">
          <input type="text" placeholder="输入关键词进行模糊搜索" v-model="params.keyword">
          <Button color="primary" @click="search()">模糊搜索</Button>
        </div>
      </div>
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
import article from './model/Article';
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
      categories: [],
      topTypeOptions: new Select(article.fields.topType.extra.options, true),
      statusOptions: new Select(article.fields.status.extra.options, true),
      page: {
        name: ''
      },
      data: {},
      dialog: {
        generalEdit: ''
      },
      params: {
        topType: '',
        categoryId: '',
        keyword: '',
        status: ''
      }
    };
  },
  watch: {
    params: {
      handler() {
        this.search();
      },
      deep: true
    }
  },
  mounted() {
    console.log(this.topTypeOptions);
    this.fetchModel$('文章', 'article', model => {
      this.model = model;
      this.init();
    });
  },
  methods: {
    async init() {
      let categoriesRes = await this.fetchCategory();
      let categories = categoriesRes.map(i => `${i._id}:${i.name}`);
      this.categories = new Select(categories.join(','), true);

      article._iterator(f => {
        if (f.extra.comType === 'select') {
          if (f.extra.options === 'categories') {
            f.extra.options = categories.join(',');
          }
        }
      });
      this.dialog.generalEdit = new dialogGeneralEdit.GeneralEdit(this, {
        form: article,
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
            click: function(data, index) {
              window.open(`${storejs.get('origin')}/${data.numberId}.html`);
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
          this.data.list = [];
          this.data.pagination.size = 10;
          let { keyword, categoryId, topType, status } = this.$parent.params;

          let res = await this.req$.get(
            `
          /api/back/article/list?
          pageSize=${this.data.pagination.size}
          &pageNumber=${this.data.pagination.page}
          &keyword=${keyword}
          &categoryId=${categoryId}
          &topType=${topType}
          &status=${status}`
              .replace(/\ +/g, '')
              .replace(/[\r\n]/g, '')
          );

          this.data.list = res.data.list;
          this.data.pagination.total = res.data.total;
        }
      });
    },

    async updateData(article, callback) {
      let res = await req.post('/api/back/article/fastUpdate', article);
      this.$Message({
        text: res.msg,
        type: res.code === 0 ? 'success' : 'error'
      });
      this.reload();
      typeof callback === 'function' ? callback() : void 0;
    },

    async fetchCategory() {
      let res = await this.req$.get(`/api/back/category/all`); 
      return res.data.list;
    },

    search() {
      this.$children[5].pagination.page = 1;
      this.$children[5].fetchData();
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
