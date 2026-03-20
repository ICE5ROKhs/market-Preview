'use client'

import { useState } from 'react'
import {
  ArrowLeft, Share2, Heart, MessageCircle, Users, Clock,
  Navigation, Zap, Tag, CheckCircle2,
} from 'lucide-react'
import { type Post, REVIEWS } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

interface PostDetailProps {
  post: Post
  onBack: () => void
  onChat: () => void
}

export default function PostDetail({ post, onBack, onChat }: PostDetailProps) {
  const [accepted, setAccepted] = useState(false)
  const [isFav, setIsFav] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [currentAccepters, setCurrentAccepters] = useState(post.currentAccepters)

  const isFull = currentAccepters >= post.maxAccepters
  const reviews = REVIEWS.slice(0, 3)

  const handleAccept = () => {
    if (!isFull && !accepted) {
      setAccepted(true)
      setCurrentAccepters((n) => n + 1)
    }
  }

  return (
    <div className="flex flex-col h-full bg-[#f5ede0]">
      {/* 顶部导航 */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-[#f5ede0]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-card flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-bold text-base text-foreground">任务详情</h2>
        <button className="w-9 h-9 rounded-full bg-card flex items-center justify-center shadow-sm">
          <Share2 className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* 可滚动内容 */}
      <div className="flex-1 overflow-y-auto pb-28 px-4">
        {/* 主体纸片 */}
        <div
          className={cn(
            'sticky-note rounded-2xl p-5 mb-3 relative overflow-hidden',
            post.urgency === 'urgent' ? 'bg-[#fff9e6]' : 'bg-[#f0f7ff]'
          )}
        >
          {post.urgency === 'urgent' && (
            <div className="urgent-badge text-sm">紧急</div>
          )}

          <div className="pl-5">
            {/* 发布者 */}
            <div className="flex items-center gap-3 mb-4">
              <img src={post.posterAvatar} alt={post.poster} className="w-12 h-12 rounded-full bg-muted" />
              <div>
                <p className="font-bold text-base text-foreground">{post.poster}</p>
                <p className="text-xs text-muted-foreground">发布于 {post.createdAt}</p>
              </div>
              <button className="ml-auto text-xs text-primary border border-primary px-3 py-1 rounded-full">
                关注
              </button>
            </div>

            {/* 标题 */}
            <h1 className="text-lg font-bold text-foreground leading-snug mb-3">{post.title}</h1>

            {/* 悬赏金额突出 */}
            <div className="bg-primary/10 rounded-xl p-3 mb-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground">悬赏金额</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">¥{post.reward}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={cn(
                  'text-xs px-2 py-0.5 rounded-full font-medium',
                  post.urgency === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                )}>
                  {post.urgency === 'urgent' ? '急需' : '不急'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-600">
                  {post.duration === 'short' ? '短耗时' : '长耗时'}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-purple-100 text-purple-600">
                  {post.distance === 'near' ? '距离近' : '距离远'}
                </span>
              </div>
            </div>

            {/* 接单进度 */}
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>接单进度</span>
                  <span>{currentAccepters}/{post.maxAccepters} 人</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all', isFull ? 'bg-muted-foreground' : 'bg-primary')}
                    style={{ width: `${(currentAccepters / post.maxAccepters) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* 任务描述 */}
            <p className="text-sm text-foreground leading-relaxed bg-white/60 rounded-xl p-3 mb-4">
              {post.description}
            </p>

            {/* 标签 */}
            <div className="flex flex-wrap gap-2">
              <Tag className="w-3.5 h-3.5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 任务要求 */}
        <div className="bg-card rounded-2xl p-4 mb-3 shadow-sm">
          <h2 className="font-bold text-base text-foreground mb-3">任务须知</h2>
          <div className="flex flex-col gap-2">
            {[
              { icon: <Clock className="w-4 h-4 text-primary" />, text: `耗时预估：${post.duration === 'short' ? '1小时以内' : '超过1小时'}` },
              { icon: <Navigation className="w-4 h-4 text-primary" />, text: `距离：${post.distance === 'near' ? '校园内，较近' : '距离较远，需出行'}` },
              { icon: <Zap className="w-4 h-4 text-primary" />, text: post.urgency === 'urgent' ? '紧急任务，尽快完成' : '不紧急，按约定时间完成' },
              { icon: <CheckCircle2 className="w-4 h-4 text-primary" />, text: '完成任务后立即结算奖励' },
            ].map(({ icon, text }, i) => (
              <div key={i} className="flex items-center gap-3">
                {icon}
                <span className="text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 评论区 */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-foreground">评论</h2>
            <span className="text-xs text-muted-foreground">{reviews.length} 条</span>
          </div>

          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="flex gap-3">
                <img src={r.avatar} alt={r.username} className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{r.username}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{r.time}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{r.content}</p>
                </div>
              </div>
            ))}
          </div>

          {showComment && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="写下你的问题..."
                className="flex-1 bg-muted rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={() => { setCommentText(''); setShowComment(false) }}
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
          <button
            onClick={() => setIsFav(!isFav)}
            className={cn('flex flex-col items-center gap-0.5 px-3', isFav ? 'text-red-400' : 'text-muted-foreground')}
          >
            <Heart className={cn('w-5 h-5', isFav && 'fill-current')} />
            <span className="text-[9px]">收藏</span>
          </button>
          <button
            onClick={() => setShowComment(!showComment)}
            className="flex flex-col items-center gap-0.5 px-3 text-muted-foreground"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[9px]">评论</span>
          </button>
          <button
            onClick={onChat}
            className="flex-1 bg-secondary text-primary border border-primary py-2.5 rounded-full text-sm font-semibold"
          >
            聊一聊
          </button>
          <button
            onClick={handleAccept}
            disabled={isFull || accepted}
            className={cn(
              'flex-1 py-2.5 rounded-full text-sm font-bold transition-all',
              accepted ? 'bg-green-500 text-white' :
              isFull ? 'bg-muted text-muted-foreground cursor-not-allowed' :
              'bg-primary text-primary-foreground'
            )}
          >
            {accepted ? '已接单' : isFull ? '已满员' : '接下帖子'}
          </button>
        </div>
      </div>
    </div>
  )
}
