# 🎨 Frontend Özelleştirme PDR Template

> **Workshop Katılımcısı İçin Talimatlar:** 
> Bu template'i kendi projeniz için özelleştirmek üzere aşağıdaki bölümleri doldurun. 
> `[BURAYA_GİRİN: açıklama]` formatındaki alanları kendi proje bilgilerinizle değiştirin.

## 📋 **Proje Bilgileri**

### **Seçilen Sektör**: Gayrimenkul
### **Platform Adı**: RealEstateTokenX
### **Ana Varlık Türü**: Konut projeleri, ticari binalar, arsa yatırımları
### **Hedef Kitle**: Gayrimenkul yatırımcıları, Kurumsal yatırımcılar, Bireysel yatırımcılar

---

## 🎯 **Platform Vizyonu**

### **Ana Konsept**
Gayrimenkul sektörünü blockchain teknolojisi ile buluşturan, konut projeleri, ticari binalar ve arsa yatırımlarını tokenize ederek yatırımcılara erişilebilir, likit ve şeffaf bir yatırım platformu sunan dijital emlak pazaryeri.

### **Değer Önerisi**
- **Gayrimenkul Yatırımcıları için**: Düşük giriş maliyeti, portföy çeşitlendirme, likit yatırım fırsatları
- **Kurumsal Yatırımcılar için**: Geniş proje havuzu, şeffaf değerleme, kolay portföy yönetimi
- **Bireysel Yatırımcılar için**: Erişilebilir gayrimenkul yatırımı, fraksiyonel sahiplik, esnek alım-satım imkanı

---

## 🎨 **Görsel Kimlik Güncellemeleri**

### **Renk Paleti**
```css
/* RealEstate Teması - Gri, Altın ve Lacivert tonları */
--primary: #2B3B4E      /* Lacivert - Ana renk */
--secondary: #8C8C8C    /* Gri - Tamamlayıcı renk */
--accent: #D4AF37       /* Altın - Premium/Kalite hissi */
--background: #F5F5F5   /* Açık gri - Arka plan */
--foreground: #1A1A1A   /* Koyu gri - Metin rengi */
```


### **İkonlar ve Emojiler**
- **Ana Tema**: 🏢 🏘️ 🏗️ 📊 💎 💰
- **Alt Kategoriler**: 🏠 🏢 🏬 🏗️ 🏘️ 🌆
- **İşlemler**: 📝 💰 📈 🔍 ✅ 🚀

### **Tipografi**
- **Başlıklar**: Inter - Modern ve profesyonel görünüm için
- **İçerik**: Open Sans - Yüksek okunabilirlik için
- **Ton**: Profesyonel, güvenilir ve premium
- **Ton**: Sıcak, güvenilir, profesyonel

---

## 📁 **Güncellenmesi Gereken Dosyalar**

### **🏠 Ana Sayfa (`app/page.tsx`)**

#### **Başlık ve Açıklama**
```typescript
// Güncellenmesi gereken içerik:
title: "[PLATFORM_ADINIZ]" // Platformunuzun adı
description: "[SEKTÖR_AÇIKLAMANIZ]" // Ana konseptinizin kısa açıklaması
```

#### **Dashboard Kartları**
```typescript
// RealEstateTokenX için metrikler:
"Portfolio Value" → "Real Estate Portfolio"
"Total Investment" → "Total Property Investment" 
"Active Assets" → "Active Properties"
"Compliance Status" → "Legal Status"
```

#### **Hızlı Eylemler**
```typescript
// RealEstateTokenX ana eylemleri:
"Discover Property" → "Explore Properties"
"Token Transfer" → "Share Transfer"
"Tokenize" → "Tokenize Property"
```

### **🏪 Marketplace (`app/marketplace/page.tsx`)**

#### **Arama ve Filtreler**
```typescript
// RealEstateTokenX için filtreler:
asset_type: ["apartment", "villa", "office", "retail", "land", "commercial"]
location: ["istanbul", "ankara", "izmir", "antalya", "bursa"]
category: ["residential", "commercial", "land", "mixed-use"]
certification: ["title_deed", "zoning_permit", "building_permit"]
```

#### **Varlık Kartları**
```typescript
// RealEstateTokenX örnek varlık kartı:
{
  name: "Luxury Residence Tower",
  symbol: "LRT",
  creator: "Premium Development Corp - Istanbul",
  date: "Completion: 2026-06-30",
  specs: "25 floors, 100 units, 15,000 sqm",
  price_per_token: "1000 USDC",
  total_supply: 10000,
  sold_percentage: 65
}
```

