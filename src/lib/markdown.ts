// 简单的 Markdown 转 HTML（可根据需要替换为更强大的库）
export async function markdownToHtml(markdown: string): Promise<string> {
  let html = markdown;
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  // 粗体、斜体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  // 图片 ![alt](url)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2" />');
  // 链接 [text](url)
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  // 无序列表
  html = html.replace(/^\s*\- (.*)$/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  // 换行
  html = html.replace(/\n{2,}/g, '</p><p>');
  html = '<p>' + html + '</p>';
  // 移除多余的空p
  html = html.replace(/<p><\/p>/g, '');
  return html;
} 