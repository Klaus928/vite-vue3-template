<template>
  <div class="signal-container">
    <div class="graph-title">
      <span>井下信号灯实时状态</span>
    </div>
    <el-scrollbar :height="height + 'px'">
      <el-table :data="LightStateList" border height="100%">
        <el-table-column prop="lightName" label="监测区域名称">
        </el-table-column>
        <template v-for="item in 4" :key="item">
          <el-table-column
            :prop="'lightState' + (item - 1 || '')"
            :label="`${item}`"
            width="60"
            align="center"
          >
            <template #default="scope">
              <Light :num="scope.row['lightState' + (item - 1 || '')]" />
            </template>
          </el-table-column>
        </template>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import Light from './light'
import { mapState } from 'pinia'
import { realTimeStore } from '@/store/realtime'
export default defineComponent({
  name: 'SignalLightStatus',
  components: { Light },
  setup() {
    const height = ref(330)

    onMounted(() => {
      const containerHeight =
        document.querySelector('.signal-container')?.clientHeight
      if (containerHeight) {
        height.value = containerHeight - 31
      }
    })

    return { height }
  },
  computed: {
    ...mapState(realTimeStore, {
      LightStateList: 'LightStateList',
      loading: 'loading'
    })
  }
})
</script>

<style lang="less">
.signal-container {
  height: 95%;
  // .el-table {
  //   font-size: 14px;
  //   // .signal {
  //   //   height: 16px;
  //   //   width: 16px;
  //   //   background-color: rgb(216, 4, 4);
  //   //   border-radius: 50%;
  //   //   margin: 0 auto;
  //   // }
  // }
  .title {
    padding: 5px;
  }
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
