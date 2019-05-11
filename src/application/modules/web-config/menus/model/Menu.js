export default class Menu {
  constructor() {
    this.order = 0; // 菜单顺序
    this.name = ''; // 菜单名称
    this.type = 'category'; // 菜单类型 category:文章分类,link:自定义链接
    this.alias = ''; // 菜单别名
    this.link = ''; // 菜单链接
    this.categoryId = ''; // 分类id
    this.children = []; // 子菜单
    this.activeUrl = ''; // 链接高亮匹配
  }
}

// import modelman from 'modelman';
// let model = new modelman.Model({
//   name: 'configMenus',
//   displayName: '菜单配置'
// });

// model.assign({
//   order: { n: '菜单顺序', type: 'Number', f: true, t: true, r: true, d: 0 }, //菜单顺序
//   name: { n: '菜单名称', type: 'String', f: true, t: true, r: true }, //菜单名称
//   alias: { n: '菜单别名', type: 'String', f: true, t: true, r: true }, //菜单别名
//   link: { n: '菜单链接', type: 'String', f: true, t: true, r: true }, //菜单链接
//   children: { n: '子菜单', type: 'Any' }, //子菜单
//   activeUrl: { n: '链接高亮匹配', type: 'String', f: true, t: true, r: false, p: '比如：@/page.html' } //链接高亮匹配
// });

// export default model;
