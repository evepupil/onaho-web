import React from 'react';
import Link from 'next/link';
import ContentCard from '@/components/shared/content-card';

interface Product {
  id: string;
  slug: string;
  title: string;
  content: string;
  type: 'product';
  cover_image: string;
  created_at: string;
  updated_at: string;
}

export default async function ProductsPage() {
  // 在实际应用中，我们会从数据库获取产品数据
  // 这里使用模拟数据
  const mockProducts: Product[] = [
    {
      id: '1',
      slug: 'product-1',
      title: '高品质机械键盘',
      content: '这是一款高品质的机械键盘，采用Cherry MX轴体，带来极佳的打字体验...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'product-2',
      title: '人体工学办公椅',
      content: '这款人体工学办公椅采用优质材料，支持多角度调节，让您的办公更加舒适...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'product-3',
      title: '超薄笔记本电脑',
      content: '这款笔记本电脑采用全金属机身，厚度仅为15mm，配备高性能处理器和大容量电池...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '4',
      slug: 'product-4',
      title: '无线蓝牙耳机',
      content: '这款无线蓝牙耳机采用最新蓝牙5.2技术，提供稳定连接和高品质音频体验...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '5',
      slug: 'product-5',
      title: '智能手表',
      content: '这款智能手表配备高清AMOLED显示屏，支持心率监测、睡眠追踪等多种健康功能...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '6',
      slug: 'product-6',
      title: '专业摄影三脚架',
      content: '这款专业摄影三脚架采用碳纤维材质，轻便坚固，适合各种拍摄场景...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '7',
      slug: 'product-7',
      title: '高性能游戏鼠标',
      content: '这款游戏鼠标采用高精度传感器，最高16000 DPI，8个可编程按钮，适合各类游戏玩家...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '8',
      slug: 'product-8',
      title: '4K超高清显示器',
      content: '这款4K显示器拥有出色的色彩还原和锐利的图像质量，适合专业设计和日常办公使用...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '9',
      slug: 'product-9',
      title: '便携式移动电源',
      content: '这款移动电源容量高达20000mAh，支持快充技术，可同时为多台设备充电...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '10',
      slug: 'product-10',
      title: '无线充电底座',
      content: '这款无线充电底座支持多设备同时充电，兼容各种支持无线充电的手机和耳机...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '11',
      slug: 'product-11',
      title: '智能家居控制中心',
      content: '这款智能家居控制中心可以连接并控制家中各种智能设备，支持语音控制和远程操作...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '12',
      slug: 'product-12',
      title: '便携式蓝牙音箱',
      content: '这款蓝牙音箱音质出众，电池续航长达24小时，防水设计让您在各种环境中都能享受音乐...',
      type: 'product',
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

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
        {mockProducts.map((product) => (
          <ContentCard
            key={product.id}
            id={product.id}
            slug={product.slug}
            title={product.title}
            excerpt={product.content}
            coverImage={product.cover_image}
            createdAt={product.created_at}
            type={product.type}
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
            className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            8
          </a>
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