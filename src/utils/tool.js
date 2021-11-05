// 工具函数汇总
/**
 * @param {string} url - 要下载的链接
 * 用a标签方式下载，主要用于下载多个文件时调用，批量下载
 */
export const downloadFile = (url, filename) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute(
    'download',
    filename
  )
  document.body.appendChild(link)
  link.click()
};

/**
 * @param {blob} content - 二进制内容
 * @param {string} fileName - 要下载的文件名
 * @param {string} type - 文件类型
 * 下载流文件
 */
export const downloadBlobFile = (content, fileName, type) => {
  const blob = new Blob([content], { type: type });
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const alink = document.createElement("a");
    alink.download = fileName;
    alink.style.display = "none";
    alink.href = URL.createObjectURL(blob);
    document.body.appendChild(alink);
    alink.click();
    URL.revokeObjectURL(alink.href); // 释放URL 对象
    document.body.removeChild(alink);
  } else {
    // IE下载
    navigator.msSaveBlob(blob, fileName);
  }
};

/**
 * @param {any} value - 任意变量
 * @returns {type}
 * 类型判断 返回Array, Function, String, Object, Number, RegExp等
 */
export const toRawType = (value) => {
  const _toString = Object.prototype.toString;
  return _toString.call(value).slice(8, -1);
}

/**
 * @param {number}
 * @returns {string || number}
 * 获取千位分隔符处理后的数据
 */
export const thousandBitSeparator = num => {
  if (num) {
    num = num.toString();
    if (num.indexOf(".") >= 0) {
      num = num.replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    } else {
      num = num.replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, "$1,");
    }
    return num;
  }
  return 0;
};

/**
 * @param {string} value - 字典对象的值
 * @param {array} dictData - 字典数组
 * @returns {object}
 * 获取对应的字典对象
 */
export const getDictLabel = (value, dictData) => {
  let obj = dictData.filter(item => item.value === value)[0] || {};
  return obj;
};

// 这个函数 网上  随处可见，我也是应用了别人的。
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
 * @param {string} path - url路径
 * @returns {boolean} 是否是外源
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/* 节流函数 */
export const throttle = (fn, gapTime) => {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

/* 防抖函数 */
export const debounce = (fn, wait) => {
  if (wait == null || wait == undefined) {
    wait = 200
  }
  let timeout = null;
  return function () {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

export const parseParams = (uri, params) => {
  const paramsArray = []
  Object.keys(params).forEach(key => params[key] !== null && params[key] !== undefined && paramsArray.push(`${key}=${params[key]}`))
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}

export const treeToArray = (tree, childName) => {
  console.log('tree: ', tree);
  let queen = [];
  let out = [];
  queen = queen.concat(tree);
  console.log('queen: ', queen);
  while(queen.length) {
    let first = queen.shift()
    if(first[childName]) {
      queen = queen.concat(first[childName]);
      delete first[childName];
    }
    out.push(first)
  }
  return out
}

export const getMapImgSrc = (imgName) => {
  const path = `/src/assets/device/${imgName}.png`;
  const modules = import.meta.globEager(`/src/assets/device/*.png`);
  return modules[path].default;
};