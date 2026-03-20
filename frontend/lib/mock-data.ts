// 校园集市模拟数据

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  views: number
  rating: number
  reviewCount: number
  seller: string
  sellerAvatar: string
  description: string
  images: string[]
  condition: string
  location: string
  createdAt: string
  isFavorited?: boolean
}

export interface Post {
  id: string
  title: string
  description: string
  reward: number
  category: string
  urgency: 'urgent' | 'normal'
  duration: 'short' | 'long'
  distance: 'near' | 'far'
  poster: string
  posterAvatar: string
  maxAccepters: number
  currentAccepters: number
  createdAt: string
  tags: string[]
  images?: string[]
  isFavorited?: boolean
}

export interface Message {
  id: string
  contactName: string
  contactAvatar: string
  lastMessage: string
  time: string
  unread: number
  isOnline: boolean
  productName?: string
  productImage?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  text: string
  time: string
  type: 'text' | 'image' | 'product'
  productInfo?: { name: string; price: number; image: string }
}

export interface Review {
  id: string
  username: string
  avatar: string
  rating: number
  content: string
  time: string
  productId: string
}

export interface Notification {
  id: string
  type: 'system' | 'like' | 'order' | 'reply'
  content: string
  time: string
  isRead: boolean
  icon: string
}

// 商品图片占位（使用 picsum）
const productImages = [
  'https://picsum.photos/seed/book1/400/400',
  'https://picsum.photos/seed/game1/400/400',
  'https://picsum.photos/seed/life1/400/400',
  'https://picsum.photos/seed/cloth1/400/400',
  'https://picsum.photos/seed/elec1/400/400',
  'https://picsum.photos/seed/sport1/400/400',
  'https://picsum.photos/seed/food1/400/400',
  'https://picsum.photos/seed/study2/400/400',
  'https://picsum.photos/seed/desk1/400/400',
  'https://picsum.photos/seed/bag1/400/400',
  'https://picsum.photos/seed/lamp1/400/400',
  'https://picsum.photos/seed/cup1/400/400',
  'https://picsum.photos/seed/watch1/400/400',
  'https://picsum.photos/seed/phone1/400/400',
  'https://picsum.photos/seed/head1/400/400',
  'https://picsum.photos/seed/key1/400/400',
]

