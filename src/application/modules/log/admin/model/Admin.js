import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Admin',
  displayName: '后台操作日志'
});

model.assign({
  opName: { n: '操作名称', type: 'String', f: true, t: true }, //操作名称
  method: { n: '请求方法', type: 'Stirng', f: false, t: true }, //请求的方式
  params: { n: '携带参数', type: 'Object', f: false, t: true }, //携带参数
  fullUrl: { n: '完整网址', type: 'Stirng', f: false, t: true }, //完整网址
  opIp: { n: '操作者ip', type: 'Stirng', f: false, t: true }, //访问者ip
  opReferer: { n: 'Referer', type: 'Stirng', f: false, t: true }, //Referer
  opUserAgent: { n: 'UserAgent', type: 'Stirng', f: false, t: true }, //UserAgent
  opHeaders: { n: 'headers', type: 'Object', f: false, t: false }, //headers
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true } //创建时间
});

export default model;
