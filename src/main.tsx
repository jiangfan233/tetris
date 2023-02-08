import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
import "normalize.css"
import { store } from "./store/index";
import { Workbox } from "workbox-window";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    
  <Provider store={store}>
    <App />
  </Provider>
  
)

if ("serviceWorker" in navigator) {
    const wb = new Workbox("sw.js");
    wb.register();
}
