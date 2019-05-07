import site from './site.route';
import notices from './notices.route';
import domains from './domains.route';
import menus from './menus.route';
import links from './links.route';
import robots from './robots.route';

/** 站点配置 */
export default [
  /** 网站配置 */
  ...site,
  /** 公告管理 */
  ...notices,
  /** 域名配置 */
  ...domains,
  /** 菜单配置 */
  ...menus,
  /** 链接配置 */
  ...links,
  /** robots配置 */
  ...robots,
];
