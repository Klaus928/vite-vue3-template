// 全局声明文件里不允许出现export
declare type Recordable<T = any> = Record<string, T>
declare interface ViteEnv {
  // 是否删除console
  VITE_DROP_CONSOLE: boolean
  VITE_PUBLIC_PATH: string
}
