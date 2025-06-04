#🚀 StellarCertify: Blockchain Destekli Dijital Sertifika Sistemi
##🌟 Proje Hakkında
StellarCertify, eğitim kurumları veya yetkili kuruluşlar için geliştirilmiş, Stellar Blockchain üzerinde çalışan yenilikçi bir dijital sertifika basma ve doğrulama çözümüdür. Bu sistem, geleneksel kağıt tabanlı sertifikaların kopyalanabilirliği ve doğrulanabilirlik zorluklarını aşarak, sertifikalara değişmezlik ve şeffaflık kazandırır.

Uygulama, sertifika detaylarını doğrudan blockchain'e yazmak yerine, bu detayların kriptografik özetini (hash'ini) Stellar ağına kaydeder. Bu sayede hem zincirdeki veri boyutu minimize edilir hem de sertifikaların orijinal olup olmadığı, sadece sertifika ID'si ve orijinal detaylar kullanılarak anında doğrulanabilir.

##✨ Temel Özellikler
Güvenli Sertifika Basımı: Eğitim merkezinin yetkili Stellar hesabı (Freighter cüzdanı aracılığıyla) aracılığıyla sertifikaların blockchain'e güvenli bir şekilde kaydedilmesi. ISSUER_SECRET_KEY'in koda gömülmesine gerek kalmaz.
Değişmez Veri Kaydı: Her sertifika verisinin SHA256 hash'i olarak Stellar ağına kaydedilmesiyle, verilerin sonradan değiştirilemezliğinin sağlanması.
Kolay Doğrulama: Sertifika ID'si üzerinden Stellar blockchain'inden ilgili hash'in çekilmesi ve sertifikanın varlığının doğrulanması. (Gelecekte tam detay karşılaştırması eklenebilir.)
Freighter Cüzdan Entegrasyonu: Kullanıcı dostu ve güvenli işlem imzalama deneyimi için Stellar'ın popüler tarayıcı cüzdanı Freighter ile entegrasyon.
Testnet Üzerinde Geliştirme: Risk almadan testler yapabilmek için Stellar Testnet ortamının kullanılması.
##🛠️ Teknolojiler
*React:* Kullanıcı arayüzü geliştirmesi için hızlı ve modern JavaScript kütüphanesi.
*Stellar SDK:* Stellar blockchain'i ile etkileşim kurmak için resmi JavaScript SDK'sı.
Freighter API (@stellar/freighter-api): Tarayıcı tabanlı cüzdan entegrasyonu için Stellar'ın Freighter eklentisi API'si.
*Vite:* Hızlı geliştirme deneyimi sağlayan yeni nesil frontend build aracı.
JavaScript (ES6+): Uygulama mantığı için programlama dili.
*CSS:* Uygulamanın stil ve tasarımı için.
##🚀 Kurulum ve Çalıştırma
Projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin:

##Ön Gereksinimler
Node.js (v14 veya üzeri önerilir)
npm (Node.js ile birlikte gelir)
Tarayıcınızda Freighter tarayıcı eklentisi kurulu olmalı.
Freighter cüzdanınızda Testnet ağına bağlı, fonlanmış bir Stellar hesabı bulunmalı. Bu hesap, AUTHORIZED_ISSUER_PUBLIC_KEY olarak koda gireceğiniz hesaptır. Friendly Gainer ile fonlayabilirsiniz.

##💡 Nasıl Kullanılır?
Sertifika Basımı (Eğitim Merkezi Yöneticisi İçin)
Uygulama arayüzünde "Freighter Bağla" butonuna tıklayın.
Freighter eklentinizde AUTHORIZED_ISSUER_PUBLIC_KEY'e karşılık gelen hesabın seçili ve fonlanmış olduğundan emin olun.
Bağlantı başarılı olduğunda, sayfa bağlı hesabınızın yetkili olup olmadığını gösterecektir.
"Yeni Sertifika Oluştur" formunu doldurun. "Kursiyer Stellar Adresi" kısmına sertifikayı alacak kişinin public key'ini girin (bu hesabın da testnet üzerinde aktif ve fonlanmış olması önerilir).
"Sertifika Oluştur" butonuna tıkladığınızda, Freighter cüzdanınızda işlemi imzalamanız için bir pencere açılacaktır. İşlemi onaylayın.
İşlem başarılı olduğunda, konsolda ve uygulama arayüzünde oluşturulan sertifika ID'si ve kaydedilen hash görünecektir.
Sertifika Doğrulama (Herkes İçin)
"Sertifika Doğrula" bölümüne gidin.
Doğrulamak istediğiniz sertifikanın ID'sini girin.
"Sertifikayı Doğrula" butonuna tıkladığınızda, sistem AUTHORIZED_ISSUER_PUBLIC_KEY'e ait hesap üzerinden bu ID'ye karşılık gelen hash'i Stellar ağından çekecek ve doğrulama sonucunu gösterecektir.
##🛣️ Gelecek Geliştirmeler
Tam Doğrulama Mekanizması: Doğrulama arayüzüne, orijinal sertifika detaylarını girmeyi ve girilen detayların hash'i ile zincirdeki hash'i karşılaştırma özelliğini eklemek.
IPFS Entegrasyonu: Sertifika detaylarının tamamını (hash'ini değil) IPFS gibi merkezi olmayan bir depolama çözümünde saklamak ve Stellar zincirinde sadece IPFS CID'sini kaydetmek.
Kullanıcı Kimlik Doğrulama: Eğitim merkezi yöneticileri için daha sağlam bir kimlik doğrulama sistemi (örneğin bir backend ile entegrasyon).
UI/UX İyileştirmeleri: Daha modern ve kullanıcı dostu bir arayüz tasarımı.
Hata Yönetimi: Daha detaylı ve kullanıcıya özel hata mesajları.