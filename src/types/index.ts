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
}

/**
 * 评论类型
 */
export interface Comment {
  id: string;
  content: string;
  nickname: string;
  content_id: string;
  created_at: string;
}

/**
 * 分页结果类型
 */
export interface PaginatedResult<T> {
  data: T[];
  count: number;
} 