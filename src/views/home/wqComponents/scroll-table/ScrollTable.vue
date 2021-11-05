<template>
  <div class="graph-title">{{ title }}</div>
  <slot name="header"></slot>
  <DynamicScroller
    v-if="data.length"
    :class="uniqueClass"
    :items="data"
    :min-item-size="45"
    class="scroller"
    :key-field="keyField"
    :style="{ height: height + 'px' }"
    @scroll="handleTableScroll"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
  >
    <template #default="{ item, index, active }">
      <DynamicScrollerItem
        :item="item"
        :active="active"
        :size-dependencies="[item.name]"
        :data-index="index"
      >
        <slot name="content" :row="item"> {{ item.name }}</slot>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
  <Empty v-else :image-size="30" />
</template>

<script lang="ts">
import Empty from '../Empty'
import { defineComponent, reactive, ref, computed, onMounted } from 'vue'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import $ from 'jquery'
export default defineComponent({
  name: 'ScrollTable',
  components: {
    DynamicScrollerItem,
    DynamicScroller,
    Empty
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    keyField: {
      type: String,
      required: true
    },
    uniqueClass: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 280
    }
  },
  setup(props) {
    let listData = computed(() => {
      return props.data || []
    })
    let times = ref(1)
    // 测试数据
    let list = reactive<Array<any>>([])
    const temp: any[] = []
    for (let i = 0; i < 800; i++) {
      temp.push({
        id: i,
        name: 'areaName' + i,
        empName: 'empName' + i,
        areaName: 'areaName' + i,
        VehicleNum: 'VehicleNum ' + i,
        districtTeamName: 'districtTeam' + i,
        count: i
      })
    }
    list = temp
    const recycleRef = ref()
    const handleTableScroll = () => {
      // console.log('u scroll', e)
    }
    let timer = ref()
    let initHeight = ref(0)
    const height = ref(215)
    const startScroll = () => {
      const ele: Element = $(`.vue-recycle-scroller.${props.uniqueClass}`)
      const element: any = document.querySelector(
        `.vue-recycle-scroller.${props.uniqueClass}`
      )
      height.value = element?.clientHeight
      // 没有滚动条就不滚动
      if (element?.scrollHeight === element?.clientHeight) {
        console.log('没有滚动条我不滚')
        return
      }
      timer.value = setInterval(() => {
        ele.animate({ scrollTop: initHeight.value + 32 * times.value }, 1000)
        times.value = times.value + 1
        if (element.scrollTop + element.clientHeight === element.scrollHeight) {
          times.value = 0
          initHeight.value = 0
        }
      }, 1000)
    }
    const handleEnter = () => {
      if (timer.value) {
        window.clearInterval(timer.value)
      }
    }
    const handleLeave = () => {
      // 计算当前的scroll高度
      const ele: any = document.querySelector(
        `.vue-recycle-scroller.${props.uniqueClass}`
      )
      times.value = 1
      initHeight.value = ele.scrollTop
      startScroll()
    }
    onMounted(() => {
      setTimeout(() => {
        startScroll()
      }, 0)
    })

    return {
      // height,
      list,
      listData,
      scroll,
      recycleRef,
      handleTableScroll,
      handleEnter,
      handleLeave,
      startScroll
    }
  }
})
</script>

<style lang="less" scoped>
.scroller {
  height: 100%;
}
.vue-recycle-scroller.ready.direction-vertical.scroller::-webkit-scrollbar {
  width: 8px;
}
.vue-recycle-scroller.ready.direction-vertical.scroller::-webkit-scrollbar-track {
  background: rgb(241, 240, 240);
  border-radius: 2px;
}
.vue-recycle-scroller.ready.direction-vertical.scroller::-webkit-scrollbar-thumb {
  width: 2px;
  background-color: rgb(175, 174, 174);
  box-shadow: inset 0 0 6px #eee;
  border-radius: 10px;
}
</style>
