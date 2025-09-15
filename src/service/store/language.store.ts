// store/languageStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TTypeLanguages = 'RU' | 'EN' | 'ES';

export interface ILanguages {
  value: TTypeLanguages;
  label: 'Русский' | 'English' | 'Español';
}

interface LanguageState {
  currentLanguage: TTypeLanguages,
  setLanguage: (lang: TTypeLanguages) => void;
}

export const useLanguageStore = create(
  persist<LanguageState>(
    (set) => ({
      currentLanguage: 'RU', // язык по умолчанию
      setLanguage: (lang) => set({ currentLanguage: lang }),
    }),
    {
      name: 'language-storage', // сохраняем в localStorage
    }
  )
);