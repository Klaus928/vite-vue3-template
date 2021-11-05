<template>
  <div>
    <ScrollTable
      :data="data"
      key-field="districtTeamName"
      unique-class="district-team"
      title="区队车辆分布"
      :height="280"
    >
      <template #content="scope">
        <div class="row">
          <div>{{ scope.row.districtTeamName }}</div>
          <div>{{ scope.row.count }}</div>
          <div :title="scope.row.VehicleNum">
            {{ scope.row.VehicleNum }}
          </div>
        </div>
      </template>
      <template #header>
        <div class="row header">
          <div>区队</div>
          <div>车辆数</div>
          <div>车牌号</div>
        </div>
      </template>
    </ScrollTable>
  </div>
</template>

<script lang="ts">
import ScrollTable from './scroll-table/ScrollTable.vue'
import { defineComponent, computed, ref } from 'vue'
import { vechicleDataStore } from '@/store/vehicledata'
export default defineComponent({
  name: 'DistrictVehicleCount',
  components: {
    ScrollTable
  },
  setup() {
    const store = vechicleDataStore()
    let data = computed(() => {
      let districtVehicleCount = store.districtTeamVehicleCount || []
      return districtVehicleCount.map((item: any) => {
        item.count = item.VehicleNum ? item.VehicleNum.split(',').length : 0
        return item
      })
    })
    return { data }
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
  border-bottom: 1px solid #eee;
}
.el-row {
  word-break: break-word;
}
</style>
