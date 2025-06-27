import React from 'react';
import { generateId } from '@/lib/utils';

interface CommentFormProps {
  contentId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ contentId }) => {
  return (
    <form className="mb-8">
      <div className="mb-4">
        <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-1">
          昵称
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="请输入您的昵称"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          评论内容
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="请输入您的评论"
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
            记住我的信息
          </label>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          提交评论
        </button>
      </div>
    </form>
  );
};

export default CommentForm; 