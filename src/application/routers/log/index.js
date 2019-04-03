import search from './search.route';
import access from './access.route';

/** 日志管理 */
export default [
  /** 搜索记录 */
  ...search,
  /** 访问日志 */
  ...access
];
