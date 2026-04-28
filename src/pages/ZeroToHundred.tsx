import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { zeroToHundredData } from '../data/zeroToHundredData';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Search, Award, RefreshCw, User } from 'lucide-react';

interface PlayerScore {
  score: number;
  guesses: { name: string, rank: number, points: number }[];
}

export const ZeroToHundred: React.FC = () => {
  const { t } = useLanguage();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [isMasterView, setIsMasterView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{name: string, rank: number, points: number}[]>([]);
  const [notFound, setNotFound] = useState(false);
  
  const [playerCount, setPlayerCount] = useState(2);
  const [players, setPlayers] = useState<PlayerScore[]>(Array(2).fill(null).map(() => ({ score: 0, guesses: [] })));

  const currentData = zeroToHundredData[currentThemeIndex];

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    setPlayers(Array(count).fill(null).map(() => ({ score: 0, guesses: [] })));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.toLowerCase().trim();
    const results = currentData.items
      .map((item, index) => ({ name: item, rank: index + 1, points: 101 - (index + 1) }))
      .filter(item => item.name.toLowerCase().includes(query));

    if (results.length > 0) {
      setSearchResults(results);
      setNotFound(false);
    } else {
      setSearchResults([]);
      setNotFound(true);
    }
  };

  const awardPoints = (playerIndex: number, item: {name: string, rank: number, points: number}) => {
    setPlayers(prev => {
      const newPlayers = [...prev];
      newPlayers[playerIndex] = {
        ...newPlayers[playerIndex],
        score: newPlayers[playerIndex].score + item.points,
        guesses: [...newPlayers[playerIndex].guesses, item]
      };
      return newPlayers;
    });
    setSearchResults(searchResults.filter(r => r.name !== item.name));
    setSearchQuery('');
  };

  const drawNewTheme = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * zeroToHundredData.length);
    } while (newIndex === currentThemeIndex && zeroToHundredData.length > 1);
    
    setCurrentThemeIndex(newIndex);
    setSearchResults([]);
    setNotFound(false);
    setSearchQuery('');
    setPlayers(Array(playerCount).fill(null).map(() => ({ score: 0, guesses: [] })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('zeroToHundred.title')}
          </h2>
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <div className="flex items-center gap-2 mr-4">
              <span className="text-sm font-medium text-gray-500">Players:</span>
              <select 
                value={playerCount}
                onChange={(e) => handlePlayerCountChange(Number(e.target.value))}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm rounded-lg px-2 py-1 outline-none"
              >
                {[2, 3, 4, 5, 6].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setIsMasterView(!isMasterView)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium transition-colors hover:bg-purple-200 dark:hover:bg-purple-900/50"
            >
              {isMasterView ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {t('zeroToHundred.toggleList')}
            </button>
            <button
              onClick={drawNewTheme}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
              {t('zeroToHundred.newTheme')}
            </button>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mb-2">
            {t('zeroToHundred.theme')}
          </p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-green-600 dark:text-green-400">
            {currentData.title}
          </h3>
        </div>

        {/* Player Scores */}
        <div 
          className="grid gap-4 mb-8" 
          style={{ gridTemplateColumns: `repeat(${Math.min(playerCount, 4)}, minmax(0, 1fr))` }}
        >
          {players.map((p, idx) => (
            <div key={idx} className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
                <User className="w-5 h-5" />
                <h4 className="font-bold">Player {idx + 1}</h4>
              </div>
              <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">{p.score}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 max-h-24 overflow-y-auto">
                {p.guesses.map((g, i) => (
                  <div key={i} className="truncate">{g.name} (+{g.points})</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Master Search Area */}
        <div className="max-w-md mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('zeroToHundred.searchPlaceholder')}
              className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 pl-12 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            />
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 rounded-lg transition-colors"
            >
              {t('zeroToHundred.check')}
            </button>
          </form>

          <AnimatePresence mode="wait">
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 space-y-2"
              >
                {searchResults.map((result, idx) => (
                  <div key={idx} className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{result.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('zeroToHundred.rank')}: #{result.rank} | {t('zeroToHundred.pointsAwarded')} {result.points}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      {players.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => awardPoints(idx, result)}
                          className="flex-1 sm:flex-none px-3 py-2 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg font-medium transition-colors text-sm"
                        >
                          P{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            {notFound && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center text-red-600 dark:text-red-400 font-medium"
              >
                {t('zeroToHundred.notFound')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Master List View */}
        {isMasterView && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-gray-200 dark:border-gray-800 pt-8"
          >
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t('zeroToHundred.masterView')} - Top 100
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-96 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800">
              {currentData.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg">
                  <span className="w-8 text-right font-mono text-sm text-gray-400 dark:text-gray-500">
                    {index + 1}.
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
