<template>
  <div class="jscms-table" v-if="model">
    <Table :datas="list" stripe>
      <TableItem
        v-for="(f, key, index) in model.fields"
        :key="index"
        :title="f.displayName"
        v-if="f.tableField===true"
      >
        <template slot-scope="{data}">
          <com-objectid
            v-if="f.constructor === modelman.type.ObjectId"
            :data="data"
            :field="f"
            :keyname="key"
            :index="index"
          ></com-objectid>
          <com-text
            v-if="f.constructor === modelman.type.String || f.constructor === modelman.type.Number"
            :data="data"
            :field="f"
            :keyname="key"
            :index="index"
          ></com-text>
          <com-date
            v-if="f.constructor === modelman.type.Timestamp"
            :data="data"
            :field="f"
            :keyname="key"
            :index="index"
          ></com-date>
        </template>
      </TableItem>
      <TableItem title="操作" :width="operationWidth" fixed="right" v-if="operation">
        <template slot-scope="{index, data}">
          <span v-for="(obj, opkey, index) in operation" :key="index">
            <button
              v-if="opkey!=='delete'"
              :class="obj.btnClass"
              v-tooltip
              placement="bottom"
              :content="obj.name"
              @click="()=>{
                obj.click.call(parent, data, index);
              }"
            >
              <i :class="obj.iClass"></i>
            </button>
            <Poptip
              v-if="opkey==='delete'"
              :content="`确定要删除该${model.model.displayName}项？`"
              @confirm="()=>{
              obj.click.call(parent, data, index);
            }"
            >
              <button
                :class="obj.btnClass"
                v-tooltip
                placement="bottom"
                :content="obj.name"
              >
                <i :class="obj.iClass"></i>
              </button>
            </Poptip>
          </span>
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
import modelman from 'modelman';
import ComText from './components/text';
import ComObjectid from './components/objectid';
import ComDate from './components/date';

export default {
  props: ['data', 'parent'],
  components: {
    ComText,
    ComObjectid,
    ComDate
  },
  data() {
    return {
      modelman: modelman,
      list: [],
      model: "",
      operationWidth: 100,
      operation: {},
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
      this.operation = this.data.operation;
      this.operationWidth = this.getOperationWidth();
    },

    getOperationWidth() {
      let index = 0;
      let width = 50;
      for (const key in this.operation) {
        if (this.operation.hasOwnProperty(key)) {
          index++;
        }
      }
      let res = (width * index) * 0.9;
      return res < 100 ? 100 : res;
    } 
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
</style>
