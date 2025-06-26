import React from 'react';
import { formatDate } from '@/lib/utils';

interface CommentItemProps {
  nickname: string;
  content: string;
  createdAt: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ nickname, content, createdAt }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
            {nickname.charAt(0).toUpperCase()}
          </div>
          <span className="ml-2 font-medium">{nickname}</span>
        </div>
        <span className="text-sm text-gray-500">{formatDate(createdAt)}</span>
      </div>
      <p className="text-gray-700">{content}</p>
      <div className="mt-3 flex items-center text-sm text-gray-500">
        <button className="flex items-center hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          赞同
        </button>
        <button className="flex items-center ml-4 hover:text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          回复
        </button>
      </div>
    </div>
  );
};

export default CommentItem; 