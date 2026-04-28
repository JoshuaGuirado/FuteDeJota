import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { GuessPlayer } from './pages/GuessPlayer';
import { CareerPlayer } from './pages/CareerPlayer';
import { SquadBuilder } from './pages/SquadBuilder';
import { Quiz } from './pages/Quiz';
import { ZeroToHundred } from './pages/ZeroToHundred';
import { HigherLower } from './pages/HigherLower';
import { About } from './pages/About';

type Page = 'home' | 'guess' | 'career' | 'squad' | 'quiz' | 'zeroToHundred' | 'higherLower' | 'about';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100 font-sans transition-colors duration-200 bg-soccer-pattern">
      <Navbar onNavigate={setCurrentPage} />
      <main className="flex-1">
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'guess' && <GuessPlayer />}
        {currentPage === 'career' && <CareerPlayer />}
        {currentPage === 'squad' && <SquadBuilder />}
        {currentPage === 'quiz' && <Quiz />}
        {currentPage === 'zeroToHundred' && <ZeroToHundred />}
        {currentPage === 'higherLower' && <HigherLower />}
        {currentPage === 'about' && <About />}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

