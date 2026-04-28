import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { playersData, allPlayersList } from '../data/gameData';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, ArrowRight, Eye } from 'lucide-react';

export const GuessPlayer: React.FC = () => {
  const { t } = useLanguage();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'gameover'>('playing');
  const [shuffledPlayers, setShuffledPlayers] = useState([...playersData].sort(() => Math.random() - 0.5));
  const [playedPlayerIds, setPlayedPlayerIds] = useState<number[]>([]);
  const [revealedClubsCount, setRevealedClubsCount] = useState(1);

  const currentPlayer = shuffledPlayers[currentPlayerIndex];

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'correct' || status === 'gameover') return;

    const normalizedGuess = guess.toLowerCase().trim();
    const isCorrect = currentPlayer.aliases.includes(normalizedGuess) || currentPlayer.name.toLowerCase() === normalizedGuess;

    if (isCorrect) {
      setStatus('correct');
      // More points if guessed with fewer clubs revealed
      const points = Math.max(10, 100 - (revealedClubsCount - 1) * 15);
      setScore(s => s + points);
      setPlayedPlayerIds(prev => [...prev, currentPlayer.id]);
    } else {
      setLives(l => l - 1);
      if (lives <= 1) {
        setStatus('gameover');
      } else {
        setStatus('wrong');
        setGuess('');
      }
    }
    setSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setGuess(val);
    if (val.length > 1) {
      setSuggestions(allPlayersList.filter(p => p.toLowerCase().includes(val.toLowerCase())).slice(0, 20));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setGuess(name);
    setSuggestions([]);
  };

  const nextPlayer = () => {
    let nextIndex = currentPlayerIndex + 1;
    
    // Find next unplayed player
    while (nextIndex < shuffledPlayers.length && playedPlayerIds.includes(shuffledPlayers[nextIndex].id)) {
      nextIndex++;
    }

    if (nextIndex < shuffledPlayers.length) {
      setCurrentPlayerIndex(nextIndex);
      setGuess('');
      setStatus('playing');
      setRevealedClubsCount(1);
    } else {
      // Reshuffle unplayed players
      const unplayed = playersData.filter(p => !playedPlayerIds.includes(p.id));
      if (unplayed.length === 0) {
        // All players played, reset played list
        setPlayedPlayerIds([]);
        setShuffledPlayers([...playersData].sort(() => Math.random() - 0.5));
      } else {
        setShuffledPlayers(unplayed.sort(() => Math.random() - 0.5));
      }
      setCurrentPlayerIndex(0);
      setGuess('');
      setStatus('playing');
      setRevealedClubsCount(1);
    }
  };

  const resetGame = () => {
    setShuffledPlayers([...playersData].sort(() => Math.random() - 0.5));
    setCurrentPlayerIndex(0);
    setScore(0);
    setLives(3);
    setGuess('');
    setStatus('playing');
    setRevealedClubsCount(1);
    setPlayedPlayerIds([]);
  };

  const revealNextClub = () => {
    if (revealedClubsCount < currentPlayer.clubs.length) {
      setRevealedClubsCount(c => c + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-yellow-500">
          <Trophy className="w-6 h-6" />
          <span className="text-xl font-bold">{t('guess.score')}: {score}</span>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Heart 
              key={i} 
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300 dark:text-gray-700'}`} 
            />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          {t('guess.title')}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          {t('guess.hint')}
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {currentPlayer?.clubs.slice(0, revealedClubsCount).map((club, index) => (
            <React.Fragment key={index}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg font-medium text-gray-800 dark:text-gray-200"
              >
                {club}
              </motion.div>
              {index < currentPlayer.clubs.length - 1 && (
                <div className="flex items-center text-gray-400">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
          {revealedClubsCount < currentPlayer.clubs.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg font-medium text-gray-500 dark:text-gray-400 flex items-center justify-center"
            >
              ???
            </motion.div>
          )}
        </div>

        {(status === 'playing' || status === 'wrong') && revealedClubsCount < currentPlayer.clubs.length && (
          <div className="flex justify-center mb-8">
            <button
              type="button"
              onClick={revealNextClub}
              className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full"
            >
              <Eye className="w-4 h-4" />
              {t('guess.reveal')}
            </button>
          </div>
        )}

        {status === 'gameover' ? (
          <div className="text-center mt-8">
            <h3 className="text-3xl font-bold text-red-500 mb-4">{t('guess.gameOver')}</h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              O jogador era: <span className="font-bold text-green-500">{currentPlayer.name}</span>
            </p>
            <button 
              onClick={resetGame}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              {t('guess.playAgain')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleGuess} className="max-w-md mx-auto mt-4">
            <div className="relative">
              <input
                type="text"
                value={guess}
                onChange={handleInputChange}
                disabled={status === 'correct'}
                placeholder={t('guess.placeholder')}
                className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
              />
              {(status === 'playing' || status === 'wrong') && (
                <button 
                  type="submit"
                  className="absolute right-2 top-2 bottom-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 rounded-lg transition-colors"
                >
                  {t('guess.submit')}
                </button>
              )}
              {suggestions.length > 0 && (status === 'playing' || status === 'wrong') && (
                <ul className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                  {suggestions.map((s, i) => (
                    <li 
                      key={i} 
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <AnimatePresence mode="wait">
              {status === 'correct' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-6 text-center"
                >
                  <p className="text-xl font-bold text-green-500 mb-4">{t('guess.correct')}</p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{currentPlayer.name}</p>
                  <button 
                    type="button"
                    onClick={nextPlayer}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors w-full"
                  >
                    {t('guess.next')}
                  </button>
                </motion.div>
              )}
              {status === 'wrong' && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-center text-red-500 font-medium"
                >
                  {t('guess.wrong')}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        )}
      </div>
    </div>
  );
};
