import React from 'react';
import { useApp } from '../context/AppContext';
import { Package, CheckCircle2 } from 'lucide-react';

export default function MyOrdersPage() {
  const { orders, currentUser, setActiveTab } = useApp();

  const userOrders = currentUser
    ? orders.filter(
        (o) =>
          o.userEmail?.toLowerCase() === currentUser.email?.toLowerCase() ||
          currentUser.role === 'admin'
      )
    : orders;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
          Müştəri Xidməti
        </span>
        <h1 className="mt-1 font-serif text-2xl sm:text-4xl font-semibold text-stone-900">
          Sifarişlərim və İzləmə
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-stone-500 font-sans">
          Sifarişlərinizin çatdırılma gedişatını izləyin və rəsmi qəbzlərinizə baxın.
        </p>
      </div>

      {userOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-medium text-stone-900">
            Hələ ki, heç bir sifarişiniz yoxdur
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Mükafatlı təbii kosmetika və zərif ətirlərimizdən seçin və sürətli çatdırılmadan zövq alın.
          </p>
          <button
            onClick={() => setActiveTab('shop')}
            className="px-6 py-3 bg-stone-900 text-stone-100 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-rose-900 transition shadow-md"
          >
            Alış-verişə Başla
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => {
            const dateStr = new Date(order.date).toLocaleDateString('az-AZ', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            });

            // Delivery Status Progress
            const steps = ['Təsdiqləndi', 'Hazırlanır', 'Göndərildi', 'Çatdırıldı'];
            let currentStepIdx = 1;
            if (order.status === 'Pending') currentStepIdx = 0;
            if (order.status === 'Hazırlanır' || order.status === 'Processing') currentStepIdx = 1;
            if (order.status === 'Göndərildi' || order.status === 'Shipped') currentStepIdx = 2;
            if (order.status === 'Çatdırıldı' || order.status === 'Delivered') currentStepIdx = 3;

            return (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-stone-200/80 shadow-xs overflow-hidden"
              >
                {/* Order Top Bar */}
                <div className="p-4 sm:p-6 bg-stone-50/70 border-b border-stone-100 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100/70 text-rose-800 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-stone-900">
                          {order.orderNumber}
                        </span>
                        {order.isNew && (
                          <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Yenicə Verildi
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-400">{dateStr}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-stone-400 block">Yekun Məbləğ</span>
                    <span className="font-bold text-base text-stone-900 font-sans">
                      {order.total.toFixed(2)} ₼
                    </span>
                  </div>
                </div>

                {/* Fulfillment Status Stepper */}
                <div className="px-4 sm:px-6 py-5 border-b border-stone-100 overflow-x-auto">
                  <div className="flex items-center justify-between max-w-xl mx-auto relative min-w-[280px]">
                    {/* Connecting line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-200 -translate-y-1/2 z-0" />
                    <div
                      className="absolute top-1/2 left-0 h-0.5 bg-rose-500 -translate-y-1/2 z-0 transition-all duration-500"
                      style={{
                        width: `${(currentStepIdx / (steps.length - 1)) * 100}%`
                      }}
                    />

                    {steps.map((st, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div key={st} className="relative z-10 flex flex-col items-center">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isComplete
                                ? 'bg-rose-600 text-white ring-4 ring-rose-100'
                                : 'bg-stone-200 text-stone-500'
                            }`}
                          >
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span
                            className={`mt-2 text-[10px] sm:text-[11px] tracking-wide font-medium whitespace-nowrap ${
                              isCurrent
                                ? 'text-rose-900 font-bold'
                                : isComplete
                                ? 'text-stone-700'
                                : 'text-stone-400'
                            }`}
                          >
                            {st}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in this Order */}
                <div className="p-4 sm:p-6 space-y-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                    Sifariş Edilən Məhsullar
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50/50 border border-stone-100"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl bg-stone-100 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-stone-900 truncate">
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-stone-400 block mt-0.5">
                            {item.quantity} ədəd • {item.price.toFixed(2)} ₼
                          </span>
                        </div>
                        <span className="text-xs font-bold text-stone-900 font-sans shrink-0">
                          {(item.price * item.quantity).toFixed(2)} ₼
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Destination Footer */}
                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2">
                    <div>
                      <span className="font-semibold text-stone-700">Çatdırılma Ünvanı: </span>
                      <span>
                        {order.shippingAddress?.fullName}, {order.shippingAddress?.address},{' '}
                        {order.shippingAddress?.city}, {order.shippingAddress?.zip}
                      </span>
                    </div>

                    <div className="text-stone-400">
                      Ödəniş üsulu: <span className="text-stone-700 font-medium">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
