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
          <com-object
            v-if="f.constructor === modelman.type.Object"
            :data="data"
            :field="f"
            :keyname="key"
            :index="index"
          ></com-object>
          <com-objectid
            v-if="f.constructor === modelman.type.ObjectId"
            :data="data"
            :field="f"
            :keyname="key"
            :index="index"
          ></com-objectid>
          <com-text
            v-if="f.constructor === modelman.type.String || f.constructor === modelman.type.Number || f.constructor === modelman.type.Email || f.constructor === modelman.type.Boolean"
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
          <span v-for="(obj, opkey, idx) in operation" :key="idx">
            <button
              v-if="opkey!=='delete'&&obj!==false"
              :class="obj.btnClass"
              v-tooltip
              placement="bottom"
              :content="obj.name"
              @click="() => {
                obj.click.call(parent, data, index);
              }"
            >
              <i :class="obj.iClass"></i>
            </button>
            <Poptip
              v-if="opkey==='delete'&&obj!==false"
              :content="`确定要删除该${model.model.displayName}项？`"
              @confirm="() => {
                if ( typeof obj.click === 'function') {
                  obj.click.call(parent, data, idx);
                } else {
                  crud(model.model.name, 'delete', {
                    query: {
                      _id: data._id
                    }
                  }).then((res) => {
                    if (res.result.ok === 1) {
                      parent.$Message({
                        type: 'success',
                        text: model.model.displayName + '删除成功'
                      });
                      parent.reload();
                    } else {
                      parent.$Message({
                        type: 'error',
                        text: model.model.displayName + '删除失败'
                      });
                    }
                    parent.reload();
                  });
                }
              //obj.click.call(parent, data, idx);
              }"
            >
              <button :class="obj.btnClass" v-tooltip placement="bottom" :content="obj.name">
                <i :class="obj.iClass"></i>
              </button>
            </Poptip>
          </span>
        </template>
      </TableItem>
      <div slot="empty">暂无数据</div>
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
</template>
<script>
import modelman from 'modelman';
import ComText from './components/text';
import ComObject from './components/object';
import ComObjectid from './components/objectid';
import ComDate from './components/date';
import crud from '@/application/common/crud/index.js';

const fetchData = async function(reload = false) {
  if (reload) {
    this.list = [];
    this.pagination.page = 1;
  }
  let res = await this.req$.get(`/api/model?name=${this.model.model.name.toLowerCase()}`);
  if (res.code === 0) {
    res = await crud(this.model.model.name, 'list', {
      query: {},
      pageSize: this.pagination.size,
      pageNum: this.pagination.page
    });
    if (res.count && res.result) {
      this.pagination.total = res.count;
      this.list = res.result;
    } else {
      this.pagination.total = 0;
    }
  }
};

export default {
  props: ['data', 'parent'],
  components: {
    ComText,
    ComObject,
    ComObjectid,
    ComDate
  },
  data() {
    return {
      isInit: false,
      crud: crud,
      modelman: modelman,
      list: [],
      model: '',
      operationWidth: 100,
      operation: {},
      pagination: {
        page: 1,
        size: 10,
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
      if (this.data.auto === true && this.isInit) return;
      this.model = this.data.model;
      this.list = this.data.list;
      this.operation = this.data.operation;
      this.operationWidth = this.getOperationWidth();
      this.fetchData = typeof this.data.fetchData === 'function' ? this.data.fetchData.bind(this) : fetchData.bind(this);
      if (this.data.auto === true && this.model) {
        this.isInit = true;
        this.fetchData();
        this.parent.reload = () => {
          return this.fetchData(true);
        };
      }
    },

    getOperationWidth() {
      let index = 0;
      let width = 50;
      for (const key in this.operation) {
        if (this.operation.hasOwnProperty(key) && this.operation[key] !== false) {
          index++;
        }
      }
      let res = width * index * 0.9;
      return res < 100 ? 100 : res;
    },

    reload() {}
  }
};
</script>

<style lang="less" scoped>
.table {
  margin-bottom: 40px;
}
.pagination {
  padding: 40px;
}
</style>
