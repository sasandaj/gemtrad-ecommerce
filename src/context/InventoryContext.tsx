'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Gemstone } from '@/types/gem';
import { INITIAL_GEMSTONES } from '@/data/gems';

interface InventoryContextType {
  gemstones: Gemstone[];
  addGemstone: (gem: Omit<Gemstone, 'id'>) => Gemstone;
  updateGemstone: (id: string, updates: Partial<Gemstone>) => void;
  deleteGemstone: (id: string) => void;
  getGemstone: (id: string) => Gemstone | undefined;
  resetInventory: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gemstones, setGemstones] = useState<Gemstone[]>(INITIAL_GEMSTONES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gemtrad_inventory');
      if (saved) {
        setGemstones(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load inventory from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('gemtrad_inventory', JSON.stringify(gemstones));
      } catch (e) {
        console.error('Failed to save inventory to localStorage', e);
      }
    }
  }, [gemstones, isLoaded]);

  const addGemstone = (gemData: Omit<Gemstone, 'id'>) => {
    const newGem: Gemstone = {
      ...gemData,
      id: `gem-${Date.now()}`,
    };
    setGemstones(prev => [newGem, ...prev]);
    return newGem;
  };

  const updateGemstone = (id: string, updates: Partial<Gemstone>) => {
    setGemstones(prev =>
      prev.map(g => (g.id === id ? { ...g, ...updates } : g))
    );
  };

  const deleteGemstone = (id: string) => {
    setGemstones(prev => prev.filter(g => g.id !== id));
  };

  const getGemstone = (id: string) => {
    return gemstones.find(g => g.id === id);
  };

  const resetInventory = () => {
    setGemstones(INITIAL_GEMSTONES);
  };

  return (
    <InventoryContext.Provider
      value={{
        gemstones,
        addGemstone,
        updateGemstone,
        deleteGemstone,
        getGemstone,
        resetInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
