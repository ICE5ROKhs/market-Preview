'use client'

import { useState } from 'react'
import {
  Search, Bell, ShoppingBag, Heart, MessageCircle,
  UserPlus, CheckCircle, ChevronRight, ArrowLeft,
  Send, Phone, Video, MoreVertical,
} from 'lucide-react'
import { MESSAGES, NOTIFICATIONS, CHAT_MESSAGES, type Message, type ChatMessage } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConversation, setSelectedConversation] = useState<Message | null>(null)

  const filtered = MESSAGES.filter((m) =>
    m.contactName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (selectedConversation) {
    return (
      <ChatPage
        conversation={selectedConversation}
        onBack={() => setSelectedConversation(null)}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 顶部 */}
      <div className="sticky top-0 z-20 bg-background px-4 pt-4 pb-3 border-b border-border">
        <h1 className="font-bold text-xl text-foreground mb-3">消息</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索联系人..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* 通知消息栏 */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            通知中心
            <span className="w-5 h-5 bg-destructive text-white text-[10px] rounded-full flex items-center justify-center ml-auto">
              {NOTIFICATIONS.filter((n) => !n.isRead).length}
            </span>
          </h2>
          <NotificationPanel />
        </div>

        <div className="h-2 bg-muted mx-0 my-2" />

        {/* 会话列表 */}
        <div className="px-4 pt-2">
          <h2 className="text-sm font-semibold text-foreground mb-3">
            聊天 <span className="text-muted-foreground font-normal">({filtered.length})</span>
          </h2>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
              <MessageCircle className="w-12 h-12 opacity-20 mb-2" />
              <p className="text-sm">没有找到匹配的联系人</p>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {filtered.map((msg) => (
                <ConversationItem
                  key={msg.id}
                  message={msg}
                  onClick={() => setSelectedConversation(msg)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function NotificationPanel() {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? NOTIFICATIONS : NOTIFICATIONS.slice(0, 3)
  const icons: Record<string, typeof Bell> = {
    ShoppingBag, Heart: Heart, MessageCircle, UserPlus, CheckCircle: CheckCircle, Bell,
  }

  return (
    <div className="bg-card rounded-2xl shadow-sm overflow-hidden border border-border">
      {shown.map((n, i) => {
        const Icon = icons[n.icon] || Bell
        return (
          <div
            key={n.id}
            className={cn(
              'flex items-start gap-3 px-4 py-3 transition-colors',
              i < shown.length - 1 && 'border-b border-border',
              !n.isRead && 'bg-primary/5'
            )}
          >
            <div className={cn('w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0',
              n.type === 'system' ? 'bg-blue-100' :
              n.type === 'like' ? 'bg-red-100' :
              n.type === 'order' ? 'bg-green-100' : 'bg-orange-100'
            )}>
              <Icon className={cn('w-4 h-4',
                n.type === 'system' ? 'text-blue-500' :
                n.type === 'like' ? 'text-red-500' :
                n.type === 'order' ? 'text-green-500' : 'text-orange-500'
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn('text-sm leading-snug', !n.isRead ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                {n.content}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
            </div>
            {!n.isRead && (
              <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            )}
          </div>
        )
      })}
      {NOTIFICATIONS.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1 py-2.5 text-xs text-primary"
        >
          {expanded ? '收起' : `查看全部 ${NOTIFICATIONS.length} 条通知`}
          <ChevronRight className={cn('w-3 h-3 transition-transform', expanded && 'rotate-90')} />
        </button>
      )}
    </div>
  )
}

function ConversationItem({ message, onClick }: { message: Message; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-muted transition-colors"
    >
      {/* 头像 */}
      <div className="relative flex-shrink-0">
        <img
          src={message.contactAvatar}
          alt={message.contactName}
          className="w-12 h-12 rounded-full bg-muted"
        />
        {message.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-background" />
        )}
      </div>

      {/* 信息 */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-sm text-foreground">{message.contactName}</span>
          <span className="text-xs text-muted-foreground">{message.time}</span>
        </div>
        {message.productName && (
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full truncate max-w-[120px]">
              {message.productName}
            </span>
          </div>
        )}
        <p className="text-xs text-muted-foreground truncate">{message.lastMessage}</p>
      </div>

      {/* 未读数 */}
      {message.unread > 0 && (
        <span className="w-5 h-5 bg-destructive text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
          {message.unread}
        </span>
      )}
    </button>
  )
}

function ChatPage({ conversation, onBack }: { conversation: Message; onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES)
  const [inputText, setInputText] = useState('')

  const sendMessage = () => {
    if (!inputText.trim()) return
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    }
    setMessages((prev) => [...prev, newMsg])
    setInputText('')
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 顶部 */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-4 py-3 bg-card border-b border-border shadow-sm">
        <button onClick={onBack} className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="relative">
          <img src={conversation.contactAvatar} alt={conversation.contactName} className="w-9 h-9 rounded-full bg-muted" />
          {conversation.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-card" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-foreground">{conversation.contactName}</p>
          <p className="text-xs text-muted-foreground">{conversation.isOnline ? '在线' : '离线'}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <Phone className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center">
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* 商品信息条 */}
      {conversation.productName && (
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
          {conversation.productImage && (
            <img src={conversation.productImage} alt={conversation.productName} className="w-8 h-8 rounded-lg object-cover" />
          )}
          <p className="text-xs text-muted-foreground truncate flex-1">
            正在咨询：<span className="text-foreground font-medium">{conversation.productName}</span>
          </p>
        </div>
      )}

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4 pb-24">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex items-end gap-2', msg.senderId === 'me' ? 'flex-row-reverse' : 'flex-row')}
          >
            {msg.senderId !== 'me' && (
              <img
                src={conversation.contactAvatar}
                alt={conversation.contactName}
                className="w-8 h-8 rounded-full bg-muted flex-shrink-0"
              />
            )}
            <div className={cn('max-w-[70%]', msg.senderId === 'me' ? 'items-end' : 'items-start')}>
              <div
                className={cn(
                  'px-4 py-2.5 rounded-2xl text-sm leading-relaxed',
                  msg.senderId === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card text-foreground rounded-bl-md shadow-sm'
                )}
              >
                {msg.text}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 输入框 */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 max-w-md mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="发送消息..."
              className="w-full bg-muted rounded-full px-4 py-2.5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center transition-all',
              inputText.trim() ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
