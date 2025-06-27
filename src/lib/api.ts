import { Content, Comment, PaginatedResult } from '@/types';

/**
 * API 响应接口
 */
interface ApiResponse<T> {
  data: T;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  count?: number;
  success?: boolean;
  error?: string;
}

/**
 * 内容详情响应接口
 */
interface ContentDetailResponse {
  content: Content;
  comments: Comment[];
  related: Content[];
}

/**
 * 评论提交参数接口
 */
interface CommentSubmitParams {
  content: string;
  nickname: string;
  content_id: string;
}

/**
 * 内容查询参数接口
 */
interface ContentQueryParams {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'az' | 'za' | 'rating';
  tag?: string;
  brand?: string;
  search?: string;
}

/**
 * API 基础 URL
 */
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // client-side
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
};

const API_BASE_URL = `${getBaseUrl()}/api`;

/**
 * 构建查询字符串
 */
function buildQueryString(params: Record<string, any>): string {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
  
  return query ? `?${query}` : '';
}

/**
 * 获取所有内容列表
 */
export async function getAllContents(params: ContentQueryParams = {}): Promise<ApiResponse<Content[]>> {
  const queryString = buildQueryString(params);
  const response = await fetch(`${API_BASE_URL}/contents${queryString}`);
  
  if (!response.ok) {
    throw new Error(`获取内容列表失败: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 按类型获取内容列表
 */
export async function getContentsByType(
  type: 'product' | 'review',
  params: ContentQueryParams = {}
): Promise<ApiResponse<Content[]>> {
  const newParams = { ...params, type };
  const queryString = buildQueryString(newParams);
  const response = await fetch(`${API_BASE_URL}/contents${queryString}`);
  
  if (!response.ok) {
    throw new Error(`获取${type === 'product' ? '产品' : '测评'}列表失败: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 获取内容详情
 */
export async function getContentDetail(slug: string): Promise<ContentDetailResponse> {
  const response = await fetch(`${API_BASE_URL}/contents/${slug}`);
  
  if (!response.ok) {
    throw new Error(`获取内容详情失败: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 获取内容的评论列表
 */
export async function getComments(contentId: string): Promise<ApiResponse<Comment[]>> {
  const response = await fetch(`${API_BASE_URL}/comments?content_id=${contentId}`);
  
  if (!response.ok) {
    throw new Error(`获取评论列表失败: ${response.status}`);
  }
  
  return response.json();
}

/**
 * 提交评论
 */
export async function submitComment(params: CommentSubmitParams): Promise<ApiResponse<Comment>> {
  const response = await fetch(`${API_BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  });
  
  if (!response.ok) {
    throw new Error(`提交评论失败: ${response.status}`);
  }
  
  return response.json();
}