// Read all environment constiable configuration files to process.env

// type Recordable<T = any> = Record<string, T>
export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY') {
      try {
        realName = JSON.parse(realName)
      } catch (error) {}
    }
    ret[envName] = realName
    process.env[envName] = realName
  }
  return ret
}
// 获取路径文件名
export function getFileName(path) {
  const pos1 = path.lastIndexOf('/')
  const pos2 = path.lastIndexOf('\\')
  const pos = Math.max(pos1, pos2)
  if (pos < 0) {
    return path
  } else {
    const tempPath: string = path.substring(pos + 1)
    return tempPath.substring(0, tempPath.lastIndexOf('.'))
  }
}