const avatars = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=carol',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=dave',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=eve',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=frank',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=grace',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=henry',
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '高数教材全套（上下册）',
    price: 25,
    originalPrice: 80,
    image: productImages[0],
    category: '书籍',
    views: 342,
    rating: 4.8,
    reviewCount: 23,
    seller: '小林同学',
    sellerAvatar: avatars[0],
    description: '高等数学第七版上下册，同济大学版，书脊完好，内页无划线，九成新，用完不需要了低价出，包好评！',
    images: [productImages[0], productImages[7], productImages[8]],
    condition: '九成新',
    location: '南区宿舍楼',
    createdAt: '2024-03-15',
    isFavorited: false,
  },
  {
    id: 'p2',
    name: 'Switch游戏卡带《塞尔达传说》',
    price: 180,
    originalPrice: 299,
    image: productImages[1],
    category: '游戏',
    views: 567,
    rating: 4.9,
    reviewCount: 41,
    seller: '游戏大佬',
    sellerAvatar: avatars[1],
    description: '旷野之息，正版卡带，通关后不玩了，成色很好，无划痕，可当面交易验货。',
    images: [productImages[1], productImages[5]],
    condition: '九成新',
    location: '北区食堂附近',
    createdAt: '2024-03-14',
    isFavorited: true,
  },
  {
    id: 'p3',
    name: '台灯 护眼学习灯',
    price: 45,
    originalPrice: 120,
    image: productImages[10],
    category: '生活用品',
    views: 198,
    rating: 4.5,
    reviewCount: 16,
    seller: '毕业卖家',
    sellerAvatar: avatars[2],
    description: '毕业清仓，飞利浦护眼台灯，可调光，三档色温，陪伴了四年，功能完好，外壳轻微磨损。',
    images: [productImages[10], productImages[11]],
    condition: '七成新',
    location: '东区宿舍',
    createdAt: '2024-03-13',
    isFavorited: false,
  },
  {
    id: 'p4',
    name: '英语四六级词汇书套装',
    price: 15,
    originalPrice: 48,
    image: productImages[7],
    category: '书籍',
    views: 456,
    rating: 4.7,
    reviewCount: 34,
    seller: '过了四六级',
    sellerAvatar: avatars[3],
    description: '朱伟乱序版词汇书+星火词汇，已经过了六级，书有部分笔记，不影响阅读，过来人推荐！',
    images: [productImages[7], productImages[0]],
    condition: '八成新',
    location: '图书馆附近',
    createdAt: '2024-03-12',
    isFavorited: false,
  },
  {
    id: 'p5',
    name: 'AirPods Pro 二代耳机',
    price: 950,
    originalPrice: 1799,
    image: productImages[14],
    category: '电子产品',
    views: 892,
    rating: 4.9,
    reviewCount: 58,
    seller: '数码达人',
    sellerAvatar: avatars[4],
    description: '九成新AirPods Pro 2，换了新款不用了，有原盒，电量显示正常，降噪功能完好，可面交验货。',
    images: [productImages[14], productImages[13]],
    condition: '九成新',
    location: '学生活动中心',
    createdAt: '2024-03-11',
    isFavorited: true,
  },
  {
    id: 'p6',
    name: '羽毛球拍两支+球筒',
    price: 60,
    originalPrice: 150,
    image: productImages[5],
    category: '运动器材',
    views: 234,
    rating: 4.6,
    reviewCount: 19,
    seller: '运动爱好者',
    sellerAvatar: avatars[5],
    description: '李宁羽毛球拍两支，成色很好，适合业余爱好者，附赠一筒羽毛球，室内外都用过。',
    images: [productImages[5], productImages[15]],
    condition: '八成新',
    location: '体育馆附近',
    createdAt: '2024-03-10',
    isFavorited: false,
  },
  {
    id: 'p7',
    name: '考研政治全套资料',
    price: 80,
    originalPrice: 280,
    image: productImages[8],
    category: '书籍',
    views: 673,
    rating: 4.8,
    reviewCount: 47,
    seller: '已上岸学姐',
    sellerAvatar: avatars[6],
    description: '肖秀荣全套+徐涛超强五件套+腿姐冲刺，全是上岸学姐用过的，部分有笔记，非常珍贵！',
    images: [productImages[8], productImages[0], productImages[7]],
    condition: '八成新',
    location: '研究生楼旁',
    createdAt: '2024-03-09',
    isFavorited: false,
  },
  {
    id: 'p8',
    name: '游戏机手柄 Xbox',
    price: 220,
    originalPrice: 399,
    image: productImages[15],
    category: '游戏',
    views: 445,
    rating: 4.7,
    reviewCount: 32,
    seller: '游戏大佬',
    sellerAvatar: avatars[1],
    description: '微软Xbox无线手柄，蓝牙版，可连接电脑/手机/平板，成色好，没有漂移，换了精英版不用了。',
    images: [productImages[15], productImages[1]],
    condition: '九成新',
    location: '北区宿舍',
    createdAt: '2024-03-08',
    isFavorited: false,
  },
  {
    id: 'p9',
    name: '保温杯 500ml',
    price: 30,
    originalPrice: 89,
    image: productImages[11],
    category: '生活用品',
    views: 156,
    rating: 4.4,
    reviewCount: 12,
    seller: '整理控',
    sellerAvatar: avatars[7],
    description: '膳魔师保温杯，500ml，保温效果很好，买了新的所以出掉，只用了几次，很干净。',
    images: [productImages[11]],
    condition: '九成新',
    location: '西区食堂',
    createdAt: '2024-03-07',
    isFavorited: false,
  },
  {
    id: 'p10',
    name: '数据结构与算法（第三版）',
    price: 20,
    originalPrice: 55,
    image: productImages[3],
    category: '书籍',
    views: 289,
    rating: 4.6,
    reviewCount: 21,
    seller: '程序猿小张',
    sellerAvatar: avatars[2],
    description: '严蔚敏版数据结构，考研必备，有部分重点笔记，对考研同学很有帮助。',
    images: [productImages[3], productImages[8]],
    condition: '八成新',
    location: '计算机学院楼',
    createdAt: '2024-03-06',
    isFavorited: false,
  },
  {
    id: 'p11',
    name: '折叠收纳箱 4件套',
    price: 35,
    originalPrice: 98,
    image: productImages[9],
    category: '生活用品',
    views: 178,
    rating: 4.5,
    reviewCount: 14,
    seller: '收纳达人',
    sellerAvatar: avatars[6],
    description: '牛津布折叠收纳箱，大中小加超大，搬宿舍神器，用了一学期，没有破损，便宜出。',
    images: [productImages[9], productImages[2]],
    condition: '八成新',
    location: '南区宿舍',
    createdAt: '2024-03-05',
    isFavorited: true,
  },
  {
    id: 'p12',
    name: 'Sony 蓝牙耳机 WH-1000XM4',
    price: 1200,
    originalPrice: 2499,
    image: productImages[13],
    category: '电子产品',
    views: 1024,
    rating: 5.0,
    reviewCount: 76,
    seller: '音乐发烧友',
    sellerAvatar: avatars[4],
    description: '索尼头戴式降噪耳机，旗舰款，成色95新，有原盒，耳垫完好，降噪效果顶级，换入耳式了。',
    images: [productImages[13], productImages[14]],
    condition: '九成新',
    location: '音乐学院附近',
    createdAt: '2024-03-04',
    isFavorited: false,
  },
]

