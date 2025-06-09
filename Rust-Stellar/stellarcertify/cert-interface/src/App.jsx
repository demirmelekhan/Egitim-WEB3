// cert-interface/src/App.jsx
import React from 'react';
import { WalletData } from './components/WalletData'; 
import { IssueCertificateForm } from './components/IssueCertificateForm'; // Doğru import
import { useSorobanReact } from '@soroban-react/core';

import './App.css'; 

function App() {
  const { address } = useSorobanReact(); 

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Sertifika Uygulaması</h1>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '40px' }}>Stellar ağına cüzdanınızı bağlayın ve sertifika işlemlerini yapın.</p>

      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <WalletData />
      </div>

      {address && (
        <IssueCertificateForm />
      )}
    </div>
  );
}

export default App;