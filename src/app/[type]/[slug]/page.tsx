import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import CommentForm from '@/components/comments/comment-form';
import CommentList from '@/components/comments/comment-list';

interface ContentDetailPageProps {
  params: {
    type: string;
    slug: string;
  };
}

export default async function ContentDetailPage({ params }: ContentDetailPageProps) {
  const { type, slug } = params;
  
  // 验证类型是否有效
  if (type !== 'product' && type !== 'review') {
    notFound();
  }
  
  // 在实际应用中，我们会从数据库获取内容
  // 这里使用模拟数据
  const mockContent = {
    id: '1',
    slug: slug,
    title: type === 'product' 
      ? '高品质机械键盘' 
      : '2023年最值得购买的5款机械键盘',
    content: `
# ${type === 'product' ? '高品质机械键盘' : '2023年最值得购买的5款机械键盘'}

${type === 'product' 
  ? '这是一款高品质的机械键盘，采用Cherry MX轴体，带来极佳的打字体验。键盘采用铝合金面板，坚固耐用，不易变形。支持全键无冲，满足游戏玩家的需求。RGB背光可自定义，提供丰富的灯光效果。'
  : '机械键盘市场竞争激烈，本文将为您详细介绍2023年最值得购买的5款机械键盘。我们从手感、耐用性、功能性和价格等多个维度进行了评测，为您提供专业的购买建议。'}

## 产品特点

- 高品质Cherry MX轴体
- 铝合金面板，坚固耐用
- 全键无冲，满足游戏需求
- RGB背光，支持自定义灯效
- 人体工学设计，长时间使用不疲劳

## 技术规格

| 规格 | 详情 |
|------|------|
| 轴体类型 | Cherry MX 青轴 |
| 键帽材质 | PBT双色注塑 |
| 接口类型 | USB Type-C |
| 尺寸 | 440 x 140 x 40 mm |
| 重量 | 1.2 kg |

## 使用体验

使用这款键盘打字的感觉非常棒，键程适中，回弹力强，打字声音清脆但不刺耳。键盘的RGB灯效非常丰富，可以通过软件进行自定义设置，满足不同用户的需求。

键盘的做工非常精细，没有毛刺和锐利的边缘，使用起来非常舒适。铝合金面板给人一种高级感，同时也增加了键盘的稳定性，打字时不会有明显的抖动。

## 总结

这款键盘无论是从做工、手感还是功能性来看，都是一款非常优秀的产品，值得推荐给追求高品质打字体验的用户。虽然价格相对较高，但考虑到其出色的性能和耐用性，这是一款值得投资的产品。
    `,
    type: type as 'product' | 'review',
    cover_image: '/placeholder-image.jpg',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // 将Markdown内容转换为HTML
  // 在实际应用中，我们会使用专门的Markdown库
  const contentHtml = mockContent.content
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-6">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-5">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br />')
    .replace(/- (.*?)(<br \/>|$)/g, '<li class="ml-5 list-disc">$1</li>')
    .replace(/<li class="ml-5 list-disc">(.*?)<\/li>(<br \/>)*/g, '<ul class="my-3">$&</ul>')
    .replace(/\| (.*?) \|/g, '<td class="border px-4 py-2">$1</td>')
    .replace(/<td(.*?)<\/td>(<br \/>)*/g, '<tr>$&</tr>')
    .replace(/<tr>(.*?)<\/tr>(<br \/>)*/g, '<table class="table-auto w-full my-4 border-collapse">$&</table>');

  // 模拟评论数据
  const mockComments = [
    {
      id: '1',
      content: '这款键盘真的很不错，我已经使用了一个月，手感极佳！',
      nickname: '键盘爱好者',
      content_id: mockContent.id,
      created_at: new Date(Date.now() - 86400000 * 5).toISOString() // 5天前
    },
    {
      id: '2',
      content: '价格有点贵，但质量确实很好，值得购买。',
      nickname: '理性消费者',
      content_id: mockContent.id,
      created_at: new Date(Date.now() - 86400000 * 3).toISOString() // 3天前
    },
    {
      id: '3',
      content: '我买了青轴的版本，打字声音很清脆，但可能不适合办公环境使用。',
      nickname: '办公室打工人',
      content_id: mockContent.id,
      created_at: new Date(Date.now() - 86400000).toISOString() // 1天前
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <nav className="text-sm mb-6">
        <ol className="list-none p-0 flex flex-wrap text-gray-500">
          <li className="flex items-center">
            <Link href="/" className="hover:text-blue-600">首页</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href={`/${type}`} className="hover:text-blue-600">
              {type === 'product' ? '产品' : '测评'}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="text-gray-900 font-medium truncate">
            {mockContent.title}
          </li>
        </ol>
      </nav>

      {/* 内容头部 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{mockContent.title}</h1>
        <div className="flex items-center text-gray-500 text-sm">
          <span>{formatDate(mockContent.created_at)}</span>
          <span className="mx-2">•</span>
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
            {type === 'product' ? '产品' : '测评'}
          </span>
        </div>
      </div>

      {/* 封面图 */}
      <div className="relative h-[400px] w-full mb-8">
        <Image
          src={mockContent.cover_image}
          alt={mockContent.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* 内容主体 */}
      <div className="prose prose-lg max-w-none mb-12">
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>

      {/* 分享按钮 */}
      <div className="flex items-center justify-center space-x-4 mb-12">
        <span className="text-gray-700">分享到：</span>
        <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* 评论区 */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-6">用户评论</h3>
        
        {/* 评论表单 */}
        <CommentForm contentId={mockContent.id} />
        
        {/* 评论列表 */}
        <CommentList comments={mockComments} />
      </div>
    </div>
  );
} 