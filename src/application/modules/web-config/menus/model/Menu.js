import modelman from 'modelman';

let model = new modelman.Model({
  name: 'configMenus',
  displayName: '菜单配置'
});

model.assign({
  order: { n: '菜单顺序', type: 'Number', f: true, t: true, r: true, d: 0 }, //菜单顺序
  name: { n: '菜单名称', type: 'String', f: true, t: true, r: true }, //菜单名称
  alias: { n: '菜单别名', type: 'String', f: true, t: true, r: true }, //菜单别名
  link: { n: '菜单链接', type: 'String', f: true, t: true, r: true }, //菜单链接
  activeUrl: { n: '链接高亮匹配', type: 'String', f: true, t: true, r: false, p: '比如：@/page.html' } //链接高亮匹配
});

export default model;
