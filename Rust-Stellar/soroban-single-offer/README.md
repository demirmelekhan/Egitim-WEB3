# Teklif Bazlı Token Takas Sözleşmesi (Single Offer Token Exchange)

Bu akıllı sözleşme, Stellar blok zinciri üzerindeki **Soroban** platformu kullanılarak geliştirilmiştir ve bir satıcı ile birden fazla alıcı arasında token çiftleri arasında ticaret yapılmasını sağlar.

---

## Genel Bakış

Bu sözleşme, bir satıcının belirli bir fiyat oranıyla token takası için teklif oluşturabildiği basit ama etkili bir token takas mekanizması uygular. Birden fazla alıcı, karmaşık emir eşleştirme veya borsa mantığına ihtiyaç duymadan bu teklif ile işlem yapabilir.

---

## Özellikler

- **Tek Satıcı Modeli:** Bir satıcı, birden fazla alıcının işlem yapabileceği bir teklif oluşturabilir.
- **Sabit Fiyat Oranı:** Takaslar, önceden belirlenen bir fiyat oranı üzerinden gerçekleştirilir.
- **Minimum Miktar Koruması:** Alıcılar, alacakları minimum token miktarını belirleyebilir.
- **Fiyat Güncellemeleri:** Satıcı, gerektiğinde fiyat oranını güncelleyebilir.
- **Geri Çekme Fonksiyonu:** Satıcı, sözleşmede bulunan tokenları geri çekebilir.

---

## Sözleşme Yapısı

### Veri Yapıları

- **DataKey:** Sözleşmede kullanılan depolama anahtarlarını tanımlar.
- **Offer (Teklif):** Takas teklifiyle ilgili tüm bilgileri içerir:

  - `seller`: Satıcının adresi  
  - `sell_token`: Satılan token'ın adresi  
  - `buy_token`: Alınacak token'ın adresi  
  - `sell_price`: Satış fiyatı (birim token başına)  
  - `buy_price`: Alış fiyatı (birim token başına)  

---

## Teknik Detaylar

- Stellar’ın akıllı sözleşme platformu için geliştirilen **Soroban SDK** kullanılarak inşa edilmiştir.
- `#![no_std]` kullanılarak standart kütüphanelere bağlı olmadan derlenmiştir, bu da blok zinciri ortamlarında daha verimli çalışmasını sağlar.
- Rust’ın güçlü tip sistemiyle güvenli ve güvenilir bir yapı sunar.
- Basit ve tek bir teklif durumu içeren saklama modeli kullanır.

---

## Deploy işlemi

demir@demirmelekhan:/mnt/c/Users/demir/github/Egitim-WEB3/Rust-Stellar/soroban-single-offer$ stellar contract deploy \
  --wasm target/wasm32v1-none/release/soroban_single_of
fer.wasm \
  --source melek \
  --network testnet \
  --alias soroban-single-offer
ℹ️ Simulating install transaction…
ℹ️ Signing transaction: 1cadece1141eecbe5ed17e0f626d779b06f609c21a64d9494af8f4e116bb6534
🌎 Submitting install transaction…
ℹ️ Using wasm hash 1f5dc811561df2d67fb1fd176ff1ad9f1a9b5c3595ca6d190cc9fef7551e9d4f
ℹ️ Simulating deploy transaction…
ℹ️ Transaction hash is 7287dea1126e5fb00fd7f8aa38150a5b3fc111233dae98d60b23e184a55b13fb
🔗 https://stellar.expert/explorer/testnet/tx/7287dea1126e5fb00fd7f8aa38150a5b3fc111233dae98d60b23e184a55b13fb
ℹ️ Signing transaction: 7287dea1126e5fb00fd7f8aa38150a5b3fc111233dae98d60b23e184a55b13fb
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CCN6R3EVY3B4ULHUDW3UMOLFWYL3BOCC2KYLZQF766BH2BSAIVAAODIO
✅ Deployed!
CCN6R3EVY3B4ULHUDW3UMOLFWYL3BOCC2KYLZQF766BH2BSAIVAAODIO