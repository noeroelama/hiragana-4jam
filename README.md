# Hiragana Empat Jam

Aplikasi web untuk belajar menulis hiragana dari romaji dalam empat jam. Dirancang mobile-first dan bisa dipasang sebagai aplikasi (PWA).

Dikembangkan oleh @noeroelama.

## Fitur

- **Belajar per baris.** Setiap baris gojūon punya satu warna. Setiap huruf melewati tiga tahap: kenali bentuk dan urutan goresan, jiplak, lalu tulis dari ingatan.
- **Kakijun.** Animasi urutan goresan, kotak urutan langkah demi langkah, dan nomor goresan saat menjiplak.
- **Penilaian otomatis.** Tulisan tangan dibaca oleh pengenal tulisan tangan Google. Jawaban benar ditandai hanamaru, dan penilaian bisa diubah manual.
- **Latihan berulang.** Huruf yang salah muncul lagi lebih cepat. Tersedia set huruf dasar, pasangan mirip, dakuten, ゃゅょ, dan kata.
- **Tabel Kosong.** Tulis ke-46 huruf dari ingatan, lalu dinilai sekaligus.
- **Simulasi tes.** Dua puluh soal romaji campuran.
- **Peta ingatan** dan jadwal sesi empat jam.

## Menjalankan

```
npm install
npx wrangler dev       # lokal
npx wrangler deploy    # ke Cloudflare Workers
```

Seluruh aplikasi ada di `public/index.html`, tanpa proses build. Progres belajar disimpan di `localStorage` browser.

## Catatan

- Penilaian otomatis memakai `inputtools.google.com`, endpoint tidak resmi yang juga dipakai Google Translate. Jika tidak bisa dijangkau, aplikasi kembali ke penilaian manual.
- Data urutan goresan berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
