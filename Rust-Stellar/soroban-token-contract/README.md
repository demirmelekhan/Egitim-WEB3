# Soroban Token Sözleşmesi 

Bu proje, Stellar blok zinciri üzerinde çalışan **Soroban** platformunda geliştirilmiş standart bir token sözleşmesidir. [Bu, öğrenme amaçlı oluşturulmuş temel bir token sözleşmesi uygulamasıdır]

---

## Projeye Genel Bakış

Bu Soroban Token Sözleşmesi, temel token işlevselliğini sunan kapsamlı bir akıllı sözleşmedir. Bu sözleşmeyle, token oluşturma (mint), transfer etme, yakma (burn) ve üçüncü taraf harcama yetkilendirme gibi standart token işlemlerini gerçekleştirebilirsiniz.

### Özellikler

* **Token Yönetimi:** Token basma (mint), yakma (burn) ve transfer işlemleri.
* **Yetkilendirme:** Üçüncü taraf harcamaları için izin (allowance) mekanizması.
* **Yönetici Kontrolü:** Yönetici (admin) atama ve yönetici izni gerektiren işlemler.
* **Meta Veri:** Token adı, sembolü ve ondalık hassasiyet bilgileri.

---

## Sözleşme Yapısı

Proje aşağıdaki mantıksal modüllerden oluşmaktadır:

* **`lib.rs`**: Sözleşmenin ana giriş noktası ve diğer modüllerin entegrasyonu.
* **`admin.rs`**: Yöneticiye özel işlevler ve yetkilendirmeler.
* **`allowance.rs`**: Token harcama izinlerinin yönetimi.
* **`balance.rs`**: Bakiye yönetimi ve sorgulama işlemleri.
* **`contract.rs`**: Ana sözleşme uygulamasını ve token arayüzünü içerir.
* **`metadata.rs`**: Token'ın statik meta verileri (ad, sembol, ondalık basamaklar) için işlevler.
* **`storage_types.rs`**: Sözleşmenin depolama veri yapılarını tanımlar.

---

## Teknik Detaylar

Sözleşme, Rust programlama dilinde yazılmış olup, `#![no_std]` direktifi kullanılarak standart kütüphane bağımlılıkları olmadan derlenmiştir. Bu yaklaşım, sözleşmenin daha küçük boyutta olmasını ve daha verimli çalışmasını sağlar.

### Önemli Fonksiyonlar

**Token Yönetimi**

* `mint`: Yeni token oluşturur (yalnızca yönetici).
* `burn`: Tokenları yakar.
* `transfer`: Tokenları adresler arasında transfer eder.
* `balance`: Belirli bir adresin token bakiyesini görüntüler.

**Harcama İzni Yönetimi (Allowance)**

* `approve`: Başka bir adrese belirli bir miktarda token harcama izni verir.
* `allowance`: Verilen izin miktarını görüntüler.
* `transfer_from`: İzinle başkasının adına token transferi yapar.
* `burn_from`: İzinle başkasının adına token yakar.

**Yönetici İşlemleri**

* `initialize`: Sözleşmeyi ilk kez başlatır ve başlangıç ayarlarını yapar.
* `set_admin`: Yönetici adresini değiştirir.

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
         cd Rust-Stellar/soroban-token-contract
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