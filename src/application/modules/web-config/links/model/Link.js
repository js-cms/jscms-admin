import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configLinks',
  displayName: '链接配置'
});

model.assign({
  order: { n: '链接顺序', type: 'Number', f: true, t: true, r: true, d: 0 }, //链接顺序
  name: { n: '链接名称', type: 'String', f: true, t: true, r: true }, //链接名称
  logo: { n: '链接logo', type: 'Url', f: true, t: true, r: false }, //链接logo
  url: { n: '链接地址', type: 'String', f: true, t: true, r: true }, //链接地址
  desc: { n: '链接描述', type: 'String', f: true, t: true, r: false } //链接描述
});

export default model;
