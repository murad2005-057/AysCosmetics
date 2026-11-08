import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  User,
  Shield,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Package,
  Heart
} from 'lucide-react';

export default function Navbar() {
  const {
    activeTab,
    setActiveTab,
    cartTotalItemsCount,
    setIsCartDrawerOpen,
    currentUser,
    isAdmin,
    logout,
    setIsAuthModalOpen,
    setAuthModalMode,
    newOrdersCount,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveTab('shop');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-stone-800" />}
            </button>
          </div>

          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex flex-col items-start select-none group"
          >
            <span className="text-xl sm:text-2xl lg:text-3xl font-serif tracking-[0.2em] font-semibold text-stone-900 group-hover:text-rose-900 transition-colors">
              AURA LUXE
            </span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-stone-400 font-medium">
              Təbii Lüks Kosmetika
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 font-medium text-sm tracking-wide shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors py-1 border-b-2 whitespace-nowrap ${activeTab === 'home'
                  ? 'text-stone-900 border-rose-500 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-stone-900'
                }`}
            >
              Əsas səhifə
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Hamısı');
                handleNavClick('shop');
              }}
              className={`transition-colors py-1 border-b-2 whitespace-nowrap ${activeTab === 'shop'
                  ? 'text-stone-900 border-rose-500 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-stone-900'
                }`}
            >
              Mağaza
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Dəri qulluğu');
                handleNavClick('shop');
              }}
              className="text-stone-600 hover:text-stone-900 transition-colors py-1 border-b-2 border-transparent whitespace-nowrap"
            >
              Dəri qulluğu
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Ətir');
                handleNavClick('shop');
              }}
              className="text-stone-600 hover:text-stone-900 transition-colors py-1 border-b-2 border-transparent whitespace-nowrap"
            >
              Ətirlər
            </button>

            <button
              onClick={() => handleNavClick('orders')}
              className={`transition-colors py-1 border-b-2 whitespace-nowrap ${activeTab === 'orders'
                  ? 'text-stone-900 border-rose-500 font-semibold'
                  : 'text-stone-600 border-transparent hover:text-stone-900'
                }`}
            >
              Sifarişlərim
            </button>
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
              <input
                type="text"
                placeholder="Məhsul axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeTab !== 'shop') setActiveTab('shop');
                }}
                className="w-32 lg:w-40 xl:w-48 pl-9 pr-3 py-1.5 text-xs bg-stone-100/90 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-300 focus:bg-white transition-all"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2.5 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition"
              aria-label="Səbət"
            >
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              {cartTotalItemsCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-fade-in">
                  {cartTotalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-stone-100 transition border border-stone-200"
                >
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                    {isAdmin ? <Shield className="w-4 h-4 text-rose-700" /> : currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-stone-700 max-w-[100px] truncate">
                    {isAdmin ? 'Admin' : currentUser.name.split(' ')[0]}
                  </span>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-100 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-stone-100">
                      <p className="text-xs font-semibold text-stone-900">{currentUser.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{currentUser.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded-md uppercase tracking-wider">
                          Administrator
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        handleNavClick('orders');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-rose-50 flex items-center gap-2.5 transition"
                    >
                      <Package className="w-4 h-4 text-stone-500" />
                      <span>Sifariş Tarixçəsi</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setIsProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-stone-700 hover:bg-rose-50 flex items-center gap-2.5 transition font-medium"
                      >
                        <Shield className="w-4 h-4 text-rose-600" />
                        <span>Admin Paneli</span>
                        {newOrdersCount > 0 && (
                          <span className="ml-auto bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                            {newOrdersCount}
                          </span>
                        )}
                      </button>
                    )}

                    <div className="border-t border-stone-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2.5 transition"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Çıxış et</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition flex items-center gap-1.5"
                >
                  <User className="w-4 h-4" />
                  <span>Daxil ol</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Admin Badge support */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-fade-in">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Məhsul adı və ya tərkib axtar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-300"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
          </form>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => handleNavClick('home')}
              className={`p-3 text-left rounded-xl transition ${activeTab === 'home'
                  ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                  : 'text-stone-700 hover:bg-stone-50'
                }`}
            >
              Əsas səhifə
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Hamısı');
                handleNavClick('shop');
              }}
              className={`p-3 text-left rounded-xl transition ${activeTab === 'shop'
                  ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                  : 'text-stone-700 hover:bg-stone-50'
                }`}
            >
              Mağaza (Bütün)
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Dəri qulluğu');
                handleNavClick('shop');
              }}
              className="p-3 text-left rounded-xl text-stone-700 hover:bg-stone-50"
            >
              Dəri qulluğu
            </button>

            <button
              onClick={() => {
                setSelectedCategory('Ətir');
                handleNavClick('shop');
              }}
              className="p-3 text-left rounded-xl text-stone-700 hover:bg-stone-50"
            >
              Ətirlər
            </button>

            <button
              onClick={() => handleNavClick('orders')}
              className={`p-3 text-left rounded-xl transition ${activeTab === 'orders'
                  ? 'bg-rose-50 text-rose-900 font-bold border border-rose-200'
                  : 'text-stone-700 hover:bg-stone-50'
                }`}
            >
              Sifarişlərim
            </button>

            {/* Mobile Admin Button with Prominent Notification Badge */}
            {/* <button
              onClick={() => handleNavClick('admin')}
              className={`p-3 text-left rounded-xl flex items-center justify-between transition ${
                activeTab === 'admin'
                  ? 'bg-stone-900 text-rose-200 font-bold'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-900'
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">
                <Shield className="w-4 h-4 text-rose-500" />
                Admin Paneli
              </span>
              {newOrdersCount > 0 && (
                <span className="bg-rose-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  {newOrdersCount}
                </span>
              )}
            </button> */}
          </div>
        </div>
      )}
    </header>
  );
}
