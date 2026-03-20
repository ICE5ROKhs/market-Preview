'use client'

import { useState } from 'react'
import {
  Heart, History, Users, ShoppingBag, TrendingUp, Package,
  ChevronRight, Settings, Star, Eye, Bell, BadgeCheck,
  FileText, BookOpen,
} from 'lucide-react'
import {
  MY_FAVORITES, MY_HISTORY, MY_BOUGHT, MY_SOLD, MY_PUBLISHED, MY_FOLLOWING,
  PRODUCTS, POSTS, type Product, type Post,
} from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const MY_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=myself'

type ProfileTab = 'favorites' | 'history' | 'following'
type TradeTab = 'published' | 'sold' | 'bought'

export default function ProfilePage() {
  const [profileTab, setProfileTab] = useState<ProfileTab>('favorites')
  const [tradeTab, setTradeTab] = useState<TradeTab>('published')

  return (
    <div className="flex flex-col h-full bg-muted overflow-y-auto pb-24">
      {/* 顶部用户信息区 */}
      <div className="bg-card pb-4">
        {/* 背景横幅 */}
        <div className="h-24 bg-primary/20 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, oklch(0.65 0.22 42) 0%, transparent 70%), radial-gradient(circle at 80% 20%, oklch(0.72 0.18 55) 0%, transparent 60%)' }}
          />
          <button className="absolute top-3 right-4 w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* 用户信息 */}
        <div className="px-4">
          <div className="flex items-end justify-between -mt-10 mb-3">
            <div className="relative">
              <img
                src={MY_AVATAR}
                alt="我的头像"
                className="w-20 h-20 rounded-full bg-muted border-4 border-card shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-2 border-card" />
            </div>
            <button className="bg-primary text-primary-foreground text-xs px-4 py-2 rounded-full font-medium mt-2">
              编辑资料
            </button>
          </div>

          <h2 className="text-xl font-bold text-foreground flex items-center gap-1.5">
            林小鱼
            <BadgeCheck className="w-5 h-5 text-primary" />
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">计算机学院 大三 · 南区</p>
          <p className="text-sm text-foreground mt-1.5 leading-relaxed">
            爱好编程和游戏，有闲置随时出售，欢迎来聊~
          </p>

          {/* 统计数据 */}
          <div className="flex gap-0 mt-3 bg-muted rounded-2xl overflow-hidden">
            {[
              { label: '发布', value: MY_PUBLISHED.length, icon: <Package className="w-4 h-4 text-primary" /> },
              { label: '卖出', value: MY_SOLD.length, icon: <TrendingUp className="w-4 h-4 text-green-500" /> },
              { label: '购入', value: MY_BOUGHT.length, icon: <ShoppingBag className="w-4 h-4 text-blue-500" /> },
              { label: '收藏', value: MY_FAVORITES.length, icon: <Heart className="w-4 h-4 text-red-400" /> },
              { label: '关注', value: MY_FOLLOWING.length, icon: <Users className="w-4 h-4 text-purple-500" /> },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={cn('flex-1 flex flex-col items-center py-3 gap-0.5', i > 0 && 'border-l border-border')}
              >
                {stat.icon}
                <span className="text-base font-bold text-foreground">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* 信用评分 */}
          <div className="mt-3 bg-amber-50 rounded-xl p-3 flex items-center gap-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-semibold text-amber-700">信用 4.9分</span>
            <span className="text-xs text-amber-600 ml-auto">共 47 次交易</span>
          </div>
        </div>
      </div>

      <div className="h-2" />

      {/* 我的收藏/历史/关注 */}
      <div className="bg-card">
        <div className="flex border-b border-border">
          {[
            { id: 'favorites' as ProfileTab, icon: <Heart className="w-4 h-4" />, label: '我的收藏' },
            { id: 'history' as ProfileTab, icon: <History className="w-4 h-4" />, label: '历史浏览' },
            { id: 'following' as ProfileTab, icon: <Users className="w-4 h-4" />, label: '我的关注' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setProfileTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors',
                profileTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {profileTab === 'favorites' && <FavoritesTab />}
          {profileTab === 'history' && <HistoryTab />}
          {profileTab === 'following' && <FollowingTab />}
        </div>
      </div>

      <div className="h-2" />

      {/* 我的交易 */}
      <div className="bg-card">
        <div className="px-4 pt-4 pb-2">
          <h3 className="font-bold text-base text-foreground">我的交易</h3>
        </div>
        <div className="flex border-b border-border">
          {[
            { id: 'published' as TradeTab, label: '我发布的' },
            { id: 'sold' as TradeTab, label: '我卖出的' },
            { id: 'bought' as TradeTab, label: '我买到的' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTradeTab(tab.id)}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium transition-colors',
                tradeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-3">
          <TradeTab tab={tradeTab} />
        </div>
      </div>

      <div className="h-2" />

      {/* 猜你喜欢 */}
      <div className="bg-card px-4 pt-4 pb-6">
        <h3 className="font-bold text-base text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          猜你喜欢
        </h3>
        <RecommendScroll />
      </div>
    </div>
  )
}

function FavoritesTab() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {MY_FAVORITES.map((item, i) => {
        const isProduct = 'price' in item && 'image' in item
        return (
          <div key={i} className="rounded-xl overflow-hidden bg-muted cursor-pointer">
            {isProduct ? (
              <>
                <img src={(item as Product).image} alt={(item as Product).name} className="w-full aspect-square object-cover" />
                <div className="p-2">
                  <p className="text-xs font-medium text-foreground line-clamp-1">{(item as Product).name}</p>
                  <p className="text-sm font-bold text-primary">¥{(item as Product).price}</p>
                </div>
              </>
            ) : (
              <div className="bg-[#fffde7] p-3 min-h-[80px] flex flex-col justify-between">
                <p className="text-xs font-medium text-foreground line-clamp-2">{(item as Post).title}</p>
                <p className="text-sm font-bold text-primary">¥{(item as Post).reward} 悬赏</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function HistoryTab() {
  return (
    <div className="flex flex-col gap-2">
      {MY_HISTORY.map((p, i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover bg-muted flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-primary font-bold text-sm">¥{p.price}</span>
              <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />{p.views}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </div>
  )
}

function FollowingTab() {
  const [following, setFollowing] = useState(new Set(MY_FOLLOWING.map((f) => f.id)))

  return (
    <div className="flex flex-col gap-3">
      {MY_FOLLOWING.map((f) => (
        <div key={f.id} className="flex items-center gap-3">
          <img src={f.avatar} alt={f.name} className="w-11 h-11 rounded-full bg-muted flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{f.name}</p>
            <p className="text-xs text-muted-foreground">{f.description}</p>
          </div>
          <button
            onClick={() => setFollowing((prev) => {
              const next = new Set(prev)
              next.has(f.id) ? next.delete(f.id) : next.add(f.id)
              return next
            })}
            className={cn(
              'text-xs px-3 py-1.5 rounded-full font-medium transition-all',
              following.has(f.id) ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground'
            )}
          >
            {following.has(f.id) ? '已关注' : '关注'}
          </button>
        </div>
      ))}
    </div>
  )
}

function TradeTab({ tab }: { tab: TradeTab }) {
  const items = tab === 'published' ? MY_PUBLISHED : tab === 'sold' ? MY_SOLD : MY_BOUGHT

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
        <Package className="w-10 h-10 opacity-20 mb-2" />
        <p className="text-sm">暂无记录</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isProduct = 'price' in item && 'image' in item
        if (isProduct) {
          const p = item as Product
          return (
            <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-muted">
              <img src={p.image} alt={p.name} className="w-14 h-14 rounded-xl object-cover bg-background flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.condition} · {p.category}</p>
                <p className="text-sm font-bold text-primary">¥{p.price}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={cn(
                  'text-xs px-2 py-1 rounded-full',
                  tab === 'sold' ? 'bg-green-100 text-green-600' :
                  tab === 'bought' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-primary'
                )}>
                  {tab === 'sold' ? '已卖出' : tab === 'bought' ? '已购入' : '出售中'}
                </span>
              </div>
            </div>
          )
        } else {
          const p = item as Post
          return (
            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#fffde7]">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground line-clamp-1">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.category}</p>
                <p className="text-sm font-bold text-primary">¥{p.reward} 悬赏</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-primary flex-shrink-0">
                招募中
              </span>
            </div>
          )
        }
      })}
    </div>
  )
}

function RecommendScroll() {
  const items = [...PRODUCTS.slice(3, 9), ...POSTS.slice(2, 5)]

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {items.map((item, i) => {
        const isProduct = 'price' in item && 'image' in item
        if (isProduct) {
          const p = item as Product
          return (
            <div key={i} className="rounded-xl overflow-hidden bg-muted cursor-pointer product-card">
              <img src={p.image} alt={p.name} className="w-full aspect-square object-cover" loading="lazy" />
              <div className="p-2">
                <p className="text-xs font-medium text-foreground line-clamp-1">{p.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <p className="text-sm font-bold text-primary">¥{p.price}</p>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-muted-foreground">{p.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        } else {
          const p = item as Post
          return (
            <div key={i} className="rounded-xl bg-[#fffde7] p-3 cursor-pointer min-h-[90px] flex flex-col justify-between shadow-sm sticky-note">
              <p className="text-xs font-medium text-foreground line-clamp-2">{p.title}</p>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-primary">¥{p.reward}</p>
                <span className="text-[10px] text-muted-foreground">{p.category}</span>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
