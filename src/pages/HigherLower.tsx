import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { careerPlayersData, CareerPlayer } from '../data/careerData';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ArrowUp, Trophy, Goal, Award } from 'lucide-react';

type StatType = 'goals' | 'assists' | 'titles' | 'cards';

const STAT_TYPES: StatType[] = ['goals', 'assists', 'titles', 'cards'];

export const HigherLower: React.FC = () => {
  const { t } = useLanguage();
  const [player1, setPlayer1] = useState<CareerPlayer | null>(null);
  const [player2, setPlayer2] = useState<CareerPlayer | null>(null);
  const [currentStat, setCurrentStat] = useState<StatType>('goals');
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState<'playing' | 'gameover'>('playing');
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const getRandomPlayersForStat = (stat: StatType): [CareerPlayer, CareerPlayer] => {
    let p1 = careerPlayersData[Math.floor(Math.random() * careerPlayersData.length)];
    let p2 = careerPlayersData[Math.floor(Math.random() * careerPlayersData.length)];
    while (p1.id === p2.id || p1[stat] === p2[stat]) {
      p2 = careerPlayersData[Math.floor(Math.random() * careerPlayersData.length)];
    }
    return [p1, p2];
  };

  const startNewGame = () => {
    const stat = STAT_TYPES[Math.floor(Math.random() * STAT_TYPES.length)];
    const [p1, p2] = getRandomPlayersForStat(stat);
    setCurrentStat(stat);
    setPlayer1(p1);
    setPlayer2(p2);
    setScore(0);
    setStatus('playing');
    setRevealed(false);
  };

  const nextRound = () => {
    const stat = STAT_TYPES[Math.floor(Math.random() * STAT_TYPES.length)];
    
    setPlayer2(prevPlayer2 => {
      if (!prevPlayer2) return prevPlayer2;
      
      let p2 = careerPlayersData[Math.floor(Math.random() * careerPlayersData.length)];
      while (p2.id === prevPlayer2.id || p2[stat] === prevPlayer2[stat]) {
        p2 = careerPlayersData[Math.floor(Math.random() * careerPlayersData.length)];
      }
      
      setPlayer1(prevPlayer2);
      setCurrentStat(stat);
      setRevealed(false);
      return p2;
    });
  };

  const handleGuess = (choice: 'higher' | 'lower') => {
    if (status !== 'playing' || revealed || !player1 || !player2) return;

    const v1 = player1[currentStat];
    const v2 = player2[currentStat];
    
    // Higher: v2 is strictly greater than v1
    // Lower: v2 is strictly less than v1
    // If they are equal (shouldn't happen due to while loop), guess is wrong unless we handle it, but our while loop prevents equality
    const isHigher = v2 > v1;
    const isCorrect = (choice === 'higher' && isHigher) || (choice === 'lower' && !isHigher);

    setRevealed(true);

    if (isCorrect) {
      setScore(s => s + 1);
      setTimeout(() => {
        nextRound();
      }, 2000);
    } else {
      setTimeout(() => {
        setStatus('gameover');
      }, 2000);
    }
  };

  const getStatLabel = (stat: StatType) => {
    switch(stat) {
      case 'goals': return 'Gols na Carreira';
      case 'assists': return 'Assistências';
      case 'titles': return 'Títulos';
      case 'cards': return 'Cartões';
      default: return 'Gols na Carreira';
    }
  };

  if (!player1 || !player2) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-gray-950 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-yellow-500">
          <Trophy className="w-6 h-6" />
          <span className="text-xl font-bold">Pontuação: {score}</span>
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Maior ou Menor</h2>
        <p className="text-gray-500 dark:text-gray-400">Acerte quem tem o maior valor de {getStatLabel(currentStat)}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 relative">
        {/* VS Badge */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-white dark:bg-gray-900 rounded-full border-4 border-gray-100 dark:border-gray-800 items-center justify-center font-black italic text-xl shadow-lg">
          VS
        </div>

        {/* Player 1 (Known) */}
        <div className="flex-1 bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-green-500/5 dark:bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tighter">
            {player1.name}
          </h3>
          <p className="text-lg text-gray-500 font-medium mb-2 uppercase tracking-widest">{getStatLabel(currentStat)}</p>
          <p className="text-5xl font-black text-green-600 dark:text-green-500">{player1[currentStat]}</p>
        </div>

        {/* Player 2 (Unknown/Guess) */}
        <div className="flex-1 bg-white dark:bg-gray-950 p-8 rounded-2xl border border-gray-200 dark:border-gray-800 text-center flex flex-col justify-center items-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-red-500/5 dark:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tighter">
            {player2.name}
          </h3>
          
          <p className="text-lg text-gray-500 font-medium mb-4 uppercase tracking-widest">tem...</p>
          
          {revealed ? (
            <motion.p 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-6xl font-black mb-4 ${
                status === 'gameover' ? 'text-red-600 dark:text-red-500' : 'text-green-600 dark:text-green-500'
              }`}
            >
              {player2[currentStat]}
            </motion.p>
          ) : (
            <div className="flex flex-col gap-3 w-full max-w-xs relative z-10">
              <button
                onClick={() => handleGuess('higher')}
                className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 uppercase tracking-wide"
              >
                <ArrowUp className="w-5 h-5" /> Mais
              </button>
              <button
                onClick={() => handleGuess('lower')}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700 uppercase tracking-wide"
              >
                <ArrowDown className="w-5 h-5" /> Menos
              </button>
            </div>
          )}
          
          <p className="text-lg text-gray-500 font-medium mt-4 uppercase tracking-widest">{getStatLabel(currentStat)}</p>
        </div>
      </div>

      <AnimatePresence>
        {status === 'gameover' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center bg-white dark:bg-gray-950 p-8 rounded-2xl border border-red-200 dark:border-red-900 shadow-xl"
          >
            <h3 className="text-3xl font-black text-red-500 uppercase tracking-tighter mb-2">Jogo Acabou!</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">Sua pontuação final foi: <strong className="text-2xl text-gray-900 dark:text-white">{score}</strong></p>
            <button 
              onClick={startNewGame}
              className="bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black font-bold py-4 px-10 rounded-xl transition-all uppercase tracking-widest"
            >
              Tentar Novamente
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
