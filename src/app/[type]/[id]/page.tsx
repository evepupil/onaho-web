import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentDetail } from '@/lib/api';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';
import CommentSection from './comment-section';

/**
 * 内容详情页面的属性接口
 */
interface ContentDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { type, id } = params;
  
  // 验证类型是否有效
  if (type !== 'product' && type !== 'review') {
    notFound();
  }
  
  try {
    // 获取内容详情
    const response = await getContentDetail(id);
    const { content } = response;
    
    // 确保内容类型与URL中的类型匹配
    if (content.type !== type) {
      notFound();
    }
    
    // 将Markdown转换为HTML
    const contentHtml = await markdownToHtml(content.content);
    
    return (
      <div className="container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <div className="mb-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type === 'product' ? 'products' : 'reviews'}`} className="hover:text-blue-600">
            {type === 'product' ? '产品' : '测评'}
          </Link>
          <span className="mx-2">/</span>
          <span>{content.title}</span>
        </div>
        
        {/* 内容标题 */}
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        
        {/* 元数据和标签在同一行 */}
        <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-4">
          {/* 左侧元数据 */}
          <div className="flex items-center gap-4">
            <div>发布时间: {formatDate(content.created_at)}</div>
            {content.brand && <div>品牌: {content.brand}</div>}
            {content.rating && type === 'review' && (
              <div className="flex items-center">
                评分: 
                <span className="text-yellow-400 ml-1 font-bold">{content.rating}</span>
                <span className="ml-1">/ 5</span>
              </div>
            )}
          </div>
          
          {/* 右侧标签 */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* 分隔线 */}
        <hr className="border-t border-gray-200 mb-6" />
        
        {/* 内容主体 */}
        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        {/* 评论区 - 使用客户端组件 */}
        <CommentSection contentId={content.id} />
      </div>
    );
  } catch (error) {
    console.error('获取内容详情失败:', error);
    notFound();
  }
} 