// @ts-ignore
// @ts-nocheck

import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// const GOOGLE_CLIENT_ID = "475743858090-1r6ujngrh35hdk29ehlmvjpu94stim4d.apps.googleusercontent.com"

root.render(
<React.StrictMode>
  {/* <GoogleOAuthProvider clientId = {GOOGLE_CLIENT_ID}> */}
    <App />
  {/* </GoogleOAuthProvider> */}
</React.StrictMode>
);