export const POSTS: Post[] = [
  {
    id: 'post1',
    title: '急需帮忙取快递！快递站要关门了',
    description: '快递站5点关门，我在上课出不来，快递在南区菜鸟驿站，帮我取过来送到南307宿舍，必有重谢！需要提供你的姓名学号才能取件。',
    reward: 15,
    category: '跑腿',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: '着急的同学',
    posterAvatar: avatars[0],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-15 15:30',
    tags: ['取快递', '急', '南区'],
  },
  {
    id: 'post2',
    title: '找人帮打印毕业论文（双面彩色）',
    description: '毕业论文需要打印，A4纸双面彩色，大概80页，需要按要求装订。送到学校图书馆门口就可以，有打印店资源的同学优先。',
    reward: 30,
    category: '打印',
    urgency: 'normal',
    duration: 'short',
    distance: 'near',
    poster: '毕业生小王',
    posterAvatar: avatars[2],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-15 14:20',
    tags: ['打印', '毕业论文', '装订'],
  },
  {
    id: 'post3',
    title: '急！帮我占图书馆自习室位置',
    description: '明天早上7点图书馆开门，需要有人帮我占三楼靠窗的位置，持续到我9点到达。会立刻付款，需要今晚联系好。',
    reward: 20,
    category: '占座',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: '备考党',
    posterAvatar: avatars[3],
    maxAccepters: 1,
    currentAccepters: 1,
    createdAt: '2024-03-15 13:00',
    tags: ['占座', '图书馆', '自习'],
  },
  {
    id: 'post4',
    title: '找摄影师拍毕业照（写真风格）',
    description: '即将毕业，想留下美好回忆，找有摄影经验的同学帮忙拍摄毕业写真。场地在校园内，提供后期修图，大概需要2-3小时，需要有自己的相机设备。',
    reward: 200,
    category: '摄影',
    urgency: 'normal',
    duration: 'long',
    distance: 'near',
    poster: '准毕业生',
    posterAvatar: avatars[4],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-14 16:00',
    tags: ['摄影', '毕业照', '写真'],
  },
  {
    id: 'post5',
    title: '急！帮我去食堂打饭',
    description: '今天在宿舍发烧了，出不了门，麻烦帮我去东区食堂二楼打一份红烧肉套餐+一份米饭，送到东204宿舍，门卡我可以借你。',
    reward: 10,
    category: '跑腿',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: '发烧ing',
    posterAvatar: avatars[5],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-14 11:30',
    tags: ['打饭', '跑腿', '东区'],
  },
  {
    id: 'post6',
    title: '家教：帮忙辅导高中数学（周末）',
    description: '弟弟在附近读高中，数学偏弱，需要一个数学好的同学周末进行辅导，每次2小时，需要有耐心，最好是数学专业或理工科学生。',
    reward: 150,
    category: '家教',
    urgency: 'normal',
    duration: 'long',
    distance: 'far',
    poster: '负责任的哥哥',
    posterAvatar: avatars[6],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-13 09:00',
    tags: ['家教', '数学', '高中', '周末'],
  },
  {
    id: 'post7',
    title: '帮忙搬东西，从宿舍搬到快递站',
    description: '毕业清仓，有几箱书和生活用品需要从南区宿舍搬到学校门口快递站，大概5-6个纸箱，需要2-3人，今天下午3-5点之间完成。',
    reward: 80,
    category: '搬运',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: '毕业卖家',
    posterAvatar: avatars[7],
    maxAccepters: 3,
    currentAccepters: 2,
    createdAt: '2024-03-13 08:30',
    tags: ['搬运', '快递', '毕业清仓'],
  },
  {
    id: 'post8',
    title: '需要会Python的同学帮忙调代码',
    description: '机器学习课程大作业，代码跑不通，需要会sklearn/pandas的同学帮忙debug，预计1-2小时，可以线上也可以面对面，明天截止！',
    reward: 60,
    category: '学习',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: 'Python菜鸟',
    posterAvatar: avatars[1],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-12 22:00',
    tags: ['Python', '代码', '机器学习'],
  },
  {
    id: 'post9',
    title: '找人帮设计PPT模板（商务风）',
    description: '毕业答辩PPT需要美化，要求商务简约风，大概20-25页，提供内容，只需要排版设计，需要有PS或PPT设计经验，一周内完成即可。',
    reward: 120,
    category: '设计',
    urgency: 'normal',
    duration: 'long',
    distance: 'near',
    poster: '设计小白',
    posterAvatar: avatars[3],
    maxAccepters: 1,
    currentAccepters: 0,
    createdAt: '2024-03-11 14:00',
    tags: ['PPT', '设计', '答辩'],
  },
  {
    id: 'post10',
    title: '急！帮我在教务系统抢选修课',
    description: '今晚8点抢选修课，我要选"影视鉴赏"，需要你帮忙守着电脑，一开放立刻帮我选上。我会提供教务系统账号密码，事成立刻转账。',
    reward: 25,
    category: '抢课',
    urgency: 'urgent',
    duration: 'short',
    distance: 'near',
    poster: '选课失败N次',
    posterAvatar: avatars[5],
    maxAccepters: 2,
    currentAccepters: 1,
    createdAt: '2024-03-10 18:00',
    tags: ['抢课', '选修', '教务系统'],
  },
]

