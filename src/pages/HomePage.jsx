import React from 'react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  Droplet,
  Quote
} from 'lucide-react';

export default function HomePage() {
  const { products, setActiveTab, setSelectedCategory } = useApp();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bestsellers = products.slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-20 pb-16 sm:pb-20">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F5EFEB] via-[#FAF7F5] to-[#FAF7F5] pt-8 sm:pt-12 pb-16 sm:pb-20 border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-900 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 animate-spin" />
                <span>Yaz 2026 Təbii Botanik Kolleksiyası</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-stone-900 font-normal leading-[1.18] tracking-tight">
                Təbii Bitki Ekstraktları. <br />
                <span className="italic font-light text-rose-950">Zamansız Gözəllik.</span>
              </h1>

              <p className="text-xs sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Gündəlik baxım ritualınızı hüceyrə səviyyəsində dərini bərpa edən serumlar, nadir notalı parfümlər və ipək makiyaj vasitələri ilə zənginləşdirin.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory('Hamısı');
                    setActiveTab('shop');
                  }}
                  className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-stone-900 text-stone-100 text-xs uppercase tracking-widest font-semibold hover:bg-rose-900 active:scale-98 transition shadow-xl flex items-center gap-2"
                >
                  <span>Kolleksiyanı Kəşf Et</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCategoryClick('Dəri qulluğu')}
                  className="px-5 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white text-stone-800 text-xs uppercase tracking-widest font-semibold border border-stone-300 hover:border-stone-900 transition shadow-xs"
                >
                  Dəri Qulluq Ritualları
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 sm:pt-8 border-t border-stone-200/80 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-stone-600 text-xs">
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 block">
                    100%
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider font-medium">
                    Təmiz & Vegan
                  </span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 block">
                    72 Saat
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider font-medium">
                    Dərin Nəmlik
                  </span>
                </div>
                <div>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 block">
                    4.9★
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-500 uppercase tracking-wider font-medium">
                    Müştəri Rəyi
                  </span>
                </div>
              </div>
            </div>

            {/* Right Editorial Hero Image Grid */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-xs sm:max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-4/5">
                  <img
                    src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80"
                    alt="Aura Luxe Lüks Kosmetika"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-5 sm:p-6">
                    <div className="text-white">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-rose-300">
                        İmza Ətri
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-medium">Fleur Sauvage Eau de Parfum</h3>
                      <p className="text-xs text-stone-200">Dəməşq qızılgülü və Haiti vetiveri</p>
                    </div>
                  </div>
                </div>

                {/* Floating Accent Pill */}
                <div className="absolute -bottom-5 -left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-stone-200 shadow-xl hidden sm:flex items-center gap-3 max-w-xs animate-fade-in">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-stone-900 block">Klinik Test Olunmuş</span>
                    <span className="text-stone-500 text-[11px]">Keramid, Peptid və Bio-Retinol</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs uppercase tracking-widest text-rose-800 font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Seçilmiş Kateqoriyalar
          </span>
          <h2 className="mt-2.5 font-serif text-2xl sm:text-4xl font-medium text-stone-900">
            Fərdi Gözəlliyiniz Üçün Yaradıldı
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-stone-500 leading-relaxed font-sans">
            Dərinizi qidalandıran, əhvalınızı yüksəldən və fərdiliyinizi vurğulayan eksklüziv kosmetika xəttimizi kəşf edin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {/* Dəri qulluğu Card */}
          <div
            onClick={() => handleCategoryClick('Dəri qulluğu')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200"
          >
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80"
              alt="Dəri qulluğu"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300">
                Bərpaedici
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">Dəri Qulluğu</h3>
              <p className="text-xs text-stone-300 mt-1">İşıltı serumları, keramid kremlər, mistlər</p>
              <span className="mt-3 text-xs font-semibold text-rose-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Məhsullara Bax <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Makiyaj Card */}
          <div
            onClick={() => handleCategoryClick('Makiyaj')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200"
          >
            <img
              src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80"
              alt="Makiyaj"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300">
                Lüks İşıltı
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">İpək Makiyaj</h3>
              <p className="text-xs text-stone-300 mt-1">Mat dodaq boyaları, bişirilmiş haylayterlər</p>
              <span className="mt-3 text-xs font-semibold text-rose-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Məhsullara Bax <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Ətir Card */}
          <div
            onClick={() => handleCategoryClick('Ətir')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200"
          >
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80"
              alt="Ətir"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300">
                Haute Parfumerie
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">Lüks Ətirlər</h3>
              <p className="text-xs text-stone-300 mt-1">Nadir odunsu ekstraktlar, çiçək nektarları</p>
              <span className="mt-3 text-xs font-semibold text-rose-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Məhsullara Bax <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Saç qulluğu Card */}
          <div
            onClick={() => handleCategoryClick('Saç qulluğu')}
            className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200"
          >
            <img
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80"
              alt="Saç qulluğu"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent p-5 sm:p-6 flex flex-col justify-end text-white">
              <span className="text-[10px] tracking-widest uppercase font-bold text-rose-300">
                Dərin Qidalanma
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium">Saç Qulluğu</h3>
              <p className="text-xs text-stone-300 mt-1">Marula maskaları, kök bərpaedici eliksirlər</p>
              <span className="mt-3 text-xs font-semibold text-rose-200 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Məhsullara Bax <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bestsellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              Kolleksiyanın Ən Populyarları
            </span>
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-medium text-stone-900">
              Ən Çox Satılanlar
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('Hamısı');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-rose-700 flex items-center gap-1 transition"
          >
            <span>Bütün Məhsullara Bax</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Philosophy Editorial Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2B2323] text-stone-200 rounded-3xl p-6 sm:p-14 overflow-hidden relative shadow-2xl border border-stone-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs uppercase tracking-widest text-rose-300 font-semibold">
                Fəlsəfəmiz
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-stone-100 font-light leading-snug">
                "Biz inanırıq ki, həqiqi lüks təbiətlə vəhdətdədir. Hər bir formulumuz təmizlik, klinik keyfiyyət və dərinizə qayğı ilə hazırlanır."
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-sans leading-relaxed max-w-2xl">
                Aura Luxe ənənəvi soyuq sıxım ekstraksiya metodlarını müasir biotexnologiya ilə birləşdirərək həm dərinizi bəsləyən, həm də estetik zövq verən kosmetik məhsullar yaradır.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-5 sm:p-6 bg-stone-900/60 rounded-2xl border border-stone-700/60 text-center max-w-xs space-y-3">
                <Quote className="w-8 h-8 text-rose-400 mx-auto opacity-70" />
                <p className="font-serif text-sm italic text-stone-200">
                  "Davamlı və təmiz lüks kosmetikanın ən gözəl nümunəsi. Dəri serumları sözün əsl mənasında dərini dəyişdirir."
                </p>
                <span className="text-[11px] uppercase tracking-widest font-semibold text-rose-300 block">
                  — Vogue International
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
