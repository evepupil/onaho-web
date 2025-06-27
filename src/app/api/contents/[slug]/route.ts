import { NextResponse } from 'next/server';
import { Content, Comment } from '@/types';

// 模拟内容数据（与主路由保持一致）
const mockContents: Content[] = [
  {
    id: '1',
    slug: 'review-1',
    title: '2023年最值得购买的5款机械键盘',
    content: '机械键盘市场竞争激烈，本文将为您详细介绍2023年最值得购买的5款机械键盘。\n\n## 罗技 G915\n\n罗技G915是一款高端无线机械键盘，采用了GL触发轴体，按键行程短，触发快速，非常适合游戏玩家。同时，它的超薄设计和铝合金面板使其看起来非常高端。\n\n## 达尔优A87\n\n达尔优A87是一款性价比极高的机械键盘，采用Cherry轴体，提供稳定可靠的打字体验。键盘支持RGB背光，可以通过软件进行个性化设置。\n\n## 键设局IQUNIX F96\n\n这款键盘的最大特点是其复古的外观设计和96%的紧凑布局，同时保留了数字小键盘。采用Cherry MX轴体，提供出色的打字手感。\n\n## 雷蛇黑寡妇V3\n\n雷蛇黑寡妇系列一直是游戏玩家的最爱，V3版本采用了雷蛇自家的绿轴，触发声音清脆，手感出色。全键防冲突和N键无冲突技术确保在游戏中的每一次按键都能被准确识别。\n\n## 阿米洛VA87M\n\n阿米洛VA87M是一款颜值与性能并重的机械键盘，提供多种配色选择，采用Cherry MX轴体，打字体验出色。87键的布局紧凑但功能齐全，是办公和家用的理想选择。',
    type: 'review',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-05-15T08:30:00Z',
    updated_at: '2023-05-15T08:30:00Z',
    rating: 4.5,
    brand: '多品牌对比',
    tags: ['机械键盘', '外设', '办公']
  },
  {
    id: '2',
    slug: 'review-2',
    title: '办公椅选购指南：如何选择适合自己的办公椅',
    content: '一张好的办公椅对于长时间工作的人来说至关重要，本文将为您介绍如何选择适合自己的办公椅。\n\n## 人体工学设计\n\n选择办公椅时，首先要考虑的是人体工学设计。一张好的人体工学椅应该能够支撑您的脊柱自然曲线，减轻腰部压力。可调节的腰部支撑是必不可少的功能。\n\n## 材质与透气性\n\n长时间坐在椅子上，材质的透气性变得尤为重要。网布材质通常比皮质或布料更透气，适合夏季使用；而在冬季，皮质或布料的椅子会更加舒适。\n\n## 调节功能\n\n一张好的办公椅应该有多种调节功能，包括高度调节、扶手调节、靠背倾斜度调节等。这些功能可以帮助您找到最舒适的坐姿。\n\n## 耐用性与质保\n\n办公椅是一项长期投资，耐用性是重要考虑因素。查看椅子的承重能力和制造商提供的质保期限，通常质保期越长，椅子的质量越有保障。\n\n## 预算考虑\n\n办公椅的价格从几百元到上万元不等。根据您的预算和需求选择合适的椅子，但不要为了省钱而牺牲基本的人体工学功能。',
    type: 'review',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-06-20T10:15:00Z',
    updated_at: '2023-06-20T10:15:00Z',
    rating: 5,
    brand: '多品牌对比',
    tags: ['办公椅', '人体工学', '办公家具']
  },
  {
    id: '3',
    slug: 'product-1',
    title: '高品质机械键盘',
    content: '这是一款高品质的机械键盘，采用Cherry MX轴体，带来极佳的打字体验。\n\n## 产品特点\n\n- 采用Cherry MX青轴，按键声音清脆，触感明显\n- 全键无冲突设计，支持同时按下多个按键\n- RGB背光系统，支持多种灯光效果\n- 铝合金面板，坚固耐用\n- 可拆卸USB-C接口，方便携带\n\n## 技术参数\n\n- 接口类型：USB-C\n- 按键数量：87键\n- 轴体类型：Cherry MX青轴\n- 背光类型：RGB可编程背光\n- 尺寸：360 x 140 x 40 mm\n- 重量：900g\n\n## 包装清单\n\n- 机械键盘 x 1\n- USB-C连接线 x 1\n- 键帽拔键器 x 1\n- 说明书 x 1',
    type: 'product',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-04-10T09:00:00Z',
    updated_at: '2023-04-10T09:00:00Z',
    brand: '达尔优',
    tags: ['机械键盘', '外设', '办公']
  },
  {
    id: '4',
    slug: 'product-2',
    title: '人体工学办公椅',
    content: '这款人体工学办公椅采用优质材料，支持多角度调节，让您的办公更加舒适。\n\n## 产品特点\n\n- 人体工学设计，符合脊椎自然曲线\n- 可调节头枕，为颈部提供支撑\n- 4D可调节扶手，适应不同工作姿势\n- 高弹性网布座椅，透气舒适\n- 多功能倾仰机构，可锁定多个角度\n\n## 技术参数\n\n- 材质：高强度尼龙框架，高弹性网布\n- 气压杆：SGS认证4级气压杆\n- 扶手：4D可调节扶手\n- 靠背倾角：90°-135°\n- 承重：150kg\n- 适用身高：165cm-190cm\n\n## 包装清单\n\n- 办公椅组件 x 1套\n- 安装工具 x 1套\n- 安装说明书 x 1',
    type: 'product',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-05-05T14:30:00Z',
    updated_at: '2023-05-05T14:30:00Z',
    brand: '西昊',
    tags: ['办公椅', '人体工学', '办公家具']
  },
  {
    id: '5',
    slug: 'review-3',
    title: '轻薄笔记本横评：性能与便携的平衡',
    content: '轻薄笔记本如何在性能和便携性之间取得平衡？本文将对市面上主流的轻薄笔记本进行横评。\n\n## 苹果MacBook Air M2\n\n苹果的M2芯片为MacBook Air带来了强大的性能，同时保持了极致轻薄的设计。13.6英寸的Liquid视网膜显示屏提供了出色的视觉体验，电池续航可达18小时。\n\n## 联想小新Pro 14\n\n搭载AMD Ryzen 7处理器和16GB内存，联想小新Pro 14在性能方面表现出色。2.8K 90Hz高刷新率屏幕提供流畅的视觉体验，轻薄的机身设计便于携带。\n\n## 戴尔XPS 13\n\n戴尔XPS 13采用了几乎无边框的设计，13.4英寸的屏幕被塞进了传统12英寸笔记本的机身中。英特尔第12代处理器提供了强大的性能，碳纤维掌托区域提供了舒适的打字体验。\n\n## 华硕灵耀X纵横\n\n华硕灵耀X纵横采用了OLED屏幕，提供了鲜艳的色彩和深邃的黑色。轻薄的金属机身和长达15小时的电池续航使其成为商务人士的理想选择。\n\n## 惠普蜻蜓G3\n\n惠普蜻蜓G3是一款专为商务用户设计的轻薄笔记本，重量不到1kg，同时提供了出色的性能和安全功能。内置5G连接选项使其成为需要随时保持连接的用户的理想选择。',
    type: 'review',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-07-08T16:45:00Z',
    updated_at: '2023-07-08T16:45:00Z',
    rating: 4,
    brand: '多品牌对比',
    tags: ['笔记本电脑', '轻薄本', '数码']
  },
  {
    id: '6',
    slug: 'product-3',
    title: '超薄笔记本电脑',
    content: '这款笔记本电脑采用全金属机身，厚度仅为15mm，配备高性能处理器和大容量电池。\n\n## 产品特点\n\n- 全金属一体成型机身，轻薄坚固\n- 第13代英特尔酷睿i7处理器，强劲性能\n- 16GB LPDDR5高速内存，多任务处理流畅\n- 1TB PCIe 4.0 SSD，读写速度超快\n- 14英寸2.8K高清屏幕，色彩鲜艳，细节清晰\n- 长达15小时的电池续航，支持快充\n\n## 技术参数\n\n- 处理器：第13代英特尔酷睿i7-1360P\n- 内存：16GB LPDDR5 6400MHz\n- 存储：1TB PCIe 4.0 NVMe SSD\n- 显卡：英特尔Iris Xe Graphics\n- 屏幕：14英寸 2880x1800 90Hz\n- 电池：70Wh，支持65W PD快充\n- 重量：1.25kg\n- 厚度：15mm\n\n## 包装清单\n\n- 笔记本电脑 x 1\n- 65W PD充电器 x 1\n- 用户手册 x 1',
    type: 'product',
    cover_image: '/placeholder-image.jpg',
    created_at: '2023-06-15T11:20:00Z',
    updated_at: '2023-06-15T11:20:00Z',
    brand: '联想',
    tags: ['笔记本电脑', '轻薄本', '数码']
  }
];

