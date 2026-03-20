'use client'

import { useState } from 'react'
import {
  ArrowLeft, Heart, Share2, ShoppingCart, MessageCircle,
  Star, Eye, MapPin, Clock, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { type Product, REVIEWS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface ProductDetailProps {
  product: Product
  isFavorited: boolean
  onToggleFav: () => void
  onBack: () => void
  onChat: () => void
}

export default function ProductDetail({ product, isFavorited, onToggleFav, onBack, onChat }: ProductDetailProps) {
  const [currentImg, setCurrentImg] = useState(0)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [purchased, setPurchased] = useState(false)

  const reviews = REVIEWS.slice(0, 4)

  const handlePrev = () => setCurrentImg((i) => (i > 0 ? i - 1 : product.images.length - 1))
  const handleNext = () => setCurrentImg((i) => (i < product.images.length - 1 ? i + 1 : 0))

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 顶部图片区域 */}
      <div className="relative w-full aspect-square bg-muted flex-shrink-0">
        <img
          src={product.images[currentImg]}
          alt={`${product.name} 图片 ${currentImg + 1}`}
          className="w-full h-full object-cover"
        />

        {/* 返回按钮 */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          aria-label="返回"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* 分享按钮 */}
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <Share2 className="w-4 h-4 text-white" />
        </button>

        {/* 图片切换 */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/20 flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <span
                  key={i}
                  className={cn('block h-1.5 rounded-full transition-all', i === currentImg ? 'w-4 bg-white' : 'w-1.5 bg-white/50')}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* 可滚动内容区域 */}
      <div className="flex-1 overflow-y-auto pb-28">
        {/* 价格和名称 */}
        <div className="px-4 pt-4 pb-3 bg-card">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-primary">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">¥{product.originalPrice}</span>
            )}
            <span className="ml-auto bg-orange-light text-primary text-xs px-2 py-0.5 rounded-full font-medium">
              {product.condition}
            </span>
          </div>
          <h1 className="text-lg font-bold text-foreground leading-snug">{product.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3.5 h-3.5" />
              <span>{product.views} 人浏览</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{product.rating} ({product.reviewCount}条评价)</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5" />
              <span>{product.location}</span>
            </div>
          </div>
        </div>

        <div className="h-2 bg-muted" />

        {/* 卖家信息 */}
        <div className="px-4 py-3 bg-card flex items-center gap-3">
          <img src={product.sellerAvatar} alt={product.seller} className="w-10 h-10 rounded-full bg-muted" />
          <div>
            <p className="font-semibold text-sm text-foreground">{product.seller}</p>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={cn('w-3 h-3', s <= Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-muted')} />
              ))}
              <span className="text-xs text-muted-foreground ml-1">信用良好</span>
            </div>
          </div>
          <button className="ml-auto text-xs text-primary border border-primary px-3 py-1 rounded-full">
            关注
          </button>
        </div>

        <div className="h-2 bg-muted" />

        {/* 商品详情 */}
        <div className="px-4 py-4 bg-card">
          <h2 className="font-bold text-base text-foreground mb-3">商品详情</h2>
          <div className="grid grid-cols-2 gap-y-2 mb-4">
            {[
              { label: '分类', value: product.category },
              { label: '新旧程度', value: product.condition },
              { label: '发布时间', value: product.createdAt },
              { label: '交货地点', value: product.location },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className="text-sm text-foreground">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground leading-relaxed bg-muted/50 rounded-xl p-3">
            {product.description}
          </p>
        </div>

        <div className="h-2 bg-muted" />

        {/* 评论区 */}
        <div className="px-4 py-4 bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-base text-foreground">买家评价 ({product.reviewCount})</h2>
            <button className="text-xs text-primary">查看全部</button>
          </div>

          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3">
                <img src={r.avatar} alt={r.username} className="w-9 h-9 rounded-full bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{r.username}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className={cn('w-3 h-3', s <= r.rating ? 'text-amber-400 fill-amber-400' : 'text-muted')} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-auto">{r.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{r.content}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 评论输入框 */}
          {showCommentInput && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="写下你的评价..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={() => { setCommentText(''); setShowCommentInput(false) }}
                className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-full"
              >
                发送
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {/* 收藏 */}
          <button
            onClick={onToggleFav}
            className={cn(
              'flex flex-col items-center gap-0.5 px-3',
              isFavorited ? 'text-red-400' : 'text-muted-foreground'
            )}
          >
            <Heart className={cn('w-5 h-5', isFavorited && 'fill-current')} />
            <span className="text-[9px]">收藏</span>
          </button>

          {/* 评论 */}
          <button
            onClick={() => setShowCommentInput(!showCommentInput)}
            className="flex flex-col items-center gap-0.5 px-3 text-muted-foreground"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[9px]">评论</span>
          </button>

          {/* 聊一聊 */}
          <button
            onClick={onChat}
            className="flex-1 bg-secondary text-secondary-foreground border border-primary text-primary py-2.5 rounded-full text-sm font-semibold"
          >
            聊一聊
          </button>

          {/* 立即购买 */}
          <button
            onClick={() => setPurchased(true)}
            className={cn(
              'flex-1 py-2.5 rounded-full text-sm font-bold transition-all',
              purchased ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
            )}
          >
            {purchased ? '已购买' : '立即购买'}
          </button>
        </div>
      </div>
    </div>
  )
}
