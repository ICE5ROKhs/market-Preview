'use client'

import { useState } from 'react'
import { Search, Clock, Zap, Navigation, Users, ChevronRight } from 'lucide-react'
import { POSTS, POST_CATEGORIES, type Post } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import PostDetail from './post-detail'

type UrgencyFilter = 'all' | 'urgent' | 'normal'
type DurationFilter = 'all' | 'short' | 'long'
type DistanceFilter = 'all' | 'near' | 'far'

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>('all')
  const [durationFilter, setDurationFilter] = useState<DurationFilter>('all')
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>('all')
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const filtered = POSTS.filter((p) => {
    const matchCat = activeCategory === '全部' || p.category === activeCategory
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchUrgency = urgencyFilter === 'all' || p.urgency === urgencyFilter
    const matchDuration = durationFilter === 'all' || p.duration === durationFilter
    const matchDistance = distanceFilter === 'all' || p.distance === distanceFilter
    return matchCat && matchSearch && matchUrgency && matchDuration && matchDistance
  })

  if (selectedPost) {
    return (
      <PostDetail
        post={selectedPost}
        onBack={() => setSelectedPost(null)}
        onChat={() => {}}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-[#f5ede0]">
      {/* 顶部 */}
      <div className="sticky top-0 z-20 bg-[#f5ede0] px-4 pt-4 pb-2">
        {/* 标题装饰 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-5 bg-primary rounded-full" />
          <h1 className="font-bold text-lg text-foreground">校园悬赏板</h1>
          <span className="text-xs text-muted-foreground bg-orange-light px-2 py-0.5 rounded-full">
            {filtered.length} 个任务
          </span>
        </div>

        {/* 搜索栏 */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索任务..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground shadow-sm"
          />
        </div>

        {/* 筛选标签行 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {/* 分类 */}
          <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
            {POST_CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-card text-muted-foreground shadow-sm'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 快速筛选 */}
        <div className="flex gap-2 mt-2">
          <FilterPill
            options={[
              { value: 'all', label: '全部' },
              { value: 'urgent', label: '急需', color: 'text-destructive' },
              { value: 'normal', label: '不急' },
            ]}
            value={urgencyFilter}
            onChange={(v) => setUrgencyFilter(v as UrgencyFilter)}
            icon={<Zap className="w-3 h-3" />}
          />
          <FilterPill
            options={[
              { value: 'all', label: '全部' },
              { value: 'short', label: '短耗时' },
              { value: 'long', label: '长耗时' },
            ]}
            value={durationFilter}
            onChange={(v) => setDurationFilter(v as DurationFilter)}
            icon={<Clock className="w-3 h-3" />}
          />
          <FilterPill
            options={[
              { value: 'all', label: '全部' },
              { value: 'near', label: '距离近' },
              { value: 'far', label: '距离远' },
            ]}
            value={distanceFilter}
            onChange={(v) => setDistanceFilter(v as DistanceFilter)}
            icon={<Navigation className="w-3 h-3" />}
          />
        </div>
      </div>

      {/* 告示板区域 */}
      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-24">
        {/* 木板背景感 */}
        <div className="relative bg-[#c8a878] rounded-2xl p-3 shadow-inner min-h-full">
          {/* 木板纹理点缀 */}
          <div className="absolute inset-0 rounded-2xl opacity-10"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(0,0,0,0.1) 24px, rgba(0,0,0,0.1) 25px)' }}
          />

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-[#8B6914]">
              <p className="text-sm">暂无匹配的任务帖子</p>
            </div>
          ) : (
            <div className="relative flex flex-col gap-3">
              {filtered.map((post, idx) => (
                <PostCard
                  key={post.id}
                  post={post}
                  tiltAngle={idx % 3 === 0 ? -1.5 : idx % 3 === 1 ? 1 : 0}
                  onClick={() => setSelectedPost(post)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface FilterPillProps {
  options: { value: string; label: string; color?: string }[]
  value: string
  onChange: (v: string) => void
  icon: React.ReactNode
}

function FilterPill({ options, value, onChange, icon }: FilterPillProps) {
  const current = options.find((o) => o.value === value)
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium shadow-sm transition-all',
          value !== 'all' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'
        )}
      >
        {icon}
        <span>{current?.label}</span>
        <ChevronRight className={cn('w-3 h-3 transition-transform', open && 'rotate-90')} />
      </button>
      {open && (
        <div className="absolute top-8 left-0 z-30 bg-card shadow-lg rounded-xl overflow-hidden border border-border">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className={cn(
                'block w-full text-left px-4 py-2 text-xs transition-colors',
                opt.value === value ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-muted',
                opt.color
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

interface PostCardProps {
  post: Post
  tiltAngle: number
  onClick: () => void
}

function PostCard({ post, tiltAngle, onClick }: PostCardProps) {
  const isFull = post.currentAccepters >= post.maxAccepters
  const bgColors = ['bg-[#fffde7]', 'bg-[#e8f5e9]', 'bg-[#e3f2fd]', 'bg-[#fce4ec]', 'bg-[#fff3e0]']
  const bg = bgColors[post.id.charCodeAt(4) % bgColors.length]

  return (
    <div
      className={cn(
        'sticky-note rounded-lg p-3 cursor-pointer relative overflow-hidden',
        bg,
        isFull && 'opacity-70'
      )}
      style={{ transform: `rotate(${tiltAngle}deg)` }}
      onClick={!isFull ? onClick : undefined}
      role="button"
      tabIndex={0}
      aria-label={`查看帖子：${post.title}`}
      onKeyDown={(e) => e.key === 'Enter' && !isFull && onClick()}
    >
      {/* 急需标签 */}
      {post.urgency === 'urgent' && (
        <div className="urgent-badge">
          紧急
        </div>
      )}

      {/* 满员遮罩 */}
      {isFull && (
        <div className="absolute inset-0 bg-black/10 rounded-lg flex items-center justify-center z-10">
          <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full">已满员</span>
        </div>
      )}

      {/* 帖子内容 */}
      <div className="pl-4">
        <div className="flex items-start gap-2 mb-2">
          <img src={post.posterAvatar} alt={post.poster} className="w-7 h-7 rounded-full flex-shrink-0 bg-muted mt-0.5" />
          <div>
            <h3 className="font-bold text-sm text-gray-800 leading-snug">{post.title}</h3>
            <span className="text-xs text-gray-500">{post.poster} · {post.createdAt.split(' ')[0]}</span>
          </div>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3 pl-9">
          {post.description}
        </p>

        {/* 底部信息 */}
        <div className="flex items-center justify-between pl-9">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-primary">¥{post.reward}</span>
            <span className="text-xs text-gray-500">悬赏</span>
            <span className={cn(
              'text-[10px] px-1.5 py-0.5 rounded-full font-medium',
              post.urgency === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            )}>
              {post.urgency === 'urgent' ? '急需' : '不急'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-600">
              {post.duration === 'short' ? '短耗时' : '长耗时'}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Users className="w-3 h-3" />
            <span>{post.currentAccepters}/{post.maxAccepters}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
