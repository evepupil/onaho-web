"use client";

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getContentDetail, getComments } from '@/lib/api';
import { markdownToHtml } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';
import { Comment } from '@/types';

/**
 * 内容详情页面的属性接口
 */
interface ContentDetailPageProps {
  params: {
    type: string;
    id: string;
  };
}

export default function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { type, id } = params;
  
  const [content, setContent] = useState<any>(null);
  const [contentHtml, setContentHtml] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  
  // 加载文章内容
  useEffect(() => {
    async function loadContent() {
      setIsLoading(true);
      try {
        const response = await getContentDetail(id);
        if (response.content && response.content.type === type) {
          setContent(response.content);
          
          // 将Markdown转换为HTML
          const html = await markdownToHtml(response.content.content);
          setContentHtml(html);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('获取内容详情失败:', error);
        notFound();
      } finally {
        setIsLoading(false);
      }
    }
    
    loadContent();
  }, [id, type]);
  
  // 加载评论
  const loadComments = async () => {
    if (!content?.id) return;
    
    setIsLoadingComments(true);
    try {
      const response = await getComments(content.id);
      setComments(response.data || []);
    } catch (error) {
      console.error('加载评论失败:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };
  
  useEffect(() => {
    if (content?.id) {
      loadComments();
    }
  }, [content?.id]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
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
      <div className="relative w-full h-96 mb-8">
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
          {content.tags.map((tag: string, index: number) => (
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
      <div className="border-t pt-8 mt-8">
        <h2 className="text-2xl font-bold mb-6">评论</h2>
        
        {/* 评论表单 */}
        <div className="mb-8">
          <CommentForm 
            contentId={content.id} 
            onSubmitted={loadComments}
          />
        </div>
        
        {/* 评论列表 */}
        <div>
          {isLoadingComments ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <CommentList 
              comments={comments} 
              contentId={content.id}
              onCommentAdded={loadComments}
            />
          )}
        </div>
      </div>
    </div>
  );
} 