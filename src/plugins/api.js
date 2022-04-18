import qs from 'qs';
import { apiAxios} from "./request.js";

const time = () => {
  return new Promise((res) => {
    var i = 5
    var inter = setInterval(() => {

      if (i <= 0) {
        res()
        window.clearInterval(inter)
        return
      }
      console.log('请稍等: ' + i + '秒');
      i--
    }, 1000);
  })
}
const trahs = (params) => {
  return apiAxios({
    method: 'get',
    url: "api/sjbz?method=1&type=sina",
    params,
    loading: '查询中'
  })
}
const slang = () => {
  return apiAxios({
    method: 'post',
    url: 'api/dujitang',
    data: qs.stringify({
      api_key: '03e90402e747185c'
    })
  })
}

export {
  time,
  trahs,
  slang
}
