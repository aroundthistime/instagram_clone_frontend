import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "styled-components";
import {ApolloProvider} from "react-apollo-hooks";
import Theme from './Styles/Theme';
import Client from './Apollo/Client';

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={Theme}>
        <ApolloProvider client={Client}>
          <App />
        </ApolloProvider>
      </ThemeProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
