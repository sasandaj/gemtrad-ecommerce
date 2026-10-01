'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Gemstone, BespokeConfig, Order } from '@/types/gem';

interface CartContextType {
  items: CartItem[];
  addLooseGem: (gem: Gemstone) => void;
  addBespokeJewelry: (gem: Gemstone, config: BespokeConfig, depositOnly?: boolean) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
  itemsCount: number;
  reserveExpiresAt: number | null;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'trackingNumber'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (idOrTracking: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [reserveExpiresAt, setReserveExpiresAt] = useState<number | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gemtrad_cart');
      const savedOrders = localStorage.getItem('gemtrad_orders');
      const savedTimer = localStorage.getItem('gemtrad_reserve_timer');

      if (savedCart) setItems(JSON.parse(savedCart));
      if (savedOrders) setOrders(JSON.parse(savedOrders));
      if (savedTimer) {
        const timer = parseInt(savedTimer, 10);
        if (timer > Date.now()) {
          setReserveExpiresAt(timer);
        }
      }
    } catch (e) {
      console.error('Failed to load cart/orders from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gemtrad_cart', JSON.stringify(items));
        if (reserveExpiresAt) {
          localStorage.setItem('gemtrad_reserve_timer', reserveExpiresAt.toString());
        } else {
          localStorage.removeItem('gemtrad_reserve_timer');
        }
      } catch (e) {
        console.error('Failed to save cart to localStorage', e);
      }
    }
  }, [items, reserveExpiresAt, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gemtrad_orders', JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders to localStorage', e);
      }
    }
  }, [orders, isLoaded]);

  const addLooseGem = (gem: Gemstone) => {
    // Check if gem already in cart
    const exists = items.some(item => item.gem.id === gem.id);
    if (exists) return;

    const newItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      type: 'loose_gem',
      gem,
      price: gem.price,
      addedAt: Date.now(),
    };

    setItems(prev => [...prev, newItem]);
    if (!reserveExpiresAt) {
      setReserveExpiresAt(Date.now() + 30 * 60 * 1000); // 30 mins
    }
  };

  const addBespokeJewelry = (gem: Gemstone, config: BespokeConfig, depositOnly: boolean = false) => {
    const price = depositOnly ? config.depositAmount : config.totalQuote;
    const newItem: CartItem = {
      id: `cart-bespoke-${Date.now()}`,
      type: 'bespoke_jewelry',
      gem,
      bespokeConfig: config,
      price,
      isDepositOnly: depositOnly,
      addedAt: Date.now(),
    };

    setItems(prev => [...prev, newItem]);
    if (!reserveExpiresAt) {
      setReserveExpiresAt(Date.now() + 30 * 60 * 1000);
    }
  };

  const removeItem = (id: string) => {
    setItems(prev => {
      const filtered = prev.filter(item => item.id !== id);
      if (filtered.length === 0) {
        setReserveExpiresAt(null);
      }
      return filtered;
    });
  };

  const clearCart = () => {
    setItems([]);
    setReserveExpiresAt(null);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'status' | 'trackingNumber'>): Order => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const trackingNumber = `GTRAD-${new Date().getFullYear()}-${randomSuffix}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
      trackingNumber,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(ord => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  const getOrder = (idOrTracking: string) => {
    const trimmed = idOrTracking.trim().toUpperCase();
    return orders.find(
      o => o.id === idOrTracking || o.trackingNumber.toUpperCase() === trimmed
    );
  };

  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
  const itemsCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addLooseGem,
        addBespokeJewelry,
        removeItem,
        clearCart,
        totalAmount,
        itemsCount,
        reserveExpiresAt,
        orders,
        createOrder,
        updateOrderStatus,
        getOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
