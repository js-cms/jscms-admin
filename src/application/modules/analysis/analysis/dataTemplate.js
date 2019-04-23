export default {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['独立ip数']
  },
  toolbox: {
    show: true,
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: false },
      magicType: { show: true, type: ['line', 'bar'] },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    }
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        formatter: '{value} IP'
      }
    }
  ],
  series: [
    {
      name: '独立IP数',
      type: 'line',
      data: [11, 11, 15, 13, 12, 13, 10],
      smooth: true
    }
  ]
};
