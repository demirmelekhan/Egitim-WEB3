import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Bu satırı yorum satırı yapmıştık, öyle kalsın veya silebilirsiniz.

// @soroban-react kütüphanelerinden gerekli import'lar
import { SorobanReactProvider } from "@soroban-react/core";
import { freighter } from "@soroban-react/freighter"; // Freighter cüzdan bağlayıcısı
//import { testnet } from "@soroban-react/chains"; // Testnet zincir bilgisi
import * as sorobanChains from "@soroban-react/chains"; // Örneğin, 'sorobanChains' olarak adlandırıyoruz

const chains = [sorobanChains.testnet];
//const chains = [testnet]; // Kullanacağımız zincirleri bir diziye ekliyoruz
const connectors = [freighter()]; // Kullanacağımız cüzdan bağlayıcılarını bir diziye ekliyoruz

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
     <SorobanReactProvider
      chains={chains}
      connectors={connectors}
      defaultChain={sorobanChains.testnet} // <-- Burası DÜZELTİLDİ
      autoConnect={true} // Otomatik bağlanmayı etkinleştirin
    >
      <App />
    </SorobanReactProvider>
  //</React.StrictMode>,
);