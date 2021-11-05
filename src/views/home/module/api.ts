import { IApi } from '@/types/request'

const apis: IApi = {
  GetLargeScreenRealTimeData: {
    url: '/api/GetLargeScreenRealTimeData',
    method: 'get'
  },
  getLargeScreenStatisticDataA: {
    url: '/api/GetLargeScreenStatisticDataA',
    method: 'get',
    afterResponse: (data) => {
      data.underGroundVehicleCount = data.underGroundVehicleCount.filter(v => v.count > 0);
      data.underGroundVehicleCount.sort(function (a, b) {
        return b.count - a.count
      })
      if (data.underGroundVehicleCount.length > 4) {
        const otherCars: any = {}
        const initVal = 0
        const otherCarsArr = data.underGroundVehicleCount.slice(4)
        const otherCarsSum = otherCarsArr.reduce(
          (acc, cur) => acc + cur.count,
          initVal
        )
        otherCars.vehicleTypeName = '其他'
        otherCars.count = otherCarsSum
        data.underGroundVehicleCount.splice(
          4,
          data.underGroundVehicleCount.length - 4,
          otherCars
        )
      }
      return data
    }
  },
  GetLargeScreenStatisticDataB: {
    url: '/api/GetLargeScreenStatisticDataB',
    method: 'get'
  }
}
export default apis
