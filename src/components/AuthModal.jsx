import React, { useState } from 'react';
import { useApp, ADMIN_PASSWORD } from '../context/AppContext';
import { X, Lock, Mail, User, Shield, KeyRound } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
    loginAsAdminDirect
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setName('');
    setAdminPasswordInput('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = login(email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Giriş məlumatları yanlışdır');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Zəhmət olmasa bütün tələb olunan xanaları doldurun');
      return;
    }
    const res = register(name, email, password);
    if (!res.success) {
      setErrorMessage(res.error || 'Qeydiyyat zamanı xəta baş verdi');
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const ok = loginAsAdminDirect(adminPasswordInput);
    if (!ok) {
      setErrorMessage('Admin şifrəsi yanlışdır. Standart şifrə: admin123');
    }
  };

  const handleFillDemoUser = () => {
    setEmail('demo@aura.com');
    setPassword('password123');
    login('demo@aura.com', 'password123');
  };

  const handleFillDemoAdmin = () => {
    loginAsAdminDirect(ADMIN_PASSWORD);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-200 my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-full transition"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pt-8 pb-4 px-6 text-center">
          <div className="w-12 h-12 bg-rose-50 text-rose-700 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            {authModalMode === 'admin' ? (
              <Shield className="w-6 h-6 text-rose-600" />
            ) : (
              <User className="w-6 h-6 text-rose-600" />
            )}
          </div>
          <h3 className="font-serif text-2xl font-semibold text-stone-900">
            {authModalMode === 'login'
              ? 'Aura Luxe-ə Giriş'
              : authModalMode === 'register'
              ? 'Yeni Hesab Yarat'
              : 'Admin İdarəetmə Girişi'}
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            {authModalMode === 'admin'
              ? 'Qorunan mağaza idarəetməsi və sifarişlər bölməsinə keçid'
              : 'Sifarişlərinizi izləmək və sevimlilərinizi saxlamaq üçün daxil olun'}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-stone-200 px-6 text-xs font-semibold">
          <button
            onClick={() => {
              setAuthModalMode('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 border-b-2 transition ${
              authModalMode === 'login'
                ? 'border-rose-500 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Daxil ol
          </button>
          <button
            onClick={() => {
              setAuthModalMode('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 border-b-2 transition ${
              authModalMode === 'register'
                ? 'border-rose-500 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Qeydiyyat
          </button>

          {/* <button
            onClick={() => {
              setAuthModalMode('admin');
              setErrorMessage('');
            }}
            className={`flex-1 py-3 border-b-2 transition flex items-center justify-center gap-1 ${
              authModalMode === 'admin'
                ? 'border-stone-900 text-stone-900'
                : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-rose-600" />
            <span>Admin</span>
          </button> */}
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}

        {/* Mode: Standard User Login */}
        {authModalMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">E-poçt ünvanı</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="adiniz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">Şifrə</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Şifrənizi daxil edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-stone-900 text-stone-100 font-semibold text-xs uppercase tracking-wider hover:bg-rose-900 active:scale-98 transition shadow-md"
            >
              Daxil ol
            </button>

            {/* Quick Demo Fill Buttons */}
            {/* <div className="pt-3 border-t border-stone-100 space-y-2">
              <span className="text-[10px] text-stone-400 block text-center uppercase tracking-wider">
                Tez Sınaq Girişi
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleFillDemoUser}
                  className="py-2 px-3 text-[11px] font-semibold text-stone-700 bg-stone-100 hover:bg-rose-50 hover:text-rose-900 rounded-lg transition border border-stone-200"
                >
                  ⚡ Test İstifadəçi
                </button>
                <button
                  type="button"
                  onClick={handleFillDemoAdmin}
                  className="py-2 px-3 text-[11px] font-semibold text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg transition border border-rose-200 flex items-center justify-center gap-1"
                >
                  <Shield className="w-3 h-3 text-rose-600" /> ⚡ Tez Admin
                </button>
              </div>
            </div> */}
          </form>
        )}

        {/* Mode: Standard User Register */}
        {authModalMode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">Ad və Soyad</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="məs. Aygün Məmmədova"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">E-poçt ünvanı</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="aygun@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">Şifrə</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Etibarlı şifrə təyin edin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-rose-300 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-stone-900 text-stone-100 font-semibold text-xs uppercase tracking-wider hover:bg-rose-900 active:scale-98 transition shadow-md"
            >
              Qeydiyyatdan Keç
            </button>
          </form>
        )}

        {/* Mode: Admin Static Password Auth */}
        
        {/* {authModalMode === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="p-6 space-y-4">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
              <KeyRound className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
              <div>
                <strong>Admin Girişi Tələb Olunur</strong>
                <p className="mt-0.5 text-[11px] text-rose-700">
                  Statik təhlükəsizlik şifrəsi:{' '}
                  <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-rose-300">
                    admin123
                  </code>
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-stone-600">Admin Şifrəsi</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Şifrəni daxil edin (admin123)"
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-stone-400 focus:outline-none"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-stone-900 text-rose-200 font-semibold text-xs uppercase tracking-wider hover:bg-stone-800 active:scale-98 transition shadow-md flex items-center justify-center gap-1.5"
            >
              <Shield className="w-4 h-4 text-rose-400" />
              <span>Admin Panelinə Daxil Ol</span>
            </button>

            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="w-full py-2.5 text-xs font-semibold text-rose-800 bg-rose-100 hover:bg-rose-200 rounded-xl transition"
            >
              ⚡ "admin123" ilə dərhal daxil ol
            </button>
          </form>
        )} */}
      </div>
    </div>
  );
}
