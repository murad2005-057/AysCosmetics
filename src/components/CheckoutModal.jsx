import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  CheckCircle2,
  Lock,
  Truck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartDiscountAmount,
    shippingFee,
    estimatedTax,
    cartTotal,
    placeOrder,
    currentUser,
    setActiveTab
  } = useApp();

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'Aysel Quliyeva',
    email: currentUser?.email || 'aysel.quliyeva@gmail.com',
    phone: '+994 50 234 56 78',
    address: 'Nizami küçəsi 45, mənzil 12',
    city: 'Bakı',
    state: 'Səbail',
    zip: 'AZ1000',
    country: 'Azərbaycan',
    paymentMethod: 'Bank Kartı',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isCheckoutModalOpen) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAutoFill = () => {
    setFormData({
      fullName: 'Nigar Rzayeva',
      email: 'nigar.rzayeva@gmail.com',
      phone: '+994 55 890 12 34',
      address: 'Fikrət Əmirov küçəsi 14, bina 3',
      city: 'Bakı',
      state: 'Nəsimi',
      zip: 'AZ1010',
      country: 'Azərbaycan',
      paymentMethod: 'Bank Kartı',
      cardNumber: '•••• •••• •••• 8821',
      cardExp: '09/29',
      cardCvc: '452'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order = placeOrder({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        },
        paymentMethod: formData.paymentMethod
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 850);
  };

  const handleClose = () => {
    setIsCheckoutModalOpen(false);
    setCompletedOrder(null);
  };

  const handleViewOrders = () => {
    handleClose();
    setActiveTab('orders');
  };

  const handleInspectAsAdmin = () => {
    handleClose();
    setActiveTab('admin');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#FAF7F5] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden border border-stone-200 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-white px-5 sm:px-6 py-4 border-b border-stone-200 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-rose-600" />
            <h3 className="font-serif text-base sm:text-lg font-semibold text-stone-900">
              {completedOrder ? 'Sifariş Təsdiqi' : 'Təhlükəsiz Sifariş və Ödəniş'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
            aria-label="Bağla"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation State */}
        {completedOrder ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Ödəniş Uğurla Tamamlandı • Sifariş Qeydə Alındı
              </span>
              <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-semibold text-stone-900">
                Təşəkkür edirik, {completedOrder.userName}!
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                Sifarişiniz{' '}
                <strong className="text-stone-900 font-mono">{completedOrder.orderNumber}</strong> nömrəsi ilə qəbul edildi. Təsdiq bildirişi{' '}
                <span className="font-semibold text-stone-800">{completedOrder.userEmail}</span> ünvanına göndərildi.
              </p>
            </div>

            {/* Admin Notification Highlight Banner */}
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-left flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900">
                <strong className="font-semibold block text-sm">
                  Admin Panelinə Yeni Sifariş Bildirişi Göndərildi!
                </strong>
                Naviqasiya menyusunda <strong>"Admin Paneli"</strong> üzərində qırmızı bildiriş göstəricisi aktivləşdi. İstənilən vaxt daxil olub sifarişi emal edə bilərsiniz.
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 text-left space-y-2 text-xs">
              <div className="flex justify-between font-semibold text-stone-700 pb-2 border-b border-stone-100">
                <span>Sifariş edilən məhsullar ({completedOrder.items.length})</span>
                <span>Yekun: {completedOrder.total.toFixed(2)} ₼</span>
              </div>
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-stone-600 py-1">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium">{(item.price * item.quantity).toFixed(2)} ₼</span>
                </div>
              ))}
            </div>

            {/* Navigation Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleViewOrders}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 text-stone-700 font-semibold text-xs hover:bg-stone-100 transition"
              >
                Sifarişlərimi İzlə
              </button>
              <button
                onClick={handleInspectAsAdmin}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 text-rose-200 font-semibold text-xs hover:bg-stone-800 transition flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Admin Panelinə Keç</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <span className="text-xs text-stone-500 font-medium">
                Çatdırılma və ödəniş məlumatlarınızı tamamlayın
              </span>
              <button
                type="button"
                onClick={handleAutoFill}
                className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" /> Nümunə Məlumatları Doldur
              </button>
            </div>

            {/* Section 1: Customer Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                1. Müştəri Məlumatları
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Ad və Soyad</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">E-poçt (Qəbz üçün)</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Address */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Çatdırılma Ünvanı
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Küçə və Mənzil</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Şəhər</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Rayon / Ərazi</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Poçt İndeksi</label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                3. Ödəniş Üsulu
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {['Bank Kartı', 'Apple Pay', 'Qapıda Nağd'].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setFormData({ ...formData, paymentMethod: method })}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-center transition ${
                      formData.paymentMethod === method
                        ? 'bg-rose-50 border-rose-400 text-rose-900 font-bold shadow-xs'
                        : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              {formData.paymentMethod === 'Bank Kartı' && (
                <div className="p-3.5 bg-white rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Kart Nömrəsi</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                      />
                      <CreditCard className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-500 font-medium mb-1">Bitmə Tarixi</label>
                      <input
                        type="text"
                        name="cardExp"
                        value={formData.cardExp}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 font-medium mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Review Breakdown */}
            <div className="p-4 bg-stone-100 rounded-2xl space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Məhsulların cəmi ({cart.length} məhsul)</span>
                <span className="font-medium text-stone-900">{cartSubtotal.toFixed(2)} ₼</span>
              </div>
              {cartDiscountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Endirim</span>
                  <span>-{cartDiscountAmount.toFixed(2)} ₼</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Çatdırılma</span>
                <span>{shippingFee === 0 ? 'PULSUZ' : `${shippingFee.toFixed(2)} ₼`}</span>
              </div>
              <div className="flex justify-between">
                <span>ƏDV (8%)</span>
                <span>{estimatedTax.toFixed(2)} ₼</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Yekun Ödəniş</span>
                <span className="text-rose-900">{cartTotal.toFixed(2)} ₼</span>
              </div>
            </div>

            {/* Submit Button: "Ödəniş et" */}
            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full py-4 rounded-2xl bg-stone-900 text-stone-100 font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-rose-900 active:scale-98 transition shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sifariş emal edilir...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-rose-300" />
                  <span>Ödəniş et • {cartTotal.toFixed(2)} ₼</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
