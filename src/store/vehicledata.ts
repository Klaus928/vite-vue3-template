import { defineStore } from 'pinia'
import { requestStoreList } from '@/store'
export const vechicleDataStore = defineStore('vechicleData', {
  state() {
    return {
      loading: true,
      underGroundVehicleCount: [],
      areaVehicleCount: [],
      districtTeamVehicleCount: [],
      peopleInCar: []
    }
  },
  actions: {
    async updateData() {
      this.loading = true
      const homeStore = requestStoreList['home']()
      const res = await homeStore.getLargeScreenStatisticDataA()
      this.underGroundVehicleCount = res.underGroundVehicleCount
      this.loading = false
      this.areaVehicleCount = res.areaVehicleCount
      this.districtTeamVehicleCount = res.districtTeamVehicleCount
      this.peopleInCar = res.peopleInCar

      setInterval(async () => {
        const homeStore = requestStoreList['home']()
        const res = await homeStore.getLargeScreenStatisticDataA()
        this.areaVehicleCount = res.areaVehicleCount
        this.districtTeamVehicleCount = res.districtTeamVehicleCount
        this.peopleInCar = res.peopleInCar
        this.underGroundVehicleCount = res.underGroundVehicleCount
      }, 1000 * 10)
    }
  }
})
