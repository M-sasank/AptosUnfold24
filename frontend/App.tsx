// @ts-ignore
// @ts-nocheck

import { IS_DEV } from "./constants";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import TutorialSlide from "./components/scenes/tutorial";
import MysteryBox from './MysteryBox';
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
import WalletConnectDemo from './components/connect'

const OKTO_CLIENT_API_KEY = "ca8e29aa-a141-42ea-b28a-b18a08165f05";
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
  }
 console.log('App component rendered');
 const [authToken, setAuthToken] = useState(null);
 const handleLogout = () => {
    console.log("setting auth token to null")
    setAuthToken(null); // Clear the authToken
  };
 return (
      <Router>
      <AptosWalletAdapterProvider
          // plugins={wallets}
          autoConnect={true}
          optInWallets={["Petra"]}
          // dappConfig={{ Network: Network.TESTNET }}
          onError={(error) => {
            console.log("error", error);
          }}
        >
     <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Routes>
       <Route>
       {/* <Route path="/" element={<WalletConnectDemo/>} /> */}
       <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}/>} />
       </Route>
         <Route path="/home" element={authToken ? renderPage() : <Navigate to="/" />} />
         {/* <Route path="/raw" element={authToken ? <RawTxnPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         <Route path="/widget" element={authToken ? <WidgetPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />        */}
       </Routes>
     </OktoProvider>
     </AptosWalletAdapterProvider>
   </Router>
   
 );
}
export default App;