<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='24' :lg='16' :xl='16'>
        <Row :space="30">
          <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="h-panel" v-if="data.ip.show">
              <div class="h-panel-bar">
                <div class="h-panel-title">独立IP指数</div>
              </div>
              <div class="home-part-body">
                <Chart :options="data.ip.data"></Chart>
              </div>
            </div>
          </Cell>
          <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="h-panel" v-if="data.pv.show">
              <div class="h-panel-bar">
                <div class="h-panel-title">PV指数</div>
              </div>
              <div class="home-part-body">
                <Chart :options="data.pv.data"></Chart>
              </div>
            </div>
          </Cell>
          <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="h-panel" v-if="data.search.show">
              <div class="h-panel-bar">
                <div class="h-panel-title">站内搜索指数</div>
              </div>
              <div class="home-part-body">
                <Chart :options="data.search.data"></Chart>
              </div>
            </div>
          </Cell>
        </Row>
      </Cell>
      <Cell :xs='24' :sm='24' :md='24' :lg='8' :xl='8'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">站内搜索关键词统计</div>
          </div>
          <div class="keywords-body">
            <span class="item" v-for="(item, index) in keywords" :key="index">
              <Badge :count="item.total" :show-zero="true"><Button size="s" @click="goSearchPage(item.keyword)">{{item.keyword}}</Button></Badge>
            </span>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import storejs from 'store';
import moment from 'moment';

import dataTemplate from './dataTemplate';
import _ from 'lodash';

export default {
  data() {
    return {
      dateRange: [],
      keywords: [],
      data: {
        ip: {
          show: false,
          data: {}
        },
        pv: {
          show: false,
          data: {}
        },
        search: {
          show: false,
          data: {}
        }
      }
    };
  },
  mounted() {
    this.parseDate();
    this.loadIp();
    this.loadPv();
    this.loadSearch();
    this.loadSearchKeywods();
  },
  methods: {
    parseDate() {
      [6,5,4,3,2,1].forEach((i)=>{
        this.dateRange.push(
          moment()
            .subtract(i, 'days')
            .format('YYYY-MM-DD')
        );
      });
      this.dateRange.push(moment().format('YYYY-MM-DD'));
    },

    async goSearchPage(keyword) {
      window.open(`${storejs.get('origin')}/s?s=${keyword}`);
    },

    /**
     * 加载搜索关键词
     */
    async loadSearchKeywods() {
      let res = await this.req$.get('/api/back/config?alias=searchKeywordsCount');
      if (!res.data.info || !res.data.info.keywords) return;
      let keywordsObject = res.data.info.keywords;
      let keywords = [];
      for (const keyword in keywordsObject) {
        if (keywordsObject.hasOwnProperty(keyword)) {
          const total = keywordsObject[keyword];
          keywords.push({
            keyword,
            total
          })
        }
      };
      keywords = keywords.sort((item1, item2) => {
        return item2.total - item1.total;
      });
      this.keywords = keywords;
    },

    /**
     * @description 加载ip统计数据
     */
    async loadIp() {
      let res = await this.req$.get('/api/back/analysis/ip');
      let ipData = {};
      let countIpData = [];
      this.dateRange.forEach((date, index) => {
        ipData[date] = [];
      });
      res.data.forEach((item) => {
        let date = moment(item.createTime).format('YYYY-MM-DD');
        if ( ipData[date] ) {
          ipData[date].push(item.info.visitorIp);
        }
      });
      for (const key in ipData) {
        countIpData.push(_.uniq(ipData[key]).length);
      }
      let data = _.cloneDeep(dataTemplate);
      data.xAxis[0].data = _.cloneDeep(this.dateRange);
      data.series[0].data = countIpData;
      data.legend.data[0] = '独立ip数';
      data.series[0].name = '独立ip数';
      data.yAxis[0].axisLabel.formatter = '{value} IP';
      this.data.ip.data = data;
      this.data.ip.show = true;
    },

    /**
     * @desc 加载pv统计数据
     */
    async loadPv() {
      let res = await this.req$.get('/api/back/analysis/pv');
      let pvData = {};
      let countPvData = [];
      this.dateRange.forEach((date, index) => {
        pvData[date] = [];
      });
      res.data.forEach((item) => {
        let date = moment(item.createTime).format('YYYY-MM-DD');
        if ( pvData[date] ) {
          pvData[date].push(item.info.visitorIp);
        }
      });
      for (const key in pvData) {
        countPvData.push(pvData[key].length);
      }
      let data = _.cloneDeep(dataTemplate);
      data.xAxis[0].data = _.cloneDeep(this.dateRange);
      data.series[0].data = countPvData;
      data.legend.data[0] = 'pv数';
      data.series[0].name = 'pv数';
      data.yAxis[0].axisLabel.formatter = '{value} PV';
      this.data.pv.data = data;
      this.data.pv.show = true;
    },

    /**
     * @desc 加载搜索统计数据
     */
    async loadSearch() {
      let res = await this.req$.get('/api/back/analysis/search');
      let searchData = {};
      let countSearchData = [];
      this.dateRange.forEach((date, index) => {
        searchData[date] = [];
      });
      res.data.forEach((item) => {
        let date = moment(item.createTime).format('YYYY-MM-DD');
        if ( searchData[date] ) {
          searchData[date].push(item.info.searcherIp);
        }
      });
      for (const key in searchData) {
        countSearchData.push(searchData[key].length);
      }
      let data = _.cloneDeep(dataTemplate);
      data.xAxis[0].data = _.cloneDeep(this.dateRange);
      data.series[0].data = countSearchData;
      data.legend.data[0] = '搜索数';
      data.series[0].name = '搜索数';
      data.yAxis[0].axisLabel.formatter = '{value} 次';
      this.data.search.data = data;
      this.data.search.show = true;
    }
  }
};
</script>

<style lang='less'>
.app-home-vue {
  .home-part-body {
    height: 350px;
    .echarts-vue {
      height: 350px;
    }
  }

  .home-part-body2 {
    height: 420px;
    .echarts-vue {
      height: 420px;
    }
  }

  .progress-div {
    > p {
      padding: 8px 0;
    }
    .h-progress {
      &-title {
        color: @dark2-color;
        font-size: 15px;
      }
      &-text {
        width: 40px;
      }
    }
  }

  .keywords-body {
    padding: 15px;

    .item {
      padding: 5px;
      padding-right: 20px;
      padding-bottom: 10px;
      display: inline-block;
    }
  }
}
</style>