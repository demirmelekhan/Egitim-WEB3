import React, { useState, useEffect, useRef } from 'react';
import { useSorobanReact } from '@soroban-react/core';
import { signTransaction } from '@stellar/freighter-api';

// Stellar SDK'dan gerekli tüm import'ları yapıyoruz.
// Contract, TransactionBuilder, Networks, xdr, Address, scValToNative gibi elemanlar buradan geliyor.
import { Contract, TransactionBuilder, Networks, xdr, Address, scValToNative, Account, Operation } from '@stellar/stellar-sdk';

// Kendi deploy edilmiş Soroban Token Kontratınızın ID'si
const CERTIFICATE_TOKEN_CONTRACT_ID = "CALKIQEBT5USWWG4EMN7B2FY4INXGSFYOR7PNSVX4GTGOAUCTDVSRUDS";

// Network ayarları
const NETWORK_PASSPHRASE = Networks.TESTNET; // Testnet ağını kullanıyoruz

// Horizon ve RPC URL'leri, Testnet'e göre güncellendi.
const HORIZON_URL = "https://horizon-testnet.stellar.org/"; // Testnet Horizon URL'i
const SOROBAN_RPC_URL = "https://soroban-testnet.stellar.org/"; // Testnet Soroban RPC URL'i

const contract = new Contract(CERTIFICATE_TOKEN_CONTRACT_ID);

