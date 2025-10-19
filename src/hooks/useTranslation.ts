import { useEffect, useState } from 'react';
import { useLanguageStore } from '../service/store/language.store';

// Типы для переводов
type UITranslations = {
  [key: string]: string | UITranslations;
};

type ProductTranslations = {
  [productId: string]: string;
};


const translationsUI = {
  RU: () => import('../locales/ru.json'),
  EN: () => import('../locales/en.json'),
  ES: () => import('../locales/es.json'),
};

const productTranslation = {
  RU: () => import('../locales/product-descriptions/product-ru.json'),
  EN: () => import('../locales/product-descriptions/product-en.json'),
  ES: () => import('../locales/product-descriptions/product-es.json'),
};

export const useTranslation = () => {
  const { currentLanguage } = useLanguageStore();
  const [uiTranslations, setUiTranslations] = useState<UITranslations>({});
  const [productTranslations, setProductTranslations] = useState<ProductTranslations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      const [uiModule, productModule] = await Promise.all([
        translationsUI[currentLanguage](),
        productTranslation[currentLanguage]()
      ]);

      setUiTranslations(uiModule.default as UITranslations);
      setProductTranslations(productModule.default as ProductTranslations);
    };

    loadTranslations();
  }, [currentLanguage]);

  // Функция для UI переводов
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = uiTranslations;

    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) break;
    }

    return result || key;
  };

  // Функция для переводов описаний товаров - ИСПРАВЛЕННАЯ
  const tProduct = (productId: string | number): string => {
    // Используем productTranslations (состояние), а не productTranslation (функции импорта)
    return productTranslations[productId.toString()] || '';
  };

  return {
    t,
    tProduct,
    currentLanguage
  };
};
