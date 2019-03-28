import _ from 'lodash';

/**
  * @description GeneralEdit 通用表单弹窗。
  */
export default class GeneralEdit {

  /**
   * @description 构造函数
   */
  constructor(vueComponentInstance, opts = {}) {
    this.parent = vueComponentInstance;
    this.isShow = false;
    this.me = this;

    this.title = opts.title || '编辑';
    this.form = opts.form || '';
    this.width = opts.width || 700;
    this._create = opts.create || '';
    this._update = opts.update || '';
  }

  /**
   * @description 显示Dialog
   */
  _show(data = {}, type = 'create') {
    //合并对象
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        let value = data[key];
        this[key] = value;
      }
    }
    this._type = type;
    this.isShow = true;
  }

  /**
   * @description 显示Dialog
   */
  create(data = {}) {
    this._show(data, 'create');
  }

  /**
   * @description 显示Dialog
   */
  update(data = {}) {
    this._show(data, 'update');
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
  onConfirm(form, index) {
    let res = form.validator.all();
    console.log(res);
    if (res.length > 0) {
      this.parent.$Message({
        type: 'error',
        text: res[0].displayName + '格式的格式不正确且不能为空'
      });
      return;
    }
    if (this._type === 'create') {
      if ( typeof this._create === 'function' ) {
        this._create.call(this.parent, form);
        this.onClose();
      }
    } else if (this._type === 'update') {
      if ( typeof this._update === 'function' ) {
        this._update.call(this.parent, form, index);
        this.onClose();
      }
    }
  }
}