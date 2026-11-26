# Hiragana Empat Jam

Aplikasi web untuk belajar menulis hiragana dari romaji dalam empat jam. Dirancang mobile-first dan bisa dipasang sebagai aplikasi (PWA).

Dikembangkan oleh @noeroelama. Versi katakana ada di branch `katakana`.

## Fitur

- **Belajar per baris.** Setiap baris gojūon punya satu warna. Setiap huruf melewati tiga tahap: lihat bentuk dan urutan goresan, jiplak, lalu tulis dari ingatan.
- **Kakijun.** Animasi urutan goresan, kotak langkah demi langkah, dan nomor goresan saat menjiplak. Jumlah, urutan, dan arah goresan Anda dibandingkan dengan contoh.
- **Penilaian otomatis.** Bentuk tulisan dibaca oleh pengenal tulisan tangan Google. Ukuran huruf kecil (っ ゃ ゅ ょ) diperiksa di perangkat, karena pengenal itu tidak membedakannya. Semua penilaian bisa diubah manual.
- **Latihan berulang.** Huruf yang salah muncul lagi lebih cepat. Set: huruf dasar, dakuten, huruf kecil, kata, pasangan mirip, dan yang salah.
- **Tabel Kosong.** Tulis ke-46 huruf dari ingatan, lalu dinilai sekaligus. Percobaan yang sedang berjalan tidak hilang jika halaman tertutup.
- **Simulasi tes.** Dua puluh soal romaji campuran.
- **Romaji tiga gaya.** Vokal panjang bisa ditampilkan sebagai gakkou, gakkō, atau gakkoo, mengikuti tes Anda.

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
npm run deploy    # build, lalu wrangler deploy
```

Progres belajar disimpan di `localStorage` browser.

## Catatan

- Penilaian otomatis memakai `inputtools.google.com`, endpoint tidak resmi yang juga dipakai Google Translate. Goresan dikirim ke sana untuk dibaca. Jika tidak bisa dijangkau, aplikasi beralih ke penilaian manual.
- Data urutan goresan berasal dari [KanjiVG](https://kanjivg.tagaini.net) oleh Ulrich Apel, lisensi [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
