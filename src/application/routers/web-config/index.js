import site from './site.route';
import domains from './domains.route';
import menus from './menus.route';
import links from './links.route';

/** 站点配置 */
export default [
  /** 网站配置 */
  ...site,
  /** 域名配置 */
  ...domains,
  /** 菜单配置 */
  ...menus,
  /** 链接配置 */
  ...links
];
