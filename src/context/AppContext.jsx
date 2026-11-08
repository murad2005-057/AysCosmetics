import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/products';

const AppContext = createContext();

export const ADMIN_PASSWORD = 'admin123';
const DATA_VERSION = 'aura_v2_az';

export const AppProvider = ({ children }) => {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Hamısı');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'admin'
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (title, message = '', type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Products State (persisted, checks version for clean Azerbaijani data transition)
  const [products, setProducts] = useState(() => {
    try {
      const version = localStorage.getItem('aura_version');
      if (version !== DATA_VERSION) {
        localStorage.setItem('aura_version', DATA_VERSION);
        localStorage.setItem('aura_products', JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem('aura_orders', JSON.stringify(INITIAL_ORDERS));
        return INITIAL_PRODUCTS;
      }
      const saved = localStorage.getItem('aura_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      console.error('Error reading aura_products', e);
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error saving aura_products', e);
    }
  }, [products]);

  // Auth Users Storage
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_registered_users');
      return saved ? JSON.parse(saved) : [
        {
          name: 'Nümunə Müştəri',
          email: 'demo@aura.com',
          password: 'password123',
          createdAt: new Date().toISOString()
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_registered_users', JSON.stringify(users));
    } catch (e) {
      console.error('Error saving users', e);
    }
  }, [users]);

  // Current Logged-In User
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('aura_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('aura_current_user');
      }
    } catch (e) {
      console.error('Error syncing current user', e);
    }
  }, [currentUser]);

  // Orders State (persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch (e) {
      console.error('Error reading aura_orders', e);
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving orders', e);
    }
  }, [orders]);

  // Admin Notification Badge Count (computed from orders marked as isNew)
  const newOrdersCount = orders.filter((o) => o.isNew).length;

  const markOrdersAsRead = () => {
    setOrders((prev) =>
      prev.map((order) => (order.isNew ? { ...order, isNew: false } : order))
    );
    showToast('Bildirişlər təmizləndi', 'Bütün yeni sifarişlər baxılmış kimi qeyd olundu.', 'info');
  };

  // Cart State (persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart', e);
    }
  }, [cart]);

  // Wishlist State (persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aura_wishlist');
      return saved ? JSON.parse(saved) : ['prod-sk-1', 'prod-pf-1'];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aura_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Error saving wishlist', e);
    }
  }, [wishlist]);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal e.g. 0.20 for 20%
  const [appliedPromoName, setAppliedPromoName] = useState('');

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GLOW20') {
      setAppliedDiscount(0.20);
      setAppliedPromoName('GLOW20 (20% Endirim)');
      showToast('Promokod tətbiq edildi!', 'Sifarişinizə 20% endirim tətbiq olundu.', 'success');
      return true;
    } else if (clean === 'WELCOME10') {
      setAppliedDiscount(0.10);
      setAppliedPromoName('WELCOME10 (10% Endirim)');
      showToast('Promokod tətbiq edildi!', 'Sifarişinizə 10% endirim tətbiq olundu.', 'success');
      return true;
    } else {
      showToast('Yanlış Promokod', 'Xüsusi endirimlər üçün GLOW20 və ya WELCOME10 kodundan istifadə edin.', 'error');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedDiscount(0);
    setAppliedPromoName('');
    setPromoCode('');
    showToast('Promokod silindi', '', 'info');
  };

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    if (!product.inStock || product.stockCount <= 0) {
      showToast('Məhsul bitib', `${product.name} hazırda anbarda yoxdur.`, 'error');
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        const newQty = existing.quantity + quantity;
        showToast('Səbət yeniləndi', `${product.name} sayı ${newQty} ədəd oldu.`, 'success');
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: newQty } : item
        );
      } else {
        showToast('Səbətə əlavə edildi', `${product.name} səbətinizə əlavə olundu.`, 'success');
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            image: product.image,
            volume: product.volume,
            quantity: quantity,
            maxStock: product.stockCount
          }
        ];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      showToast('Məhsul silindi', `${item.name} səbətdən çıxarıldı.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart Calculations (in ₼)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartDiscountAmount = cartSubtotal * appliedDiscount;
  const isFreeShipping = cartSubtotal >= 75 || cartSubtotal === 0;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 5.00;
  const freeShippingThresholdLeft = Math.max(0, 75 - cartSubtotal);
  const estimatedTax = (cartSubtotal - cartDiscountAmount) * 0.08;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscountAmount + shippingFee + (cartSubtotal > 0 ? estimatedTax : 0));
  const cartTotalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Seçilmişlər', 'Məhsul sevimlilərdən çıxarıldı.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Seçilmişlər', 'Məhsul sevimlilərə əlavə olundu.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Auth Actions
  const login = (email, password) => {
    // Check if logging in with Admin Password
    if (password === ADMIN_PASSWORD) {
      const adminUser = {
        name: 'Aura Baş Administrator',
        email: email || 'admin@auraluxe.com',
        role: 'admin'
      };
      setCurrentUser(adminUser);
      showToast('Xoş gəldiniz, Administrator!', 'Mağaza idarəetmə səlahiyyətləri aktivdir.', 'success');
      setIsAuthModalOpen(false);
      return { success: true, role: 'admin' };
    }

    // Standard user match
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (existing) {
      const user = {
        name: existing.name || existing.email.split('@')[0],
        email: existing.email,
        role: 'user'
      };
      setCurrentUser(user);
      showToast('Xoş gəldiniz!', `Giriş edildi: ${user.name}`, 'success');
      setIsAuthModalOpen(false);
      return { success: true, role: 'user' };
    }

    showToast('Giriş uğursuz oldu', 'E-poçt və ya şifrə yanlışdır. Admin şifrəsi: "admin123"', 'error');
    return { success: false, error: 'E-poçt və ya şifrə yanlışdır' };
  };

  const register = (name, email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const existing = users.find((u) => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      showToast('Qeydiyyat xətası', 'Bu e-poçt ünvanı ilə artıq qeydiyyatdan keçilib.', 'error');
      return { success: false, error: 'İstifadəçi artıq mövcuddur' };
    }

    const newUser = {
      name: name.trim() || trimmedEmail.split('@')[0],
      email: trimmedEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    setUsers((prev) => [...prev, newUser]);
    const loggedInUser = {
      name: newUser.name,
      email: newUser.email,
      role: 'user'
    };
    setCurrentUser(loggedInUser);
    showToast('Hesab yaradıldı!', `Aura Luxe-ə xoş gəldiniz, ${loggedInUser.name}!`, 'success');
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const loginAsAdminDirect = (password = ADMIN_PASSWORD) => {
    if (password === ADMIN_PASSWORD) {
      const adminUser = {
        name: 'Mağaza Administratoru',
        email: 'admin@auraluxe.com',
        role: 'admin'
      };
      setCurrentUser(adminUser);
      showToast('Admin Rejimi Aktiv', 'Admin səlahiyyətləri təsdiqləndi.', 'success');
      setIsAuthModalOpen(false);
      return true;
    }
    showToast('Admin Girişi Xətası', 'Admin şifrəsi yanlışdır.', 'error');
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Çıxış edildi', 'Hesabınızdan uğurla çıxdınız.', 'info');
    if (activeTab === 'admin' || activeTab === 'orders') {
      setActiveTab('home');
    }
  };

  // Orders Checkout Action
  const placeOrder = (orderData) => {
    const orderNumber = 'ORD-' + Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      id: orderNumber,
      orderNumber: orderNumber,
      date: new Date().toISOString(),
      userEmail: currentUser?.email || orderData.email || 'qonaq@client.com',
      userName: currentUser?.name || orderData.fullName || 'Hörmətli Müştəri',
      items: [...cart],
      subtotal: cartSubtotal,
      shipping: shippingFee,
      discount: cartDiscountAmount,
      tax: estimatedTax,
      total: cartTotal,
      status: 'Hazırlanır',
      shippingAddress: orderData.shippingAddress || {
        fullName: orderData.fullName || 'Aura Müştərisi',
        address: orderData.address || 'Nizami küçəsi 28',
        city: orderData.city || 'Bakı',
        state: orderData.state || 'Səbail',
        zip: orderData.zip || 'AZ1000',
        country: orderData.country || 'Azərbaycan'
      },
      paymentMethod: orderData.paymentMethod || 'Bank Kartı',
      isNew: true
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Clear cart and promo
    clearCart();
    setAppliedDiscount(0);
    setAppliedPromoName('');

    // Deduct stock in inventory
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((c) => c.id === prod.id);
        if (cartItem) {
          const updatedStock = Math.max(0, prod.stockCount - cartItem.quantity);
          return {
            ...prod,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return prod;
      })
    );

    // Alert notification for Admin
    showToast(
      'Sifarişiniz Qəbul Edildi! 🎉',
      `Sifariş № ${orderNumber} uğurla qeydə alındı! Admin Panelinə bildiriş göndərildi.`,
      'success'
    );

    return newOrder;
  };

  // Admin Order Status Update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast('Sifariş Statusu Yeniləndi', `Sifariş ${orderId} "${newStatus}" statusuna keçirildi.`, 'success');
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast('Sifariş Silindi', `Sifariş ${orderId} arxivdən silindi.`, 'info');
  };

  // Admin Product CRUD Actions
  const addProduct = (productData) => {
    const newId = 'prod-' + Date.now().toString(36);
    const newProduct = {
      id: newId,
      name: productData.name,
      category: productData.category || 'Dəri qulluğu',
      price: parseFloat(productData.price) || 0,
      originalPrice: productData.originalPrice ? parseFloat(productData.originalPrice) : null,
      image: productData.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      description: productData.description || 'Təbii bitki ekstraktları ilə hazırlanmış zərif lüks formul.',
      details: productData.details || 'Parabensiz, sulfatsız, dermatoloji testdən keçmişdir.',
      inStock: productData.stockCount > 0,
      stockCount: parseInt(productData.stockCount, 10) || 10,
      rating: 5.0,
      reviewsCount: 1,
      badge: productData.badge || 'Yeni',
      volume: productData.volume || '50 ml'
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast('Məhsul Əlavə Edildi', `${newProduct.name} kataloqa daxil edildi.`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedStock = updatedFields.stockCount !== undefined ? parseInt(updatedFields.stockCount, 10) : p.stockCount;
          return {
            ...p,
            ...updatedFields,
            price: updatedFields.price !== undefined ? parseFloat(updatedFields.price) : p.price,
            stockCount: updatedStock,
            inStock: updatedStock > 0
          };
        }
        return p;
      })
    );
    showToast('Məhsul Yeniləndi', 'Dəyişikliklər uğurla yadda saxlanıldı.', 'success');
  };

  const deleteProduct = (id) => {
    const item = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Məhsul Silindi', `${item?.name || 'Məhsul'} kataloqdan çıxarıldı.`, 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    showToast('Kataloq Sıfırlandı', 'Məhsullar ilkin Azərbaycan dilindəki siyahıya qaytarıldı.', 'info');
  };

  const value = {
    // Nav & Modals
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    selectedProductForModal,
    setSelectedProductForModal,
    // Toast
    toasts,
    showToast,
    removeToast,
    // Auth
    currentUser,
    users,
    isAdmin: currentUser?.role === 'admin',
    login,
    register,
    loginAsAdminDirect,
    logout,
    // Products
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    // Wishlist
    wishlist,
    toggleWishlist,
    isWishlisted,
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartSubtotal,
    cartDiscountAmount,
    shippingFee,
    isFreeShipping,
    freeShippingThresholdLeft,
    estimatedTax,
    cartTotal,
    cartTotalItemsCount,
    // Promo
    promoCode,
    setPromoCode,
    appliedDiscount,
    appliedPromoName,
    applyPromo,
    removePromo,
    // Orders
    orders,
    placeOrder,
    updateOrderStatus,
    deleteOrder,
    newOrdersCount,
    markOrdersAsRead
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
