# VoltRoute

Tek HTML dosyasındaki uygulama, mevcut görünüm ve işleyiş korunarak ayrı dosyalara bölünmüştür.

## Çalıştırma

1. ZIP dosyasını tamamen bir klasöre çıkarın.
2. index.html dosyasını tarayıcınızda açın.
3. assets klasörünü index.html ile aynı konumda tutun.

Paket kurulumu, derleme veya sunucu gerekmez. İsterseniz VS Code Live Server ile de açabilirsiniz.

## Dosyalar

| Dosya | İçerik |
| --- | --- |
| index.html | Sayfa yapısı, metinler, SVG harita ve dosya bağlantıları |
| assets/css/base.css | Renk değişkenleri ve temel stiller |
| assets/css/layout.css | Üst çubuk, sekmeler ve genel yerleşim |
| assets/css/planner.css | Rota formu, batarya ve rota özeti |
| assets/css/map.css | Harita, pinler, filtreler ve ısı katmanı |
| assets/css/station-list.css | İstasyon listesi ve alt bilgi |
| assets/css/dialogs.css | İstasyon detayları, ayarlar ve bildirimler |
| assets/css/design-system.css | Tasarım sistemi ve İBE laboratuvarı bileşenleri |
| assets/css/themes.css | Koyu tema ve alternatif durum renkleri |
| assets/css/responsive.css | Ekran boyutlarına göre medya sorguları |
| assets/js/dom-icons.js | DOM yardımcısı, SVG ikonları ve ilk ikon yerleşimi |
| assets/js/data.js | Koridor, yol noktaları, araçlar, istasyonlar ve durum etiketleri |
| assets/js/state.js | Oturum, filtre, rezervasyon ve harita durumu |
| assets/js/helpers.js | Sayı biçimlendirme, araç ve istasyon yardımcıları |
| assets/js/planner.js | Form seçenekleri, menzil, rota hesaplama ve rota özeti |
| assets/js/map.js | Harita çizimi, kümeleme, yakınlaştırma ve liste güncellemesi |
| assets/js/stations.js | Soket detayları, demo rezervasyon, durum bildirimi ve mesajlar |
| assets/js/navigation.js | Sekme geçişi ve örnek rota yükleme |
| assets/js/app.js | Olay dinleyicileri, rezervasyon zamanlayıcısı ve başlangıç çağrısı |

## Yükleme sırası

CSS ve JavaScript dosyaları index.html içinde eski kodun sırasıyla yüklenir.
JavaScript dosyaları klasik script olarak çalışır; async, defer ve type=module eklenmemiştir.
Dosyaların sırasını değiştirmeyin. HTML içindeki SVG, satır içi stil nitelikleri ve dinamik HTML şablonları yerlerinde bırakılmıştır.

JavaScript içeriği değiştirilmeden bölünmüştür. CSS değerleri ve kuralları korunmuş, sıkıştırılmış kurallar yalnızca okunabilir satırlara ayrılmıştır.
