<template>
  <div>
    <ScrollTable
      :data="data"
      key-field="areaName"
      unique-class="AreaVehicleCount"
      title="区域车辆分布"
      :height="280"
    >
      <template #content="scope">
        <div class="row">
          <div>{{ scope.row.areaName }}</div>
          <div>{{ scope.row.count }}</div>
          <div :title="scope.row.VehicleNum">
            {{ scope.row.VehicleNum }}
          </div>
        </div>
      </template>
      <template #header>
        <div class="row header">
          <div>区域</div>
          <div>车辆数</div>
          <div>车牌号</div>
        </div>
      </template>
    </ScrollTable>
    <!-- <Empty v-else /> -->
  </div>
</template>

<script lang="ts">
import ScrollTable from './scroll-table/ScrollTable.vue'
import { defineComponent, computed } from 'vue'
import Empty from './Empty'
import { vechicleDataStore } from '@/store/vehicledata'
import { mapState } from 'pinia'
export default defineComponent({
  name: 'AreaVehicleCount',
  components: {
    ScrollTable,
    Empty
  },
  setup() {
    const store = vechicleDataStore()
    let data = computed(() => {
      let areaVehicleCount = store.areaVehicleCount || []
      return areaVehicleCount.map((item: any) => {
        item.count = item.VehicleNum ? item.VehicleNum.split(',').length : 0
        return item
      })
    })
    return { data }
  },
  computed: {
    ...mapState(vechicleDataStore, ['loading'])
  }
})
</script>

<style lang="less" scoped>
.row {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
  line-height: 21px;
  align-items: center;
  div:nth-child(1) {
    width: 100px;
  }
  div:nth-child(2) {
    width: 100px;
  }
  div:nth-child(3) {
    flex: 1;
    word-break: break-word;
  }
}
.header {
  border-bottom: none;
}
.el-row {
  word-break: break-word;
}
.header {
  border-bottom: 1px solid #eee;
}
</style>
