import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface ContentCardProps {
  id: string;
  slug: string;
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
  slug,
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/${type}/${slug}`} className="block flex-grow">
        <div className="relative h-48 w-full">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {type === 'product' ? '产品' : '测评'}
          </div>
          
          {/* 评分显示在右下角 */}
          {formattedRating && (
            <div className="absolute bottom-2 right-2 bg-yellow-400 text-gray-800 text-xs font-bold px-2 py-1 rounded-full">
              {formattedRating}
            </div>
          )}
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 h-14 overflow-hidden">{title}</h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{truncatedExcerpt}</p>
          
          {/* 标签 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
            <span>{formatDate(createdAt)}</span>
            <span className="text-blue-600 font-medium">阅读更多</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContentCard; 