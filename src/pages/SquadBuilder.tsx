import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { rouletteData, allPlayersList } from '../data/gameData';
import { motion, AnimatePresence } from 'motion/react';
import { Dices, UserPlus, RefreshCw, GripVertical, Move, X, Settings2 } from 'lucide-react';

type GameMode = 'solo' | '1v1';
type Category = keyof typeof rouletteData;
type FormationType = '4-4-2' | '4-3-3' | '3-5-2';
type JerseyStyle = 'solid' | 'striped' | 'halves';

interface PlayerSlot {
  id: number;
  name: string;
  source: string;
  positionId?: string;
  number: number;
}

interface TeamJersey {
  primaryColor: string;
  secondaryColor: string;
  style: JerseyStyle;
}

const JerseyIcon = ({ jersey, number }: { jersey: TeamJersey, number: number }) => {
  return (
    <div className="relative w-12 h-12 drop-shadow-md">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Base jersey shape */}
        <path d="M20,30 L30,10 L70,10 L80,30 L95,45 L85,60 L75,50 L75,95 L25,95 L25,50 L15,60 L5,45 Z" fill={jersey.primaryColor} />
        
        {/* Style overlays */}
        {jersey.style === 'striped' && (
          <path d="M35,10 L45,10 L45,95 L35,95 Z M55,10 L65,10 L65,95 L55,95 Z" fill={jersey.secondaryColor} />
        )}
        {jersey.style === 'halves' && (
          <path d="M50,10 L70,10 L80,30 L95,45 L85,60 L75,50 L75,95 L50,95 Z" fill={jersey.secondaryColor} />
        )}
        
        {/* Collar/Trim */}
        <path d="M40,10 Q50,25 60,10" fill="none" stroke={jersey.secondaryColor} strokeWidth="4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-lg" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
        {number}
      </div>
    </div>
  );
};

const formations: Record<FormationType, { id: string; top: string; left: string }[]> = {
  '4-4-2': [
    { id: 'gk', top: '85%', left: '50%' },
    { id: 'lb', top: '65%', left: '15%' },
    { id: 'cb1', top: '70%', left: '35%' },
    { id: 'cb2', top: '70%', left: '65%' },
    { id: 'rb', top: '65%', left: '85%' },
    { id: 'lm', top: '40%', left: '15%' },
    { id: 'cm1', top: '45%', left: '35%' },
    { id: 'cm2', top: '45%', left: '65%' },
    { id: 'rm', top: '40%', left: '85%' },
    { id: 'st1', top: '15%', left: '35%' },
    { id: 'st2', top: '15%', left: '65%' },
  ],
  '4-3-3': [
    { id: 'gk', top: '85%', left: '50%' },
    { id: 'lb', top: '65%', left: '15%' },
    { id: 'cb1', top: '70%', left: '35%' },
    { id: 'cb2', top: '70%', left: '65%' },
    { id: 'rb', top: '65%', left: '85%' },
    { id: 'cm1', top: '45%', left: '25%' },
    { id: 'cm2', top: '50%', left: '50%' },
    { id: 'cm3', top: '45%', left: '75%' },
    { id: 'lw', top: '20%', left: '20%' },
    { id: 'st', top: '15%', left: '50%' },
    { id: 'rw', top: '20%', left: '80%' },
  ],
  '3-5-2': [
    { id: 'gk', top: '85%', left: '50%' },
    { id: 'cb1', top: '70%', left: '25%' },
    { id: 'cb2', top: '70%', left: '50%' },
    { id: 'cb3', top: '70%', left: '75%' },
    { id: 'lm', top: '45%', left: '15%' },
    { id: 'cm1', top: '50%', left: '35%' },
    { id: 'cdm', top: '55%', left: '50%' },
    { id: 'cm2', top: '50%', left: '65%' },
    { id: 'rm', top: '45%', left: '85%' },
    { id: 'st1', top: '15%', left: '35%' },
    { id: 'st2', top: '15%', left: '65%' },
  ]
};

