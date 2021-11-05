<template>
  <!-- <div v-if="num != 10" class="signal" :style="{ background: color }"></div>
  <div v-else><CloseBold class="offline" /><CloseBold class="offline" /></div> -->
  <img :src="src" height="18" />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { n6, n7, n8, n9, n10 } from './image'
export default defineComponent({
  name: 'Light',
  components: {},
  props: {
    num: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const src = computed(() => {
      let src = ''
      try {
        src = eval('n' + props.num)
      } catch {
        src = ''
      }
      return src
    })
    return { src, n6, n7, n8, n9, n10 }
  }
})
</script>

<style scoped>
.signal {
  height: 16px;
  width: 16px;
  border-radius: 50%;
  margin: 0 auto;
}
.offline {
  height: 18px;
}
</style>
