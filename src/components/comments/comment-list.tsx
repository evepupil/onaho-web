"use client";

import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import CommentForm from './comment-form';
import { Comment } from '@/types';

interface CommentListProps {
  comments: Comment[];
  contentId: string;
  onCommentAdded?: () => void;
}

const CommentItem: React.FC<{
  comment: Comment;
  contentId: string;
  onReplyAdded?: () => void;
  level?: number;
}> = ({ comment, contentId, onReplyAdded, level = 0 }) => {
  const [replyFormVisible, setReplyFormVisible] = useState(false);
  
  const toggleReplyForm = () => {
    setReplyFormVisible(!replyFormVisible);
  };
  
  const handleReplySubmitted = () => {
    setReplyFormVisible(false);
    if (onReplyAdded) onReplyAdded();
  };
  
  // 最多显示3层嵌套
  const maxLevel = 3;
  
  return (
    <div className={`mb-4 ${level > 0 ? 'ml-6' : ''}`}>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium">{comment.nickname}</div>
          <div className="text-xs text-gray-500">{formatDate(comment.created_at)}</div>
        </div>
        <div className="text-gray-700 mb-2">{comment.content}</div>
        <div className="flex items-center text-sm">
          {level < maxLevel && (
            <button 
              onClick={toggleReplyForm}
              className="text-blue-600 hover:text-blue-800"
            >
              回复
            </button>
          )}
        </div>
        
        {replyFormVisible && (
          <div className="mt-3">
            <CommentForm 
              contentId={contentId} 
              parentId={comment.id}
              onSubmitted={handleReplySubmitted}
              placeholder={`回复 ${comment.nickname}...`}
              buttonText="发表回复"
            />
          </div>
        )}
      </div>
      
      {/* 显示回复 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              contentId={contentId}
              onReplyAdded={onReplyAdded}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentList: React.FC<CommentListProps> = ({ comments, contentId, onCommentAdded }) => {
  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500">
        暂无评论，成为第一个评论的人吧！
      </div>
    );
  }
  
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          contentId={contentId}
          onReplyAdded={onCommentAdded}
        />
      ))}
    </div>
  );
};

export default CommentList; 