import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * 获取评论列表
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const contentId = searchParams.get('content_id');
    
    if (!contentId) {
      return NextResponse.json(
        { error: '缺少必要参数 content_id' },
        { status: 400 }
      );
    }
    
    // 获取顶级评论（没有父评论的评论）
    const { data: topLevelComments, error: topLevelError } = await supabase
      .from('comments')
      .select('*')
      .eq('content_id', contentId)
      .is('parent_id', null)
      .order('created_at', { ascending: false });
    
    if (topLevelError) {
      console.error('获取评论失败:', topLevelError);
      return NextResponse.json(
        { error: '获取评论失败' },
        { status: 500 }
      );
    }
    
    // 获取所有回复（有父评论的评论）
    const { data: replies, error: repliesError } = await supabase
      .from('comments')
      .select('*')
      .eq('content_id', contentId)
      .not('parent_id', 'is', null)
      .order('created_at', { ascending: true });
    
    if (repliesError) {
      console.error('获取回复失败:', repliesError);
      return NextResponse.json(
        { error: '获取回复失败' },
        { status: 500 }
      );
    }
    
    // 构建评论树
    const commentsTree = topLevelComments.map(comment => {
      const commentReplies = replies.filter(reply => reply.parent_id === comment.id);
      return {
        ...comment,
        replies: commentReplies
      };
    });
    
    return NextResponse.json({
      data: commentsTree,
      count: topLevelComments.length,
      total_replies: replies.length
    });
  } catch (error) {
    console.error('处理评论请求失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}

/**
 * 提交评论
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content_id, parent_id, nickname, content } = body;
    
    // 验证必要参数
    if (!content_id || !nickname || !content) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }
    
    // 如果有parent_id，验证父评论是否存在
    if (parent_id) {
      const { data: parentComment, error: parentError } = await supabase
        .from('comments')
        .select('id')
        .eq('id', parent_id)
        .single();
      
      if (parentError || !parentComment) {
        return NextResponse.json(
          { error: '父评论不存在' },
          { status: 404 }
        );
      }
    }
    
    // 插入评论
    const { data, error } = await supabase
      .from('comments')
      .insert({
        content_id,
        parent_id: parent_id || null,
        nickname,
        content,
      })
      .select()
      .single();
    
    if (error) {
      console.error('提交评论失败:', error);
      return NextResponse.json(
        { error: '提交评论失败' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      data,
      success: true
    });
  } catch (error) {
    console.error('处理评论提交失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 