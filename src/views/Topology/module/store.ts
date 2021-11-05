import deviceInfo from "./device"

export default {
  actions: {
    getdeviceInfoJson(): Promise<any> {
      return new Promise(resolve => {
        resolve(deviceInfo.data)
      })
    }
  }
}