export function IssueCertificateForm() {
 

  // useSorobanReact hook'undan cüzdan adresi, aktif zincir, sunucu ve işlem gönderme fonksiyonlarını alıyoruz.
  const { address, activeChain, server, signAndSendTransaction } = useSorobanReact();


     useEffect(() => { // BURASI 1. SIRADA
          console.log("IssueCertificateForm - address:", address); // Burada 'address' kullanılıyor
          console.log("IssueCertificateForm - server objesi:", server);
          console.log("IssueCertificateForm - signAndSendTransaction tipi:", typeof signAndSendTransaction);
          console.log("IssueCertificateForm - signAndSendTransaction değeri:", signAndSendTransaction);
      }, [address, server, signAndSendTransaction]);


  const [recipientPublicKey, setRecipientPublicKey] = useState('');
  const [tokenDecimals, setTokenDecimals] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Kontratın ondalık basamak sayısını çekmek için useEffect kullanıyoruz.
  useEffect(() => {
    // server ve address hazır değilse veya kontrat ID'si varsayılan değerdeyse işlemi yapma.
    if (!server || !address || CERTIFICATE_TOKEN_CONTRACT_ID === "YOUR_DEPLOYED_TOKEN_CONTRACT_ID_HERE") {
        console.warn("Server, address veya CERTIFICATE_TOKEN_CONTRACT_ID hazır değil. Decimals çekilemiyor.");
        return;
    }
  

    async function fetchTokenDecimals() {
      try {
        // Kontratın decimals fonksiyonunu çağıran bir işlem oluştur
        const transaction = new TransactionBuilder(
            await server.getAccount(address),
            {
                fee: "100", // Simülasyon için düşük bir ücret
                //networkPassphrase: activeChain.network.networkPassphrase,
                networkPassphrase: NETWORK_PASSPHRASE,
            }
        )
           // .addOperation(contract.call("decimals", [])) // decimals fonksiyonu argüman almaz
            .addOperation(contract.call("decimals")) // Argüman listesini tamamen kaldırıyoruz
            .setTimeout(30)
            .build();

        console.log("Simülasyon için oluşturulan işlem XDR:", transaction.toXDR());

        const simulatedResult = await server.simulateTransaction(transaction);
        console.log("Simülasyon Sonucu:", simulatedResult); // Tüm simülasyon sonucunu loglayalım

        // Hata durumunu kontrol edelim
        if (simulatedResult.error) {
            console.error("Simülasyon hata objesi:", simulatedResult.error);
            throw new Error(`Simülasyon hatası: ${simulatedResult.error.message || JSON.stringify(simulatedResult.error)}`);
        }

        // 'results' yerine doğrudan 'result' property'sini kontrol ediyoruz
        if (!simulatedResult.result || !simulatedResult.result.retval) { // Buradaki kontrolü result objesi ve retval'i için yap
            console.error("Simülasyon sonucunda beklenen 'result' veya 'retval' bulunamadı.", simulatedResult);
            throw new Error("Simülasyon sonucunda geçerli bir dönüş değeri bulunamadı.");
        }

        const returnValueXDR = simulatedResult.result.retval; // Değeri buradan alıyoruz
        
        if (!returnValueXDR) {
            console.error("Simülasyon sonucunda geçerli bir dönüş değeri (retval) bulunamadı.");
            throw new Error("Simülasyon sonucunda geçerli bir dönüş değeri bulunamadı.");
        }

        const decimals = scValToNative(returnValueXDR);

        if (typeof decimals === 'number') {
            console.log("Token ondalık basamak sayısı:", decimals);
            return decimals; // Fonksiyon bu değeri döndürür
        } else {
            console.warn("Token ondalık basamak sayısı beklenen sayı formatında değil. Varsayılan 7 kullanılıyor.", decimals);
            return 7; // Hata durumunda varsayılan 7'yi kullan
        }

    } catch (error) {
        console.error("Token ondalık basamak sayısı çekilirken hata:", error);
        let displayError = error.message;
        if (error instanceof TypeError && error.message.includes("Do not know how to serialize a BigInt")) {
             displayError = "BigInt serileştirme hatası. Bu hata genellikle hata mesajının kendisi içindeki BigInt değerinden kaynaklanır ve kritik değildir.";
        }
        // setError(`Token ondalık basamak sayısı çekilirken hata: ${displayError}`); // Bu satır kaldırıldı çünkü bu fonksiyonun kendisi setError yapmamalı
        return 7; // Hata durumunda varsayılan 7'yi kullan
    }
};

    fetchTokenDecimals();
  }, [address, server, CERTIFICATE_TOKEN_CONTRACT_ID]); // Bağımlılıkları doğru bir şekilde tanımla

  // Sertifika basma işlemini yönetecek fonksiyon
  const handleIssueCertificate = async (e) => {
    e.preventDefault(); // Sayfanın yeniden yüklenmesini engelle
    setLoading(true); // Yükleme durumunu başlat
    setError(null); // Hata mesajını temizle
    setSuccessMessage(null); // Başarı mesajını temizle

    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 saniye bekle

    // Cüzdan bağlı değilse hata ver ve işlemi durdur
    if (!address) {
      setError("Cüzdan bağlı değil. Lütfen önce cüzdanınızı bağlayın.");
      setLoading(false);
      return;
    }

    // Kursiyerin public key'i girilmediyse hata ver
    if (!recipientPublicKey) {
      setError("Lütfen kursiyerin Public Key'ini girin.");
      setLoading(false);
      return;
    }

    // Geçersiz Stellar Public Key formatı kontrolü
    if (!recipientPublicKey.startsWith('G') || recipientPublicKey.length !== 56) {
        setError("Geçersiz Stellar Public Key formatı.");
        setLoading(false);
        return;
    }

    try {
      const tokenContract = new Contract(CERTIFICATE_TOKEN_CONTRACT_ID);

      // Basılacak token miktarını ondalık basamak sayısına göre ayarla (1 token basılacak)
      const amountToMintRaw = BigInt(1) * BigInt(10) ** BigInt(tokenDecimals);
      console.log("Mint edilecek ham miktar (BigInt):", amountToMintRaw.toString());

      // Alıcı adresini Stellar SDK'nın Address objesine dönüştür
      const recipientAddress = new Address(recipientPublicKey);
      const recipientScAddress = recipientAddress.toScVal(); // SCVal formatına dönüştür

      // Basılacak miktarı XDR.ScVal formatına dönüştür (U128)
      const amountScVal = xdr.ScVal.scvU128(amountToMintRaw);

      // Kontratın "mint" fonksiyonunu çağıran operasyonu oluştur
      const contractCallOperation = tokenContract.call(
        "mint", // Çağrılacak fonksiyon adı
        recipientScAddress, // Alıcı adresi
        amountScVal // Mint edilecek miktar
      );

      // İşlemi oluşturan hesabın güncel durumunu RPC sunucusundan al
      const sourceAccount = await server.getAccount(address);

      const baseFee = 100; // Başlangıç taban ücreti
      let transactionFee = baseFee; // İşlem ücreti

      let tx; // İşlem objesini tanımla

      try {
        // İşlem ücretini simüle etmek için geçici bir işlem oluştur
        const tempTx = new TransactionBuilder(sourceAccount, {
            fee: baseFee.toString(), // Başlangıç ücreti
            networkPassphrase: NETWORK_PASSPHRASE,
        })
        .addOperation(contractCallOperation)
        .setTimeout(30) // İşlem zaman aşımı
        .build();

        // İşlemi simüle et ve hazırlık sonuçlarını al
        const preparedTx = await server.prepareTransaction(tempTx);
        transactionFee = preparedTx.fee; // Simülasyon sonucu belirlenen ücreti kullan
        console.log("Hesaplanan işlem ücreti:", transactionFee);

        // Simüle edilen işlem üzerinden nihai işlemi oluştur
        tx = preparedTx;

      } catch (simError) {
        // Simülasyon hatası durumunda uyarı ver ve varsayılan ücretle devam et
        console.warn("İşlem ücreti simülasyonunda hata, varsayılan fee kullanılıyor:", simError);
        setError(`İşlem ücreti simülasyonu başarısız: ${simError.message || simError.toString()}. Lütfen konsolu kontrol edin.`);
        // Simülasyon başarısız olsa bile, işlem oluşturmayı dene (varsayılan fee ile)
        tx = new TransactionBuilder(sourceAccount, {
          fee: baseFee.toString(),
          networkPassphrase: NETWORK_PASSPHRASE,
        })
        .addOperation(contractCallOperation)
        .setTimeout(30)
        .build();
      }

      // signAndSendTransaction fonksiyonunun varlığını kontrol et
      // Bu fonksiyon useSorobanReact hook'u tarafından sağlanır ve cüzdan entegrasyonunu yönetir.
      if (typeof signAndSendTransaction !== 'function') {
        throw new Error("signAndSendTransaction fonksiyonu kullanılamıyor. useSorobanReact hook'u doğru yapılandırılmamış olabilir veya cüzdan bağlantısı eksik.");
      }

      // Oluşturulan işlemi cüzdan aracılığıyla imzala ve gönder
      const result = await signAndSendTransaction(tx);

      console.log("Token minting işlemi başarılı:", result);
      setSuccessMessage(`Sertifika token'ı başarıyla basıldı ve ${recipientPublicKey} adresine gönderildi! İşlem Hash: ${result.hash}`);
      setRecipientPublicKey(''); // Formu temizle

    } catch (e) {
      console.error("Token minting işlemi sırasında hata oluştu:", e);
      setError(`Sertifika token'ı basılırken bir hata oluştu: ${e.message || e.toString()}`);
    } finally {
      setLoading(false); // Yükleme durumunu bitir
    }
  };

  return (
    
    <div className="formContainer" style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>Sertifika Token'ı Bas</h2>
      <form onSubmit={handleIssueCertificate}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="recipientPublicKey" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Kursiyerin Stellar Public Key'i:
          </label>
          <p style={{ marginTop: '10px', color: address ? 'green' : 'red' }}>
            Cüzdan Durumu: {address ? `Bağlı: ${address}` : 'Bağlı Değil'}
          </p>
          <input
            type="text"
            id="recipientPublicKey"
            value={recipientPublicKey}
            onChange={(e) => setRecipientPublicKey(e.target.value)}
            placeholder="GXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
            required
            pattern="G[0-9A-Z]{55}"
            title="Geçerli bir Stellar Public Key girin (G ile başlar, 56 karakter)."
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !address} // Cüzdan bağlı değilse veya yükleme durumundaysa butonu devre dışı bırak
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: loading || !address ? 'not-allowed' : 'pointer',
            backgroundColor: loading || !address ? '#cccccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          {loading ? 'Token Basılıyor...' : 'Token Bas'}
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>Hata: {error}</p>}
      {successMessage && <p style={{ color: 'green', marginTop: '15px' }}>Başarılı: {successMessage}</p>}
    </div>
 
);
}