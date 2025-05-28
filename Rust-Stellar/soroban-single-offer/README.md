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

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Bir **Pull Request** göndererek katkıda bulunabilir veya bir **Issue** açarak önerilerinizi paylaşabilirsiniz.
