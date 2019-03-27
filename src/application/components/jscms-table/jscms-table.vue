<template>
  <div class="jscms-table">
    <!-- <div class="table">
      <Table :loading="data.loading" :datas="data.list">
        <TableItem title="序号">
          <template slot-scope="{index}">{{index+1}}</template>
        </TableItem>
        <template slot-scope="props">
          <td>{{props.index}}</td>
          <td>{{props.data.id}}</td>
          <td>{{props.data.name}}</td>
          <td>{{props.data.age}}</td>
          <td>{{props.data.address}}</td>
        </template>
      </Table>
    </div>
    <div class="pagination">
      <Pagination
        v-if="data.pagination.total>0"
        :size="data.pagination.size"
        :cur="data.pagination.page"
        align="right"
        :total="data.pagination.total"
        @change="(page) => {
            this.data.pagination.page = page.cur;
            this.data.pagination.size = page.size;
            this.fetchData();
          }"
      />
    </div> -->
  </div>
</template>

<script>
// import TableComText from "@/components/table-components/com-text";
// import TableComStrings from "@/components/table-components/com-strings";
// import TableComTags  from "@/components/table-components/com-tags";
// import TableComStringsObject from "@/components/table-components/com-strings-object";
// import TableComDate from "@/components/table-components/com-date";
// import TableComUser from "@/components/table-components/com-user";
// import TableComPrice from "@/components/table-components/com-price";
// import TableComPoster from "@/components/table-components/com-poster";
// import TableComSex from "@/components/table-components/com-sex";
// import TableComPercentage from "@/components/table-components/com-percentage";
// import TableComUserGroup from "@/components/table-components/com-user-group";
// import TableComOperation from "@/components/table-components/com-operation";

export default {
  props: ['data', 'parent'],
  data(){return{

  }},

  watch: {
    'data': {
      handler: function() {

      },
      deep: true
    }
  },

  methods: {
    parse() {
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
