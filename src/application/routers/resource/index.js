import images from './images.route';
import files from './files.route';

/** 资源管理 */
export default [
  /** 图片管理 */
  ...images,
  /** 文件管理 */
  ...files
];
