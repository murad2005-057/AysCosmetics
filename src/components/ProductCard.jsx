import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProductForModal
  } = useApp();

  const [imgError, setImgError] = useState(false);
  const isFav = isWishlisted(product.id);

  const fallbackImg =
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-stone-200/70 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image & Badge Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-stone-100">
        <img
          src={imgError ? fallbackImg : product.image}
          onError={() => setImgError(true)}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[10px] tracking-wider uppercase font-bold px-2.5 py-1 rounded-full shadow-xs ${
                product.badge === 'Ən çox satılan'
                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                  : product.badge === 'Tükənib'
                  ? 'bg-stone-800 text-stone-200'
                  : 'bg-rose-100 text-rose-900 border border-rose-200'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white w-fit shadow-xs">
              -{discountPercent}% Endirim
            </span>
          )}
        </div>

        {/* Top Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md ${
              isFav
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-stone-700 hover:text-rose-600 hover:bg-white'
            }`}
            aria-label="Seçilmişlərə əlavə et"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => setSelectedProductForModal(product)}
            className="w-9 h-9 rounded-full bg-white/90 text-stone-700 hover:text-stone-900 hover:bg-white flex items-center justify-center transition-all duration-200 shadow-md backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-y-1 sm:group-hover:translate-y-0"
            aria-label="Ətraflı baxış"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Out of Stock Overlay */}
        {(!product.inStock || product.stockCount <= 0) && (
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center z-15">
            <span className="bg-stone-900 text-stone-100 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
              Tükənib
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-stone-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => setSelectedProductForModal(product)}
            className="font-serif text-base sm:text-lg text-stone-900 font-medium line-clamp-1 cursor-pointer hover:text-rose-700 transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description Excerpt */}
          <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed font-sans">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-stone-900 font-sans">
                {product.price.toFixed(2)} ₼
              </span>
              {product.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  {product.originalPrice.toFixed(2)} ₼
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block font-medium">
              {product.volume || 'Standart həcm'}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock || product.stockCount <= 0}
            className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs ${
              product.inStock && product.stockCount > 0
                ? 'bg-stone-900 text-stone-100 hover:bg-rose-800 active:scale-95'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock && product.stockCount > 0 ? 'Səbətə at' : 'Bitib'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