// 模拟评论数据
const mockComments: Comment[] = [
  {
    id: 'c1',
    content: '这篇测评写得很详细，对我选择机械键盘很有帮助！',
    nickname: '键盘爱好者',
    content_id: '1',
    created_at: '2023-05-16T09:15:00Z'
  },
  {
    id: 'c2',
    content: '罗技G915确实不错，我用了半年了，手感很好。',
    nickname: '游戏玩家',
    content_id: '1',
    created_at: '2023-05-17T14:20:00Z'
  },
  {
    id: 'c3',
    content: '办公椅的选择确实很重要，感谢分享这些实用的建议。',
    nickname: '上班族',
    content_id: '2',
    created_at: '2023-06-21T11:30:00Z'
  },
  {
    id: 'c4',
    content: '人体工学椅真的能缓解腰部疲劳，值得投资。',
    nickname: '程序员',
    content_id: '2',
    created_at: '2023-06-22T16:45:00Z'
  },
  {
    id: 'c5',
    content: '这款键盘的RGB效果很炫酷，打字手感也不错。',
    nickname: '数码发烧友',
    content_id: '3',
    created_at: '2023-04-12T10:00:00Z'
  }
];

/**
 * 获取内容详情的API路由处理函数
 * @param request - HTTP请求对象
 * @param params - 路由参数，包含slug
 * @returns 返回内容详情、评论列表和相关内容
 */
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = await params;
    
    // 根据slug查找内容
    const content = mockContents.find(item => item.slug === slug);
    
    if (!content) {
      return NextResponse.json(
        { error: '内容未找到' },
        { status: 404 }
      );
    }
    
    // 获取该内容的评论
    const comments = mockComments.filter(comment => comment.content_id === content.id);
    
    // 获取相关内容（同类型的其他内容，最多3个）
    const relatedContents = mockContents
      .filter(item => item.type === content.type && item.id !== content.id)
      .slice(0, 3);
    
    // 返回内容详情响应
    return NextResponse.json({
      content,
      comments,
      related: relatedContents
    });
    
  } catch (error) {
    console.error('获取内容详情失败:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
}