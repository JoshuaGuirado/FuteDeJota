import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Search, ListOrdered, MessageCircleQuestion, BarChart4, TrendingUpDown, Goal } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
        >
          {t('home.title')}
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('guess')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-green-500 dark:hover:border-green-500 group"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400 transition-transform group-hover:scale-110">
            <Search className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.guessPlayer.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.guessPlayer.desc')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('career')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-teal-500 dark:hover:border-teal-500 group"
        >
          <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 transition-transform group-hover:scale-110">
            <BarChart4 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.careerPlayer.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.careerPlayer.desc')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('squad')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-green-500 dark:hover:border-green-500 group"
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400 transition-transform group-hover:scale-110">
            <Goal className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.squadBuilder.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.squadBuilder.desc')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('quiz')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-purple-500 dark:hover:border-purple-500 group"
        >
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.quiz.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.quiz.desc')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('zeroToHundred')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-orange-500 dark:hover:border-orange-500 group"
        >
          <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mb-4 text-orange-600 dark:text-orange-400 transition-transform group-hover:scale-110">
            <ListOrdered className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.zeroToHundred.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.zeroToHundred.desc')}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('higherLower')}
          className="cursor-pointer bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-red-500 dark:hover:border-red-500 group"
        >
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 text-red-600 dark:text-red-400 transition-transform group-hover:scale-110">
            <TrendingUpDown className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {t('home.higherLower.title')}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('home.higherLower.desc')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

