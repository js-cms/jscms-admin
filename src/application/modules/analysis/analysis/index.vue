<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="h-panel" v-if="data.ip.show">
          <div class="h-panel-bar">
            <div class="h-panel-title">独立IP指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data.ip"></Chart>
          </div>
        </div>
      </Cell>
      <!-- <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">PV指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1"></Chart>
          </div>
        </div>
      </Cell>
      <Cell :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">站内搜索指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1"></Chart>
          </div>
        </div>
      </Cell> -->
    </Row>
  </div>
</template>
<script>
import dataTemplate from './dataTemplate';
import moment from 'moment';
import _ from 'lodash';
import { parse } from 'path';

export default {
  data() {
    return {
      dateRange: [],
      data: {
        ip: {
          show: false,
          data: {}
        }
      }
    };
  },
  mounted() {
    this.parseDate();
    this.loadIp();
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

    /**
     * @description 加载ip统计数据
     */
    async loadIp() {
      let res = await this.req$.get('/api/analysis/ip');
      let ipData = {};
      let countIpData = [];
      this.dateRange.forEach((data, index) => {
        ipData[data] = [];
      });
      res.data.forEach((item) => {
        let date = moment(item.createTime).format('YYYY-MM-DD');
        ipData[date].push(item.info.visitorIp);
      });
      for (const key in ipData) {
        countIpData.push(_.uniq(ipData[key]).length);
      }
      let data = _.cloneDeep(dataTemplate);
      data.xAxis[0].data = _.cloneDeep(this.dateRange);
      data.series[0].data = countIpData;
      this.data.ip = data;
      this.data.ip.show = true;
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
}
</style>