import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/shared/content-card';
import { getContentsByType } from '@/lib/api';
import { Content } from '@/types';

export default async function ProductsPage() {
  // 使用 API 服务获取产品数据
  const response = await getContentsByType('product', { limit: 12 });
  const products = response.data;
  const pagination = response.pagination;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">产品列表</h1>
        <p className="text-gray-600">浏览我们精选的高品质产品</p>
      </div>

      {/* 筛选器 - 未来可以添加更多功能 */}
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
              <option value="az">名称 A-Z</option>
              <option value="za">名称 Z-A</option>
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
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">品牌</label>
            <select
              id="brand"
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
              defaultValue="all"
            >
              <option value="all">全部品牌</option>
              <option value="xiaomi">小米</option>
              <option value="huawei">华为</option>
              <option value="logitech">罗技</option>
              <option value="sony">索尼</option>
              <option value="jbl">JBL</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">搜索</label>
            <input
              type="text"
              id="search"
              placeholder="搜索产品..."
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 产品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ContentCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.title}
            excerpt={product.content}
            coverImage={product.cover_image}
            createdAt={product.created_at}
            type={product.type}
            brand={product.brand}
            tags={product.tags}
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