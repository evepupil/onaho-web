import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContentCard from '@/components/shared/content-card';

export default async function Home() {
  // 获取最新产品和测评
  // 由于我们还没有实际数据，这里使用模拟数据
  const mockProducts = [
    {
      id: '1',
      slug: 'product-1',
      title: '高品质机械键盘',
      content: '这是一款高品质的机械键盘，采用Cherry MX轴体，带来极佳的打字体验...',
      type: 'product' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'product-2',
      title: '人体工学办公椅',
      content: '这款人体工学办公椅采用优质材料，支持多角度调节，让您的办公更加舒适...',
      type: 'product' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'product-3',
      title: '超薄笔记本电脑',
      content: '这款笔记本电脑采用全金属机身，厚度仅为15mm，配备高性能处理器和大容量电池...',
      type: 'product' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  const mockReviews = [
    {
      id: '1',
      slug: 'review-1',
      title: '2023年最值得购买的5款机械键盘',
      content: '机械键盘市场竞争激烈，本文将为您详细介绍2023年最值得购买的5款机械键盘...',
      type: 'review' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '2',
      slug: 'review-2',
      title: '办公椅选购指南：如何选择适合自己的办公椅',
      content: '一张好的办公椅对于长时间工作的人来说至关重要，本文将为您介绍如何选择适合自己的办公椅...',
      type: 'review' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: '3',
      slug: 'review-3',
      title: '轻薄笔记本横评：性能与便携的平衡',
      content: '轻薄笔记本如何在性能和便携性之间取得平衡？本文将对市面上主流的轻薄笔记本进行横评...',
      type: 'review' as const,
      cover_image: '/placeholder-image.jpg',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  return (
    <main>
      {/* 英雄区 */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">ONAHO - 专业产品测评与信息</h1>
          <p className="text-xl mb-8">为您提供最真实、最专业的产品体验和测评</p>
          <div className="flex justify-center space-x-4">
            <Link 
              href="/products" 
              className="bg-white text-blue-900 px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              浏览产品
            </Link>
            <Link 
              href="/reviews" 
              className="bg-transparent border border-white text-white px-6 py-2 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              查看测评
            </Link>
          </div>
        </div>
      </section>

      {/* 最新产品 */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">最新产品</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-800">
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* 最新测评 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">最新测评</h2>
            <Link href="/reviews" className="text-blue-600 hover:text-blue-800">
              查看全部 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* 价值主张 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">专业测评</h3>
              <p className="text-gray-600">我们提供专业、客观的产品测评，帮助您做出明智的购买决策。</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">详细信息</h3>
              <p className="text-gray-600">我们提供全面的产品信息，包括规格、功能、优缺点等，让您全面了解产品。</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">用户评论</h3>
              <p className="text-gray-600">我们鼓励用户分享自己的使用体验，帮助其他用户做出更好的选择。</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
