import { useState } from 'react';
import { Header } from "@/components/Header";
import { Counter } from "@/components/Counter";
import { TopBanner } from "@/components/TopBanner";

import { IS_DEV } from "./constants";
import MainGame from "./components/scenes/maingame";
import TutorialSlide from "./components/scenes/tutorial";
import StartPage from "./components/scenes/startpage";
import GameScreen from "./components/scenes/gamescene";
import ResultPage from "./components/scenes/resultpage";
import Leaderboard from "./components/scenes/leaderboard";
import CreatedPuzzles from './components/scenes/createdpuzzles';
import SearchPuzzles from './components/scenes/search-puzzles';

interface StartPageProps {
  onStart: () => void;
}

interface GameScreenProps {
  onComplete: () => void; 
}

interface ResultPageProps {
  onPost: () => void;
  onNewPuzzle: () => void;
  onCancel: () => void;
}

interface LeaderboardProps {
  onHome: () => void;
}

function App() {
  const [currentPage, setCurrentPage] = useState('searchpuzzles');

  const renderPage = () => {
    switch(currentPage) {
      case 'createdpuzzles':
        return <CreatedPuzzles />
      case 'searchpuzzles':
        return <SearchPuzzles />
      case 'tutorial':
        return <TutorialSlide/>
      case 'start':
        return <StartPage 
          onStart={() => setCurrentPage('game')}
          onLeaderboard={() => setCurrentPage('leaderboard')} 
        />;
      case 'game':
        return <GameScreen 
          onComplete={() => setCurrentPage('result')}
          onBack={() => setCurrentPage('start')}
        />;
      case 'result':
        return <ResultPage 
          onNewPuzzle={() => setCurrentPage('game')}
          onCancel={() => setCurrentPage('leaderboard')}
        />;
      case 'leaderboard':
        return <Leaderboard 
          onHome={() => setCurrentPage('start')}
          onPlay={() => setCurrentPage('game')}
        />;
      default:
        return <StartPage 
          onStart={() => setCurrentPage('game')}
          onLeaderboard={() => setCurrentPage('leaderboard')}
        />;
    }
  };

  return (
    <>
      {/* {IS_DEV && <TopBanner />}
      <Header />
      <div className="flex items-center justify-center flex-col">
        <Counter />
      </div> */}
      {/* <MainGame /> */}
      {renderPage()}
    </>
  );
}

export default App;
