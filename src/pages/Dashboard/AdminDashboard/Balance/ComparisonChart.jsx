import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const ComparisonChart = ({data}) => {
  const option = {
    title: {
      text: 'All Paid member vs All Newsletter subscriber',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    color: ['#0088FE', '#FFBB28'], 
    series: [
        {
          name: 'Visit Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data,
          label: {
            show: true,
            position: 'outside', 
            formatter: '{b}\n{d}%', 
            fontSize: 12,
            fontWeight: 'bold',
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 10,
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
  };

  const [count, setCount] = useState(0);

  function onChartReady(echarts) {
    console.log('ECharts is ready', echarts);
  }

  function onChartClick(param, echarts) {
    console.log(param, echarts);
    setCount(count + 1);
  }

  function onChartLegendselectchanged(param, echarts) {
    console.log(param, echarts);
  }

  return (
    <>
      <ReactECharts
        option={option}
        style={{ height: 400 }}
        onChartReady={onChartReady}
        onEvents={{
          click: onChartClick,
          legendselectchanged: onChartLegendselectchanged,
        }}
      />
    </>
  );
};

export default ComparisonChart;
