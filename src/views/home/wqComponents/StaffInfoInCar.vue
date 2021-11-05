<template>
  <div>
    <ScrollTable
      :data="data"
      key-field="empName"
      unique-class="staff-info"
      title="车内人员信息"
      :height="160"
    >
      <template #content="scope">
        <div class="row">
          <div :title="scope.row.VehicleNum">
            {{ scope.row.VehicleNum }}
          </div>
          <div>{{ scope.row.count }}</div>
          <div :title="scope.row.empName">{{ scope.row.empName }}</div>
        </div>
      </template>
      <template #header>
        <div class="row header">
          <div>车牌号</div>
          <div>人数</div>
          <div>车内人员</div>
        </div>
      </template>
    </ScrollTable>
  </div>
</template>

<script lang="ts">
import ScrollTable from './scroll-table/ScrollTable.vue'
import { defineComponent, computed } from 'vue'
import { vechicleDataStore } from '@/store/vehicledata'
export default defineComponent({
  name: 'DistrictVehicleCount',
  components: {
    ScrollTable
  },
  setup() {
    const store = vechicleDataStore()
    let data = computed(() => {
      let peopleInCar = store.peopleInCar || []
      return peopleInCar.map((item: any) => {
        item.count = item.empName ? item.empName.split(',').length : 0
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
