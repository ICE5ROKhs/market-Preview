'use client'

import { useState } from 'react'
import { ArrowLeft, Camera, Plus, X, ChevronDown, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRODUCT_CATEGORIES, POST_CATEGORIES } from '@/lib/mock-data'

type PublishType = 'select' | 'product' | 'post'

interface PublishPageProps {
  onBack: () => void
}

export default function PublishPage({ onBack }: PublishPageProps) {
  const [publishType, setPublishType] = useState<PublishType>('select')
  const [published, setPublished] = useState(false)

  if (published) {
    return <PublishedSuccess type={publishType as 'product' | 'post'} onBack={onBack} />
  }

  if (publishType === 'select') {
    return <TypeSelector onSelect={setPublishType} onBack={onBack} />
  }

  if (publishType === 'product') {
    return (
      <ProductForm
        onBack={() => setPublishType('select')}
        onPublish={() => setPublished(true)}
      />
    )
  }

  return (
    <PostForm
      onBack={() => setPublishType('select')}
      onPublish={() => setPublished(true)}
    />
  )
}

function TypeSelector({ onSelect, onBack }: { onSelect: (t: PublishType) => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <X className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="font-bold text-lg text-foreground">选择发布类型</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <p className="text-muted-foreground text-sm text-center mb-2">选择你想发布的内容类型</p>

        {/* 闲置商品 */}
        <button
          onClick={() => onSelect('product')}
          className="w-full bg-card rounded-2xl p-6 shadow-sm border border-border active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-8 h-8 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="8" y="16" width="32" height="26" rx="3" />
                <path d="M16 16V12a8 8 0 0116 0v4" />
                <path d="M20 28h8M24 24v8" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-lg text-foreground">闲置商品</h3>
              <p className="text-sm text-muted-foreground mt-1">出售你不需要的东西，让闲置物品流转起来</p>
              <div className="flex gap-2 mt-2">
                {['书籍', '游戏', '生活用品', '电子产品'].map((tag) => (
                  <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </button>

        {/* 求助帖子 */}
        <button
          onClick={() => onSelect('post')}
          className="w-full bg-card rounded-2xl p-6 shadow-sm border border-border active:scale-98 transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
              <svg viewBox="0 0 48 48" className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="6" y="6" width="36" height="36" rx="3" />
                <path d="M14 20h20M14 26h14M14 32h8" strokeLinecap="round" />
                <circle cx="36" cy="12" r="6" fill="#f59e0b" stroke="none" />
                <path d="M34 12h4M36 10v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-bold text-lg text-foreground">悬赏求助</h3>
              <p className="text-sm text-muted-foreground mt-1">发布你需要帮助的任务，设置合理悬赏吸引帮手</p>
              <div className="flex gap-2 mt-2">
                {['跑腿', '占座', '摄影', '家教'].map((tag) => (
                  <span key={tag} className="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

function ProductForm({ onBack, onPublish }: { onBack: () => void; onPublish: () => void }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [desc, setDesc] = useState('')
  const [imageCount, setImageCount] = useState(0)

  const conditions = ['全新', '九成新', '八成新', '七成新', '六成以下']

  const canPublish = name && price && category && condition && desc

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg text-foreground flex-1">发布闲置商品</h1>
        <button
          onClick={canPublish ? onPublish : undefined}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-bold transition-all',
            canPublish ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          发布
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* 上传图片 */}
        <div className="py-4 border-b border-border">
          <p className="text-sm font-medium text-foreground mb-3">商品图片 <span className="text-destructive">*</span></p>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {Array.from({ length: imageCount }).map((_, i) => (
              <div
                key={i}
                className="w-20 h-20 rounded-xl bg-muted flex-shrink-0 relative overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/seed/upload${i}/200/200`}
                  alt="上传图片"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setImageCount(n => n - 1)}
                  className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
            {imageCount < 9 && (
              <button
                onClick={() => setImageCount(n => n + 1)}
                className="w-20 h-20 rounded-xl border-2 border-dashed border-border flex-shrink-0 flex flex-col items-center justify-center gap-1 text-muted-foreground"
              >
                <Camera className="w-6 h-6" />
                <span className="text-xs">{imageCount}/9</span>
              </button>
            )}
          </div>
        </div>

        {/* 商品名称 */}
        <FormField label="商品名称" required>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：高等数学教材（同济版）"
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        {/* 价格 */}
        <div className="py-3 border-b border-border flex gap-3">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">售价 <span className="text-destructive">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">¥</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-muted rounded-xl pl-7 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs text-muted-foreground mb-1 block">原价（选填）</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">¥</span>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="0.00"
                className="w-full bg-muted rounded-xl pl-7 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
              />
            </div>
          </div>
        </div>

        {/* 分类 */}
        <FormField label="商品分类" required>
          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FormField>

        {/* 成色 */}
        <FormField label="商品成色" required>
          <div className="flex flex-wrap gap-2">
            {conditions.map((c) => (
              <button
                key={c}
                onClick={() => setCondition(c)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  condition === c ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </FormField>

        {/* 描述 */}
        <FormField label="商品描述" required>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="详细描述你的商品，包括使用情况、有无划痕/损坏等，信息越详细越容易成交..."
            rows={5}
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
          />
          <p className="text-right text-xs text-muted-foreground mt-1">{desc.length}/500</p>
        </FormField>
      </div>
    </div>
  )
}

function PostForm({ onBack, onPublish }: { onBack: () => void; onPublish: () => void }) {
  const [title, setTitle] = useState('')
  const [reward, setReward] = useState('')
  const [maxAccepters, setMaxAccepters] = useState('1')
  const [category, setCategory] = useState('')
  const [urgency, setUrgency] = useState<'urgent' | 'normal'>('normal')
  const [duration, setDuration] = useState<'short' | 'long'>('short')
  const [distance, setDistance] = useState<'near' | 'far'>('near')
  const [desc, setDesc] = useState('')

  const canPublish = title && reward && category && desc

  return (
    <div className="flex flex-col h-full bg-[#f5ede0]">
      <div className="flex items-center gap-3 px-4 py-4 border-b border-[#e0c8a0]">
        <button onClick={onBack} className="w-9 h-9 rounded-full bg-card flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-lg text-foreground flex-1">发布悬赏帖子</h1>
        <button
          onClick={canPublish ? onPublish : undefined}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-bold transition-all',
            canPublish ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
          )}
        >
          发布
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-8">
        {/* 主体纸片 */}
        <div className="sticky-note bg-[#fffde7] rounded-2xl p-4 mt-4 mb-4">
          <FormField label="任务标题" required>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例如：急！帮忙取快递"
              className="w-full bg-white/70 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
          </FormField>

          {/* 悬赏金额 */}
          <div className="py-3 border-b border-[#e0c8a0]">
            <label className="text-xs text-muted-foreground mb-1 block">悬赏金额 <span className="text-destructive">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">¥</span>
              <input
                type="number"
                value={reward}
                onChange={(e) => setReward(e.target.value)}
                placeholder="设置合理的悬赏金额"
                className="w-full bg-white/70 rounded-xl pl-7 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground"
              />
            </div>
          </div>

          {/* 最大接单人数 */}
          <div className="py-3 border-b border-[#e0c8a0]">
            <label className="text-xs text-muted-foreground mb-2 block">最大接单人数</label>
            <div className="flex gap-2">
              {['1', '2', '3', '5'].map((n) => (
                <button
                  key={n}
                  onClick={() => setMaxAccepters(n)}
                  className={cn(
                    'w-10 h-10 rounded-full text-sm font-medium transition-all',
                    maxAccepters === n ? 'bg-primary text-primary-foreground' : 'bg-white/70 text-foreground'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 分类 */}
        <div className="bg-card rounded-2xl p-4 mb-3">
          <label className="text-sm font-medium text-foreground mb-2 block">任务分类 <span className="text-destructive">*</span></label>
          <div className="flex flex-wrap gap-2">
            {POST_CATEGORIES.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  category === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 任务属性 */}
        <div className="bg-card rounded-2xl p-4 mb-3">
          <p className="text-sm font-medium text-foreground mb-3">任务属性</p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">紧急程度</span>
              <div className="flex gap-2">
                {[{ v: 'urgent', l: '急需' }, { v: 'normal', l: '不急' }].map(({ v, l }) => (
                  <button
                    key={v}
                    onClick={() => setUrgency(v as 'urgent' | 'normal')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      urgency === v ? (v === 'urgent' ? 'bg-red-500 text-white' : 'bg-green-500 text-white') : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">耗时预估</span>
              <div className="flex gap-2">
                {[{ v: 'short', l: '短耗时' }, { v: 'long', l: '长耗时' }].map(({ v, l }) => (
                  <button
                    key={v}
                    onClick={() => setDuration(v as 'short' | 'long')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      duration === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">距离远近</span>
              <div className="flex gap-2">
                {[{ v: 'near', l: '距离近' }, { v: 'far', l: '距离远' }].map(({ v, l }) => (
                  <button
                    key={v}
                    onClick={() => setDistance(v as 'near' | 'far')}
                    className={cn(
                      'px-3 py-1 rounded-full text-xs font-medium',
                      distance === v ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 详细描述 */}
        <div className="bg-card rounded-2xl p-4 mb-3">
          <label className="text-sm font-medium text-foreground mb-2 block">任务描述 <span className="text-destructive">*</span></label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="详细说明任务内容、要求、完成地点等，让接单者更了解你的需求..."
            rows={5}
            className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
          />
          <p className="text-right text-xs text-muted-foreground mt-1">{desc.length}/500</p>
        </div>
      </div>
    </div>
  )
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="py-3 border-b border-border last:border-0">
      <label className="text-sm font-medium text-foreground mb-2 block">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      {children}
    </div>
  )
}

function PublishedSuccess({ type, onBack }: { type: 'product' | 'post'; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-background items-center justify-center px-8">
      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6">
        <CheckCircle2 className="w-14 h-14 text-green-500" />
      </div>
      <h2 className="text-xl font-bold text-foreground mb-2">发布成功！</h2>
      <p className="text-muted-foreground text-sm text-center mb-8">
        {type === 'product' ? '你的闲置商品已发布，等待买家联系你' : '你的悬赏帖子已发布，等待接单者出现'}
      </p>
      <button
        onClick={onBack}
        className="w-full bg-primary text-primary-foreground py-3 rounded-full font-bold text-base"
      >
        返回首页
      </button>
    </div>
  )
}
