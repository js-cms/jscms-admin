import { req } from '@/application/common/request/index.js';
import CryptoJS from 'crypto-js';

const toBase64 = function(str) {
  let utf8str = CryptoJS.enc.Utf8.parse(str);
  let base64Str = CryptoJS.enc.Base64.stringify(utf8str);
  return base64Str
}

/**
 * 增删改查封装
 */
export default async function curd(modelName, method, params) {
  if ( method === 'one' ) {
    return req.get(`/api/crud/${modelName.toLowerCase()}/${method}?query=${toBase64(JSON.stringify(params.query || {}))}`);
  } else if (method === 'list') {
    return req.get(`/api/crud/${modelName.toLowerCase()}/${method}?query=${toBase64(JSON.stringify(params.query || {}))}&pageSize=${params.pageSize}&pageNum=${params.pageNum}`);
  } else {
    let _params = {};
    if ( params.query ) {
      _params.query = toBase64(JSON.stringify(params.query));
    }
    if ( params.data ) {
      _params.data = toBase64(JSON.stringify(params.data));
    }
    return req.post(`/api/crud/${modelName.toLowerCase()}/${method}`, _params);
  }
}
