import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configDomains',
  displayName: '域名配置'
});

model.assign({
  protocol: { n: '协议', type: 'String', f: true, t: true, r: true }, //协议
  host: { n: '域名', type: 'String', f: true, t: true, r: true }, //域名
  port: { n: '端口', type: 'Number', f: true, t: true, r: true } //端口
});

export default model;
