import React from 'react';
import { useSorobanReact } from '@soroban-react/core';

export function WalletData() {
  const {
    address,
    connect,
    disconnect,
    activeChain,
    activeConnector,
    isConnecting,
    isConnected,
  } = useSorobanReact();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (e) {
      console.error("Cüzdan bağlanırken hata oluştu:", e);
      alert(`Cüzdan bağlanırken hata oluştu: ${e.message || e.toString()}`);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (e) {
      console.error("Cüzdan bağlantısı kesilirken hata oluştu:", e);
      alert(`Cüzdan bağlantısı kesilirken hata oluştu: ${e.message || e.toString()}`);
    }
  };

  return (
    <div className="walletContainer" style={{ margin: '20px auto', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', maxWidth: '600px', textAlign: 'center' }}>
      <h2 style={{ fontSize: '24px', color: '#333', marginBottom: '15px' }}>Cüzdan Bilgileri</h2>
      {isConnected ? (
        <div>
          <p style={{ fontSize: '16px', marginBottom: '8px' }}>
            <strong>Bağlı Cüzdan:</strong> <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{address}</span>
          </p>
          <p style={{ fontSize: '16px', marginBottom: '15px' }}>
            <strong>Ağ:</strong> {activeChain?.name} ({activeChain?.id})
          </p>
          <button
            onClick={handleDisconnect}
            disabled={!isConnected || isConnecting}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: (!isConnected || isConnecting) ? 'not-allowed' : 'pointer',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              transition: 'background-color 0.2s',
              minWidth: '120px'
            }}
          >
            {isConnecting ? 'Bağlantı Kesiliyor...' : 'Bağlantıyı Kes'}
          </button>
        </div>
      ) : (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.2s',
            minWidth: '120px'
          }}
        >
          {isConnecting ? 'Bağlanılıyor...' : 'Cüzdanı Bağla'}
        </button>
      )}
      {isConnecting && <p style={{ marginTop: '10px', color: '#6c757d' }}>Lütfen cüzdanınızda onayı bekleyin...</p>}
    </div>
  );
}