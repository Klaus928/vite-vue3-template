<template>
  <div class="header">
    <el-link :underline="false" class="logo">
      <img :src="src" height="60" alt="LOGO" />
    </el-link>
    <span class="title">{{ title }}</span>
    <el-link :underline="false" href="/Topology" class="topology">
      拓扑图
    </el-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
export default defineComponent({
  name: 'HeaderContent',
  setup() {
    const title = ref('高家梁煤矿')
    axios
      .get('config.json')
      .then((res) => {
        const data = res.data
        title.value = data.title
      })
      .catch(() => {
        ElMessage.error('请检查config配置')
      })
    // const path = `logo`
    const modules = import.meta.globEager(`/src/assets/logo.png`)
    const src = modules['/src/assets/logo.png'].default
    // console.log('src', modules)
    return { title, src }
  }
})
</script>

<style lang="less" scoped>
.header {
  line-height: 80px;
  font-size: 18px;
  text-align: center;
  position: relative;
  .logo {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .topology {
    position: absolute;
    top: 0;
    right: 10px;
  }
}
</style>
