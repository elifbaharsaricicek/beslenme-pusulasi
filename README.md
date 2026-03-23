# FODMAP / Çölyak Diyet Takip Uygulamasi

Bu proje, yeni baslayanlar icin hazirlanmis cok basit bir Vite + Node.js ornegidir.

Ozellikler:
- Besin adina gore arama (guvenli / dikkatli / riskli)
- Gunluk stres (1-10), sis (1-10) ve yenilen besin kaydi
- Verilerin `server/logs.json` dosyasina yazilmasi (veritabani yok)

## Kurulum

1) Node.js kurulu degilse: [https://nodejs.org](https://nodejs.org) adresinden LTS surumu kur.
2) Proje klasorunde:

```bash
npm install
```

## Calistirma

Iki terminal ac:

Terminal 1:
```bash
npm run server
```

Terminal 2:
```bash
npm run dev
```

Tarayicida `http://localhost:5173` ac.

## Notlar

- Bu bir ogrenme projesidir.
- Tibbi tavsiye yerine gecmez.
- Besin listesi `server/data.js` icinde kolayca guncellenebilir.
