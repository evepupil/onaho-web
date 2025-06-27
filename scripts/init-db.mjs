import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

// 加载.env.local文件中的环境变量
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const { Pool } = pg;

const connectionString = `${process.env.POSTGRES_URL}?sslmode=no-verify`;

if (!connectionString) {
  throw new Error('POSTGRES_URL is missing in .env.local. Please get it from your Supabase project settings.');
}

const pool = new Pool({
  connectionString,
});

/**
 * @description 初始化数据库，创建contents表
 */
async function initDb() {
  console.log('开始初始化数据库...');
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS contents (
        id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        content TEXT,
        type TEXT NOT NULL, -- 'review' or 'product'
        cover_image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        rating NUMERIC(2, 1), -- For reviews
        brand TEXT,
        tags TEXT[]
      );
    `);
    console.log('contents 表已成功创建或已存在。');
  } catch (error) {
    console.error('创建 contents 表失败:', error);
  } finally {
    await client.release();
    await pool.end();
  }
  console.log('数据库初始化完成。');
}

initDb();