import { NextResponse } from 'next/server';
import { Comment } from '@/types';

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: '101',
    content: '这篇测评非常详细，帮助我选择了适合自己的机械键盘，谢谢！',
    nickname: '键盘爱好者',
    content_id: '1',
    created_at: '2023-05-16T09:30:00Z'
  },
  {
    id: '102',
    content: '我最近正在考虑购买机械键盘，这篇文章给了我很好的参考。',
    nickname: '数码达人',
    content_id: '1',
    created_at: '2023-05-17T14:20:00Z'
  },
  // 其他评论...
];

export async function GET(request: Request) {
  // 获取URL查询参数
  const { searchParams } = new URL(request.url);
  const contentId = searchParams.get('content_id');
  
  if (!contentId) {
    return NextResponse.json(
      { error: '缺少必要参数 content_id' },
      { status: 400 }
    );
  }
  
  // 筛选指定内容的评论
  const comments = mockComments.filter(comment => comment.content_id === contentId);
  
  return NextResponse.json({
    data: comments,
    count: comments.length
  });
}

export async function POST(request: Request) {
  try {
    // 解析请求体
    const body = await request.json();
    
    // 验证必要字段
    if (!body.content || !body.nickname || !body.content_id) {
      return NextResponse.json(
        { error: '缺少必要字段：content, nickname, content_id' },
        { status: 400 }
      );
    }
    
    // 创建新评论
    const newComment: Comment = {
      id: `comment-${Date.now()}`, // 使用时间戳生成唯一ID
      content: body.content,
      nickname: body.nickname,
      content_id: body.content_id,
      created_at: new Date().toISOString()
    };
    
    // 在实际应用中，这里会将评论保存到数据库
    // 这里我们只是模拟成功响应
    
    return NextResponse.json({
      success: true,
      data: newComment
    }, { status: 201 });
    
  } catch (error) {
    console.error('提交评论出错:', error);
    return NextResponse.json(
      { error: '提交评论失败，请稍后重试' },
      { status: 500 }
    );
  }
} 