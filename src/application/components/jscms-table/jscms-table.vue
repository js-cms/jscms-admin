<template>
  <div class="jscms-table">
    <Table :datas="list" stripe>
      <TableItem 
        v-for="(f, key, index) in model.fields"
        :key="index"
        :title="f.displayName"
        v-if="f.tableField===true"
      >
        <template slot-scope="{data}">{{data[key] === '' || data[key] === undefined ? '无' : data[key]}}</template>
      </TableItem>
      <TableItem title="操作" :width="100" fixed="right">
        <template slot-scope="{index, data}">
          <button class="h-btn h-btn-s" @click="()=>{
            parent.dialog.generalEdit.update({
              title: '编辑' + parent.page.name,
              index: index,
              formData: data
            });
          }">
            <i class="h-icon-edit"></i>
          </button>
          <Poptip :content="`确定要删除该${model.model.displayName}项？`" @confirm="()=>{
            parent.deleteData(data, index);
          }">
            <button class="h-btn h-btn-s h-btn-red">
              <i class="h-icon-trash"></i>
            </button>
          </Poptip>
        </template>
      </TableItem>
      <div slot="empty">暂无数据</div>
    </Table>
    <Pagination
      v-if="pagination.total>0"
      :size="pagination.size"
      :cur="pagination.page"
      align="right"
      :total="pagination.total"
      @change="() => {
        pagination.page = page.cur;
        pagination.size = page.size;
        parent.fetchData();
      }"
    />
  </div>
</template>
<script>

export default {
  props: ['data', 'parent'],
  data() {
    return {
      list: [],
      model: {},
      pagination: {
        page: 1,
        size: 20,
        total: 0
      }
    };
  },

  watch: {
    data: {
      handler: function() {
        this.parse();
      },
      deep: true
    }
  },

  mounted() {
    this.parse();
  },

  methods: {
    parse() {
      this.model = this.data.model;
      this.list = this.data.list;
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
