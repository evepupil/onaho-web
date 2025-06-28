/**
 * 内容类型，包括产品和测评
 */
export interface Content {
  id: string;
  slug: string;
  title: string;
  content: string;
  type: 'product' | 'review';
  cover_image: string;
  created_at: string;
  updated_at: string;
  brand?: string; // 产品或测评的品牌
  tags?: string[]; // 标签列表
  rating?: number; // 评分（1-5星）
}

/**
 * 评论类型
 */
export interface Comment {
  id: string;
  content_id: string;  // 关联的文章ID
  parent_id: string | null;  // 父评论ID，如果是顶级评论则为null
  nickname: string;  // 评论者昵称
  content: string;  // 评论内容
  created_at: string;  // 创建时间
  replies?: Comment[];  // 子评论/回复
}

/**
 * 评论提交参数
 */
export interface CommentSubmitParams {
  content_id: string;
  parent_id?: string | null;
  nickname: string;
  content: string;
}

/**
 * 分页结果类型
 */
export interface PaginatedResult<T> {
  data: T[];
  count: number;
} 