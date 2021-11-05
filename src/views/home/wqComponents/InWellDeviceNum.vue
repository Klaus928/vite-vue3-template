<template>
  <div class="inwell-container">
    <div class="graph-title">井下设备数</div>
    <el-scrollbar v-if="underGroundDev.length" :height="height + 'px'">
      <el-table :data="underGroundDev" :show-header="false">
        <el-table-column prop="devName" label="基站"> </el-table-column>
        <el-table-column prop="onLineCount" label="在线人数" width="90">
          <template #default="scope">
            <span
              ><span style="color: #1e80ff; margin-right: 5px">{{
                scope.row.onLineCount
              }}</span
              >在线</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="offLineCount" label="离线人数" width="90">
          <template #default="scope">
            <span
              ><span style="color: #f00; margin-right: 5px">{{
                scope.row.offLineCount
              }}</span
              >离线</span
            >
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Empty from './Empty'
import { mapState } from 'pinia'
import { realTimeStore } from '@/store/realtime'
export default defineComponent({
  name: 'InWellDeviceNum',
  components: { Empty },
  setup() {
    let height = ref(200)
    onMounted(() => {
      const containerHeight =
        document.querySelector('.inwell-container')?.clientHeight
      if (containerHeight) {
        height.value = containerHeight - 31
      }
    })
    return { height }
  },
  computed: {
    ...mapState(realTimeStore, ['underGroundDev', 'loading'])
  }
})
</script>

<style lang="less">
.inwell-container {
  height: 100%;
  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: none;
  }
  .title {
    padding: 5px;
  }
  .el-scrollbar {
    height: calc(100% - 34px);
  }
}
</style>
