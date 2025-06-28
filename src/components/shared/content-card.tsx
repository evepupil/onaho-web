import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface ContentCardProps {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  createdAt: string;
  type: 'product' | 'review';
  brand?: string;
  tags?: string[];
  rating?: number;
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  excerpt,
  coverImage,
  createdAt,
  type,
  brand,
  tags,
  rating
}) => {
  // 截取摘要，限制长度
  const truncatedExcerpt = excerpt.length > 100 ? `${excerpt.substring(0, 100)}...` : excerpt;
  
  // 格式化评分
  const formattedRating = rating ? `${rating}星` : '';
  
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col overflow-hidden border border-gray-100">
      <Link href={`/${type}/${id}`} className="block flex-grow">
        {/* 图片容器 */}
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* 类型标签 - 左上角 */}
          <div className="absolute top-3 left-3 bg-blue-600/90 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
            {type === 'product' ? '产品' : '测评'}
          </div>
          
          {/* 评分显示 - 右下角 */}
          {formattedRating && (
            <div className="absolute bottom-3 right-3 bg-yellow-400/90 text-gray-800 text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
              {formattedRating}
            </div>
          )}
        </div>
        
        {/* 内容区域 */}
        <div className="p-4 flex-grow flex flex-col">
          {/* 品牌信息 */}
          {brand && (
            <div className="text-xs text-gray-500 mb-1 font-medium">
              {brand}
            </div>
          )}
          
          {/* 标题 */}
          <h3 className="text-lg font-bold mb-2 line-clamp-2 text-gray-800">{title}</h3>
          
          {/* 标签 - 限制显示最多3个 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-xs text-gray-400">+{tags.length - 3}</span>
              )}
            </div>
          )}
          
          {/* 摘要 */}
          <p className="text-gray-500 text-sm mb-4 line-clamp-2">{truncatedExcerpt}</p>
          
          {/* 底部信息 */}
          <div className="flex justify-between items-center text-xs mt-auto pt-2 border-t border-gray-100">
            <span className="text-gray-400">{formatDate(createdAt)}</span>
            <span className="text-blue-600 font-medium flex items-center">
              阅读更多
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard; 