import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEE_STRUCTURE } from '../data/admissions';

const DEFAULT_BUS_FEE = 25000;

const AppContext = createContext();

// Helper to get stored state or default
const getStorageItem = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
  }
  return defaultValue;
};

export const AppProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  });

  const [feeStructure, setFeeStructure] = useState(() => 
    getStorageItem('school_fee_structure', FEE_STRUCTURE)
  );

  const [busFee, setBusFee] = useState(() => 
    getStorageItem('school_bus_fee', DEFAULT_BUS_FEE)
  );

  useEffect(() => {
    localStorage.setItem('school_fee_structure', JSON.stringify(feeStructure));
  }, [feeStructure]);

  useEffect(() => {
    localStorage.setItem('school_bus_fee', JSON.stringify(busFee));
  }, [busFee]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Auth methods
  const adminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminAuthenticated(true);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  // Fee Handlers
  const updateFeeStructure = (gradeIndex, updatedFeeData) => {
    setFeeStructure(prev => prev.map((item, idx) => idx === gradeIndex ? { ...item, ...updatedFeeData } : item));
  };

  const updateBusFee = (newFee) => {
    setBusFee(newFee);
  };

  return (
    <AppContext.Provider value={{
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      activeModal,
      setActiveModal,

      // Admin Auth
      isAdminAuthenticated,
      adminLogin,
      adminLogout,

      feeStructure,
      updateFeeStructure,
      busFee,
      updateBusFee
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
