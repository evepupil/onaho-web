"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ContentCard from '@/components/shared/content-card';
import { getAllContents } from '@/lib/api';
import { Content } from '@/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<Content[]>([]);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // 使用API获取所有内容，然后在客户端进行过滤
        // 实际项目中，最好在API层面实现搜索功能
        const response = await getAllContents();
        const allContents = response.data || [];
        
        // 过滤匹配查询的内容
        const filtered = allContents.filter(content => {
          const searchableText = `${content.title} ${content.content} ${content.brand || ''} ${(content.tags || []).join(' ')}`.toLowerCase();
          return searchableText.includes(query.toLowerCase());
        });
        
        setResults(filtered);
      } catch (error) {
        console.error('搜索失败:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">搜索结果</h1>
        {query && (
          <p className="text-gray-600">
            搜索 &ldquo;<span className="font-medium">{query}</span>&rdquo; 的结果
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((item) => (
            <ContentCard
              key={item.id}
              id={item.id}
              title={item.title}
              excerpt={item.content}
              coverImage={item.cover_image}
              createdAt={item.created_at}
              type={item.type}
              brand={item.brand}
              tags={item.tags}
              rating={item.rating}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">未找到匹配结果</h2>
          <p className="text-gray-600">
            {query 
              ? `没有找到与 &ldquo;${query}&rdquo; 相关的内容，请尝试其他关键词。` 
              : '请输入搜索关键词以查找内容。'
            }
          </p>
        </div>
      )}
    </div>
  );
}

// 加载状态组件
function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">搜索结果</h1>
      </div>
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchResults />
    </Suspense>
  );
} 