-- 创建评论表
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES public.contents(id) ON DELETE CASCADE,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    nickname TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    likes INTEGER DEFAULT 0 NOT NULL
);

-- 为评论表创建索引，提高查询性能
CREATE INDEX IF NOT EXISTS comments_content_id_idx ON public.comments(content_id);
CREATE INDEX IF NOT EXISTS comments_parent_id_idx ON public.comments(parent_id);

-- 添加行级安全策略
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 创建公共访问策略
CREATE POLICY "允许公共查询评论" ON public.comments 
    FOR SELECT USING (true);

-- 创建服务角色插入策略
CREATE POLICY "允许服务角色插入评论" ON public.comments 
    FOR INSERT TO service_role USING (true);

-- 创建服务角色更新策略
CREATE POLICY "允许服务角色更新评论" ON public.comments 
    FOR UPDATE TO service_role USING (true);

-- 创建服务角色删除策略
CREATE POLICY "允许服务角色删除评论" ON public.comments 
    FOR DELETE TO service_role USING (true); 