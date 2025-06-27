import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/shared/content-card';

interface Review {
  id: string;
  slug: string;
  title: string;
  content: string;
  type: 'review';
  cover_image: string;
  created_at: string;
  updated_at: string;
}

export default async function ReviewsPage() {
  // 在实际应用中，我们会从数据库获取测评数据
  // 这里使用模拟数据
  const mockReviews: Review[] = [
    {
      id: '1',
      slug: 'review-1',
      title: '2023年最值得购买的5款机械键盘',
      content: '机械键盘市场竞争激烈，本文将为您详细介绍2023年最值得购买的5款机械键盘...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'review-2',
      title: '办公椅选购指南：如何选择适合自己的办公椅',
      content: '一张好的办公椅对于长时间工作的人来说至关重要，本文将为您介绍如何选择适合自己的办公椅...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'review-3',
      title: '轻薄笔记本横评：性能与便携的平衡',
      content: '轻薄笔记本如何在性能和便携性之间取得平衡？本文将对市面上主流的轻薄笔记本进行横评...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      slug: 'review-4',
      title: '无线耳机音质大比拼',
      content: '随着技术的进步，无线耳机的音质已经接近甚至超越有线耳机，本文将对几款热门无线耳机进行音质测试...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      slug: 'review-5',
      title: '智能手表功能对比：哪款最适合日常使用？',
      content: '市面上的智能手表功能各异，价格差异也很大，本文将帮助您找到最适合日常使用的智能手表...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      slug: 'review-6',
      title: '专业摄影器材入门指南',
      content: '对于摄影爱好者来说，选择合适的器材是提高摄影水平的重要一步，本文将为您提供专业摄影器材入门指南...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '7',
      slug: 'review-7',
      title: '游戏鼠标选购攻略：如何选择最适合自己的游戏鼠标',
      content: '一款好的游戏鼠标可以显著提升游戏体验，本文将从传感器、按键、人体工学等多个方面为您介绍如何选择游戏鼠标...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '8',
      slug: 'review-8',
      title: '4K显示器横评：哪款更适合专业设计工作',
      content: '对于设计师来说，一台色彩准确、分辨率高的显示器至关重要，本文将对市面上主流的4K显示器进行专业测评...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '9',
      slug: 'review-9',
      title: '移动电源选购指南：容量、快充、安全性全面分析',
      content: '随着智能设备的普及，移动电源已成为必备配件，本文将从容量、快充技术、安全性等方面为您详细分析如何选择移动电源...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '10',
      slug: 'review-10',
      title: '无线充电技术发展与产品对比',
      content: '无线充电技术正在快速发展，本文将介绍当前主流的无线充电技术标准，并对市面上热门的无线充电产品进行对比测评...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '11',
      slug: 'review-11',
      title: '智能家居系统对比：哪个平台更适合普通家庭',
      content: '随着智能家居的普及，选择一个合适的智能家居系统变得越来越重要，本文将对主流的智能家居平台进行详细对比...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '12',
      slug: 'review-12',
      title: '便携蓝牙音箱音质测试：小身材大音质',
      content: '便携蓝牙音箱因其便携性和不错的音质受到越来越多人的喜爱，本文将对市面上热门的便携蓝牙音箱进行专业音质测试...',
      type: 'review',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

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
        {mockReviews.map((review) => (
          <ContentCard
            key={review.id}
            id={review.id}
            slug={review.slug}
            title={review.title}
            excerpt={review.content}
            coverImage={review.cover_image}
            createdAt={review.created_at}
            type={review.type}
          />
        ))}
      </div>

      {/* 分页 */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex rounded-md shadow">
          <a
            href="#"
            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            上一页
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-blue-600 hover:bg-gray-50"
          >
            1
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            2
          </a>
          <a
            href="#"
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            3
          </a>
          <span className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
            ...
          </span>
          <a
            href="#"
            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            下一页
          </a>
        </nav>
      </div>
    </div>
  );
} 