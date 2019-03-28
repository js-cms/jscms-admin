import domains from './domains.route';
import site from './site.route';
import menus from './menus.route';
import links from './links.route';

/** 网站配置 */
export default [
  /** 域名管理 */
  ...domains,
  ...site,
  ...menus,
  ...links
];
