import domain from './domain.route';
import site from './site.route';
import menu from './menu.route';

/** 网站配置 */
export default [
  /** 域名管理 */
  ...domain,
  ...site,
  ...menu
];
