import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Access',
  displayName: '访问记录'
});

model.assign({
  method: { n: '请求方法', type: 'Stirng', f: false, t: true }, //请求的方式
  params: { n: '携带参数', type: 'Object', f: false, t: true }, //携带参数
  fullUrl: { n: '完整网址', type: 'Stirng', f: false, t: true }, //完整网址
  visitorIp: { n: '访问者ip', type: 'Stirng', f: false, t: true }, //访问者ip
  visitorReferer: { n: 'Referer', type: 'Stirng', f: false, t: true }, //Referer
  visitorUserAgent: { n: 'UserAgent', type: 'Stirng', f: false, t: true }, //UserAgent
  headers: { n: 'headers', type: 'Object', f: false, t: false }, //headers
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true }, //创建时间
  updateTime: { n: '更新时间', type: 'Timestamp', f: true, t: true, r: true } //更新时间
});

export default model;
