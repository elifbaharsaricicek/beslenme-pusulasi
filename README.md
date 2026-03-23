# Beslenme Pusulası

Beslenme Pusulası, IBS ve hassas sindirim süreçleri için geliştirilen modern bir tek sayfa web uygulamasıdır.  
Kullanıcılar besinlerin farklı diyet türlerine göre uygunluğunu hızlıca sorgulayabilir ve günlük semptom takibi yapabilir.

## Canlı Özellikler

- 400+ besin içeren yerel veri tabanı ile hızlı arama
- 4 diyet türü: Low FODMAP, Glutensiz, Laktozsuz, Vegan
- Sonuç kartlarında `Güvenli / Dikkat / Riskli` durum göstergesi
- Günlük takip: stres, şişkinlik, ağrı, not ve besin kaydı
- Haftalık mini trend grafiği
- Olası tetikleyici analizi
- Excel uyumlu CSV dışa aktarma

## Teknoloji Yığını

- Vite
- HTML5
- CSS3 (Vanilla)
- JavaScript (ES6+)
- localStorage

## Kurulum

```bash
npm install
```

## Geliştirme Ortamında Çalıştırma

```bash
npm run dev
```

Uygulama varsayılan olarak `http://localhost:5173` adresinde açılır.

## Production Build

```bash
npm run build
```

Build çıktısı `dist` klasörüne üretilir.

## Dağıtım Notu (Cloudflare / Static Hosting)

`vite.config.js` içinde `base: "./"` ayarı kullanıldığı için proje statik ortamlarda göreli yol ile sorunsuz çalışır.

## Yol Haritası (Örnek)

- [ ] Besin detay penceresi (porsiyon bazlı notlar)
- [ ] Koyu/açık tema değiştirici
- [ ] Tek tek kayıt silme
- [ ] Test kapsamı (unit + e2e)

## Uyarı

Bu proje bir **karar destek prototipidir**, tıbbi tanı aracı değildir.  
Sürekli veya şiddetli semptomlarda lütfen doktora ve diyetisyene danışın.
