import modelman from 'modelman';

let model = new modelman.Model({
  name: 'Access',
  displayName: '访问记录'
});

model.assign({
  fullUrl: { n: '完整网址', type: 'Stirng', f: false, t: true }, //完整网址
  params: { n: '携带参数', type: 'Object', f: false, t: true }, //携带参数
  searcherIp: { n: '搜索者ip', type: 'Stirng', f: false, t: true }, //搜索者ip
  searcherReferer: { n: 'Referer', type: 'Stirng', f: false, t: true }, //Referer
  searcherUserAgent: { n: 'UserAgent', type: 'Stirng', f: false, t: true }, //UserAgent
  createTime: { n: '创建时间', type: 'Timestamp', f: true, t: true, r: true } //创建时间
});

export default model;
