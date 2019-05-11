<template>
  <div class="dialog">
    <Modal v-model="isShow" :closeOnMask="false">
      <div slot="header">{{title}}</div>
      <div v-width="width">
        <div v-width="'100%'">
          <div class="h-panel-bar" style="padding-left: 0px;">
            <div class="h-input-group" v-width="300">
              <input type="text" v-model="params.keyword" placeholder="模糊搜索文章标题" />
              <Button color="primary" @click="fetchData(true)">搜索</Button>
            </div>
          </div>
          <Table :datas="datas" :height="400">
            <TableItem title="文章标题" prop="name"></TableItem>
            <TableItem title="更新时间" prop="updateTime" :width="150"></TableItem>
            <TableItem title="创建时间" prop="createTime" align="center" :width="150"></TableItem>
            <TableItem title="操作" :width="100" fixed="right">
              <template slot-scope="{data}">
                <button v-tooltip placement="bottom" :content="'导入这条草稿'" class="h-btn h-btn-s" @click="importDraft(data)">
                  <i class="h-icon-inbox"></i>
                </button>
                <Poptip
                  :content="`确定要删除该草稿吗？`"
                  @confirm="() => {
                    removeDraft(data)
                  }">
                    <button v-tooltip placement="bottom" :content="'删除这条草稿'" class="h-btn h-btn-s h-btn-red">
                      <i class="h-icon-trash"></i>
                    </button>
                </Poptip>
              </template>
            </TableItem>
            <div slot="empty">暂时没有草稿数据</div>
          </Table>
          <div class="pagination">
            <Pagination
              v-if="pagination.total>0"
              :size="pagination.size"
              :cur="pagination.page"
              align="center"
              :total="pagination.total"
              @change="(page) => {
                pagination.page = page.cur;
                pagination.size = page.size;
                fetchData();
              }"
            />
          </div>
        </div>
      </div>
      <div slot="footer">
        <button
          class="h-btn"
          @click="() => {
          options.onCancel.call(options.me);
        }"
        >关闭</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import jscmsForm from '@/application/components/jscms-form/jscms-form.vue';
import util from '@/application/common/util/index.js';

import moment from 'moment';

export default {
  props: ['options'],
  components: {
    jscmsForm
  },
  data() {
    return {
      isShow: false,
      title: '文章草稿箱',
      width: 700,
      params: {
        keyword: '',
        pageNumber: 1,
        pageSize: 10
      },
      pagination: {
        page: 1,
        size: 10,
        total: 0
      },
      datas: []
    };
  },

  watch: {
    'options.isShow': function(val) {
      if (val === true) {
        this.isShow = true;
        this.onShow();
      } else if (val === false) {
        this.isShow = false;
      }
    },
    'params.keyword': function(val) {
      this.fetchData(true);
    }
  },

  methods: {
    onShow() {
      this.fetchData();
    },

    handlerEvent(handlerName) {
      switch (handlerName) {
        case 'onCancel':
          this.options.onCancel.call(this.options.me);
          break;
        case 'onConfirm':
          this.options.onConfirm.call(this.options.me);
          break;
        default:
          this.options.onClose.call(this.options.me);
          break;
      }
    },

    async fetchData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
        this.pagination.size = 10;
        this.pagination.total = 0;
        this.datas = [];
      }
      this.params.pageNumber = this.pagination.page;
      let res = await this.req$.get('/api/back/article/draft/list', this.params);
      let datas = res.data.list;
      datas.forEach(item => {
        item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
        item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.datas = datas;
      this.pagination.total = res.data.total;
    },

    async removeDraft(data) {
      let res = await this.req$.post('/api/back/article/draft/delete', {
        id: data._id
      });
      this.$Message({
        type: res.code === 0 ? 'success' : 'error',
        text: res.msg
      });
      this.fetchData(true);
    },

    importDraft(data) {
      this.$emit('importDraft', data);
    }
  }
};
</script>

<style scoped>
.pagination {
  padding: 20px;
}
</style>
