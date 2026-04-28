import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (page: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110">
            <span className="text-white dark:text-black font-black text-xl">F</span>
          </div>
          <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white uppercase transition-colors hover:text-green-600">
            {t('nav.title')}
          </span>
        </div>
        
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} {t('nav.title')}. Todos os direitos reservados.
        </p>
        
        <div className="flex gap-4">
          <button 
            onClick={() => onNavigate('about')}
            className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 font-medium transition-colors"
          >
            Sobre nós
          </button>
        </div>
      </div>
    </footer>
  );
};
