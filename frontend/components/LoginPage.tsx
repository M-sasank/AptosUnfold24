// @ts-ignore
// @ts-nocheck


import React, { useState, useEffect } from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { WalletConnector } from "@aptos-labs/wallet-adapter-mui-design";
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin,GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';

function LoginPage() {

  console.log("LoginPage component rendered");
  const navigate = useNavigate();
  const { authenticate } = useOkto();
  const [authToken, setAuthToken] = useState();
  const [walletData, setWalletData] = useState(null);
  const [error, setError] = useState(null);
  const BASE_URL = "https://sandbox-api.okto.tech";
  const OKTO_CLIENT_API = "";

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        console.log("auth token received", authResponse&&authResponse.auth_token&&authResponse.auth_token);
        
        const options1 = {
          method: 'POST',
          url: 'https://sandbox-api.okto.tech/api/v1/wallet',
          headers: {Authorization: `Bearer ${authResponse&&authResponse.auth_token&&authResponse.auth_token}`}
        };
        
        try {
          const { data } = await axios.request(options1);
          console.log(data);
          console.log("Created a new wallet for user!")
        } catch (error) {
          console.error(error);
        }

        const options = {
          method: 'GET',
          url: 'https://sandbox-api.okto.tech/api/v1/wallet',
          headers: {Authorization: `Bearer ${authResponse&&authResponse.auth_token&&authResponse.auth_token}`}
        };
        
        try {
          const { data } = await axios.request(options);
          console.log("Wallets data received: ", data.data.wallets)
          setWalletData(data.data.wallets)
        } catch (error) {
          console.error(error);
        }
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  // const fetchWallets = async () => {
  //   console.log("fetch wallet called");
    
  //   try {
  //     const walletsData = await createWallet(); // Ensure createWallet is defined or imported
  //     setWalletData(walletsData);
  //     console.log(walletsData);
  //   } catch (error) {
  //     setError(`Failed to fetch wallets: ${error.message}`);
  //   }
  // };

  // Run fetchWallets when authToken is set
  // useEffect(() => {
  //   if (authToken) {
  //     fetchWallets();
  //     console.log('use effect called')
  //   }
  //   console.log('Executed ')

  // }, [authToken]);

  return (
    <div style={containerStyle}>
      <h1>Login</h1>
      <WalletSelector />
      {/* <WalletSelector /> */}
      {/* <WalletConnector/> */}
      <GoogleOAuthProvider clientId="475743858090-1r6ujngrh35hdk29ehlmvjpu94stim4d.apps.googleusercontent.com">
      {!authToken ? (
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={(error) => {
              console.log("Login Failed", error);
            }}
            useOneTap
            promptMomentNotification={(notification) =>
              console.log("Prompt moment notification:", notification)
            }
            />
          ) : (
            <>
            <div>Authenticated</div>
            <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', textAlign: 'center' }}>
              {walletData ? (
                <pre>{JSON.stringify(walletData, null, 2)}</pre>
              ) : (
                <div>Loading wallet data...</div>
              )}
            </div>
          </>
            
          )}
      </GoogleOAuthProvider>
    </div>
  );
}
export default LoginPage