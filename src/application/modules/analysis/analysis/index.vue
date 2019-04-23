<template>
  <div class="app-home-vue frame-page">
    <Row :space="30">
      <Cell :xs='24' :sm='24' :md='24' :lg='24' :xl='24'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">独立IP指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1"></Chart>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='24' :lg='24' :xl='24'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">PV指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1"></Chart>
          </div>
        </div>
      </Cell>
      <Cell :xs='24' :sm='24' :md='24' :lg='24' :xl='24'>
        <div class="h-panel">
          <div class="h-panel-bar">
            <div class="h-panel-title">站内搜索指数</div>
          </div>
          <div class="home-part-body">
            <Chart :options="data1"></Chart>
          </div>
        </div>
      </Cell>
    </Row>
  </div>
</template>
<script>
import data1 from '@/components/demo-components/components/datas/data1';
import data2 from '@/components/demo-components/components/datas/data2';

export default {
  data() {
    return {
      data1,
      data2
    };
  },
  mounted() {
    console.log(this.data1);
  },
  methods: {}
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
    >p {
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