import { defineStore } from 'pinia'
import { requestStoreList } from '@/store'
export const realTimeStore = defineStore('realTimeData', {
  state() {
    return {
      loading: true,
      LightStateList: [],
      alarmTableCount: [],
      underGroundDev: []
    }
  },
  actions: {
    async updateData() {
      const homeStore = requestStoreList['home']()
      this.loading = true
      const res = await homeStore.GetLargeScreenRealTimeData()
      this.loading = false
      this.alarmTableCount = res.alarmTableCount
      this.LightStateList = res.LightStateList
      this.underGroundDev = res.underGroundDev
      setTimeout(() => {
        this.updateData()
      }, 1000 * 10)
    }
  }
})
