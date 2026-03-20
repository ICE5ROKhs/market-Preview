'use client'

import { useState } from 'react'
import BottomNav, { type TabType } from '@/components/bottom-nav'
import MarketPage from '@/components/market/market-page'
import PostsPage from '@/components/posts/posts-page'
import PublishPage from '@/components/publish/publish-page'
import MessagesPage from '@/components/messages/messages-page'
import ProfilePage from '@/components/profile/profile-page'
import { MESSAGES } from '@/lib/mock-data'

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('market')
  const totalUnread = MESSAGES.reduce((sum, m) => sum + m.unread, 0)

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
  }

  return (
    <main className="flex flex-col min-h-screen max-w-md mx-auto bg-background relative overflow-hidden">
      {/* 页面容器 - 固定高度，底部留出导航栏空间 */}
      <div
        className="flex-1 overflow-hidden"
        style={{ height: 'calc(100dvh - 64px)', minHeight: '500px' }}
      >
        {activeTab === 'market' && <MarketPage />}
        {activeTab === 'posts' && <PostsPage />}
        {activeTab === 'publish' && (
          <PublishPage onBack={() => setActiveTab('market')} />
        )}
        {activeTab === 'messages' && <MessagesPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </div>

      {/* 底部导航 - 仅在非发布页的对话界面显示，但始终保持 */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        unreadCount={totalUnread}
      />
    </main>
  )
}
