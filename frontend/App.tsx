import { useState } from 'react';
import { Header } from "@/components/Header";
import { Counter } from "@/components/Counter";
import { TopBanner } from "@/components/TopBanner";

import { IS_DEV } from "./constants";
import MainGame from "./components/scenes/maingame";
import StartPage from "./components/scenes/startpage";
import GameScreen from "./components/scenes/gamescene";
import ResultPage from "./components/scenes/resultpage";
import Leaderboard from "./components/scenes/leaderboard";

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
  const [currentPage, setCurrentPage] = useState('start');

  const renderPage = () => {
    switch(currentPage) {
      case 'start':
        return <StartPage onStart={() => setCurrentPage('game')} />;
      case 'game':
        return <GameScreen onComplete={() => setCurrentPage('result')} />;
      case 'result':
        return <ResultPage 
          onPost={() => setCurrentPage('leaderboard')}
          onNewPuzzle={() => setCurrentPage('game')}
          onCancel={() => setCurrentPage('start')}
        />;
      case 'leaderboard':
        return <Leaderboard onHome={() => setCurrentPage('start')} />;
      default:
        return <StartPage onStart={() => setCurrentPage('game')} />;
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
