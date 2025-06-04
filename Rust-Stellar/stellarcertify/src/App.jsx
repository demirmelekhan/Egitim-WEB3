// src/App.jsx

import React, { useState, useEffect } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
//import { get, isConnected, signTransaction } from '@stellar/freighter-api';
import * as freighterApi from '@stellar/freighter-api';
import './App.css';

// --- YAPILANDIRMA ---
// Bu, sertifika basmaya yetkili olan Eğitim Merkezinin sabit Stellar Public Key'i olacak.
// Bu key, bu uygulamayı kullanacak her eğitim merkezi için özelleştirilecek.
// Kendi fonlanmış testnet public key'inizi buraya girin (G ile başlayan).
const AUTHORIZED_ISSUER_PUBLIC_KEY = "GDZC4B66Z5AZ2ZTMSDLNQ5N3HITJPZ4UDNUZ4MURK5P73EUORXREFBFX"; // <<<< BURAYA KENDİ EĞİTİM MERKEZİ PUBLIC KEY'İNİ GİRİN!
                                                     // Bu, daha önce kullandığınız ISSUER_SECRET_KEY'e ait public key olmalı.
const HORIZON_SERVER = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
// --- YAPILANDIRMA SONU ---

function App() {
  const [certName, setCertName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [certDetails, setCertDetails] = useState('');
  const [mintResult, setMintResult] = useState('');

  const [verifyCertId, setVerifyCertId] = useState('');
  const [verifyResult, setVerifyResult] = useState('');

  const [connectedPublicKey, setConnectedPublicKey] = useState(''); // Bağlı kullanıcının public key'i
  const [isAuthorizedIssuer, setIsAuthorizedIssuer] = useState(false); // Bağlı kullanıcının yetkili basıcı olup olmadığı

  // Uygulama yüklendiğinde Freighter bağlantısını ve yetkilendirmeyi kontrol et
  useEffect(() => {
    async function checkFreighterConnection() {
      const connected = await isConnected();
      if (connected) {
        const connected = await freighterApi.get();
        setConnectedPublicKey(pk);
        // Bağlı public key'in yetkili basıcı public key'i olup olmadığını kontrol et
        setIsAuthorizedIssuer(pk === AUTHORIZED_ISSUER_PUBLIC_KEY);
      } else {
        setConnectedPublicKey('');
        setIsAuthorizedIssuer(false);
      }
    }
    checkFreighterConnection();

    // Opsiyonel: Public Key değiştiğinde durumu tekrar kontrol etmek için
    // getPublicKey() bir event listener sağlamaz, bu nedenle periyodik kontrol veya
    // cüzdan bağlantı/kesme fonksiyonları içinde güncellemeyi tercih ederiz.
  }, []);

  // Freighter'a bağlanma fonksiyonu
  const connectFreighter = async () => {
    try {
      const pk = await freighterApi.get();
      setConnectedPublicKey(pk);
      setIsAuthorizedIssuer(pk === AUTHORIZED_ISSUER_PUBLIC_KEY); // Yetkilendirmeyi kontrol et
      alert('Freighter bağlandı! Public Key: ' + pk);
      if (pk !== AUTHORIZED_ISSUER_PUBLIC_KEY) {
        alert('Uyarı: Bağlanan hesap yetkili sertifika basıcı hesap değil. Sertifika oluşturamazsınız.');
      }
    } catch (error) {
      console.error('Freighter bağlanırken hata:', error);
      alert('Freighter bağlanırken hata oluştu. Lütfen Freighter uygulamasının açık ve hesabınızın seçili olduğundan emin olun.');
    }
  };

  // Freighter bağlantısını kesme fonksiyonu
  const disconnectFreighter = () => {
    setConnectedPublicKey('');
    setIsAuthorizedIssuer(false);
    alert('Freighter bağlantısı kesildi.');
  };

  const handleMintCertificate = async (e) => {
    const signedTransaction = await freighterApi.signTransaction({
      transactionXDR: transaction.toXDR(),
      network: 'testnet',
    });
    e.preventDefault();
    setMintResult('Sertifika oluşturuluyor...');

    // Kullanıcı yetkili basıcı hesaba bağlı mı kontrol et
    if (!isAuthorizedIssuer || !connectedPublicKey) {
      setMintResult('Sertifika oluşturmak için yetkili eğitim merkezi hesabına bağlı olmalısınız.');
      return;
    }

    if (!certName || !recipientAddress || !certDetails) {
      setMintResult('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      const certificateId = `cert_${Date.now()}`;
      const certData = {
        name: certName,
        recipient: recipientAddress,
        details: certDetails,
        issuer: AUTHORIZED_ISSUER_PUBLIC_KEY, // Issuer, her zaman sabit olan eğitim merkezi PK'si
        issuedAt: new Date().toISOString()
      };

      const certDataJsonString = JSON.stringify(certData);
      const encoder = new TextEncoder();
      const data = encoder.encode(certDataJsonString);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const certDataValueToSave = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Source account artık bağlı olan yetkili public key (Freighter'dan gelen)
      const sourceAccount = await HORIZON_SERVER.loadAccount(connectedPublicKey);

      const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: "100000",
        networkPassphrase: StellarSdk.Networks.TESTNET
      })
        .addOperation(StellarSdk.Operation.manageData({
          name: `cert:${certificateId}`,
          value: certDataValueToSave
        }))
        .setTimeout(30)
        .build();

      // İşlemi bağlı olan Freighter cüzdanıyla imzala
      const signedTransaction = await signTransaction({
        transactionXDR: transaction.toXDR(),
        network: 'testnet',
      });

      // İmzalanan işlemi Horizon'a gönder
      await HORIZON_SERVER.submitTransaction(signedTransaction);

      setMintResult(`Sertifika başarıyla oluşturuldu! ID: ${certificateId}. Kaydedilen hash: ${certDataValueToSave}. İşlem tamamlandı.`);
      setCertName('');
      setRecipientAddress('');
      setCertDetails('');

    } catch (error) {
      console.error('Sertifika oluşturulurken hata:', error);
      if (error.message.includes('User rejected the transaction')) {
        setMintResult('İşlem kullanıcı tarafından reddedildi.');
      } else if (error.message.includes('not found')) {
        setMintResult('Bağlı hesap bulunamadı veya fonlanmadı. Lütfen Freighter\'daki hesabınızın testnet üzerinde fonlandığından emin olun.');
      } else if (error.message.includes('op_malformed')) { // Genel bir hata mesajı olabilir, daha spesifik hale getirilebilir
         setMintResult(`İşlem hatası (geçersiz veri veya format). Lütfen console'a bakın: ${error.message}`);
      }
      else {
        setMintResult(`Hata oluştu: ${error.message || error}. Lütfen console'a bakın.`);
      }
    }
  };

  const handleVerifyCertificate = async (e) => {
    e.preventDefault();
    setVerifyResult('Sertifika doğrulanıyor...');

    if (!verifyCertId) {
      setVerifyResult('Lütfen sertifika ID\'sini girin.');
      return;
    }

    try {
      // Doğrulama her zaman AUTHORIZED_ISSUER_PUBLIC_KEY üzerinden yapılmalı.
      // Çünkü tüm sertifikalar bu anahtar adına basılıyor.
      const account = await HORIZON_SERVER.loadAccount(AUTHORIZED_ISSUER_PUBLIC_KEY);
      const dataKey = `cert:${verifyCertId}`;
      const certDataHashOnChain = account.data_attr[dataKey];

      if (certDataHashOnChain) {
        setVerifyResult(
          <div>
            <p><strong>Sertifika Doğrulandı!</strong></p>
            <p>Zincirde bulunan hash: {certDataHashOnChain}</p>
            <p>Sertifikayı Veren Kurum: {AUTHORIZED_ISSUER_PUBLIC_KEY}</p>
            <p>Doğrulamak için orijinal sertifika detaylarını girmelisiniz ve hash'i karşılaştırmalısınız.</p>
          </div>
        );
      } else {
        setVerifyResult('Bu ID ile bir sertifika bulunamadı.');
      }
    } catch (error) {
      console.error('Sertifika doğrulanırken hata:', error);
      setVerifyResult(`Hata oluştu: ${error.message || error}. Lütfen console'a bakın.`);
    }
  };

  return (
    <div className="App">
      <h1>StellarCertify - Eğitim Merkezi</h1>

      {/* Freighter Bağlantı Durumu ve Butonları */}
      <div className="freighter-status">
        {connectedPublicKey ? (
          <p>
            Freighter Bağlı: <strong>{connectedPublicKey.substring(0, 10)}...{connectedPublicKey.substring(connectedPublicKey.length - 10)}</strong>
            {isAuthorizedIssuer ? <span style={{ color: 'green', marginLeft: '10px' }}>(Yetkili Kurum)</span> : <span style={{ color: 'red', marginLeft: '10px' }}>(Yetkili Değil)</span>}
          </p>
        ) : (
          <p>Freighter bağlı değil.</p>
        )}
        {connectedPublicKey ? ( // Bağlıysa bağlantıyı kes butonu göster
          <button onClick={disconnectFreighter}>Bağlantıyı Kes</button>
        ) : ( // Bağlı değilse bağlan butonu göster
          <button onClick={connectFreighter}>Freighter Bağla</button>
        )}
      </div>

      <div className="section">
        <h2>Yeni Sertifika Oluştur</h2>
        <form onSubmit={handleMintCertificate}>
          <div className="form-group">
            <label htmlFor="certName">Sertifika Adı:</label>
            <input
              type="text"
              id="certName"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
              placeholder="Örn: Blockchain Geliştirme Kursu"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="recipientAddress">Kursiyer Stellar Adresi:</label>
            <input
              type="text"
              id="recipientAddress"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="Örn: GABCDE...XYZ (Kursiyerin public key'i)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="certDetails">Detaylar/Açıklama:</label>
            <textarea
              id="certDetails"
              value={certDetails}
              onChange={(e) => setCertDetails(e.target.value)}
              placeholder="Sertifika ile ilgili detaylı bilgi"
              rows={4}
              required
            ></textarea>
          </div>
          {/* Sadece yetkili kullanıcı bağlıysa butonu aktif yap */}
          <button type="submit" disabled={!isAuthorizedIssuer}>Sertifika Oluştur</button>
        </form>
        {mintResult && <p className="result-message">{mintResult}</p>}
      </div>

      <hr />

      <div className="section">
        <h2>Sertifika Doğrula</h2>
        <form onSubmit={handleVerifyCertificate}>
          <div className="form-group">
            <label htmlFor="verifyCertId">Sertifika ID'si:</label>
            <input
              type="text"
              id="verifyCertId"
              value={verifyCertId}
              onChange={(e) => setVerifyCertId(e.target.value)}
              placeholder="Örn: cert_1678888888888"
              required
            />
          </div>
          <button type="submit">Sertifikayı Doğrula</button>
        </form>
        {verifyResult && <div className="result-message">{verifyResult}</div>}
      </div>
    </div>
  );
}

export default App;