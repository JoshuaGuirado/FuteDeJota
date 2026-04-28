import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Info, Code2, Heart } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 text-center"
      >
        <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Info className="w-10 h-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
          Sobre o FuteDeJota
        </h1>
        
        <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
          <p>
            O <strong>FuteDeJota</strong> foi criado por <strong>Joshua</strong>, <strong>Douglas</strong> e <strong>João</strong>, três jovens desenvolvedores apaixonados por tecnologia e futebol, diretamente de Maringá - PR.
          </p>
          <p>
            Nossa missão é tornar a sua interação com o futebol muito mais divertida, interativa e desafiadora. Construímos esta plataforma para reunir amigos, testar conhecimentos e celebrar o esporte mais amado do mundo em formato de mini-jogos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl">
              <Code2 className="text-green-600 dark:text-green-400" />
              <span className="font-semibold text-gray-900 dark:text-white">Jovens Desenvolvedores</span>
            </div>
            <div className="flex items-center justify-center gap-2 bg-gray-50 dark:bg-gray-800 px-6 py-3 rounded-2xl">
              <Heart className="text-red-500" />
              <span className="font-semibold text-gray-900 dark:text-white">Feito em Maringá-PR</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
