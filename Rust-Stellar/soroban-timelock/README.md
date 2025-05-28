# Timelock Claimable Balance Contract

Bu proje, Stellar blok zinciri üzerinde çalışan **Soroban** platformunda geliştirilmiş, zaman kilitli (timelock) bir **talep edilebilir bakiye (Claimable Balance)** akıllı sözleşmesidir. Kullanıcılara, belirli zaman koşulları altında başkaları tarafından talep edilebilecek token bakiyelerini güvenli ve programlanabilir bir şekilde depolama imkanı sunar.

---

## Projeye Genel Bakış

Bu Timelock Claimable Balance sözleşmesi, esnek zaman kısıtlamalarıyla token'ların yönetimini sağlayan güçlü bir araçtır. Sözleşme, belirli bir zaman dilimi içinde veya belirli bir zaman diliminden sonra token'ların talep edilmesini sağlayarak çeşitli kullanım senaryolarına olanak tanır.

---

## Özellikler

- **Zaman Kısıtlamalı Token Depozitosu:** Belirli bir zaman koşuluyla token'ları sözleşmeye yatırabilirsiniz.
- **Çoklu Talep Edenler (Claimants):** Her bir depozito için birden fazla talepçi adresi belirleyebilir, token'ların kimler tarafından talep edilebileceği üzerinde hassas kontrol sağlayabilirsiniz.
- **Esnek Zaman Koşulları:**
  - **Before (Önce):** Token'lar yalnızca belirtilen bir zaman damgasından önce talep edilebilir.
  - **After (Sonra):** Token'lar yalnızca belirtilen bir zaman damgasından sonra talep edilebilir.
- **Güvenli Yetkilendirme Kontrolleri:** Sözleşme çağrıları için sağlam yetkilendirme mekanizmaları içerir.
- **Tek Seferlik Başlatma:** Sözleşme, güvenlik ve tutarlılık sağlamak amacıyla yalnızca bir kez başlatılabilir.

---

## Sözleşme Yapısı

Proje, okunabilirliği ve bakımı kolaylaştırmak için aşağıdaki mantıksal modüllerden oluşmaktadır:

- `lib.rs`: Sözleşmenin ana giriş noktası, temel veri yapıları ve diğer modüllerin entegrasyonu.
- `storage_types.rs`: Sözleşmenin depolama anahtarları (`DataKey`) ve karmaşık veri yapıları (`TimeBoundKind`, `TimeBound`, `ClaimableBalance`) tanımlarını içerir.

---

## Teknik Detaylar

Sözleşme, **Rust** programlama dilinde yazılmış olup, `#![no_std]` direktifi kullanılarak standart kütüphane bağımlılıkları olmadan derlenmiştir. Bu yaklaşım, sözleşmenin daha küçük boyutta olmasını ve blockchain ortamlarında daha verimli çalışmasını sağlar.

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

## Kurulum ve Çalıştırma

Bu projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

1.  **Rust ve Cargo Kurulumu:**
    Rustup aracılığıyla Rust ve Cargo'yu yükleyin: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
2.  **Soroban CLI Kurulumu:**
    `cargo install --locked soroban-cli@22.6.0 --features opt` 
3.  **Projeyi Klonlama:**
    ```bash
         git clone [https://github.com/demirmelekhan/Egitim-WEB3.git](https://github.com/demirmelekhan/Egitim-WEB3.git) 
         cd Egitim-WEB3
         cd Rust-Stellar/soroban-timelock
    ```
4.  **Bağımlılıkları Kurma ve Kontrol Etme:**
    ```bash
        cargo check
    ```
    Bu komut, gerekli tüm Rust bağımlılıklarını indirecek ve projenin derlenip derlenemeyeceğini kontrol edecektir. Ayrıca, `Cargo.lock` dosyasını otomatik olarak oluşturacaktır.

5.  **Sözleşmeyi Derleme:**
    ```bash
        cargo build --release
    ```
    Bu komut, optimize edilmiş bir WebAssembly (WASM) çıktısı oluşturacaktır (`target/wasm32-unknown-unknown/release/soroban_token_contract.wasm`).

---

## Katkıda Bulunma

Katkılarınızı memnuniyetle karşılarım! Sorularınız veya önerileriniz için lütfen bir `Issue` açın veya bir `Pull Request` gönderin.

---

## İletişim

* **Geliştirici:** demirmelekhan
* **GitHub:** [[demirmelekhan](https://github.com/demirmelekhan)] (örneğin: `https://github.com/demirmelekhan`)