export const MESSAGES: Message[] = [
  {
    id: 'm1',
    contactName: '游戏大佬',
    contactAvatar: avatars[1],
    lastMessage: '好的，我明天下午在北区，你来取吧',
    time: '刚刚',
    unread: 2,
    isOnline: true,
    productName: 'Switch游戏卡带《塞尔达传说》',
    productImage: productImages[1],
  },
  {
    id: 'm2',
    contactName: '毕业卖家',
    contactAvatar: avatars[2],
    lastMessage: '台灯还在吗？可以便宜点吗',
    time: '5分钟前',
    unread: 0,
    isOnline: false,
    productName: '台灯 护眼学习灯',
    productImage: productImages[10],
  },
  {
    id: 'm3',
    contactName: '已上岸学姐',
    contactAvatar: avatars[6],
    lastMessage: '考研资料明天给你，地点图书馆门口',
    time: '1小时前',
    unread: 1,
    isOnline: false,
    productName: '考研政治全套资料',
    productImage: productImages[8],
  },
  {
    id: 'm4',
    contactName: '着急的同学',
    contactAvatar: avatars[0],
    lastMessage: '谢谢你帮我取快递，已经收到了！',
    time: '昨天',
    unread: 0,
    isOnline: true,
    productName: '急需帮忙取快递',
  },
  {
    id: 'm5',
    contactName: '数码达人',
    contactAvatar: avatars[4],
    lastMessage: '我可以当面让你试听一下',
    time: '昨天',
    unread: 0,
    isOnline: false,
    productName: 'Sony 蓝牙耳机 WH-1000XM4',
    productImage: productImages[13],
  },
  {
    id: 'm6',
    contactName: '小林同学',
    contactAvatar: avatars[0],
    lastMessage: '高数教材还有吗？想买',
    time: '2天前',
    unread: 0,
    isOnline: false,
    productName: '高数教材全套（上下册）',
    productImage: productImages[0],
  },
]

