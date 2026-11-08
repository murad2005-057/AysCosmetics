import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
  Truck
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThresholdLeft,
    estimatedTax,
    cartTotal,
    cartTotalItemsCount,
    promoCode,
    setPromoCode,
    appliedPromoName,
    applyPromo,
    removePromo,
    setIsCheckoutModalOpen,
    setActiveTab
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyPromo(inputCoupon);
    if (ok) setInputCoupon('');
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    setIsCheckoutModalOpen(true);
  };

  // Progress for free shipping (75 ₼ threshold)
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / 75) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="absolute inset-0 bg-stone-900/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F5] shadow-2xl flex flex-col justify-between border-l border-stone-200">
          {/* Header */}
          <div className="p-4 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-50 rounded-xl text-rose-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
                  Alış-veriş Səbətiniz
                </h2>
                <span className="text-xs text-stone-500 font-medium">
                  {cartTotalItemsCount} {cartTotalItemsCount === 1 ? 'məhsul' : 'məhsul'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
              aria-label="Bağla"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {cart.length > 0 && (
            <div className="bg-white px-5 sm:px-6 py-3 border-b border-stone-100">
              <div className="flex items-center justify-between text-xs font-medium text-stone-700 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-rose-600" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700 font-semibold">
                      🎉 Pulsuz çatdırılma qazandınız!
                    </span>
                  ) : (
                    <span>
                      Pulsuz çatdırılma üçün daha <strong className="text-stone-900">{freeShippingThresholdLeft.toFixed(2)} ₼</strong> əlavə edin
                    </span>
                  )}
                </span>
                <span className="text-[11px] font-bold text-stone-500">{shippingProgress}%</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-rose-500 h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mb-4 shadow-inner">
                  <ShoppingBag className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  Səbətiniz boşdur
                </h3>
                <p className="mt-1.5 text-xs text-stone-500 max-w-xs leading-relaxed">
                  Təbii dəri serumları, lüks ətirlər və ipək makiyaj kolleksiyamızı kəşf edin.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActiveTab('shop');
                  }}
                  className="mt-5 px-6 py-3 rounded-full bg-stone-900 text-stone-100 text-xs uppercase tracking-wider font-semibold hover:bg-rose-800 transition shadow-md"
                >
                  Məhsullara Bax
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 sm:gap-4 p-3 sm:p-3.5 bg-white rounded-2xl border border-stone-200/70 shadow-xs hover:border-stone-300 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl bg-stone-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition p-1"
                          aria-label="Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-400 block mt-0.5">
                        {item.category} {item.volume ? `• ${item.volume}` : ''}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1">
                      <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans">
                        {(item.price * item.quantity).toFixed(2)} ₼
                      </span>

                      {/* Quantity stepper */}
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white text-xs font-bold"
                          aria-label="Azalt"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 sm:w-6 text-center text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white text-xs font-bold"
                          aria-label="Artır"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-white border-t border-stone-200 space-y-3.5">
              {/* Promo Coupon Form */}
              <div>
                {appliedPromoName ? (
                  <div className="flex items-center justify-between p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5 text-rose-600" />
                      Promokod aktivdir: <strong>{appliedPromoName}</strong>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-stone-500 hover:text-stone-800 text-[11px] underline"
                    >
                      Ləğv et
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promokod (məsələn, GLOW20)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-rose-300"
                    />
                    <button
                      type="submit"
                      className="px-3.5 sm:px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition"
                    >
                      Tətbiq et
                    </button>
                  </form>
                )}
              </div>

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1 border-t border-stone-100">
                <div className="flex justify-between">
                  <span>Məhsulların cəmi</span>
                  <span className="font-semibold text-stone-900">{cartSubtotal.toFixed(2)} ₼</span>
                </div>

                {cartDiscountAmount > 0 && (
                  <div className="flex justify-between text-rose-600 font-medium">
                    <span>Endirim</span>
                    <span>-{cartDiscountAmount.toFixed(2)} ₼</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Çatdırılma</span>
                  <span className="font-semibold text-stone-900">
                    {shippingFee === 0 ? 'PULSUZ' : `${shippingFee.toFixed(2)} ₼`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>ƏDV (8%)</span>
                  <span className="font-semibold text-stone-900">{estimatedTax.toFixed(2)} ₼</span>
                </div>

                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                  <span>Yekun məbləğ</span>
                  <span className="text-rose-900">{cartTotal.toFixed(2)} ₼</span>
                </div>
              </div>

              {/* Checkout Button: "Ödəniş et" */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 sm:py-4 rounded-2xl bg-stone-900 text-stone-100 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-900 active:scale-98 transition shadow-lg"
              >
                <span>Ödəniş et</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-stone-400">
                🔒 Təhlükəsiz və qorunan frontend ödəniş axını
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
