import _ from 'lodash';

/**
  * @description GeneralEdit 通用表单弹窗。
  */
export default class GeneralEdit {

  /**
   * @description 构造函数
   */
  constructor(vueComponentInstance, opts = {}) {
    this.that = vueComponentInstance;
    this.isShow = false;
    this.me = this;
    if ( opts.form ) {
      this.form = opts.form;
      console.log(this.form);
    }
  }

  /**
   * @description 显示Dialog
   */
  show(data = {}) {
    //合并对象
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];
        this[key] = value;
      }
    }
    this.isShow = true;
  }

  /**
   * @description 关闭事件
   */
  onClose() {
    this.isShow = false;
  }

  /**
   * @description 取消事件
   */
  onCancel() {
    this.isShow = false;
  }

  /**
   * @description 确认事件
   */
  onConfirm(result) {
    
  }
}