export const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'c1',
    senderId: 'other',
    text: '你好，请问Switch游戏卡带还在吗？',
    time: '14:30',
    type: 'text',
  },
  {
    id: 'c2',
    senderId: 'me',
    text: '在的，九成新，可以来验货',
    time: '14:31',
    type: 'text',
  },
  {
    id: 'c3',
    senderId: 'other',
    text: '价格能再优惠点吗？',
    time: '14:32',
    type: 'text',
  },
  {
    id: 'c4',
    senderId: 'me',
    text: '最低180了，真的很好的成色，正版卡带',
    time: '14:33',
    type: 'text',
  },
  {
    id: 'c5',
    senderId: 'other',
    text: '好的，我明天下午在北区，你来取吧',
    time: '14:45',
    type: 'text',
  },
  {
    id: 'c6',
    senderId: 'other',
    text: '明天下午2点，北区食堂门口见？',
    time: '14:46',
    type: 'text',
  },
]

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    username: '买了很满意',
    avatar: avatars[2],
    rating: 5,
    content: '卖家很好，东西成色如描述，发货也快，下次还来！',
    time: '3天前',
    productId: 'p2',
  },
  {
    id: 'r2',
    username: '性价比超高',
    avatar: avatars[3],
    rating: 5,
    content: '耳机成色非常好，降噪效果完美，值得入手，卖家态度很好！',
    time: '1周前',
    productId: 'p12',
  },
  {
    id: 'r3',
    username: '良心卖家',
    avatar: avatars[4],
    rating: 4,
    content: '书有一些笔记，但卖家说了，对学习也有帮助，总体满意。',
    time: '2周前',
    productId: 'p7',
  },
  {
    id: 'r4',
    username: '下次还买',
    avatar: avatars[5],
    rating: 5,
    content: '二话不说五星好评，东西很好，发货快，包装也很细心！',
    time: '3周前',
    productId: 'p1',
  },
  {
    id: 'r5',
    username: '还不错',
    avatar: avatars[6],
    rating: 4,
    content: '台灯功能正常，外观有点磨损但不影响使用，价格合适。',
    time: '1个月前',
    productId: 'p3',
  },
]

export const NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    content: '你发布的"高数教材全套"有新的购买请求',
    time: '刚刚',
    isRead: false,
    icon: 'ShoppingBag',
  },
  {
    id: 'n2',
    type: 'like',
    content: '小林同学收藏了你的商品"台灯 护眼学习灯"',
    time: '10分钟前',
    isRead: false,
    icon: 'Heart',
  },
  {
    id: 'n3',
    type: 'reply',
    content: '游戏大佬在"Switch游戏卡带"下评论了你',
    time: '30分钟前',
    isRead: false,
    icon: 'MessageCircle',
  },
  {
    id: 'n4',
    type: 'system',
    content: '系统通知：平台新增"校园拼单"功能，快去看看吧！',
    time: '1小时前',
    isRead: true,
    icon: 'Bell',
  },
  {
    id: 'n5',
    type: 'order',
    content: '你接受的帖子"急需帮忙取快递"已完成，获得¥15奖励',
    time: '昨天',
    isRead: true,
    icon: 'CheckCircle',
  },
  {
    id: 'n6',
    type: 'like',
    content: '数码达人关注了你',
    time: '昨天',
    isRead: true,
    icon: 'UserPlus',
  },
]

export const MY_PUBLISHED: (Product | Post)[] = [
  PRODUCTS[0],
  PRODUCTS[2],
  POSTS[1],
  POSTS[3],
]

export const MY_SOLD: Product[] = [
  { ...PRODUCTS[3], price: 15 },
  { ...PRODUCTS[8], price: 30 },
]

export const MY_BOUGHT: Product[] = [
  PRODUCTS[1],
  PRODUCTS[4],
  PRODUCTS[11],
]

export const MY_FAVORITES: (Product | Post)[] = [
  PRODUCTS[1],
  PRODUCTS[4],
  PRODUCTS[10],
  POSTS[0],
  POSTS[5],
]

export const MY_FOLLOWING = [
  { id: 'f1', name: '游戏大佬', avatar: avatars[1], description: '数码游戏玩家', isFollowing: true },
  { id: 'f2', name: '已上岸学姐', avatar: avatars[6], description: '考研经验分享', isFollowing: true },
  { id: 'f3', name: '数码达人', avatar: avatars[4], description: '电子产品爱好者', isFollowing: true },
]

export const MY_HISTORY: Product[] = [
  PRODUCTS[11],
  PRODUCTS[4],
  PRODUCTS[6],
  PRODUCTS[0],
  PRODUCTS[2],
  PRODUCTS[9],
]

export const PRODUCT_CATEGORIES = ['全部', '书籍', '游戏', '生活用品', '电子产品', '运动器材', '服饰']
export const POST_CATEGORIES = ['全部', '跑腿', '打印', '占座', '摄影', '家教', '搬运', '学习', '设计', '抢课']
