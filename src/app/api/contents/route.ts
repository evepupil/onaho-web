import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * @description 获取内容列表的API路由处理函数
 * @param request - HTTP请求对象
 * @returns 返回内容列表及分页信息
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // 分页参数
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const startIndex = (page - 1) * limit;

    // 筛选参数
    const type = searchParams.get('type'); // product 或 review
    const tag = searchParams.get('tag');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search'); // 搜索关键词

    // 排序参数
    const sort = searchParams.get('sort') || 'newest'; // newest, oldest, az, za, rating

    // 构建查询
    let query = supabase.from('contents').select('*', { count: 'exact' });

    // 应用筛选
    if (type) {
      query = query.eq('type', type);
    }
    if (tag) {
      query = query.contains('tags', [tag]);
    }
    if (brand) {
      query = query.ilike('brand', `%${brand}%`);
    }
    if (search) {
      query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
    }

    // 应用排序
    switch (sort) {
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'oldest':
        query = query.order('created_at', { ascending: true });
        break;
      case 'az':
        query = query.order('title', { ascending: true });
        break;
      case 'za':
        query = query.order('title', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    // 应用分页
    query = query.range(startIndex, startIndex + limit - 1);

    // 执行查询
    const { data, error, count } = await query;

    if (error) {
      console.error('获取内容列表失败:', error);
      return NextResponse.json(
        { error: '获取内容列表失败' },
        { status: 500 }
      );
    }

    const total = count || 0;

    // 返回结果
    return NextResponse.json({
      data: data || [],
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('处理请求失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}