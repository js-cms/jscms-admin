import artilces from './artilces.route';
import comments from './comments.route';

/** 内容管理 */
export default [
  /** 文章管理 */
  ...artilces,
  /** 评论管理 */
  ...comments
];
