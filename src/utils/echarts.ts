/* eslint-disable @typescript-eslint/no-unused-vars */
import * as echarts from 'echarts/core'
import {
  PieChart,
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts'
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  GridComponent,
  GridComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
  GraphicComponent,
  GraphicComponentOption
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | PieSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | GraphicComponentOption
>
// 注册必须的组件
echarts.use([
  PieChart,
  TitleComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  TooltipComponent,
  LegendComponent,
  GraphicComponent
])
export default echarts
