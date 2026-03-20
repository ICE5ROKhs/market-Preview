'use client'

import { cn } from '@/lib/utils'
import { ShoppingBag, FileText, Plus, MessageCircle, User } from 'lucide-react'

export type TabType = 'market' | 'posts' | 'publish' | 'messages' | 'profile'

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
  unreadCount?: number
}

export default function BottomNav({ activeTab, onTabChange, unreadCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'market' as TabType, icon: ShoppingBag, label: '商品' },
    { id: 'posts' as TabType, icon: FileText, label: '帖子' },
    { id: 'publish' as TabType, icon: Plus, label: '发布', isCenter: true },
    { id: 'messages' as TabType, icon: MessageCircle, label: '消息' },
    { id: 'profile' as TabType, icon: User, label: '我的' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="max-w-md mx-auto flex items-end justify-around px-2 pb-safe">
        {navItems.map((item) => {
          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="relative -top-4 flex flex-col items-center"
                aria-label="发布"
              >
                <span
                  className={cn(
                    'w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95',
                    activeTab === 'publish'
                      ? 'bg-primary scale-105'
                      : 'bg-primary'
                  )}
                >
                  <Plus className="w-7 h-7 text-primary-foreground" strokeWidth={2.5} />
                </span>
                <span className="text-[10px] mt-1 font-medium text-muted-foreground">发布</span>
              </button>
            )
          }

          const Icon = item.icon
          const isActive = activeTab === item.id
          const showBadge = item.id === 'messages' && unreadCount > 0

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                'flex flex-col items-center gap-0.5 py-2 px-3 transition-colors relative',
                isActive ? 'text-primary' : 'text-muted-foreground'
              )}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="relative">
                <Icon
                  className={cn('w-6 h-6 transition-transform', isActive && 'scale-110')}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  fill={isActive ? 'currentColor' : 'none'}
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </span>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-primary' : 'text-muted-foreground')}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
