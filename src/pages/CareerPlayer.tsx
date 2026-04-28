import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { careerPlayersData } from '../data/careerData';
import { allPlayersList } from '../data/gameData';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy, ArrowRight, Eye, Goal, Award, Activity, Flag, Calendar } from 'lucide-react';

export const CareerPlayer: React.FC = () => {
  const { t } = useLanguage();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong' | 'gameover'>('playing');
  const [shuffledPlayers, setShuffledPlayers] = useState([...careerPlayersData].sort(() => Math.random() - 0.5));
  const [playedPlayerIds, setPlayedPlayerIds] = useState<number[]>([]);
  const [revealedClubsCount, setRevealedClubsCount] = useState(1);
  const [showStats, setShowStats] = useState(true);

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
      const unplayed = careerPlayersData.filter(p => !playedPlayerIds.includes(p.id));
      if (unplayed.length === 0) {
        // All players played, reset played list
        setPlayedPlayerIds([]);
        setShuffledPlayers([...careerPlayersData].sort(() => Math.random() - 0.5));
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
    setShuffledPlayers([...careerPlayersData].sort(() => Math.random() - 0.5));
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
          Adivinhe o Jogador (Carreira)
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Adivinhe o jogador pelos seus clubes e estatísticas!
        </p>

        {showStats && currentPlayer && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 bg-gray-50 dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Calendar className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-sm text-gray-500">Idade</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.age} anos</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Goal className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-sm text-gray-500">Gols</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.goals}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Activity className="w-6 h-6 text-purple-500 mb-2" />
              <span className="text-sm text-gray-500">Assistências</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.assists}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Flag className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-sm text-gray-500">Cartões</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.cards}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-sm text-gray-500">Títulos</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.titles}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
              <Award className="w-6 h-6 text-yellow-600 mb-2" />
              <span className="text-sm text-gray-500">Bolas de Ouro</span>
              <span className="font-bold text-lg dark:text-white">{currentPlayer.ballonDor}</span>
            </div>
          </div>
        )}

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
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg font-medium transition-colors"
                >
                  {t('guess.submit')}
                </button>
              )}
            </div>

            {status === 'wrong' && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-center mt-3 font-medium"
              >
                {t('guess.wrong')}
              </motion.p>
            )}

            <AnimatePresence>
              {suggestions.length > 0 && status !== 'correct' && (
                <motion.ul 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                >
                  {suggestions.map((s, i) => (
                    <li 
                      key={i}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 last:border-0"
                    >
                      {s}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </form>
        )}

        {status === 'correct' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-8"
          >
            <h3 className="text-3xl font-bold text-green-500 mb-2">{t('guess.correct')}</h3>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              O jogador é <span className="font-bold text-green-500">{currentPlayer.name}</span>!
            </p>
            <button 
              onClick={nextPlayer}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              {t('guess.next')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
