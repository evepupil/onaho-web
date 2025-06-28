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
  return 'http://localhost:3000'; // 在服务器端渲染时使用完整的本地URL
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
  try {
    const queryString = buildQueryString(params);
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/contents${queryString}`;
    
    console.log(`尝试获取所有内容列表，URL: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error(`获取内容列表失败: ${response.status}`);
      throw new Error(`获取内容列表失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取内容列表出错:', error);
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      }
    };
  }
}

/**
 * 按类型获取内容列表
 */
export async function getContentsByType(
  type: 'product' | 'review',
  params: ContentQueryParams = {}
): Promise<ApiResponse<Content[]>> {
  try {
    const newParams = { ...params, type };
    const queryString = buildQueryString(newParams);
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/contents${queryString}`;
    
    console.log(`尝试获取内容列表，URL: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store', // 禁用缓存
      next: { revalidate: 0 } // 禁用Next.js的缓存
    });
    
    if (!response.ok) {
      console.error(`获取${type}列表失败: ${response.status}`);
      throw new Error(`获取${type === 'product' ? '产品' : '测评'}列表失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`获取${type}列表出错:`, error);
    // 返回一个空的响应，避免整个页面崩溃
    return {
      data: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0
      }
    };
  }
}

/**
 * 获取内容详情
 * @param id 内容ID
 */
export async function getContentDetail(id: string): Promise<ContentDetailResponse> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/contents/${id}`;
    console.log(`尝试获取内容详情，URL: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error(`获取内容详情失败: ${response.status}`);
      throw new Error(`获取内容详情失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`获取内容详情出错:`, error);
    throw error; // 在详情页面，我们需要抛出错误以便显示404页面
  }
}

/**
 * 获取内容的评论列表
 */
export async function getComments(contentId: string): Promise<ApiResponse<Comment[]>> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/comments?content_id=${contentId}`;
    console.log(`尝试获取评论列表，URL: ${url}`);
    
    const response = await fetch(url, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    
    if (!response.ok) {
      console.error(`获取评论列表失败: ${response.status}`);
      throw new Error(`获取评论列表失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('获取评论列表出错:', error);
    return {
      data: [],
      count: 0
    };
  }
}

/**
 * 提交评论
 */
export async function submitComment(params: CommentSubmitParams): Promise<ApiResponse<Comment>> {
  try {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}/api/comments`;
    console.log(`尝试提交评论，URL: ${url}`);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error(`提交评论失败: ${response.status}`);
      throw new Error(`提交评论失败: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('提交评论出错:', error);
    throw error;
  }
}