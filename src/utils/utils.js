// 获取连接参数值
function getUrlParams(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

// 判断设备处于PC还是移动端
function isIOS() {
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

// 判断安卓或者ios终端
function testMobileType() {
  const u = navigator.userAgent
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isAndroid) {
    return 'android'
  } else if (isiOS) {
    return 'ios'
  } else {
    return 'pc'
  }
}

// 校验手机号码
function isPhone(val) {
  var patrn = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/
  if (!patrn.test(val) || val === '') {
    return false
  } else {
    return true
  }
}

// 检验车牌号
function isCarNum(val) {
  var patrn = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})$/
  var patrn2 = /^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))$/
  if (!patrn.test(val) && !patrn2.test(val)) {
    return false
  } else {
    return true
  }
}

// 校验车架号
function isVehicle(val) {
  var patrn = /^[A-HJ-NP-Za-hj-np-z0-9]+$/
  if (!patrn.test(val) || val === '') {
    return false
  } else {
    return true
  }
}

// 检验身份证号码
function isSfz(idcard) {
  var Errors = [1, '身份证号码位数不对', '出生日期错误', '身份证号码错误', '身份证地区非法']
  var area = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: 'xinjiang', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
  var Y, JYM
  var S, M, ereg, Err
  var arr = []
  arr = idcard.split('')
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    Err = Errors[4]
    return Err
  }
  switch (idcard.length) {
    case 15:
      if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/ // 测试出生日期的合法性
      } else {
        ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/ // 测试出生日期的合法性
      }
      if (ereg.test(idcard)) {
        Err = Errors[0]
      } else {
        Err = Errors[2]
      }
      return Err
    case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/ // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/ // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S = (parseInt(arr[0]) + parseInt(arr[10])) * 7 + (parseInt(arr[1]) + parseInt(arr[11])) * 9 + (parseInt(arr[2]) + parseInt(arr[12])) * 10 + (parseInt(arr[3]) + parseInt(arr[13])) * 5 + (parseInt(arr[4]) + parseInt(arr[14])) * 8 + (parseInt(arr[5]) + parseInt(arr[15])) * 4 + (parseInt(arr[6]) + parseInt(arr[16])) * 2 + parseInt(arr[7]) * 1 + parseInt(arr[8]) * 6 + parseInt(arr[9]) * 3
        Y = S % 11
        M = 'F'
        JYM = '10X98765432'
        M = JYM.substr(Y, 1)
        if (M === arr[17]) {
          Err = Errors[0]
        } else {
          Err = Errors[3]
        }
      } else {
        Err = Errors[2]
      }
      return Err
    default:
      Err = Errors[1]
      return Err
  }
}

// 判断输入框是否有表情
function isEmojiCharacter(substring) {
  for (var i = 0; i < substring.length; i++) {
    const hs = substring.charCodeAt(i)
    if (hs >= 0xd800 && hs <= 0xdbff) {
      if (substring.length > 1) {
        const ls = substring.charCodeAt(i + 1)
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
        if (uc >= 0x1d000 && uc <= 0x1f77f) {
          return true
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1)
      if (ls === 0x20e3) {
        return true
      }
    } else {
      if (hs >= 0x2100 && hs <= 0x27ff) {
        return true
      } else if (hs >= 0x2B05 && hs <= 0x2b07) {
        return true
      } else if (hs >= 0x2934 && hs <= 0x2935) {
        return true
      } else if (hs >= 0x3297 && hs <= 0x3299) {
        return true
      } else if (hs === 0xa9 || hs === 0xae || hs === 0x303d || hs === 0x3030 ||
        hs === 0x2b55 || hs === 0x2b1c || hs === 0x2b1b || hs === 0x2b50) {
        return true
      }
    }
  }
}

// 日期格式化
function dateFormat(date, fmt) {
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// 时间格式化
function TimeFormat(val, s) {
  if (!val) {
    return ''
  }
  if (s) {
    val = val * 1000
  }
  var date = new Date(val)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var min = date.getMinutes()
  var second = date.getSeconds()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  hour = hour < 10 ? '0' + hour : hour
  min = min < 10 ? '0' + min : min
  second = second < 10 ? '0' + second : second
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second
}

// 日期年月日
function getDate(n) {
  var date = new Date()
  date.setDate(date.getDate() + n)
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}

// 最多保留两位小数
function formatMomey(num) {
  return Math.round(num * 100) / 100
}

// 压缩图片
function dealImage(path, obj, callback) {
  var img = new Image()
  img.src = path
  img.onload = function () {
    var that = this
    // 默认按比例压缩
    var w = that.width
    var h = that.height
    var scale = w / h
    w = obj.width || w
    h = obj.height || w / scale
    var quality = 0.5 // 默认图片质量为0.7
    // 生成canvas
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    // 创建属性节点
    var anw = document.createAttribute('width')
    anw.nodeValue = w
    var anh = document.createAttribute('height')
    anh.nodeValue = h
    canvas.setAttributeNode(anw)
    canvas.setAttributeNode(anh)
    ctx.drawImage(that, 0, 0, w, h)
    // 图像质量
    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
      quality = obj.quality
    }
    // quality值越小，所绘制出的图像越模糊
    var base64 = canvas.toDataURL('image/jpeg', quality)
    // 回调函数返回base64的值
    callback(base64)
  }
}

// 图片转成base64
function getImgData(img, dir, next) {
  var image = new Image()
  image.onload = function () {
    var degree = 0
    var drawWidth
    var drawHeight
    var width
    var height
    drawWidth = this.naturalWidth
    drawHeight = this.naturalHeight
    // 以下改变一下图片大小
    var canvas = document.createElement('canvas')
    canvas.width = width = drawWidth
    canvas.height = height = drawHeight
    var context = canvas.getContext('2d')
    // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
    switch (dir) {
      // iphone横屏拍摄，此时home键在左侧
      case 3:
        degree = 180
        drawWidth = -width
        drawHeight = -height
        break
      // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width = height
        canvas.height = width
        degree = 90
        drawWidth = width
        drawHeight = -height
        break
      // iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width = height
        canvas.height = width
        degree = 270
        drawWidth = -width
        drawHeight = height
        break
    }
    // 使用canvas旋转校正
    context.rotate((degree * Math.PI) / 180)
    context.drawImage(this, 0, 0, drawWidth, drawHeight)
    // 返回校正图片
    next(canvas.toDataURL('image/jpeg', 0.8))
  }
  image.src = img
}

// 防抖
function _debounce(fn, delay) {
  var newDelay = delay || 200
  var timer
  return function () {
    var th = this
    var args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      timer = null
      fn.apply(th, args)
    }, newDelay)
  }
}

// 节流
function _throttle(fn, interval) {
  var last
  var timer
  var newInterval = interval || 200
  return function () {
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < newInterval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, newInterval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}

export {
  getUrlParams,
  isIOS,
  testMobileType,
  isPhone,
  isCarNum,
  isVehicle,
  isSfz,
  isEmojiCharacter,
  dateFormat,
  TimeFormat,
  getDate,
  formatMomey,
  dealImage,
  getImgData,
  _debounce,
  _throttle
}