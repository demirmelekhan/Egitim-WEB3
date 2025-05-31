# Atomik Takas Sözleşmesi

Soroban platformu üzerinde geliştirilmiş, iki taraf arasında güvene dayanmayan (trustless) atomik token takasını mümkün kılan akıllı sözleşme.

---

## Projeye Genel Bakış

Bu akıllı sözleşme, iki taraf arasında atomik (bölünemez) token takasını kolaylaştırır. En önemli özelliği, tarafların birbirini tanımasına veya güvenmesine gerek olmamasıdır. İşlem tamamen ya gerçekleşir ya da hiç gerçekleşmez; böylece taraflar arasında karşı taraf riski (counterparty risk) ortadan kalkar.

---

## Özellikler

- **Güvene Dayanmayan Takas:** Tarafların birbirini tanımasına gerek yoktur.
- **Atomik İşlem:** Tüm işlem başarıyla gerçekleşir ya da hiç gerçekleşmez.
- **Minimum Fiyat Koruması:** Taraflar, alacakları minimum token miktarını belirleyebilir.
- **İade Mekanizması:** Fazladan gönderilen token'lar otomatik olarak geri iade edilir.
- **Esnek İmza Sistemi:** İmzalar zincir dışı eşleştirilebilir, bu da esneklik sağlar.

---

## Sözleşme Yapısı

` swap Fonksiyonu`
 `move_token Yardımcı Fonksiyonu` -Göndericiden sözleşmeye token transferi -Alıcıya belirlenen miktarda token transferi -Fazla gönderilen token varsa, bunların göndericiye iadesi

---

## Teknik Detaylar

Soroban SDK ile geliştirilmiştir (Stellar akıllı sözleşme platformu).
#![no_std] kullanılarak, blokzincir ortamına uygun hafiflikte tasarlanmıştır.
Rust dilinin güçlü tip sistemi ile güvenli ve hatasız geliştirme yapılır.
Simetrik yapı sayesinde imzalar zincir dışında da eşleştirilebilir.

---

## Önemli Veri Yapıları

- **DataKey:** Sözleşme depolamasında kullanılan anahtarları tanımlar (örneğin, sözleşmenin başlatılıp başlatılmadığı veya talep edilebilir bakiye bilgileri için).
- **TimeBoundKind:** Zaman kısıtlamasının türünü belirler (`Before` veya `After`).
- **TimeBound:** Bir zaman kısıtlamasının türünü (`kind`) ve ilişkili zaman damgasını (`timestamp`) bir araya getirir.
- **ClaimableBalance:** Her bir talep edilebilir bakiyenin tüm ayrıntılarını içerir (ilgili token adresi, miktar, token'ları talep edebilecek `claimants` listesi ve `time_bound` koşulu).

---

## Önemli Fonksiyonlar

- `initialize`: Sözleşmeyi ilk kez başlatır ve gerekli başlangıç ayarlarını yapar.
- `deposit`: Belirtilen token miktarını, tanımlanmış talep edenler ve zaman koşullarıyla birlikte sözleşmeye yatırır.
- `claim`: Bir talepçi adresinin, belirlenen koşullar altında kendisine ait olan bir bakiyeyi talep etmesini sağlar.
- `get_balance`: Belirli bir claim ID'sine ait `ClaimableBalance` detaylarını sorgular.

---

## Nasıl Çalışır?

✅ Ön Koşul Kontrolleri:
amount_b ≥ min_b_for_a kontrolü ile kullanıcı A'nın minimum beklentisi karşılanıyor mu?

amount_a ≥ min_a_for_b kontrolü ile kullanıcı B'nin minimum beklentisi karşılanıyor mu?

🔐 Yetkilendirme:
Her iki tarafın da işlemi onaylaması (imzalaması) gerekir.

Simetrik yapı sayesinde, imzalar esnek şekilde eşleştirilebilir.

💱 Token Takası:
Token A, kullanıcı A’dan kullanıcı B’ye aktarılır.

Token B, kullanıcı B’den kullanıcı A’ya aktarılır.

Eğer fazlalık varsa, iade edilir.


---

## Deploy Çıktısı
demir@demirmelekhan:/mnt/c/Users/demir/github/Egitim-WEB3/Rust-Stellar/soroban-atomic-swap$ stellar contract deploy \
  --wasm target/wasm32v1-none/release/soroban_atomic_swap.wasm \
  --source melek \
  --network testnet \
  --alias soroban-atomic-swap
ℹ️  Simulating install transaction…
ℹ️  Signing transaction: 4bb8d58b8fd65b8e9f2157caeebc8f59de886ea14c8f25fc3f9e845e4bc4ddb1
🌎 Submitting install transaction…
ℹ️  Using wasm hash e7b14c2629b05cfc0a035f71191367a060b2901adb1f21243a1b184399677666
ℹ️  Simulating deploy transaction…
ℹ️  Transaction hash is 78c949c69c244eb96445de7e31bf39d007d9a702d260890d35cb406c3f540fea
🔗 https://stellar.expert/explorer/testnet/tx/78c949c69c244eb96445de7e31bf39d007d9a702d260890d35cb406c3f540fea
ℹ️  Signing transaction: 78c949c69c244eb96445de7e31bf39d007d9a702d260890d35cb406c3f540fea
🌎 Submitting deploy transaction…
🔗 https://stellar.expert/explorer/testnet/contract/CCAGHRZGS37QOCQONL6XH7ERPYK6JSWQQADKDN5IFXQZ7G7YTIKG4Y32
✅ Deployed!
CCAGHRZGS37QOCQONL6XH7ERPYK6JSWQQADKDN5IFXQZ7G7YTIKG4Y32

---

## İletişim

* **Geliştirici:** demirmelekhan
* **GitHub:** [[demirmelekhan](https://github.com/demirmelekhan)] 