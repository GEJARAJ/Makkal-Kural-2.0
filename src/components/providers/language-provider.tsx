'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { en } from '@/lib/i18n/en';
import { ta } from '@/lib/i18n/ta';
import { hi } from '@/lib/i18n/hi';
import { PreferredLanguage } from '@/types/database';

type Translations = typeof en;

interface LanguageContextType {
  language: PreferredLanguage;
  setLanguage: (lang: PreferredLanguage) => void;
  t: Translations;
  isTamil: boolean;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: en,
  isTamil: false,
  isHindi: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<PreferredLanguage>('en');

  useEffect(() => {
    const saved = localStorage.getItem('mk_preferred_language') as PreferredLanguage;
    if (saved === 'ta' || saved === 'en' || saved === 'hi') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: PreferredLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('mk_preferred_language', lang);
  };

  let t = en;
  if (language === 'ta') t = ta as unknown as Translations;
  else if (language === 'hi') t = hi as unknown as Translations;

  const isTamil = language === 'ta';
  const isHindi = language === 'hi';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTamil, isHindi }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
