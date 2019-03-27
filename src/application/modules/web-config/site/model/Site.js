import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configSite',
  display: '网站配置'
});

model.assign({
  title: { n: '标题元信息', type: 'String', f: true, t: false, r: true }, //首页标题
  subtitle: { n: '副标题元信息', type: 'String', f: true, t: false, r: true }, //副标题
  keywords: { n: '关键字元信息', type: 'String', f: true, t: false, r: true }, //首页关键字
  separator: { n: '标题分割符', type: 'String', f: true, t: false, r: true }, //标题分割符
  icp: { n: 'icp备案信息', type: 'String', f: true, t: false, r: true }, //icp备案信息
  logo: { n: '站点logo地址', type: 'String', f: true, t: false, r: true }, //站点logo地址
  favicon: { n: '站点图标地址', type: 'String', f: true, t: false, r: true, extra: {comType: 'textarea'}}, //站点图标地址
  description: { n: '描述元信息', type: 'String', f: true, t: false, r: true, extra: {comType: 'textarea'}}, //首页描述元信息
  about: { n: '关于网站', type: 'String', f: true, t: false, r: true, extra: {comType: 'textarea'}}, //关于网站
  footHTML: { n: '网站底部代码', type: 'String', f: true, t: false, r: true, extra: {comType: 'textarea'}} //网站底部代码
});

export default model;
