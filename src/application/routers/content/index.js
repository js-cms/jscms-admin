import categories from './categories.route';
import artilces from './artilces.route';
import tags from './tags.route';
import comments from './comments.route';

/** 内容管理 */
export default [
  /** 分类管理 */
  ...categories,
  /** 文章管理 */
  ...artilces,
  /** 标签列表 */
  ...tags,
  /** 评论管理 */
  ...comments
];
