# 🚀 StellarCertify: Blockchain Destekli Dijital Sertifika Sistemi

## 🌟 Proje Hakkında  
**StellarCertify**, eğitim kurumları veya yetkili kuruluşlar için geliştirilmiş, Stellar Blockchain üzerinde çalışan yenilikçi bir dijital sertifika basma ve doğrulama çözümüdür.  
Bu sistem, geleneksel kağıt tabanlı sertifikaların kopyalanabilirliği ve doğrulanabilirlik zorluklarını aşarak, sertifikalara değişmezlik ve şeffaflık kazandırır.

Uygulama, sertifika detaylarını doğrudan blockchain'e yazmak yerine, bu detayların **kriptografik özetini (hash)** Stellar ağına kaydeder. Böylece hem zincirdeki veri boyutu azalır hem de sertifikaların doğruluğu anında kontrol edilebilir.

---

## ✨ Temel Özellikler

- **Güvenli Sertifika Basımı:** Eğitim merkezinin yetkili Stellar hesabı ile blockchain'e güvenli kayıt. `ISSUER_SECRET_KEY`'in koda gömülmesine gerek yoktur.
- **Değişmez Veri Kaydı:** Sertifika verileri, SHA256 hash olarak Stellar ağına kaydedilir.
- **Kolay Doğrulama:** Sertifika ID'si ile zincirdeki hash'e ulaşarak doğrulama yapılabilir.
- **Freighter Cüzdan Entegrasyonu:** Tarayıcı tabanlı, kullanıcı dostu işlem imzalama.
- **Testnet Üzerinde Geliştirme:** Gerçek para veya ağ riski olmadan test imkanı.

---

## 🛠️ Kullanılan Teknolojiler

- **React:** Modern kullanıcı arayüzü.
- **Stellar SDK:** Stellar ağıyla etkileşim.
- **Freighter API (@stellar/freighter-api):** Freighter cüzdan entegrasyonu.
- **Vite:** Hızlı frontend geliştirme deneyimi.
- **JavaScript (ES6+):** Uygulama mantığı.
- **CSS:** Stil ve tasarım.

---

## ⚙️ Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm
- Tarayıcıda Freighter eklentisi kurulu olmalı
- Testnet’te fonlanmış bir Stellar hesabı (Friendly Gainer kullanılabilir)

### Başlatmak İçin

```bash
git clone https://github.com/demirmelekhan/Egitim-WEB3/tree/489dabf3cbb113fe678425f2a9d6c2defc9238ba/Rust-Stellar/stellarcertify
cd StellarCertify
npm install
npm run dev

💡 Nasıl Kullanılır?
🎓 Sertifika Basımı (Eğitim Merkezi Yöneticisi)
"Freighter Bağla" butonuna tıklayın.

Freighter cüzdanınızda AUTHORIZED_ISSUER_PUBLIC_KEY’e ait hesabın seçili ve fonlanmış olduğundan emin olun.

Bağlantı sağlandığında sistem, hesabınızın yetkili olup olmadığını gösterir.

"Yeni Sertifika Oluştur" formunu doldurun. Alıcının Stellar Public Key’ini girin.

"Sertifika Oluştur" butonuna tıklayın, Freighter imza penceresini onaylayın.

Oluşturulan sertifika ID’si ve hash bilgisi ekranda ve konsolda görünür.

🔍 Sertifika Doğrulama (Herkes İçin)
"Sertifika Doğrula" sekmesine gidin.

Sertifika ID'sini girin.

"Sertifikayı Doğrula" butonuna tıklayın.

Sistem, Stellar blockchain’den hash’i çeker ve doğrulama sonucunu gösterir.

🛣️ Gelecek Geliştirmeler
🔐 Tam Doğrulama: Orijinal sertifika detayları girilerek hash karşılaştırması yapılması.

🧬 IPFS Entegrasyonu: Sertifika verilerini IPFS'de saklama, zincirde yalnızca CID tutma.

👤 Kimlik Doğrulama: Eğitim kurumu yöneticileri için gelişmiş doğrulama (ör. backend destekli).

🎨 UI/UX İyileştirmeleri: Daha modern, sezgisel arayüz tasarımı.

❗ Hata Yönetimi: Daha açıklayıcı kullanıcıya özel hata mesajları.