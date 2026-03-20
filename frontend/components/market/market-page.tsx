'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Eye, Star, Heart } from 'lucide-react'
import { PRODUCTS, PRODUCT_CATEGORIES, type Product } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import ProductDetail from './product-detail'

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['p2', 'p5', 'p11']))

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === '全部' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCat && matchSearch
  })

  const left = filtered.filter((_, i) => i % 2 === 0)
  const right = filtered.filter((_, i) => i % 2 === 1)

  const toggleFav = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        isFavorited={favorites.has(selectedProduct.id)}
        onToggleFav={() =>
          setFavorites((prev) => {
            const next = new Set(prev)
            next.has(selectedProduct.id) ? next.delete(selectedProduct.id) : next.add(selectedProduct.id)
            return next
          })
        }
        onBack={() => setSelectedProduct(null)}
        onChat={() => {}}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-20 bg-background px-4 pt-4 pb-2 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* 分类标签 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all',
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-secondary'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 瀑布流商品列表 */}
      <div className="flex-1 overflow-y-auto px-3 pt-3 pb-24">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <ShoppingBagEmpty />
            <p className="mt-3 text-sm">没有找到相关商品</p>
          </div>
        ) : (
          <div className="flex gap-2.5">
            <div className="flex-1 flex flex-col gap-2.5">
              {left.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorited={favorites.has(p.id)}
                  onToggleFav={(e) => toggleFav(p.id, e)}
                  onClick={() => setSelectedProduct(p)}
                />
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-2.5">
              {right.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  isFavorited={favorites.has(p.id)}
                  onToggleFav={(e) => toggleFav(p.id, e)}
                  onClick={() => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ShoppingBagEmpty() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="opacity-30">
      <rect x="12" y="22" width="40" height="34" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M22 22V18a10 10 0 0120 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

interface ProductCardProps {
  product: Product
  isFavorited: boolean
  onToggleFav: (e: React.MouseEvent) => void
  onClick: () => void
}

function ProductCard({ product, isFavorited, onToggleFav, onClick }: ProductCardProps) {
  return (
    <div
      className="product-card bg-card rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-border/50"
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`查看商品：${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      {/* 商品图片 */}
      <div className="relative w-full aspect-square bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* 收藏按钮 */}
        <button
          onClick={onToggleFav}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center"
          aria-label={isFavorited ? '取消收藏' : '收藏'}
        >
          <Heart
            className={cn('w-4 h-4 transition-colors', isFavorited ? 'text-red-400 fill-red-400' : 'text-white')}
          />
        </button>
        {/* 品类标签 */}
        <span className="absolute top-2 left-2 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
          {product.category}
        </span>
      </div>

      {/* 商品信息 */}
      <div className="p-2.5">
        {/* 商品名 */}
        <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2 mb-1.5">
          {product.name}
        </p>

        {/* 价格 */}
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-primary font-bold text-base leading-none">¥{product.price}</span>
          {product.originalPrice && (
            <span className="text-muted-foreground text-xs line-through">¥{product.originalPrice}</span>
          )}
        </div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <img
              src={product.sellerAvatar}
              alt={product.seller}
              className="w-4 h-4 rounded-full bg-muted"
            />
            <span className="text-muted-foreground text-[10px] truncate max-w-[55px]">{product.seller}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <Eye className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">{product.views}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] text-muted-foreground">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
