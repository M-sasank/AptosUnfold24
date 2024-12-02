// @ts-ignore
// @ts-nocheck
import React from 'react';
import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";

const WalletConnectDemo = () => {
  const { connect, disconnect, account, connected } = useWallet();
 
  const handleConnect = async () => {
    try {
      // Change below to the desired wallet name instead of "Petra"
      await connect("Petra" as WalletName<"Petra">); 
      console.log('Connected to wallet:', account);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };
 
  const handleDisconnect = async () => {
    try {
      await disconnect();
      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Failed to disconnect from wallet:', error);
    }
  };
 
  return (
    <div>
      <h1>Aptos Wallet Connection</h1>
      <div>
          <WalletSelector/>
      </div>
    </div>
  );
};
 
export default WalletConnectDemo;