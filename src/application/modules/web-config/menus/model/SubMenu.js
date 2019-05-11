export default class SubMenu {
  constructor() {
    this.order = 0; // 菜单顺序
    this.name = ''; // 菜单名称
    this.type = 'category'; // 菜单类型 category:文章分类,link:自定义链接
    this.alias = ''; // 菜单别名
    this.link = ''; // 菜单链接
    this.categoryId = ''; // 分类id
    this.activeUrl = ''; // 链接高亮匹配
  }
}