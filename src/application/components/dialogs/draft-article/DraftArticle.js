/**
 * DraftArticle 草稿箱弹窗
 */

export default class DraftArticle {

  /**
   * 构造函数
   */
  constructor(vueComponentInstance, opts = {}) {
    this.parent = vueComponentInstance;
    this.isShow = false;
    this.me = this;
  }

  /**
   * 取消事件
   */
  onCancel() {
    this.isShow = false;
  }

  /**
   * 关闭
   */
  close() {
    this.isShow = false;
  }

  /**
   * 主动显示
   */
  show() {
    this.isShow = true;
  }
}