#### **Metrikler**
```typescript
// Platform istatistiklerinizi sektörünüze uyarlayın:
"Toplam Varlık Değeri" → "[TOPLAM_DEĞER_TERMİNİNİZ]"
"Aktif Yatırımcılar" → "[KULLANICI_TERMİNİNİZ]"
"Tamamlanan İşlemler" → "[BAŞARI_TERMİNİNİZ]"

// Örnekler:
// Emlak: "Toplam Gayrimenkul Değeri", "Aktif Yatırımcılar", "Tamamlanan Projeler"
// Sanat: "Toplam Koleksiyon Değeri", "Aktif Koleksiyonerler", "Satılan Eserler"
// Enerji: "Toplam Proje Değeri", "Aktif Yatırımcılar", "Devreye Alınan Santrafler"
```

### **🌱 Tokenization (`app/tokenize/page.tsx`)**

#### **5 Adımlı Süreç**
```typescript
// RealEstateTokenX tokenization süreci:

1. "Basic Information" → "Property Details"
   - Type, location, size, features
   
2. "Property Specifications" → "Technical Details" 
   - Construction details, amenities, condition
   
3. "Legal Documents" → "Title & Permits"
   - Title deed, building permits, zoning documents
   
4. "Token Economics" → "Investment Plan"
   - Valuation, token supply, pricing strategy
   
5. "Publishing" → "List Property"
   - Final review, compliance check, marketplace listing

// SEKTÖR ÖRNEKLERİ:
// Emlak: "Mülk Bilgileri" → "Mülk Detayları" → "Tapu & Belgeler" → "Yatırım Planı" → "Projeyi Yayınla"
// Sanat: "Eser Bilgileri" → "Sanat Detayları" → "Otantiklik & Sertifika" → "Değer Belirleme" → "Koleksiyona Ekle"
// Enerji: "Proje Bilgileri" → "Teknik Detaylar" → "Lisans & İzinler" → "Finansman Planı" → "Projeyi Başlat"
```

### **💸 Transfer (`app/transfer/page.tsx`)**

#### **Transfer Terminolojisi**
```typescript
// RealEstateTokenX transfer terminolojisi:
"Token Transfer" → "Property Share Transfer"
"Recipient Address" → "New Owner Details"
"Transfer Amount" → "Share Amount"
"Compliance Check" → "Legal Verification"
```

### **🎨 Layout (`app/layout.tsx`)**

#### **Metadata**
```typescript
export const metadata = {
  title: '[PLATFORM_ADINIZ] - [KISA_AÇIKLAMA]',
  description: '[PLATFORM_AÇIKLAMANIZ - 160 karakter max]',
  icons: {
    icon: '/[FAVICON_DOSYA_ADI].ico', // Sektörünüze uygun favicon
  }
}

// Örnekler:
// Emlak: title: 'PropertyToken - Gayrimenkul Yatırım Platformu'
// Sanat: title: 'ArtChain - Dijital Sanat Koleksiyonu' 
// Enerji: title: 'GreenToken - Yenilenebilir Enerji Yatırımları'
```

### **📱 Header (`components/layout/Header.tsx`)**

#### **Navigasyon Menüsü**
```typescript
// Menü öğelerinizi sektörünüze uyarlayın:
"Dashboard" → "[ANA_PANEL_ADI]"
"Marketplace" → "[PAZAR_ADI]"
"Tokenize" → "[TOKENİZE_MENÜ_ADI]"
"Transfer" → "[TRANSFER_MENÜ_ADI]"

// Örnekler:
// Emlak: "Yatırımcı Paneli", "Gayrimenkul Pazarı", "Mülkümü Listele", "Hisse Transferi"
// Sanat: "Koleksiyonum", "Sanat Galerisi", "Eserimi Listele", "Sahiplik Transferi"
// Enerji: "Enerji Paneli", "Proje Pazarı", "Projemi Listele", "Pay Transferi"
```

---

## 🔧 **Teknik Güncellemeler**

### **Type Definitions (`lib/types.ts`)**

