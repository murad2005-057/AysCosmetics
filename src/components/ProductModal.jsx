import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Heart, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';

export default function ProductModal() {
  const {
    selectedProductForModal,
    setSelectedProductForModal,
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const isFav = isWishlisted(product.id);
  const fallbackImg =
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80';

  const handleClose = () => {
    setSelectedProductForModal(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden border border-stone-200/80 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-stone-100 text-stone-700 flex items-center justify-center shadow-md transition"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image Section */}
          <div className="relative aspect-4/5 md:aspect-auto bg-stone-100 overflow-hidden flex items-center justify-center min-h-[280px]">
            <img
              src={imgError ? fallbackImg : product.image}
              onError={() => setImgError(true)}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] tracking-wider uppercase font-bold px-3 py-1 rounded-full shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Product Info Section */}
          <div className="p-5 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-widest text-stone-400 font-semibold">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-stone-900 font-semibold">{product.rating}</span>
                  <span className="text-stone-400">({product.reviewsCount} rəy)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium leading-tight">
                {product.name}
              </h2>

              {/* Price & Volume */}
              <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
                <span className="text-2xl font-bold text-stone-900 font-sans">
                  {product.price.toFixed(2)} ₼
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    {product.originalPrice.toFixed(2)} ₼
                  </span>
                )}
                {product.volume && (
                  <span className="text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-lg">
                    {product.volume}
                  </span>
                )}
              </div>

              {/* Stock Status Indicator */}
              <div className="mt-3.5 flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    product.inStock && product.stockCount > 0 ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                ></span>
                <span className="text-xs font-medium text-stone-600">
                  {product.inStock && product.stockCount > 0
                    ? `Anbarda mövcuddur (${product.stockCount} ədəd qalıb)`
                    : 'Hazırda anbarda tükənib'}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3.5 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Details / Botanical Highlights */}
              {product.details && (
                <div className="mt-4 p-3.5 bg-[#FAF7F5] rounded-2xl border border-stone-200/60 text-xs text-stone-600 space-y-1">
                  <span className="font-semibold text-stone-800 block text-[11px] uppercase tracking-wider">
                    Düstur Xüsusiyyətləri
                  </span>
                  <p className="leading-relaxed">{product.details}</p>
                </div>
              )}

              {/* Trust Badges */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                  <span>100% Təmiz Formul</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Vegan & Cruelty-Free</span>
                </div>
              </div>
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center border border-stone-300 rounded-2xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1 || !product.inStock}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 text-base font-bold"
                  >
                    -
                  </button>
                  <span className="w-7 sm:w-8 text-center text-xs sm:text-sm font-semibold text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockCount || 99, q + 1))}
                    disabled={!product.inStock || quantity >= (product.stockCount || 1)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 text-base font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stockCount <= 0}
                  className={`flex-1 py-3 sm:py-3.5 px-4 rounded-2xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    product.inStock && product.stockCount > 0
                      ? 'bg-stone-900 text-stone-100 hover:bg-rose-800 active:scale-98'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {product.inStock
                      ? `Səbətə at • ${(product.price * quantity).toFixed(2)} ₼`
                      : 'Bitib'}
                  </span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition shadow-xs shrink-0 ${
                    isFav
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'border-stone-200 hover:border-stone-400 text-stone-600 bg-white'
                  }`}
                  aria-label="Seçilmişlərə əlavə et"
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
