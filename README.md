# Katakana Empat Jam

Aplikasi web untuk belajar menulis katakana dari romaji dalam empat jam, dengan fokus pada kata serapan. Dirancang mobile-first dan bisa dipasang sebagai aplikasi (PWA).

Dikembangkan oleh @noeroelama. Versi hiragana ada di branch `main`.

## Fitur

- **Belajar per baris.** Setiap baris gojūon punya satu warna, dan setiap katakana ditampilkan bersama pasangan hiragananya.
- **Kakijun.** Animasi urutan goresan, kotak urutan langkah demi langkah, dan nomor goresan saat menjiplak.
- **Aturan katakana.** Garis panjang ー, ッ kecil, ャ ュ ョ, bunyi asing (ファ, ティ, ウェ, シェ), dan pola kata serapan dari bahasa Inggris.
- **Kata serapan.** Sekitar 160 kata dengan romaji dan kata asalnya. Romaji dibuat otomatis dari katakana dengan satu konvensi Hepburn, dan vokal panjang bisa ditampilkan sebagai `koohii` atau `kōhī`.
- **Penilaian otomatis.** Tulisan tangan dibaca oleh pengenal tulisan tangan Google, dengan normalisasi bentuk yang mirip kanji (力 dan カ, 口 dan ロ, 一 dan ー).
- **Tabel Kosong**, **simulasi tes** 20 soal, **peta ingatan**, dan jadwal sesi empat jam.

## Menjalankan

```
npm install
npx wrangler dev       # lokal
npx wrangler deploy    # ke Cloudflare Workers (worker: katakana-4jam)
```

Seluruh aplikasi ada di `public/index.html`, tanpa proses build. Progres belajar disimpan di `localStorage` browser.

## Catatan

- Penilaian otomatis memakai `inputtools.google.com`, endpoint tidak resmi yang juga dipakai Google Translate. Jika tidak bisa dijangkau, aplikasi kembali ke penilaian manual.
- Data urutan goresan berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
