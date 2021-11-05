<template>
  <div class="vehicles-change-container">
    <div class="graph-title" style="position: absolute">井下车辆变化趋势图</div>
    <div
      ref="myChartRef"
      :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"
    ></div>
  </div>
</template>

<script lang="ts">
import echarts from '@/utils/echarts'
import { defineComponent, ref, onMounted } from 'vue'
import { requestStoreList } from '@/store'
import dayjs from 'dayjs'
export default defineComponent({
  name: 'VehicleInMineChange',
  setup() {
    const myChartRef = ref<HTMLElement>()
    const myCharts = ref<any>()
    const home = requestStoreList['home']()
    let timeInterval = ref(4)
    let chartHeight = ref(200)
    let chartWidth = ref(350)
    // 图表数据
    onMounted(() => {
      getData()
      setInterval(() => {
        getData()
      }, 60 * 1000)
      const containerHeight = document.querySelector(
        '.vehicles-change-container'
      )?.clientHeight
      const containerWidth = document.querySelector(
        '.vehicles-change-container'
      )?.clientWidth
      if (containerHeight && containerWidth) {
        chartHeight.value = containerHeight + 50
        chartWidth.value = containerWidth - 10
      }
      setTimeout(() => {
        myCharts.value = echarts.init(myChartRef.value)
        myCharts.value.setOption({
          tooltip: {
            trigger: 'axis'
            // axisPointer: {
            //   type: 'cross'
            // }
          },
          xAxis: {
            type: 'category',
            show: true,
            // boundaryGap: false,
            axisLabel: {
              show: true,
              showMaxLabel: true,
              showMinLabel: true,
              formatter: function (value) {
                let string = value.split(' ')
                return `${string[0]}\n` + string[1]
              }
            },
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [],
              type: 'line',
              areaStyle: {},
              label: {
                show: true,
                position: 'top'
              }
            }
          ]
        })
      })
    })

    const getData = async () => {
      // startTime
      let lastNow = dayjs().subtract(24, 'hour')
      lastNow = dayjs(lastNow).set('second', 0)
      lastNow = dayjs(lastNow).set('minute', 0)
      let length = 24 / timeInterval.value
      let data: any = []
      let time: any = []
      for (let i = 0; i <= length; i++) {
        await home
          .GetLargeScreenStatisticDataB({ querytime: dayjs(lastNow).format("YYYY-MM-DD HH:mm:ss") })
          .then((res) => {
            data.push(res)
            time.push(lastNow.format('MM-DD HH:mm'))
            lastNow = dayjs(lastNow).add(4, 'hour')
          })
          .catch(() => {
            setTimeout(() => {
              getData()
            }, 5 * 60000)
          })
      }
      const option = myCharts.value.getOption()
      option.series[0].data = data
      option.xAxis[0].data = time
      myCharts.value.setOption(option)
    }
    return {
      myChartRef,
      chartHeight,
      chartWidth
    }
  }
})
</script>

<style lang="less" scoped>
.vehicles-change-container {
  height: calc(100% - 28px);
  width: 100%;
}
</style>
