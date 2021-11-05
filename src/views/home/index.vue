<template>
  <el-container class="home-container">
    <el-header height="80px" class="header">
      <HeaderContent />
    </el-header>
    <el-container>
      <el-aside width="20%">
        <div class="top"><VehiclesInMine /></div>
        <div class="middle"><InWellDeviceNum /></div>
        <div class="bottom"><AbnorWarning /></div>
      </el-aside>
      <el-main>
        <div class="top">井下车辆分布情况</div>
        <div class="middle"><AreaVehicleCount /></div>
        <div class="bottom"><DistrictVehicleCount /></div>
      </el-main>
      <el-aside width="30%">
        <div class="top"><VehicleInMineChange /></div>
        <div class="middle"><StaffInfoInCar /></div>
        <div class="bottom"><SignalLightStatus /></div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { realTimeStore } from '@/store/realtime'
import { vechicleDataStore } from '@/store/vehicledata'

import {
  InWellDeviceNum,
  AbnorWarning,
  SignalLightStatus,
  HeaderContent,
  AreaVehicleCount,
  DistrictVehicleCount,
  StaffInfoInCar
} from './wqComponents'
import {
  VehiclesInMine,
  PersonInfoInCar,
  VehicleInMineChange
} from './statisticalTables'
export default defineComponent({
  name: 'Home',
  components: {
    InWellDeviceNum,
    AbnorWarning,
    SignalLightStatus,
    HeaderContent,
    AreaVehicleCount,
    DistrictVehicleCount,
    VehiclesInMine,
    VehicleInMineChange,
    PersonInfoInCar,
    StaffInfoInCar
  },
  setup() {
    const realStore = realTimeStore()
    realStore.updateData()
    const vechicleStore = vechicleDataStore()
    vechicleStore.updateData()
    return {}
  }
})
</script>

<style lang="less" scoped>
.home-container {
  background: rgba(215, 215, 215, 0.5);
  // padding: 5px;
  height: 100%;
  text-align: center;
  .el-main {
    padding: 0;
    margin: 0 10px;
    overflow: hidden;
    .top {
      height: 50px;
      line-height: 50px;
      background: #fff;
      margin-bottom: 16px;
      font-size: 18px;
      font-weight: 700;
      text-align: center;
    }
    .middle {
      height: calc(50% - 41px);
      background: #fff;
      margin-bottom: 16px;
    }
    .bottom {
      height: calc(50% - 41px);
      background: #fff;
    }
  }
  .el-aside {
    overflow-y: hidden;
    .top {
      height: calc(25% - 16px);
      background: #fff;
      margin-bottom: 16px;
    }
    .middle {
      height: calc(30% - 16px);
      background: #fff;
      margin-bottom: 16px;
    }
    .bottom {
      height: 45%;
      background: #fff;
    }
  }
}
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
}
</style>
