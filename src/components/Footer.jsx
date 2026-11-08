import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, ShieldCheck, Leaf, Heart, Award } from 'lucide-react';

export default function Footer() {
  const { setActiveTab, setSelectedCategory, showToast } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Abunə olundu!', 'WELCOME10 promokodu ilə 10% endirim əldə etdiniz.', 'success');
  };

  return (
    <footer className="bg-[#241E1E] text-stone-300 pt-14 pb-12 border-t border-stone-800">
      {/* Values Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 pb-12 border-b border-stone-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-800/80 text-rose-300 flex items-center justify-center mb-3">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-stone-100 font-medium text-base">Təmiz Formul</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-[180px]">
              Paraben, sulfat və zərərli kimyəvi qatqılardan tam azaddır.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-800/80 text-rose-300 flex items-center justify-center mb-3">
              <Heart className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-stone-100 font-medium text-base">Cruelty-Free</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-[180px]">
              Heç bir heyvan üzərində sınaq keçirilmir, 100% etik.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-800/80 text-rose-300 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-stone-100 font-medium text-base">Fransız İrsi</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-[180px]">
              Qras və Provansda yetişdirilən orqanik botanik ekstraktlar.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-800/80 text-rose-300 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-stone-100 font-medium text-base">Dermatoloji Təsdiq</h4>
            <p className="text-xs text-stone-400 mt-1 max-w-[180px]">
              Həssas dərilər üçün hipoallergen və baryer qoruyucu.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex flex-col items-start">
              <span className="text-2xl font-serif tracking-[0.25em] font-semibold text-stone-100">
                AURA LUXE
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-rose-300 font-medium">
                Təbii Lüks Kosmetika
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Təbii gözəlliyinizi vurğulayan innovativ dəri qulluq vasitələri, ipək toxunuşlu makiyaj və nadir notalı parfümlər.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-0.5">
            <p>💌 elaqe@auraluxe.az • +994 12 490 00 00</p>
            </div>
          </div>

          {/* Quick Links: Collections */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Kolleksiyalar
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Dəri qulluğu');
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition"
                >
                  Dəri Qulluğu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Makiyaj');
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition"
                >
                  İpək Makiyaj
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Ətir');
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition"
                >
                  Lüks Ətirlər
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Saç qulluğu');
                    setActiveTab('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition"
                >
                  Saç Qulluğu
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Müştəri Xidməti
            </h5>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition"
                >
                  Sifarişi İzlə
                </button>
              </li>
              <li>
                {/* <button
                  onClick={() => {
                    setActiveTab('admin');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-rose-300 transition flex items-center gap-1 text-rose-300 font-medium"
                >
                 </button> */}
              </li>
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Çatdırılma və Geri qaytarma</span>
              </li>
              <li>
                <span className="hover:text-stone-300 cursor-pointer">Fərdi Konsultasiya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-4 space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Yeniliklərdən Xəbərdar Olun
            </h5>
            <p className="text-xs text-stone-400 leading-relaxed">
              Yeni məhsul buraxılışları və eksklüziv endirimlər haqqında ilk xəbərdar olmaq üçün abunə olun.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 border border-rose-500/40 rounded-2xl text-xs text-rose-200">
                ✨ Təşəkkür edirik! İlk sifarişinizdə <strong className="text-white">WELCOME10</strong> promokodu ilə 10% endirim əldə edin.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="E-poçt ünvanınız"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1 shadow-md shrink-0"
                >
                  <span>Qoşul</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-stone-800/70 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 AURA LUXE Laboratories Inc. Bütün hüquqlar qorunur.</p>
          <div className="flex gap-5">
            <span className="hover:text-stone-400 cursor-pointer">Məxfilik Siyasəti</span>
            <span className="hover:text-stone-400 cursor-pointer">İstifadə Şərtləri</span>
            <span className="hover:text-stone-400 cursor-pointer">Sertifikatlar</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
