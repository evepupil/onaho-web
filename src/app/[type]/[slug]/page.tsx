import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getContentDetail } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { markdownToHtml } from '@/lib/markdown';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';

interface ContentDetailPageProps {
  params: {
    type: string;
    slug: string;
  };
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { type, slug } = params;
  
  // 验证类型是否有效
  if (type !== 'product' && type !== 'review') {
    notFound();
  }
  
  try {
    // 获取内容详情
    const response = await getContentDetail(slug);
    const { content, comments } = response;
    
    // 确保内容类型与URL中的类型匹配
    if (content.type !== type) {
      notFound();
    }
    
    // 将Markdown转换为HTML
    const contentHtml = await markdownToHtml(content.content);
    
    return (
      <div className="container mx-auto px-4 py-8">
        {/* 面包屑导航 */}
        <div className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href={`/${type === 'product' ? 'products' : 'reviews'}`} className="hover:text-blue-600">
            {type === 'product' ? '产品' : '测评'}
          </Link>
          <span className="mx-2">/</span>
          <span>{content.title}</span>
        </div>
        
        {/* 内容标题和元数据 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
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
        </div>
        
        {/* 内容封面图 */}
        <div className="relative h-80 w-full mb-8">
          <Image
            src={content.cover_image}
            alt={content.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            priority
          />
        </div>
        
        {/* 标签 */}
        {content.tags && content.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {content.tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* 内容主体 */}
        <div 
          className="prose max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
        
        {/* 评论区 */}
        <div className="border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">评论 ({comments.length})</h2>
          <CommentForm contentId={content.id} />
          <div className="mt-8">
            <CommentList comments={comments} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('获取内容详情失败:', error);
    notFound();
  }
} 