export const SquadBuilder: React.FC = () => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<GameMode>('solo');
  const [category, setCategory] = useState<Category>('world');
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  
  const [currentPlayerInput, setCurrentPlayerInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const [team1, setTeam1] = useState<PlayerSlot[]>([]);
  const [team2, setTeam2] = useState<PlayerSlot[]>([]);
  const [currentTurn, setCurrentTurn] = useState<1 | 2>(1);
  const [viewingTeam, setViewingTeam] = useState<1 | 2>(1);
  
  const [formation1, setFormation1] = useState<FormationType>('4-3-3');
  const [formation2, setFormation2] = useState<FormationType>('4-3-3');

  const [jersey1, setJersey1] = useState<TeamJersey>({ primaryColor: '#ef4444', secondaryColor: '#ffffff', style: 'solid' });
  const [jersey2, setJersey2] = useState<TeamJersey>({ primaryColor: '#3b82f6', secondaryColor: '#ffffff', style: 'solid' });
  const [showJerseyEditor, setShowJerseyEditor] = useState(false);
  const [editingPlayerId, setEditingPlayerId] = useState<number | null>(null);
  const [editingNumber, setEditingNumber] = useState<string>('');
  
  // Store custom positions for each team and formation
  const [customPositions1, setCustomPositions1] = useState<Record<string, { top: string, left: string }>>({});
  const [customPositions2, setCustomPositions2] = useState<Record<string, { top: string, left: string }>>({});

  const [draggedPlayerId, setDraggedPlayerId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentPlayerInput(val);
    if (val.length > 1) {
      setSuggestions(allPlayersList.filter(p => p.toLowerCase().includes(val.toLowerCase())).slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setCurrentPlayerInput(name);
    setSuggestions([]);
  };

  const spinRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSpinResult(null);
    
    setTimeout(() => {
      const options = rouletteData[category];
      const result = options[Math.floor(Math.random() * options.length)];
      setSpinResult(result);
      setIsSpinning(false);
    }, 2000);
  };

  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlayerInput.trim() || !spinResult) return;

    const newPlayer: PlayerSlot = {
      id: Date.now(),
      name: currentPlayerInput.trim(),
      source: spinResult,
      number: (viewingTeam === 1 ? team1.length : team2.length) + 1
    };

    if (mode === 'solo') {
      if (team1.length < 11) {
        setTeam1([...team1, newPlayer]);
      }
    } else {
      if (currentTurn === 1 && team1.length < 11) {
        setTeam1([...team1, newPlayer]);
        setCurrentTurn(2);
        setViewingTeam(2);
      } else if (currentTurn === 2 && team2.length < 11) {
        setTeam2([...team2, newPlayer]);
        setCurrentTurn(1);
        setViewingTeam(1);
      }
    }
    
    setCurrentPlayerInput('');
    setSpinResult(null);
    setSuggestions([]);
  };

  const removePlayer = (playerId: number) => {
    if (viewingTeam === 1) {
      setTeam1(team1.filter(p => p.id !== playerId));
    } else {
      setTeam2(team2.filter(p => p.id !== playerId));
    }
  };

  const resetGame = () => {
    setTeam1([]);
    setTeam2([]);
    setCurrentTurn(1);
    setViewingTeam(1);
    setSpinResult(null);
    setCurrentPlayerInput('');
  };

  const handleDragStart = (e: React.DragEvent, playerId: number) => {
    setDraggedPlayerId(playerId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropOnPosition = (e: React.DragEvent, positionId: string) => {
    e.preventDefault();
    if (!draggedPlayerId) return;

    const updateTeam = (team: PlayerSlot[]) => {
      // Check if there's already a player in this position
      const existingPlayerIndex = team.findIndex(p => p.positionId === positionId);
      const draggedPlayerIndex = team.findIndex(p => p.id === draggedPlayerId);
      
      if (draggedPlayerIndex === -1) return team;

      const newTeam = [...team];
      
      // If dropping on an occupied position, swap them
      if (existingPlayerIndex !== -1) {
        const tempPos = newTeam[draggedPlayerIndex].positionId;
        newTeam[existingPlayerIndex].positionId = tempPos;
      }
      
      newTeam[draggedPlayerIndex].positionId = positionId;
      return newTeam;
    };

    if (viewingTeam === 1) {
      setTeam1(updateTeam(team1));
    } else {
      setTeam2(updateTeam(team2));
    }
    setDraggedPlayerId(null);
  };

  const handleDropOnBench = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedPlayerId) return;

    const updateTeam = (team: PlayerSlot[]) => {
      const draggedPlayerIndex = team.findIndex(p => p.id === draggedPlayerId);
      if (draggedPlayerIndex === -1) return team;
      
      const newTeam = [...team];
      newTeam[draggedPlayerIndex].positionId = undefined;
      return newTeam;
    };

    if (viewingTeam === 1) {
      setTeam1(updateTeam(team1));
    } else {
      setTeam2(updateTeam(team2));
    }
    setDraggedPlayerId(null);
  };

  const currentTeam = viewingTeam === 1 ? team1 : team2;
  const currentFormation = viewingTeam === 1 ? formation1 : formation2;
  const setFormation = viewingTeam === 1 ? setFormation1 : setFormation2;
  const customPositions = viewingTeam === 1 ? customPositions1 : customPositions2;
  const setCustomPositions = viewingTeam === 1 ? setCustomPositions1 : setCustomPositions2;
  const currentJersey = viewingTeam === 1 ? jersey1 : jersey2;
  const setCurrentJersey = viewingTeam === 1 ? setJersey1 : setJersey2;

  const benchPlayers = currentTeam.filter(p => !p.positionId);

  const handleUpdateNumber = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPlayerId === null) return;
    
    const num = parseInt(editingNumber);
    if (isNaN(num)) return;

    const updateTeam = (team: PlayerSlot[]) => 
      team.map(p => p.id === editingPlayerId ? { ...p, number: num } : p);

    if (viewingTeam === 1) {
      setTeam1(updateTeam(team1));
    } else {
      setTeam2(updateTeam(team2));
    }
    setEditingPlayerId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode('solo'); resetGame(); }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === 'solo' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {t('squad.solo')}
          </button>
          <button
            onClick={() => { setMode('1v1'); resetGame(); }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${mode === '1v1' ? 'bg-green-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
          >
            {t('squad.vs')}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-400 font-medium">{t('squad.category')}:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg px-3 py-2 outline-none"
          >
            <option value="world">{t('squad.categories.world')}</option>
            <option value="retired">{t('squad.categories.retired')}</option>
            <option value="general">{t('squad.categories.general')}</option>
            <option value="brazilians">{t('squad.categories.brazilians')}</option>
          </select>
        </div>
        
        <button
          onClick={resetGame}
          className="flex items-center gap-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="font-medium">{t('squad.reset')}</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left Column: Roulette & Bench */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Roulette */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 text-center">
            {mode === '1v1' && (
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full font-bold ${currentTurn === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'}`}>
                  {currentTurn === 1 ? t('squad.player1Turn') : t('squad.player2Turn')}
                </span>
              </div>
            )}

            <div className="w-40 h-40 mx-auto bg-gray-50 dark:bg-gray-950 rounded-full border-8 border-gray-200 dark:border-gray-800 flex items-center justify-center mb-6 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {isSpinning ? (
                  <motion.div
                    key="spinning"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                    className="text-green-500"
                  >
                    <Dices className="w-12 h-12" />
                  </motion.div>
                ) : spinResult ? (
                  <motion.div
                    key="result"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center p-2"
                  >
                    <span className="font-bold text-lg text-gray-900 dark:text-white leading-tight">{spinResult}</span>
                  </motion.div>
                ) : (
                  <motion.div key="idle" className="text-gray-400">
                    <Dices className="w-12 h-12" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={spinRoulette}
              disabled={isSpinning || spinResult !== null || (mode === 'solo' ? team1.length >= 11 : (currentTurn === 1 ? team1.length >= 11 : team2.length >= 11))}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              {isSpinning ? t('squad.spinning') : t('squad.spin')}
            </button>
          </div>

          {/* Player Input Form */}
          <AnimatePresence>
            {spinResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-green-200 dark:border-green-900"
              >
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t('squad.selectPlayer')}</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">{spinResult}</p>
                
                <form onSubmit={addPlayer} className="relative">
                  <input
                    type="text"
                    value={currentPlayerInput}
                    onChange={handleInputChange}
                    placeholder={t('squad.playerPlaceholder')}
                    className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    autoFocus
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-20 w-full top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg overflow-hidden mb-4">
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
                  <button
                    type="submit"
                    disabled={!currentPlayerInput.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl transition-colors mt-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    {t('squad.addPlayer')}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bench */}
          <div 
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex-1 min-h-[200px]"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnBench}
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex justify-between items-center">
              <span>{t('squad.bench')}</span>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                {benchPlayers.length}
              </span>
            </h3>
            
            {benchPlayers.length === 0 ? (
              <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm text-center px-4">
                {t('squad.dragHint')}
              </div>
            ) : (
              <div className="space-y-2">
                {benchPlayers.map(player => (
                  <div
                    key={player.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, player.id)}
                    className="bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3 rounded-xl flex items-center gap-3 cursor-grab active:cursor-grabbing hover:border-green-500 transition-colors group relative"
                  >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-gray-900 dark:text-white truncate">{player.name}</p>
                      <p className="text-xs text-gray-500 truncate">{player.source}</p>
                    </div>
                    <button 
                      onClick={() => removePlayer(player.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-red-100 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Pitch */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {mode === '1v1' ? (viewingTeam === 1 ? t('squad.team1') : t('squad.team2')) : t('squad.title')}
                </h3>
                {mode === '1v1' && (
                  <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    <button
                      onClick={() => setViewingTeam(1)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${viewingTeam === 1 ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
                    >
                      {t('squad.team1')}
                    </button>
                    <button
                      onClick={() => setViewingTeam(2)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${viewingTeam === 2 ? 'bg-white dark:bg-gray-700 shadow-sm' : 'text-gray-500'}`}
                    >
                      {t('squad.team2')}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowJerseyEditor(!showJerseyEditor)}
                  className="p-2 text-gray-500 hover:text-green-600 bg-gray-50 dark:bg-gray-950 rounded-lg transition-colors"
                  title="Edit Jersey"
                >
                  <Settings2 className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium text-gray-500">{t('squad.formation')}:</span>
                <select
                  value={currentFormation}
                  onChange={(e) => setFormation(e.target.value as FormationType)}
                  className="bg-gray-50 dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-sm rounded-lg px-2 py-1 outline-none"
                >
                  <option value="4-4-2">4-4-2</option>
                  <option value="4-3-3">4-3-3</option>
                  <option value="3-5-2">3-5-2</option>
                </select>
              </div>
            </div>

            {showJerseyEditor && (
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-wrap gap-4 items-center">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Primary Color</label>
                  <input 
                    type="color" 
                    value={currentJersey.primaryColor}
                    onChange={(e) => setCurrentJersey({ ...currentJersey, primaryColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Secondary Color</label>
                  <input 
                    type="color" 
                    value={currentJersey.secondaryColor}
                    onChange={(e) => setCurrentJersey({ ...currentJersey, secondaryColor: e.target.value })}
                    className="w-8 h-8 rounded cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Style</label>
                  <select 
                    value={currentJersey.style}
                    onChange={(e) => setCurrentJersey({ ...currentJersey, style: e.target.value as JerseyStyle })}
                    className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm rounded-lg px-2 py-1 outline-none"
                  >
                    <option value="solid">Solid</option>
                    <option value="striped">Striped</option>
                    <option value="halves">Halves</option>
                  </select>
                </div>
              </div>
            )}

            {/* Football Pitch */}
            <div className="relative flex-1 bg-green-600 rounded-xl overflow-hidden min-h-[500px] border-4 border-green-700">
              {/* Pitch Markings */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/30 -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute top-0 left-1/2 w-48 h-24 border-2 border-t-0 border-white/30 -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-48 h-24 border-2 border-b-0 border-white/30 -translate-x-1/2"></div>
                <div className="absolute top-0 left-1/2 w-24 h-8 border-2 border-t-0 border-white/30 -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 w-24 h-8 border-2 border-b-0 border-white/30 -translate-x-1/2"></div>
              </div>

              {/* Player Positions */}
              {formations[currentFormation].map((pos) => {
                const playerInPos = currentTeam.find(p => p.positionId === pos.id);
                const customPos = customPositions[`${currentFormation}-${pos.id}`];
                
                return (
                  <motion.div
                    key={pos.id}
                    drag
                    dragMomentum={false}
                    onDragEnd={(e, info) => {
                      // We don't need to calculate exact percentages, framer motion handles the visual offset
                      // But if we want to save it, we can just let framer motion keep its state
                    }}
                    className="absolute w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center group"
                    style={{ top: pos.top, left: pos.left }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDropOnPosition(e, pos.id)}
                  >
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-800 rounded-full hidden group-hover:flex items-center justify-center cursor-move z-20">
                      <Move size={10} className="text-white" />
                    </div>
                    {playerInPos ? (
                      <div className="relative group/player flex flex-col items-center">
                        <div
                          draggable
                          onDragStart={(e) => handleDragStart(e, playerInPos.id)}
                          className="cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-10"
                          title={`${playerInPos.name} (${playerInPos.source})`}
                          onClick={() => {
                            setEditingPlayerId(playerInPos.id);
                            setEditingNumber(playerInPos.number.toString());
                          }}
                        >
                          <JerseyIcon jersey={currentJersey} number={playerInPos.number} />
                        </div>
                        <div className="mt-1 bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold text-white whitespace-nowrap z-10 pointer-events-none">
                          {playerInPos.name}
                        </div>
                        <button 
                          onClick={() => removePlayer(playerInPos.id)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full hidden group-hover/player:flex items-center justify-center z-30"
                        >
                          <X size={10} />
                        </button>
                        
                        {editingPlayerId === playerInPos.id && (
                          <div className="absolute top-full mt-2 z-40 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
                            <form onSubmit={handleUpdateNumber} className="flex gap-2">
                              <input 
                                type="number" 
                                value={editingNumber}
                                onChange={(e) => setEditingNumber(e.target.value)}
                                className="w-16 px-2 py-1 text-sm border rounded dark:bg-gray-900 dark:border-gray-700"
                                min="1" max="99"
                                autoFocus
                              />
                              <button type="submit" className="bg-green-600 text-white px-2 py-1 rounded text-sm">OK</button>
                            </form>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/50 bg-black/10 flex items-center justify-center transition-colors hover:bg-white/20">
                        <span className="text-white/50 text-xs font-bold uppercase">{pos.id}</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-4 text-center text-sm text-gray-500">
              {currentTeam.length}/11 {t('squad.teamComplete').replace('!', '')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

