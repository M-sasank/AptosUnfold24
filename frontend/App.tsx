// @ts-ignore
// @ts-nocheck

import { IS_DEV } from "./constants";
import TutorialSlide from "./components/scenes/tutorial";
import StartPage from "./components/scenes/startpage";
import GameScreen from "./components/scenes/gamescene";
import ResultPage from "./components/scenes/resultpage";
import Leaderboard from "./components/scenes/leaderboard";
import CreatedPuzzles from './components/scenes/createdpuzzles';
import SearchPuzzles from './components/scenes/search-puzzles';
import React, { useState } from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainGame from './components/scenes/maingame';


const OKTO_CLIENT_API_KEY = "ca8e29aa-a141-42ea-b28a-b18a08165f05";
function App() {
  const [currentPage, setCurrentPage] = useState('start');
  const [Id,setPuzzleId]=useState(null);

  const renderPage = () => {
    switch(currentPage) {
      case 'createdpuzzles':
        return <CreatedPuzzles />
      case 'searchpuzzles':
        return <SearchPuzzles 
          onBack={() => setCurrentPage('start')}
          onSelectGame={(puzzleId) => {
            setPuzzleId(Id => puzzleId)
            setCurrentPage('game');
            // You can pass the selected puzzleId to GameScreen here if needed
          }}
        />
      case 'tutorial':
        return <TutorialSlide/>
      case 'start':
        return <StartPage 
          onStart={() => setCurrentPage('searchpuzzles')}
          onLeaderboard={() => setCurrentPage('leaderboard')} 
        />;
      case 'game':
        return <GameScreen 
          onComplete={() => setCurrentPage('result')}
          onBack={() => setCurrentPage('start')}
          id={Id}
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
  }
 console.log('App component rendered');
 const [authToken, setAuthToken] = useState(null);
 const handleLogout = () => {
    console.log("setting auth token to null")
    setAuthToken(null); // Clear the authToken
  };
 return (
   <Router>
     <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Routes>
         <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}/>} />
         <Route path="/home" element={!authToken ? renderPage() : <Navigate to="/" />} />
         {/* <Route path="/raw" element={authToken ? <RawTxnPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         <Route path="/widget" element={authToken ? <WidgetPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />        */}
       </Routes>
     </OktoProvider>
   </Router>
 );
}
export default App;