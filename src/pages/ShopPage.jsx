import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, X, AlertCircle, Heart } from 'lucide-react';

export default function ShopPage() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    wishlist
  } = useApp();

  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Wishlist filter
        if (showFavoritesOnly && !wishlist.includes(p.id)) {
          return false;
        }

        // Category filter
        const matchCategory =
          selectedCategory === 'Hamısı' ||
          p.category.toLowerCase() === selectedCategory.toLowerCase();

        // Search query filter
        const matchSearch =
          !searchQuery.trim() ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));

        // In-stock filter
        const matchStock = !inStockOnly || (p.inStock && p.stockCount > 0);

        return matchCategory && matchSearch && matchStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0; // featured / default order
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, showFavoritesOnly, wishlist, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('Hamısı');
    setSearchQuery('');
    setInStockOnly(false);
    setShowFavoritesOnly(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8">
      {/* Title & Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
          Gözəllik Kataloqu
        </span>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900">
          Kosmetika Butiki
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-stone-500 font-sans">
          Nəmləndirici serumlar, məxməri makiyaj piqmentləri, nadir ətirlər və saç baxımı.
        </p>
      </div>

      {/* Filter and Category Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/80 shadow-xs space-y-4">
        {/* Category Pills & Wishlist */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setShowFavoritesOnly(false);
                setSelectedCategory(cat);
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                !showFavoritesOnly && selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-stone-900 text-stone-100 shadow-md'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all duration-200 ${
              showFavoritesOnly
                ? 'bg-rose-600 text-white shadow-md'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-current' : ''}`} />
            <span>Seçilmişlər ({wishlist.length})</span>
          </button>
        </div>

        {/* Search, In-Stock Toggle, & Sorting Controls */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-stone-100 text-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Məhsul adı və ya tərkib axtarın..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none text-xs"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3 sm:gap-4">
            {/* In-Stock Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none text-stone-700 font-medium">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded text-rose-600 focus:ring-rose-400 border-stone-300"
              />
              <span>Yalnız Anbarda</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 font-medium">Sırala:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-700 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="featured">Seçilmiş Kolleksiya</option>
                <option value="price-asc">Qiymət: Ucuzdan bahaya</option>
                <option value="price-desc">Qiymət: Bahadan ucuza</option>
                <option value="rating">Ən yüksək reytinq</option>
                <option value="name">Əlifba sırası ilə (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Bar if any */}
        {(selectedCategory !== 'Hamısı' || searchQuery || inStockOnly || showFavoritesOnly) && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            <span className="text-stone-400 font-medium">Aktiv filtrlər:</span>

            {showFavoritesOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-medium">
                Seçilmiş Məhsullar ({wishlist.length})
                <button onClick={() => setShowFavoritesOnly(false)}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {selectedCategory !== 'Hamısı' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                Kateqoriya: {selectedCategory}
                <button onClick={() => setSelectedCategory('Hamısı')}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                "{searchQuery}"
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            {inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200">
                Anbarda Olanlar
                <button onClick={() => setInStockOnly(false)}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-stone-500 hover:text-stone-900 underline ml-2 font-medium"
            >
              Hamısını Sıfırla
            </button>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1 font-medium">
        <span>
          Cəmi <strong>{filteredProducts.length}</strong> təbii kosmetik məhsul tapıldı
        </span>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-2xl font-medium text-stone-900">
            Axtarışınıza uyğun məhsul tapılmadı
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Filtrləri dəyişdirməyə və ya başqa kateqoriyanı seçməyə cəhd edin.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-stone-900 text-stone-100 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-rose-800 transition shadow-sm"
          >
            Filtrləri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
