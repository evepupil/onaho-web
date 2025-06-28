"use client";

import { useState, useEffect } from 'react';
import { getComments } from '@/lib/api';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';
import { Comment } from '@/types';

interface CommentSectionProps {
  contentId: string;
}

export default function CommentSection({ contentId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  
  // 加载评论
  const loadComments = async () => {
    if (!contentId) return;
    
    setIsLoadingComments(true);
    try {
      const response = await getComments(contentId);
      setComments(response.data || []);
    } catch (error) {
      console.error('加载评论失败:', error);
    } finally {
      setIsLoadingComments(false);
    }
  };
  
  useEffect(() => {
    if (contentId) {
      loadComments();
    }
  }, [contentId]);
  
  return (
    <div className="border-t pt-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">评论</h2>
      
      {/* 评论表单 */}
      <div className="mb-8">
        <CommentForm 
          contentId={contentId} 
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
            contentId={contentId}
            onCommentAdded={loadComments}
          />
        )}
      </div>
    </div>
  );
} 