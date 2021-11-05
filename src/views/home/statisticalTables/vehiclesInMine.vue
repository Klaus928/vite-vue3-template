<template>
  <div class="vehicles-container">
    <div class="graph-title" style="position: absolute">井下车辆数</div>
    <div
      ref="myChart"
      :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"
      class="canvas-box"
    ></div>
  </div>
</template>

<script lang="ts">
import echarts from '@/utils/echarts'
import { defineComponent, ref, onMounted, computed, watch } from 'vue'
// import { requestStoreList } from '@/store'
import { vechicleDataStore } from '@/store/vehicledata'
// import { mapState } from 'pinia'

export default defineComponent({
  name: 'VehiclesInMine',
  setup() {
    const store = vechicleDataStore()
    let alarmCount222 = computed(() => {
      return store.underGroundVehicleCount
    })
    watch(
      alarmCount222,
      (val) => {
        if (document.querySelector('.vehicles-container')) {
          //     const containerWidth = document.querySelector(
          //   '.vehicles-container'
          //     )?.clientWidth
          //     const containerHeight = document.querySelector(
          //       '.vehicles-container'
          //     )?.clientHeight
          //   if (containerHeight && containerWidth) {
          //   chartHeight.value = containerHeight
          //   chartWidth.value = containerWidth
          // }
          setTimeout(() => {
            drawEchart(val)
          })
        }
      },
      { deep: true }
    )
    const myChart = ref<HTMLElement>() //也可以用const myChart = ref<any>();
    const myCharts = ref<any>()

    let chartHeight = ref(200)
    let chartWidth = ref(350)

    onMounted(async () => {
      const containerHeight = document.querySelector(
        '.vehicles-container'
      )?.clientHeight
      const containerWidth = document.querySelector(
        '.vehicles-container'
      )?.clientWidth
      if (containerHeight && containerWidth) {
        console.log('containerWidth: ', containerWidth);
        console.log('containerHeight: ', containerHeight);
        chartHeight.value = containerHeight
        chartWidth.value = containerWidth
      }
      if (myChart.value) myCharts.value = echarts.init(myChart.value)
    })

    const drawEchart = (arr) => {
      // 绘制图表
      const data = JSON.parse(JSON.stringify(arr))
      let carsSumNum = data.reduce((pre, cur) => pre + cur.count, 0)
      let underGroundVehicleCount = data.map((item) => {
        item.name = item.vehicleTypeName
        item.value = item.count
        delete item.vehicleTypeName
        delete item.count
        return item
      })
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
            text: carsSumNum,
            textAlign: 'center',
            fill: 'black',
            fontSize: 30
          }
        },
        series: [
          {
            // name: '访问来源',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner',
              formatter: '{c}',
              fontSize: '16'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '25',
                fontWeight: 'bold'
                // position: 'center',
              }
            },
            labelLine: {
              show: false
            },
            data: underGroundVehicleCount
          }
        ]
      })
    }
    return {
      myChart,
      chartHeight,
      chartWidth
    }
  }
})
</script>
m

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: 700;
  text-align: left;
}
.vehicles-container {
  height: 100%;
  width: 100%;
  .canvas-box {
    top: 5%;
  }
}
</style>
