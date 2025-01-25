import React from 'react';
import ReactECharts from 'echarts-for-react';

const ClassComparisonChart = ({paymentData}) => {
  
     const processData = (data) => {
      const result = data?.reduce((acc, item) => {
        const { selectedClass, packagePrice } = item;
        if (!acc[selectedClass]) {
          acc[selectedClass] = 0;
        }
        acc[selectedClass] += packagePrice;
        return acc;
      }, {});
        return Object.entries(result).map(([name, value]) => ({ name, value }));
    };
    

    const calculateTotalPrice = (data) => {
        return data.reduce((acc, item) => acc + item.packagePrice, 0);
    };

    const totalPrice = calculateTotalPrice(paymentData)
    const chartData = processData(paymentData)
  const option = {
    title: {
      text: 'Total Sales Overview',
      subtext: 'A breakdown of all-time sales revenue',
      left: 'center',
      top: '0%',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    legend: {
      bottom: '0%',
      left: 'center',
    },
    series: [
      {
        name: 'Sales',
        type: 'pie',
        radius: ['50%', '70%'], // Inner and outer radius to create doughnut shape
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
          },
        },
        data: chartData
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: '50%',
      style: {
        text: `$ ${totalPrice}\nTotal Ammount`,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 30,
      },
    },
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
};

export default ClassComparisonChart;
