import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * @description 通过ID获取内容详情的API路由处理函数
 * @param request - HTTP请求对象
 * @param params - 路由参数，包含id
 * @returns 返回内容详情、评论列表和相关内容
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: '缺少id参数' }, { status: 400 });
  }

  try {
    // 从Supabase获取内容
    const { data: content, error: contentError } = await supabase
      .from('contents')
      .select('*')
      .eq('id', id)
      .single();

    if (contentError || !content) {
      console.error(`获取内容失败 (id: ${id}):`, contentError);
      if (contentError && contentError.code === 'PGRST116') {
        return NextResponse.json({ error: '内容未找到' }, { status: 404 });
      }
      return NextResponse.json(
        { error: '获取内容失败' },
        { status: 500 }
      );
    }

    // 获取评论
    const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('*')
      .eq('content_id', content.id)
      .order('created_at', { ascending: false });

    if (commentsError) {
      console.error('获取评论失败:', commentsError);
      // 即使评论获取失败，也继续返回内容
    }

    // 获取相关内容
    const { data: relatedContents, error: relatedError } = await supabase
      .from('contents')
      .select('*')
      .eq('type', content.type)
      .neq('id', content.id)
      .limit(3);

    if (relatedError) {
      console.error('获取相关内容失败:', relatedError);
    }

    return NextResponse.json({
      content,
      comments: comments || [],
      related: relatedContents || [],
    });

  } catch (error) {
    console.error(`处理请求失败 (id: ${id}):`, error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 