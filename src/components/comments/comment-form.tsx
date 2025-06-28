"use client";

import React, { useState } from 'react';
import { submitComment } from '@/lib/api';
import { CommentSubmitParams } from '@/types';

interface CommentFormProps {
  contentId: string;
  parentId?: string;
  onSubmitted?: () => void;
  placeholder?: string;
  buttonText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  contentId, 
  parentId,
  onSubmitted,
  placeholder = "写下您的评论...",
  buttonText = "发表评论"
}) => {
  const [nickname, setNickname] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nickname.trim() || !content.trim()) {
      setError('昵称和评论内容不能为空');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const params: CommentSubmitParams = {
        content_id: contentId,
        nickname: nickname.trim(),
        content: content.trim()
      };
      
      if (parentId) {
        params.parent_id = parentId;
      }
      
      await submitComment(params);
      
      // 重置表单
      setNickname('');
      setContent('');
      
      // 通知父组件评论已提交
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err) {
      console.error('提交评论失败:', err);
      setError('提交评论失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg">
      <div className="mb-4">
        <input
          type="text"
          placeholder="您的昵称"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <div className="mb-4">
        <textarea
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      {error && (
        <div className="mb-4 text-red-500 text-sm">{error}</div>
      )}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? '提交中...' : buttonText}
        </button>
      </div>
    </form>
  );
};

export default CommentForm; 