/**
 * DraftArticle 草稿箱弹窗
 */

export default class DraftArticle {

  /**
   * @description 构造函数
   */
  constructor(vueComponentInstance, opts = {}) {
    this.parent = vueComponentInstance;
    this.isShow = false;
    this.me = this;
  }

  show() {
    this.isShow = true;
  }
}
