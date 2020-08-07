import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'


import * as serviceWorker from './serviceWorker';
import App from './App';
import { AuthProvider } from './AuthContext'



ReactDOM.render(
  <React.StrictMode>

  <AuthProvider>
    <ThemeProvider theme={theme}>
    <CSSReset />
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ThemeProvider>
  </AuthProvider>
  </React.StrictMode>

  
  , document.getElementById('root'));

serviceWorker.unregister();
