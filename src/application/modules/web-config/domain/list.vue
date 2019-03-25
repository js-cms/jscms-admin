<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">域名配置列表</span>
    </div>

    <div class="h-panel-body">
      <div class="common-filter-bar">
        <Row :space-x="19" :space-y="5">
          <Cell style="float: right" >
            <div>
              <Button color="primary">新增域名配置</Button>
            </div>
          </Cell>
        </Row>
      </div>
      <Table :loading="loading" :datas="datas">
        <TableItem title="序号">
          <template slot-scope="{index}">{{index+1}}</template>
        </TableItem>
        <TableItem prop="name" title="协议"></TableItem>
        <TableItem prop="salary" title="域名"></TableItem>
        <TableItem prop="country" title="端口"></TableItem>
        <TableItem title="操作" :width="100" fixed="right">
          <template slot-scope="{data}">
            <Poptip content="确定要删除该菜单？" @confirm="deleteConfirm(data)">
              <button class="h-btn h-btn-s h-btn-red">
                <i class="h-icon-trash"></i>
              </button>
            </Poptip>
          </template>
        </TableItem>
      </Table>
      <p></p>
      <Pagination
        v-if="pagination.total>0"
        :size="pagination.size"
        :cur="pagination.page"
        align="right"
        :total="pagination.total"
        @change="changePage"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: '',
      sort: 'updatedAt:desc',
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      tabs: [
        { key: 'China', title: 'Malawi' },
        { key: 'Niger', title: 'Niger' },
        { key: 'Curaçao', title: 'Curaçao' },
        { key: 'Korea', title: 'Korea' },
        { key: 'Malawi', title: 'Malawi' }
      ],
      type: 'China',
      datas: [],
      counts: {},
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData();
      this.getCounts();
    },
    deleteConfirm() {

    },
    changePage(page) {
      this.pagination.page = page.cur;
      this.pagination.size = page.size;
      this.getData();
    },
    getCounts() {
      setTimeout(() => {
        this.counts = {
          China: 900,
          Niger: 90,
          Curaçao: 20,
          Korea: 30,
          Malawi: 45
        };
      }, 1000);
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      setTimeout(() => {
        this.datas = [
          { name: 'Dakota Rice', salary: '$36,738', country: 'Niger', city: 'Oud-Turnhout' },
          { name: 'Minerva Hooper', salary: '$23,789', country: 'Curaçao', city: 'Sinaai-Waas' },
          { name: 'Sage Rodriguez', salary: '$56,142', country: 'Netherlands', city: 'Baileux' },
          { name: 'Philip Chaney', salary: '$38,735', country: 'Korea, South', city: 'Overland Park' },
          { name: 'Doris Greene', salary: '$63,542', country: 'Malawi', city: 'Feldkirchen in Kärnten' },
          { name: 'Mason Porter', salary: '$78,615', country: 'Chile', city: 'Gloucester' },
          { name: 'Dakota Rice', salary: '$36,738', country: 'Niger', city: 'Oud-Turnhout' },
          { name: 'Minerva Hooper', salary: '$23,789', country: 'Curaçao', city: 'Sinaai-Waas' },
          { name: 'Sage Rodriguez', salary: '$56,142', country: 'Netherlands', city: 'Baileux' },
          { name: 'Philip Chaney', salary: '$38,735', country: 'Korea, South', city: 'Overland Park' },
          { name: 'Doris Greene', salary: '$63,542', country: 'Malawi', city: 'Feldkirchen in Kärnten' },
          { name: 'Mason Porter', salary: '$78,615', country: 'Chile', city: 'Gloucester' }
        ];
        this.pagination.total = 100;
        this.loading = false;
      }, 1000);
    }
  },
  computed: {}
};
</script>
