export interface FileObj {
  id?: string; // 主键
  origPath?: string; // 原文件路径
  thumbPath?: string; //  缩略文件路径(图片类型文件)
  name?: string; // 资源名称
  createTime?: string; // 创建时间
  size?: string; // 大小
  type?: string; // 类型(jpg, gift, png, xls, doc
  status?: string; // 状态(1:正常，0:删除)
  token?: string;
  base64?: string; // base64字符串
  parameter?: string; // 自定义参数,原文返回
}
