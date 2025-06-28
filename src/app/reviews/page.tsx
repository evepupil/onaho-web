import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/shared/content-card';
import { getContentsByType } from '@/lib/api';
import { Content } from '@/types';

export default async function ReviewsPage() {
  // 使用 API 服务获取测评数据
  const response = await getContentsByType('review', { limit: 12, sort: 'newest' });
  const reviews = response.data;
  const pagination = response.pagination;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">产品测评</h1>
        <p className="text-gray-600">专业、客观的产品测评，帮助您做出明智的购买决策</p>
      </div>

      {/* 筛选器 */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">排序方式</label>
            <select
              id="sort"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="newest"
            >
              <option value="newest">最新发布</option>
              <option value="oldest">最早发布</option>
              <option value="az">标题 A-Z</option>
              <option value="za">标题 Z-A</option>
              <option value="rating">评分最高</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">类别</label>
            <select
              id="category"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="all"
            >
              <option value="all">全部类别</option>
              <option value="electronics">电子产品</option>
              <option value="furniture">家具</option>
              <option value="accessories">配件</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <input
              type="text"
              id="search"
              placeholder="搜索测评..."
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 测评列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reviews.map((review) => (
          <ContentCard
            key={review.id}
            id={review.id}
            title={review.title}
            excerpt={review.content}
            coverImage={review.cover_image}
            createdAt={review.created_at}
            type={review.type}
            brand={review.brand}
            tags={review.tags}
            rating={review.rating}
          />
        ))}
      </div>

      {/* 分页 */}
      {pagination && (
        <div className="mt-8 flex justify-center">
          <nav className="inline-flex rounded-md shadow">
            <a
              href="#"
              className={`px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                pagination.page <= 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              上一页
            </a>
            
            {Array.from({ length: Math.min(pagination.totalPages, 3) }, (_, i) => (
              <a
                key={i}
                href="#"
                className={`px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${
                  i + 1 === pagination.page ? 'text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </a>
            ))}
            
            {pagination.totalPages > 3 && (
              <span className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
            )}
            
            {pagination.totalPages > 3 && (
              <a
                href="#"
                className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                {pagination.totalPages}
              </a>
            )}
            
            <a
              href="#"
              className={`px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                pagination.page >= pagination.totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              下一页
            </a>
          </nav>
        </div>
      )}
    </div>
  );
} 