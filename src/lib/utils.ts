import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 * @param dateString - ISO 格式的日期字符串
 * @returns 格式化后的日期字符串，如：2023年1月1日
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 生成随机ID
 * @returns 随机ID字符串
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * 截取文本
 * @param text - 原始文本
 * @param maxLength - 最大长度
 * @returns 截取后的文本
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * 获取图片占位符URL
 * @param width - 宽度
 * @param height - 高度
 * @returns 占位符图片URL
 */
export function getPlaceholderImage(width: number = 800, height: number = 600): string {
  return `https://placehold.co/${width}x${height}`;
}

/**
 * 检查URL是否有效
 * @param url - URL字符串
 * @returns 是否是有效的URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 防抖函数
 * @param func - 要执行的函数
 * @param wait - 等待时间（毫秒）
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
} 