import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ContentCard from '@/components/shared/content-card';
import { getContentsByType } from '@/lib/api';

export default async function Home() {
  // 获取最新产品和测评
  const productsResponse = await getContentsByType('product', { limit: 4, sort: 'newest' });
  const reviewsResponse = await getContentsByType('review', { limit: 4, sort: 'newest' });
  
  const products = productsResponse.data;
  const reviews = reviewsResponse.data;

  return (
    <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviews.map((review) => (
              <ContentCard
                key={review.id}
                id={review.id}
                slug={review.slug}
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
        </div>
      </section>
    </div>
  );
}
