import React, { useState } from 'react';
import { useApp, ADMIN_PASSWORD } from '../context/AppContext';
import { CATEGORIES } from '../data/products';
import {
  Shield,
  Bell,
  Package,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  RotateCcw,
  Eye,
  X,
  Search,
  Sparkles
} from 'lucide-react';

export default function AdminPage() {
  const {
    isAdmin,
    loginAsAdminDirect,
    orders,
    newOrdersCount,
    markOrdersAsRead,
    updateOrderStatus,
    deleteOrder,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault
  } = useApp();

  // Admin Login Form State if not yet authenticated
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Active Sub-Tab
  const [adminSubTab, setAdminSubTab] = useState('orders'); // 'orders' | 'inventory'

  // Orders Filter
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Inventory Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryCategory, setInventoryCategory] = useState('Hamısı');

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Dəri qulluğu',
    price: '',
    originalPrice: '',
    stockCount: 15,
    volume: '50 ml / 1.7 oz',
    badge: 'Yeni',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    description: '',
    details: ''
  });

  // Preset Luxury Images
  const PRESET_IMAGES = [
    { label: 'Serum Şüşəsi', url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80' },
    { label: 'Krem Qabı', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80' },
    { label: 'Ətir Flakonu', url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80' },
    { label: 'Mat Dodaq Boyası', url: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80' },
    { label: 'Saç Maskası', url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80' }
  ];

  // Auth gate if user is not admin
  if (!isAdmin) {
    const handleLogin = (e) => {
      e.preventDefault();
      const success = loginAsAdminDirect(adminPasswordInput);
      if (!success) {
        setAuthError('Admin şifrəsi yanlışdır. Standart şifrə: admin123');
      }
    };

    return (
      <div className="max-w-md mx-auto my-12 sm:my-16 px-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mx-auto shadow-inner">
            <Shield className="w-8 h-8" />
          </div>

          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Admin Portalı Girişi
            </h2>
            <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
              İnventarı idarə etmək və müştəri sifarişlərini nəzərdən keçirmək üçün admin şifrəsini təsdiqləyin.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Admin şifrəsi (admin123)"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-stone-900 text-rose-200 rounded-xl text-xs uppercase tracking-wider font-semibold hover:bg-stone-800 transition shadow-md"
            >
              Təsdiq Et və Daxil Ol
            </button>
          </form>

          <button
            type="button"
            onClick={() => loginAsAdminDirect(ADMIN_PASSWORD)}
            className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-semibold transition border border-rose-200"
          >
            ⚡ 1-Kliklə Giriş ("admin123")
          </button>
        </div>
      </div>
    );
  }

  // --- STATS COMPUTATION ---
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const outOfStockCount = products.filter((p) => !p.inStock || p.stockCount <= 0).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter === 'All') return true;
    return o.status?.toLowerCase() === orderStatusFilter.toLowerCase();
  });

  // Filtered Inventory
  const filteredInventory = products.filter((p) => {
    const matchCat = inventoryCategory === 'Hamısı' || p.category === inventoryCategory;
    const matchSearch =
      !inventorySearch ||
      p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
      p.category.toLowerCase().includes(inventorySearch.toLowerCase());
    return matchCat && matchSearch;
  });

  // Handlers for Product CRUD
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Dəri qulluğu',
      price: '',
      originalPrice: '',
      stockCount: 20,
      volume: '50 ml / 1.7 oz',
      badge: 'Yeni',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      description: '',
      details: ''
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price.toString(),
      originalPrice: prod.originalPrice ? prod.originalPrice.toString() : '',
      stockCount: prod.stockCount,
      volume: prod.volume || '',
      badge: prod.badge || '',
      image: prod.image,
      description: prod.description || '',
      details: prod.details || ''
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category: productForm.category,
        price: parseFloat(productForm.price),
        originalPrice: productForm.originalPrice ? parseFloat(productForm.originalPrice) : null,
        stockCount: parseInt(productForm.stockCount, 10),
        volume: productForm.volume,
        badge: productForm.badge,
        image: productForm.image,
        description: productForm.description,
        details: productForm.details
      });
    } else {
      addProduct(productForm);
    }

    setIsProductModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-6 sm:space-y-8 animate-fade-in">
      {/* Prominent Visual Notification Badge / Alert */}
      {newOrdersCount > 0 ? (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-900 to-rose-950 text-white rounded-3xl shadow-xl border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-4 animate-pulse-glow">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center font-bold text-sm shadow-md">
                <Bell className="w-5 h-5 text-white" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-rose-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Diqqət Tələb Olunur
                </span>
                <h3 className="font-serif text-lg font-semibold text-rose-100">
                  Yeni sifarişlər var! Sifarişlər bölməsini yoxlayın!
                </h3>
              </div>
              <p className="text-xs text-rose-200 mt-0.5">
                Hazırda baxılmamış <strong>{newOrdersCount}</strong> yeni müştəri sifarişi mövcuddur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAdminSubTab('orders');
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="px-4 py-2 bg-white text-rose-950 hover:bg-rose-50 rounded-xl text-xs font-bold transition shadow-sm"
            >
              Sifarişlərə Bax
            </button>
            <button
              onClick={markOrdersAsRead}
              className="px-4 py-2 bg-rose-800/80 hover:bg-rose-800 text-rose-200 rounded-xl text-xs font-semibold transition border border-rose-700"
            >
              Bildirişi Bağla
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-white rounded-2xl border border-stone-200 flex items-center justify-between px-5 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Bütün sifarişlər nəzərdən keçirilib. Yeni bildiriş yoxdur.</span>
          </div>
          <span className="text-stone-400 text-[11px]">Sistem aktivdir</span>
        </div>
      )}

      {/* Admin Dashboard Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-rose-200 text-[11px] font-bold uppercase tracking-wider">
              Baş Administrator
            </span>
            <span className="text-xs text-stone-400">Təsdiqlənmiş Sessiya</span>
          </div>
          <h1 className="mt-1 font-serif text-2xl sm:text-4xl font-semibold text-stone-900">
            Aura İdarəetmə Paneli
          </h1>
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200 text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setAdminSubTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              adminSubTab === 'orders'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Package className="w-4 h-4 text-rose-600" />
            <span>Sifarişlər</span>
            {newOrdersCount > 0 && (
              <span className="bg-rose-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                {newOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setAdminSubTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition ${
              adminSubTab === 'inventory'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-rose-600" />
            <span>İnventar ({products.length})</span>
          </button>
        </div>
      </div>

      {/* Overview Analytics Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Ümumi Gəlir</span>
            <DollarSign className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl sm:text-3xl font-bold font-sans text-stone-900">
            {totalRevenue.toFixed(2)} ₼
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-400 mt-1 block">
            {orders.length} sifariş üzrə
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Sifariş Sayı</span>
            <Package className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl sm:text-3xl font-bold font-sans text-stone-900">
            {orders.length}
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-400 mt-1 block">
            {newOrdersCount} yeni daxil olmuş
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Aktiv Məhsul</span>
            <Sparkles className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-xl sm:text-3xl font-bold font-sans text-stone-900">
            {products.length}
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-400 mt-1 block">4 kateqoriya üzrə</span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-400 mb-2">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Tükənən / Az</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl sm:text-3xl font-bold font-sans text-stone-900">
            {outOfStockCount}
          </p>
          <span className="text-[10px] sm:text-[11px] text-stone-400 mt-1 block">Yenilənməli məhsul</span>
        </div>
      </div>

      {/* --- SUB-TAB 1: ORDERS SECTION --- */}
      {adminSubTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
          {/* Orders Header & Filter Controls */}
          <div className="p-4 sm:p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
                Müştəri Sifarişləri Jurnalı
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Sifariş statuslarını yeniləyin, çatdırılma məlumatlarını və daxil olan məhsulları yoxlayın.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Filter by Status */}
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
              >
                <option value="All">Bütün Statuslar ({orders.length})</option>
                <option value="Hazırlanır">Hazırlanır</option>
                <option value="Göndərildi">Göndərildi</option>
                <option value="Çatdırıldı">Çatdırıldı</option>
                <option value="Ləğv edildi">Ləğv edildi</option>
              </select>

              {newOrdersCount > 0 && (
                <button
                  onClick={markOrdersAsRead}
                  className="px-3 py-2 bg-rose-50 text-rose-800 hover:bg-rose-100 rounded-xl text-xs font-semibold transition border border-rose-200 whitespace-nowrap"
                >
                  Hamısını Oxunmuş Et
                </button>
              )}
            </div>
          </div>

          {/* Orders Table */}
          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-stone-400 text-xs">
              "{orderStatusFilter}" statusunda heç bir sifariş tapılmadı.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600 min-w-[650px]">
                <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-200">
                  <tr>
                    <th className="py-3.5 px-5">Sifariş №</th>
                    <th className="py-3.5 px-5">Tarix</th>
                    <th className="py-3.5 px-5">Alıcı</th>
                    <th className="py-3.5 px-5">Məhsullar</th>
                    <th className="py-3.5 px-5">Məbləğ</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Əməliyyatlar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredOrders.map((order) => {
                    const dateFormatted = new Date(order.date).toLocaleDateString('az-AZ', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });

                    return (
                      <tr
                        key={order.id}
                        className={`hover:bg-rose-50/30 transition ${
                          order.isNew ? 'bg-rose-50/50 font-medium' : ''
                        }`}
                      >
                        {/* Order ID & New Badge */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-stone-900">
                              {order.orderNumber}
                            </span>
                            {order.isNew && (
                              <span className="bg-rose-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                                YENİ
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-5 text-stone-500 whitespace-nowrap">
                          {dateFormatted}
                        </td>

                        {/* Customer */}
                        <td className="py-4 px-5">
                          <div>
                            <span className="font-semibold text-stone-900 block">
                              {order.userName}
                            </span>
                            <span className="text-[11px] text-stone-400">{order.userEmail}</span>
                          </div>
                        </td>

                        {/* Purchased Items Thumbnail preview */}
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-1.5">
                            <div className="flex -space-x-2 overflow-hidden">
                              {order.items.slice(0, 3).map((item, idx) => (
                                <img
                                  key={idx}
                                  src={item.image}
                                  alt={item.name}
                                  className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover bg-stone-100"
                                />
                              ))}
                            </div>
                            <span className="text-[11px] text-stone-500 ml-1">
                              {order.items.reduce((acc, i) => acc + i.quantity, 0)} ədəd
                            </span>
                          </div>
                        </td>

                        {/* Total */}
                        <td className="py-4 px-5 font-bold font-sans text-stone-900">
                          {order.total.toFixed(2)} ₼
                        </td>

                        {/* Status Select */}
                        <td className="py-4 px-5">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none border ${
                              order.status === 'Çatdırıldı'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : order.status === 'Göndərildi'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : order.status === 'Hazırlanır'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : 'bg-stone-100 text-stone-700 border-stone-200'
                            }`}
                          >
                            <option value="Hazırlanır">Hazırlanır</option>
                            <option value="Göndərildi">Göndərildi</option>
                            <option value="Çatdırıldı">Çatdırıldı</option>
                            <option value="Ləğv edildi">Ləğv edildi</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedOrderDetails(order)}
                              className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                              title="Ətraflı Bax"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteOrder(order.id)}
                              className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                              title="Sifarişi Sil"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* --- SUB-TAB 2: INVENTORY CRUD MANAGEMENT --- */}
      {adminSubTab === 'inventory' && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden space-y-6 p-4 sm:p-6">
          {/* Inventory Controls Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-stone-900">
                Kosmetika Məhsulları Kataloqu
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Yeni məhsul əlavə edin, qiymətləri dəyişin və anbar sayına nəzarət edin.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={resetProductsToDefault}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
                title="İlkin Azərbaycan məhsul siyahısına qaytar"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Kataloqu Sıfırla</span>
              </button>

              <button
                onClick={handleOpenAddProduct}
                className="px-4 py-2 bg-stone-900 hover:bg-rose-900 text-stone-100 rounded-xl text-xs uppercase tracking-wider font-semibold transition shadow-md flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Məhsul Əlavə Et</span>
              </button>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 text-xs">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="İnventarda axtarış (ad və ya kateqoriya)..."
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            </div>

            <select
              value={inventoryCategory}
              onChange={(e) => setInventoryCategory(e.target.value)}
              className="px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-stone-700 font-semibold focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto border border-stone-100 rounded-2xl">
            <table className="w-full text-left text-xs text-stone-600 min-w-[650px]">
              <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider font-semibold border-b border-stone-200">
                <tr>
                  <th className="py-3 px-4">Məhsul</th>
                  <th className="py-3 px-4">Kateqoriya</th>
                  <th className="py-3 px-4">Qiymət</th>
                  <th className="py-3 px-4">Anbar Sayı</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInventory.map((prod) => (
                  <tr key={prod.id} className="hover:bg-stone-50/50 transition">
                    {/* Thumbnail & Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-xl bg-stone-100 shrink-0 border border-stone-200"
                        />
                        <div>
                          <span className="font-semibold text-stone-900 block max-w-xs truncate">
                            {prod.name}
                          </span>
                          <span className="text-[11px] text-stone-400">{prod.volume}</span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-stone-100 text-stone-700 rounded-lg text-[11px] font-medium">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-bold font-sans text-stone-900">
                      {prod.price.toFixed(2)} ₼
                      {prod.originalPrice && (
                        <span className="text-[10px] text-stone-400 line-through block font-normal">
                          {prod.originalPrice.toFixed(2)} ₼
                        </span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4 font-semibold text-stone-800">
                      {prod.stockCount} ədəd
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {prod.inStock && prod.stockCount > 0 ? (
                        <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-semibold border border-emerald-200">
                          Anbarda var
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-red-50 text-red-700 rounded-md text-[10px] font-semibold border border-red-200">
                          Bitib
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditProduct(prod)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition"
                          title="Redaktə et"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- MODAL: ORDER DETAILS MODAL --- */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 space-y-5 shadow-2xl border border-stone-200 animate-fade-in max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <div>
                <span className="text-xs uppercase tracking-widest text-rose-700 font-bold">
                  Sifariş Detalları
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {selectedOrderDetails.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Bağla"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Shipping Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-stone-50 p-4 rounded-2xl">
              <div>
                <span className="font-bold text-stone-700 block mb-1">Müştəri</span>
                <p className="text-stone-900 font-medium">{selectedOrderDetails.userName}</p>
                <p className="text-stone-500">{selectedOrderDetails.userEmail}</p>
              </div>
              <div>
                <span className="font-bold text-stone-700 block mb-1">Çatdırılma Ünvanı</span>
                <p className="text-stone-600">
                  {selectedOrderDetails.shippingAddress?.address} <br />
                  {selectedOrderDetails.shippingAddress?.city},{' '}
                  {selectedOrderDetails.shippingAddress?.state}{' '}
                  {selectedOrderDetails.shippingAddress?.zip}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Sifariş Edilən Məhsullar
              </span>
              <div className="space-y-2">
                {selectedOrderDetails.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-lg bg-stone-100"
                      />
                      <div>
                        <h4 className="font-semibold text-stone-900">{item.name}</h4>
                        <span className="text-stone-400">
                          {item.quantity} ədəd × {item.price.toFixed(2)} ₼
                        </span>
                      </div>
                    </div>
                    <span className="font-bold text-stone-900 font-sans">
                      {(item.price * item.quantity).toFixed(2)} ₼
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="pt-3 border-t border-stone-200 text-xs space-y-1 text-stone-600">
              <div className="flex justify-between">
                <span>Məhsulların cəmi</span>
                <span>{selectedOrderDetails.subtotal?.toFixed(2)} ₼</span>
              </div>
              {selectedOrderDetails.discount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span>Endirim</span>
                  <span>-{selectedOrderDetails.discount?.toFixed(2)} ₼</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Çatdırılma</span>
                <span>
                  {selectedOrderDetails.shipping === 0
                    ? 'PULSUZ'
                    : `${selectedOrderDetails.shipping?.toFixed(2)} ₼`}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-100">
                <span>Yekun Məbləğ</span>
                <span className="text-rose-900">{selectedOrderDetails.total?.toFixed(2)} ₼</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrderDetails(null)}
              className="w-full py-3 bg-stone-900 text-stone-100 rounded-xl text-xs uppercase font-semibold"
            >
              Bağla
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD / EDIT PRODUCT FORM --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-8 space-y-4 shadow-2xl border border-stone-200 animate-fade-in max-h-[92vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {editingProduct ? 'Məhsulu Redaktə Et' : 'Yeni Məhsul Əlavə Et'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full"
                aria-label="Bağla"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-600 font-semibold mb-1">Məhsulun Adı</label>
                <input
                  type="text"
                  required
                  placeholder="məsələn, Lüks Bərpaedici Qızılgül Serumu"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Kateqoriya</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  >
                    <option value="Dəri qulluğu">Dəri qulluğu</option>
                    <option value="Makiyaj">Makiyaj</option>
                    <option value="Ətir">Ətir</option>
                    <option value="Saç qulluğu">Saç qulluğu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Həcm / Çəki</label>
                  <input
                    type="text"
                    placeholder="məs. 50 ml / 1.7 oz"
                    value={productForm.volume}
                    onChange={(e) => setProductForm({ ...productForm, volume: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Qiymət (₼)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="48.00"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Köhnə Qiymət (₼)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="58.00"
                    value={productForm.originalPrice}
                    onChange={(e) =>
                      setProductForm({ ...productForm, originalPrice: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-semibold mb-1">Anbar Qalığı</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={productForm.stockCount}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stockCount: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                  />
                </div>
              </div>

              {/* Image URL & Quick Presets */}
              <div>
                <label className="block text-stone-600 font-semibold mb-1">
                  Şəkil URL-i (Unsplash və ya birbaşa link)
                </label>
                <input
                  type="url"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />

                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-stone-400 font-medium">Hazır Şəkillər:</span>
                  {PRESET_IMAGES.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: p.url })}
                      className="text-[10px] bg-stone-100 hover:bg-rose-50 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Məhsul Təsviri</label>
                <textarea
                  rows="2"
                  placeholder="Məhsulun xüsusiyyətləri, istifadəsi..."
                  value={productForm.description}
                  onChange={(e) =>
                    setProductForm({ ...productForm, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-semibold mb-1">Tərkib və Aktiv Maddələr</label>
                <textarea
                  rows="2"
                  placeholder="Təbii ekstraktlar, vitaminlər, istifadə qaydası..."
                  value={productForm.details}
                  onChange={(e) => setProductForm({ ...productForm, details: e.target.value })}
                  className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 bg-stone-100 text-stone-700 rounded-xl font-semibold hover:bg-stone-200 transition"
                >
                  Ləğv et
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-stone-900 hover:bg-rose-900 text-stone-100 rounded-xl font-semibold uppercase tracking-wider transition shadow-md"
                >
                  {editingProduct ? 'Yadda Saxla' : 'Məhsulu Dərc Et'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
