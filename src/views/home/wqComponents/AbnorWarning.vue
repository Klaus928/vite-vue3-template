<template>
  <div class="abnormal-container">
    <div class="graph-title">异常报警</div>
    <el-scrollbar v-if="alarmTableCount.length" :height="height + 'px'">
      <template v-for="item in alarmTableCount" :key="item.alarmName">
        <div class="row-item">
          <div style="vertical-align: middle">
            <img v-if="item.count > 0" src="~@/assets/images/red-alarm.svg" />
            <img v-else src="~@/assets/images/yellow-alarm.svg" />
            <span style="margin-left: 10px">{{ item.alarmName }}</span>
          </div>
          <span>{{ item.count }}</span>
        </div>
      </template>
    </el-scrollbar>
    <Empty v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import Empty from './Empty'
import { mapState } from 'pinia'
import { realTimeStore } from '@/store/realtime'
export default defineComponent({
  name: 'AbnorWarning',
  components: { Empty },
  setup() {
    let height = ref(320)
    onMounted(() => {
      const containerHeight = document.querySelector(
        '.abnormal-container'
      )?.clientHeight
      if (containerHeight) {
        height.value = containerHeight - 31 - 10
      }
    })
    return { height }
  },
  computed: {
    ...mapState(realTimeStore, ['alarmTableCount', 'loading'])
  }
})
</script>

<style lang="less" scoped>
.abnormal-container {
  font-size: 14px;
  height: 100%;
  .title {
    font-size: 16px;
    text-align: left;
    padding: 5px;
  }
  .row-item {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 5px 20px;
  }
}
</style>
