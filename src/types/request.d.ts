/* eslint-disable @typescript-eslint/no-unused-vars */
// api文件变量的声明
import { HYRequestConfig } from '@/service/request/type'
interface IApiItem extends HYRequestConfig {
  queryName?: queryName[]
  beforeRequest?: (data: any) => any
  afterResponse?: (data: any) => any
}
type queryName = 'params' | 'data'
export interface IApi {
  [propName: string]: IApiItem | string
}
