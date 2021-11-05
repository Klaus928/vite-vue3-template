<template>
  <div></div>
</template>

<script lang="ts">
import echarts from '@/utils/echarts'
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'PersonInfoInCar',
  setup() {
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();

    console.log(myChart)
    const myCharts = ref<any>()
    onMounted(() => {
      setTimeout(() => {
        // 绘制图表
        if (myChart.value) myCharts.value = echarts.init(myChart.value)
        myCharts.value.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: '20%',
            right: 0,
            orient: 'vertical'
          },
          graphic: {
            type: 'text',
            left: 'center',
            top: 'center',
            style: {
              //数据总量
              text: '25',
              textAlign: 'center',
              fill: 'black',
              fontSize: 30
            }
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: true,
                position: 'inner',
                formatter: '{c}'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                  // position: 'center',
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {
                  value: 1048,
                  name: '搜索引擎'
                  // label: {
                  //   //单独显示该数据项
                  //   show: true,
                  //   formatter: '{c}',
                  //   position: 'center',
                  //   fontSize: 16
                  // }
                },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' }
              ]
            }
          ]
        })
        // window.addEventListener("resize", () => {
        //   if (myCharts.value) {
        //     myCharts.value.resize();
        //   }
        // });
      })
    })

    return {
      myChart
    }
  }
})
</script>
