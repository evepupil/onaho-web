import React from 'react';
import CommentItem from './comment-item';
import { formatDate } from '@/lib/utils';

interface Comment {
  id: string;
  content: string;
  nickname: string;
  content_id: string;
  created_at: string;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无评论，来发表第一条评论吧！
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          nickname={comment.nickname}
          content={comment.content}
          createdAt={comment.created_at}
        />
      ))}
    </div>
  );
};

export default CommentList; 