# Katakana Empat Jam

Aplikasi web untuk belajar menulis katakana dari romaji dalam empat jam, dengan fokus pada kata serapan. Dirancang mobile-first dan bisa dipasang sebagai aplikasi (PWA).

Dikembangkan oleh @noeroelama. Versi hiragana ada di branch `main`.

## Fitur

- **Belajar per baris.** Setiap baris gojūon punya satu warna, dan setiap katakana ditampilkan bersama hiragana yang sebunyi.
- **Kakijun.** Animasi urutan goresan, kotak langkah demi langkah, dan nomor goresan saat menjiplak. Jumlah, urutan, dan arah goresan Anda dibandingkan dengan contoh.
- **Aturan katakana.** Garis panjang ー, ッ kecil, ャ ュ ョ, bunyi asing (ファ, ティ, ウェ, シェ), ン dalam romaji, dan pola kata serapan dari bahasa Inggris.
- **Kata serapan.** 173 kata dengan romaji dan kata asalnya, 40 di antaranya kata inti yang mencakup semua pola ejaan. Romaji dibuat otomatis dari katakana, dan vokal panjang bisa ditampilkan sebagai `koohii` atau `kōhī`.
- **Penilaian otomatis.** Bentuk tulisan dibaca oleh pengenal tulisan tangan Google, dengan penyamaan bentuk yang mirip kanji (力 dan カ, 口 dan ロ, 一 dan ー). Ukuran huruf kecil diperiksa di perangkat. Bentuk hiragana yang tertulis di soal katakana ditandai salah.
- **Tabel Kosong**, **simulasi tes** 20 soal, **peta ingatan**, dan jadwal sesi empat jam.

## Struktur

```
src/styles.css        tampilan, dipakai kedua aplikasi
src/app.js            logika, dipakai kedua aplikasi
src/hiragana.js       isi materi hiragana
src/katakana.js       isi materi katakana
src/kvg-*.json        data urutan goresan
build.mjs             menyusun public/index.html, sw.js, dan manifest
```

Branch `main` dan `katakana` memuat `src/` yang sama. Yang dibangun mengikuti `name` di `package.json`.

## Menjalankan

```
npm install
npm run dev       # build, lalu wrangler dev
npm run deploy    # build, lalu wrangler deploy (worker: katakana-4jam)
```

Progres belajar disimpan di `localStorage` browser.

## Catatan

- Penilaian otomatis memakai `inputtools.google.com`, endpoint tidak resmi yang juga dipakai Google Translate. Goresan dikirim ke sana untuk dibaca. Jika tidak bisa dijangkau, aplikasi beralih ke penilaian manual.
- Data urutan goresan berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
