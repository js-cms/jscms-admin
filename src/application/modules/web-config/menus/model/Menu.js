export default class Menu {
  constructor() {
    this.order = 0; // 序号
    this.name = ''; // 菜单名称
    this.type = 'category'; // 菜单类型 category:文章分类,link:自定义链接
    this.alias = ''; // 菜单别名
    this.link = ''; // 菜单链接
    this.categoryId = ''; // 分类id
    this.activeUrl = ''; // 链接高亮匹配
    this.children = []; // 子菜单
    this.showChildren = false; //是否显示子菜单
  }
}