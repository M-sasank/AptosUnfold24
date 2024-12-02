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
const wallets = ["Mizu Wallet"];
import { NETWORK, APTOS_API_KEY } from "@/constants";
import SearchPuzzles from './components/scenes/search-puzzles';
import React, { useState,useEffect } from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainGame from './components/scenes/maingame';
import WalletConnectDemo from './components/connect'

import { Aptos } from "@aptos-labs/ts-sdk";
import { Layout, Row, Col, Button, Spin, List, Checkbox, Input} from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { Provider, Network } from "aptos";
import {
  useWallet,
  InputTransactionData,
} from "@aptos-labs/wallet-adapter-react";
// import { useState, useEffect } from "react";
import { CheckboxChangeEvent } from "antd/es/checkbox";

const OKTO_CLIENT_API_KEY = "ca8e29aa-a141-42ea-b28a-b18a08165f05";
function App() {
  const aptos = new Aptos();
  const [games, setGames] = useState([]);
  const [wallet_id,setWalletID] = useState("")
  // const { account } = useWallet();
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { account, signAndSubmitTransaction } = useWallet();
  
  const [accountHasList, setAccountHasList] = useState<boolean>(false);
  const moduleAddress  =  "0x43337ce1e45b1cd4812f24c84c4022a151dd9c217b423b97a105869d0427a59f"

  const fetchList = async () => {
    if (!account) return [];
    // change this to be your module account address
    // const moduleAddress = "=";
    setWalletID(account.address)
    try {
      const todoListResource = await aptos.getAccountResource(
        {
          accountAddress:moduleAddress,
          resourceType:`${moduleAddress}::dreamscribe4::GlobalGames`
        }
      );
      setGames(todoListResource.games)
      console.log(todoListResource)
      setAccountHasList(true);
    } catch (e: any) {
      setAccountHasList(false);
    }
  };
  const addNewList = async () => {
    if (!account) return [];
   
     const transaction:InputTransactionData = {
        data: {
          function:`0x43337ce1e45b1cd4812f24c84c4022a151dd9c217b423b97a105869d0427a59f::dreamscribe4::create_game`,
          functionArguments:["a","aa",2]
        }
      }
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(transaction);
      // wait for transaction
      await aptos.waitForTransaction({transactionHash:response.hash});
      setAccountHasList(true);
    } catch (error: any) {
      setAccountHasList(false);
    }
  };
  const createGame = async () => {

    if (!account) {
      setError("No account connected");
      return;
    }
  
    const moduleAddress = "0x43337ce1e45b1cd4812f24c84c4022a151dd9c217b423b97a105869d0427a59f";
    const payload = {
      function:"0x43337ce1e45b1cd4812f24c84c4022a151dd9c217b423b97a105869d0427a59f::dreamscribe4::create_game",
      type_arguments: [],
      arguments: ["ss","ssss",1], // Replace with actual data
    };
  
    try {
      // sign and submit transaction to chain
      const response = await signAndSubmitTransaction(payload);
      await provider.waitForTransaction(response.hash);
      console.log("Transaction submitted:", response);
  
    } catch (error: any) {
      console.log("error", error);
    }
  };
  

  // useEffect(() => {
  //   fetchList();
  // }, [account?.address]);

 return (
  
      <Router>
        <div>
          Wallet Address: {wallet_id}
          <pre>{JSON.stringify(games, null, 2)}</pre>
        </div>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={fetchList} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Fetch Games
      </button>
      <button
      button onClick={addNewList} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Create Game
      </button>
    </div>
      <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{
        network: NETWORK,
        mizuwallet: {
          // Learn more https://docs.mizu.io/docs/preparation/mizu-app-id
          appId: undefined,
          // Learn more https://docs.mizu.io/docs/preparation/manifest-json
          manifestURL: "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
          aptosApiKey: APTOS_API_KEY,
        },
      }}
      optInWallets={["Mizu Wallet"]}
      onError={(error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Unknown wallet error",
        });
      }}
    >
      <OktoProvider apiKey={OKTO_CLIENT_API_KEY} buildType={BuildType.SANDBOX}>
       <Routes>
         <Route path="/" element={<LoginPage setAuthToken={setAuthToken} authToken={authToken} handleLogout={handleLogout}/>} />
         <Route path="/home" element={!authToken ? renderPage() : <Navigate to="/" />} />
         {/* <Route path="/raw" element={authToken ? <RawTxnPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />
         <Route path="/widget" element={authToken ? <WidgetPage authToken={authToken} handleLogout={handleLogout}/> : <Navigate to="/" />} />        */}
       </Routes>
     </OktoProvider>
    </AptosWalletAdapterProvider>
   </Router>
   
 );
}
export default App;