```typescript
// Sektörünüze uygun tip tanımları oluşturun:
export interface [SEKTÖR_ADI]Asset {
  id: string;
  name: string;
  symbol: string;
  asset_type: '[TİP_1]' | '[TİP_2]' | '[TİP_3]' | '[TİP_4]';
  creator_info: {
    name: string;
    location: string;
    experience_years: number;
    certifications: string[];
  };
  asset_details: {
    [ÖZELLİK_1]: [VERİ_TİPİ];
    [ÖZELLİK_2]: [VERİ_TİPİ];
    [ÖZELLİK_3]: [VERİ_TİPİ];
    [SERTİFİKA_DURUMU]: boolean;
  };
  timeline_info: {
    creation_date: string;
    milestone_date: string;
    estimated_completion: string;
    quality_grade: 'A' | 'B' | 'C';
  };
  financial: {
    funding_goal: number;
    current_funding: number;
    token_price: number;
    total_supply: number;
  };
}

// SEKTÖR ÖRNEKLERİ:
// Emlak: PropertyAsset, asset_type: 'residential' | 'commercial' | 'land' | 'industrial'
// Sanat: ArtworkAsset, asset_type: 'painting' | 'sculpture' | 'digital' | 'photography'  
// Enerji: EnergyAsset, asset_type: 'solar' | 'wind' | 'hydro' | 'biomass'
```

### **Mock Data (`lib/contract.ts`)**

```typescript
// Sektörünüze uygun örnek veri yapısı:
const SAMPLE_[SEKTÖR_ADI] = [
  {
    id: '[örnek-id-formatı]',
    name: '[ÖRNEK_VARLIK_ADI]',
    symbol: '[SEMBOL]',
    asset_type: '[TİP]',
    creator_info: {
      name: '[YARATICI_ADI]',
      location: '[KONUM]', 
      experience_years: [YIL],
      certifications: ['[SERTİFİKA_1]', '[SERTİFİKA_2]']
    },
    // ... diğer detaylar sektörünüze göre
  }
];



---

## 🎯 **Uygulama Özelleştirirken Agentın Dikkat Etmesini istediğimiz kısımlar**

### **Çiftçiler için UX**
- ✅ En basic ve bug çıkarmayacak şekilde projeyi özelleştir
- ✅ Yeni özellik ekleme sadece olan şeyleri pdr-frontend.md dosyasına ve verdiğim prompta uygun şekilde güncelle
- ✅ Uygulama Tamamen ingilizce olmalı
- ✅ Gereksiz yerleri güncellemene gerek yok sadece frontendde görünen kısımları güncelleyelim
- ✅ Rust kodlarını değiştirme sadece frontend kodları özelleştirilecek. <- ÖNEMLİ!
- ✅ Projeyi olabildiğince uzatmadan, basic ve hatasız şekilde geliştir

## 📝 **Implementasyon Checklist**

### **Phase 1: Temel Özelleştirme 
- [ ] Başlık ve açıklamaları güncelle
- [ ] Renk paletini değiştir
- [ ] İkonları ve emojiları adapte et
- [ ] Navigasyon menüsünü güncelle
- [ ] Mock data'yı sektöre uyarla

### **Phase 2: Gelişmiş İçerik 
- [ ] Dashboard widget'larını özelleştir
- [ ] Marketplace filtrelerini genişlet
- [ ] Type definitions'ları güncelle
- [ ] Tokenization flow'unu adapte et
- [ ] Transfer terminolojisini değiştir

---

## 💡 **Özelleştirme İpuçları**

### **Hızlı Başlangıç**
1. **Terminology First**: Önce tüm terminolojiyi listele
2. **Visual Identity**: Renk ve ikon paletini belirle
3. **User Journey**: Ana kullanıcı akışlarını çiz
4. **Content Strategy**: İçerik hiyerarşisini planla

### **Sık Yapılan Hatalar**
❌ **Kaçınılacaklar:**
- Çok fazla ve yeni özellikler eklemeye çalışma
- Projede sadece elimizdeki rwa-tempi özelleştireceksin yeni şeyler eklemeyeceksin
- Frontend dışında bir değişiklik yapma  
- wallet ile bağlanma kısmıyla ilgili bir değişiklik yapma orası da çalışıyor

✅ **İstediklerimiz**
- Sade ve odaklı tasarım
- Sadece Frontend güncellenecek
- Yeni bir özellik eklenmeyecek olan şeyler projemize göre özelleştirilecek


---

<div align="center">

**🚀 [SEKTÖR_EMOJİSİ] [SEKTÖR_ADI] sektöründen blockchain'e köprü kuruyoruz! [SEKTÖR_EMOJİSİ]**

*"[SEKTÖREL_MOTTO - ilham verici bir cümle]"*

</div>

---

*Bu PDR template'i, workshop katılımcılarının kendi sektörlerinde RWA tokenization platformu oluşturmalarına rehberlik edecek şekilde tasarlanmıştır. Her sektör için özelleştirilebilir ve ölçeklenebilir bir yapı sunar.*
