import admin from './admin.route';
import search from './search.route';
import access from './access.route';

/** 日志管理 */
export default [
  /** 后台操作日志 */
  ...admin,
  /** 搜索记录 */
  ...search,
  /** 访问日志 */
  ...access
];
