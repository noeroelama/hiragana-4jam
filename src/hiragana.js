/* ---------- HIRAGANA: content ----------
   Shape notes describe the strokes as drawn in the stroke data, then the feature that separates a kana from its look-alike.
   Every note was checked against the stroke coordinates. */
const APP={
  id:'hira',key:'hira4h.v1',script:'hiragana',other:'katakana',
  title:'Menulis hiragana dari romaji',
  logo:[['ひ','h'],['ら','r'],['が','k'],['な','n']],tabGlyph:'あ',
  romStyles:[['ou','gakkou'],['macron','gakkō'],['oo','gakkoo']],romDefault:'ou',
  wordsLabel:'kata',glossLabel:'Arti',
  test:{base:6,daku:3,combo:3,foreign:0,word:8},
  testIntro:'20 soal: 6 huruf dasar, 3 dakuten, 3 huruf kecil, dan 8 kata. Romaji tampil tanpa warna dan tanpa arti, seperti di kertas ujian. Jawaban baru terlihat setelah soal terakhir.',
  learnIntro:'Tiga tahap per baris: lihat, jiplak, lalu tulis dari ingatan. Setiap baris punya satu warna.',
  rulesIntro:'Pelajari setelah 46 huruf dasar dikuasai.',
  howto:[]
};
const ROWS=[
 {id:'a',name:'Baris A',items:[
  ['あ','a',0,'Garis datar, garis tegak, lalu lengkung besar yang melilit garis tegak. お mirip, tetapi punya titik di kanan atas.'],
  ['い','i',1,'Dua garis tegak berhadapan. Garis kiri lebih panjang dan berkait di bawah. Pada り, garis kanan yang lebih panjang.'],
  ['う','u',2,'Goresan pendek di atas, lalu satu lengkung yang membuka ke kiri bawah, seperti telinga.'],
  ['え','e',3,'Goresan pendek di atas, lalu satu garis berliku yang berakhir dengan sapuan ke kanan bawah.'],
  ['お','o',4,'Garis datar, garis tegak yang berbelok menjadi lengkung besar, dan titik di kanan atas. あ tidak bertitik.']]},
 {id:'k',name:'Baris K',items:[
  ['か','ka',0,'Garis datar yang berbelok turun dan berkait ke kiri di ujungnya. Lalu garis miring panjang yang turun ke kiri dan memotong garis datar itu. Terakhir, goresan pendek terpisah di kanan atas.'],
  ['き','ki',1,'Dua garis datar ditembus garis miring, lalu lengkung terpisah di bawah. さ hanya punya satu garis datar. Di huruf cetak, lengkung bawah sering tersambung. Saat menulis tangan, pisahkan.'],
  ['く','ku',2,'Satu goresan bersudut yang membuka ke kanan. へ juga bersudut, tetapi sudutnya menghadap ke atas.'],
  ['け','ke',3,'Garis tegak di kiri. Di kanan, garis datar pendek ditembus garis tegak yang turun lebih panjang.'],
  ['こ','ko',4,'Dua garis datar pendek, atas dan bawah. Tambahkan garis tegak di kiri, hasilnya に.']]},
 {id:'s',name:'Baris S',items:[
  ['さ','sa',0,'Garis datar, garis miring menembusnya, lalu lengkung bawah yang terpisah dan membuka ke kanan. Pada ち, lengkungnya tersambung dan menggembung ke kanan.'],
  ['し','shi',1,'Satu goresan turun lalu melengkung ke kanan atas, seperti kail. Romajinya shi.'],
  ['す','su',2,'Garis datar panjang, lalu garis tegak dengan simpul di tengah yang ujungnya turun ke kiri.'],
  ['せ','se',3,'Garis datar panjang dan dua garis tegak. Yang kanan pendek. Yang kiri turun lalu berbelok ke kanan.'],
  ['そ','so',4,'Zig-zag kecil di atas, lalu satu lengkung lebar yang membuka ke kanan. Ditulis dalam satu goresan.']]},
 {id:'t',name:'Baris T',items:[
  ['た','ta',0,'Seperti huruf t, dengan こ kecil di sebelah kanannya.'],
  ['ち','chi',1,'Garis datar, lalu satu goresan miring yang berlanjut menjadi lengkung menggembung ke kanan, seperti angka 5. Romajinya chi.'],
  ['つ','tsu',2,'Satu goresan dari kiri ke kanan yang membulat di sisi kanan, lalu berbalik ke kiri bawah. Sisi kirinya terbuka. Romajinya tsu.'],
  ['て','te',3,'Garis datar ke kanan, lalu berbalik turun menjadi lengkung yang membuka ke kanan.'],
  ['と','to',4,'Goresan pendek miring di atas. Lalu lengkung yang mulai dari kanan atas, turun ke kiri sampai menyentuh ujung goresan pertama, dan menyapu ke kanan di bawah.']]},
 {id:'n',name:'Baris N',items:[
  ['な','na',0,'Garis datar dan garis miring seperti pada た, titik di kanan atas, lalu simpul kecil di kanan bawah.'],
  ['に','ni',1,'Garis tegak di kiri dan dua garis datar di kanan. Dalam bahasa Jepang, ni berarti dua (二).'],
  ['ぬ','nu',2,'Dua goresan bersilang dengan simpul di ujung kanan bawah. め sama persis, tetapi tanpa simpul.'],
  ['ね','ne',3,'Garis tegak, lalu goresan berliku yang berakhir dengan simpul. れ berakhir dengan kait ke luar, わ dengan lengkung ke dalam.'],
  ['の','no',4,'Satu goresan melingkar dengan garis miring di tengah, seperti tanda larangan.']]},
 {id:'h',name:'Baris H',items:[
  ['は','ha',0,'Garis tegak di kiri. Di kanan, satu garis datar dan garis tegak yang berakhir dengan simpul.'],
  ['ひ','hi',1,'Satu goresan. Garis datar pendek di kiri atas, lalu turun membentuk mangkuk lebar. Sisi kanan mangkuk naik sampai setinggi awal goresan, lalu berbalik menjadi ekor yang turun ke kanan bawah.'],
  ['ふ','fu',2,'Empat goresan terpisah: satu di atas, satu lengkung di tengah, dan satu titik di kiri dan kanan. Romajinya fu.'],
  ['へ','he',3,'Satu goresan seperti atap: naik pendek, turun panjang.'],
  ['ほ','ho',4,'Seperti は, ditambah satu garis datar di bagian atas. Garis tegak kanan mulai dari garis datar atas dan tidak menembusnya.']]},
 {id:'m',name:'Baris M',items:[
  ['ま','ma',0,'Dua garis datar ditembus garis tegak yang berakhir dengan simpul. も tidak bersimpul.'],
  ['み','mi',1,'Goresan berliku dengan simpul, lalu satu goresan pendek di kanan. Mirip angka 21 yang disambung.'],
  ['む','mu',2,'Garis datar, garis tegak bersimpul yang berbelok ke kanan, dan satu titik di kanan atas.'],
  ['め','me',3,'Seperti ぬ tanpa simpul. Dalam bahasa Jepang, me berarti mata (目).'],
  ['も','mo',4,'Garis tegak yang berkait ke kanan di bawah, ditembus dua garis datar.']]},
 {id:'y',name:'Baris Y',items:[
  ['や','ya',0,'Goresan dari kiri yang naik ke kanan lalu melengkung balik ke kiri bawah, titik kecil di atasnya, dan garis miring panjang yang menembus bagian kirinya.'],
  ['ゆ','yu',2,'Garis turun di sisi kiri, lalu naik lagi dan memutar ke kanan menjadi lingkaran besar yang tidak tertutup. Lalu garis tegak panjang yang sedikit melengkung, menembus tengah lingkaran.'],
  ['よ','yo',4,'Garis datar pendek ditulis lebih dulu. Lalu garis tegak yang bersimpul di bawah. Garis datar menempel di sisi kanan garis tegak, di bagian atas, dan tidak menembusnya. ま punya dua garis datar yang menembus garis tegak.']]},
 {id:'r',name:'Baris R',items:[
  ['ら','ra',0,'Goresan pendek di atas, lalu garis yang turun dan berbalik membentuk perut ke kanan.'],
  ['り','ri',1,'Dua garis tegak. Garis kanan lebih panjang dan menyapu ke bawah. Pada い, garis kiri yang lebih panjang.'],
  ['る','ru',2,'Satu goresan zig-zag yang berakhir dengan simpul. ろ sama, tetapi tanpa simpul.'],
  ['れ','re',3,'Garis tegak, lalu goresan berliku yang berakhir dengan kait ke kanan.'],
  ['ろ','ro',4,'Seperti る tanpa simpul di ujung.']]},
 {id:'w',name:'Baris W dan ん',items:[
  ['わ','wa',0,'Garis tegak, lalu goresan berliku yang berakhir dengan lengkung membulat ke dalam.'],
  ['を','wo',4,'Garis datar pendek, zig-zag yang menembusnya, lalu lengkung di bawah yang membuka ke kanan. Hanya dipakai sebagai partikel. Romajinya wo, tetapi dalam kalimat sering ditulis o.'],
  ['ん','n',null,'Satu goresan seperti huruf n yang ditulis miring, dengan ekor ke kanan.']]}
];
const SMALL={'ぁ':'あ','ぃ':'い','ぅ':'う','ぇ':'え','ぉ':'お','っ':'つ','ゃ':'や','ゅ':'ゆ','ょ':'よ','ゎ':'わ'};
const DAKU_LIST='が ぎ ぐ げ ご ざ じ ず ぜ ぞ だ で ど ば び ぶ べ ぼ ぱ ぴ ぷ ぺ ぽ'.split(' ');
const DAKU_NOTE='Dua titik mengubah k, s, t, h menjadi g, z, d, b. Lingkaran kecil mengubah h menjadi p. Untuk romaji ji dan zu, tulis じ dan ず.';
const COMBO_LIST=[];'き し ち に ひ み り ぎ じ び ぴ'.split(' ').forEach(k=>'ゃ ゅ ょ'.split(' ').forEach(s=>COMBO_LIST.push(k+s)));
const comboNote=k=>[...k][0]+', lalu '+[...k][1]+' yang ditulis kecil dan agak rendah.';
const FOREIGN_LIST=[];
const foreignNote=()=>'';
const QUAL={};
const EXTRA_NOTE={};
/* [kana, arti] */
const WORD_LIST=[
 ['きって','perangko'],['がっこう','sekolah'],['きょう','hari ini'],['しゃしん','foto'],['ちょっと','sebentar'],['じしょ','kamus'],['でんしゃ','kereta listrik'],
 ['びょういん','rumah sakit'],['りょこう','perjalanan wisata'],['ぎゅうにゅう','susu sapi'],['おかあさん','ibu'],['おにいさん','kakak laki-laki'],['せんせい','guru'],
 ['ありがとう','terima kasih'],['ざっし','majalah'],['きっぷ','karcis'],['ひゃく','seratus'],['さかな','ikan'],['つくえ','meja tulis'],['ふじさん','Gunung Fuji'],
 ['みず','air'],['ひらがな','hiragana'],['にほんご','bahasa Jepang'],['まっちゃ','teh hijau bubuk'],['おちゃ','teh'],['けいたい','ponsel'],['ゆうびんきょく','kantor pos'],
 ['えいが','film'],['とけい','jam'],['てんぷら','tempura'],['ちず','peta'],['ぬいぐるみ','boneka'],['めがね','kacamata'],['ねこ','kucing'],['わたし','saya'],
 ['ろうそく','lilin'],['ひこうき','pesawat'],['でぐち','pintu keluar'],['ほんや','toko buku'],['じゅうしょ','alamat'],
 ['おおきい','besar'],['とおい','jauh'],['おねえさん','kakak perempuan'],['おとうさん','ayah'],['みんな','semua orang'],['みっつ','tiga buah'],['へや','kamar'],
 ['はな','bunga'],['のみもの','minuman'],['さむい','dingin'],['これ','ini'],['やすみ','libur'],['よる','malam']
];
const PAIRS=[['ぬ','め'],['ね','れ','わ'],['る','ろ'],['さ','ち'],['は','け','ほ'],['い','り'],['あ','お'],['き','さ'],['し','つ'],['く','へ'],['う','ら'],['こ','に'],['ま','も','よ'],['た','な'],['め','の','あ']];
const RULES=[
 {t:'Dakuten: dua titik',d:'Ditulis di kanan atas, sebagai goresan terakhir. Mengubah baris k, s, t, h menjadi g, z, d, b. Baris d juga punya ぢ dan づ. Bunyinya sama dengan じ dan ず, tetapi jarang dipakai. Untuk romaji ji dan zu, tulis じ dan ず. Tulis ぢ dan づ hanya jika soal meminta baris d lengkap.',ex:['が','ざ','だ','ば'],set:'daku'},
 {t:'Handakuten: lingkaran kecil',d:'Hanya dipakai pada baris h, dan mengubahnya menjadi p.',ex:['ぱ','ぴ','ぷ','ぺ','ぽ'],set:'daku'},
 {t:'Romaji yang tidak mengikuti pola',d:'Romaji lima huruf ini tidak mengikuti pola barisnya: shi, chi, tsu, fu, dan ji. Sebagian buku menulisnya si, ti, tu, hu, dan zi. Hurufnya tetap sama. Dalam kalimat, partikel wa ditulis は, partikel e ditulis へ, dan partikel o ditulis を.',ex:['し','ち','つ','ふ','じ','を','ん'],set:'base'},
 {t:'Huruf kecil ゃ ゅ ょ',cmp:['や','ゃ'],d:'Huruf berakhiran i, ditambah ya, yu, atau yo yang ditulis setengah ukuran. Keduanya dibaca dalam satu ketukan. Pada sha, shu, sho, cha, chu, cho, ja, ju, dan jo, huruf y tidak tampak di romaji, tetapi ゃ, ゅ, atau ょ kecil tetap ditulis. Ukuran menentukan arti: きょう berbeda dengan きよう.',ex:['きゃ','しゅ','ちょ','じゃ','りょ'],set:'combo'},
 {t:'っ kecil',cmp:['つ','っ'],d:'Muncul pada romaji dengan konsonan ganda seperti kk, pp, ss, tt, atau tch. Tulis っ kecil sebelum huruf berikutnya. Sebagian buku menulis cch untuk tch, jadi matcha dan maccha adalah kata yang sama. Pengecualian: nn tidak memakai っ. Huruf n yang pertama ditulis ん, seperti pada みんな (minna).',ex:['きって','がっこう','まっちゃ','みんな'],set:'word'},
 {t:'Vokal panjang',d:'Bunyi a, i, dan u yang panjang ditulis dengan menambah あ, い, atau う. Bunyi o yang panjang hampir selalu ditulis dengan menambah う, bukan お. Bunyi e yang panjang hampir selalu ditulis dengan menambah い, bukan え. Romaji gakkou, gakkō, dan gakkoo adalah kata yang sama. Ketiganya ditulis がっこう. Romaji sensei dan sensee juga sama, dan ditulis せんせい. Hanya sedikit kata yang memakai おお atau ええ. Hafalkan tiga ini: おおきい, とおい, おねえさん. Kalau tes Anda menulis o panjang sebagai ou, tulis persis seperti romajinya. Di tes seperti itu, oo selalu berarti おお dan ee selalu berarti ええ.',ex:['きょう','がっこう','せんせい','おにいさん','おおきい','おねえさん'],set:'word'},
 {t:'Huruf ん',d:'ん ditulis untuk n yang tidak diikuti vokal atau y. Romaji ng berarti ん lalu huruf baris g, seperti にほんご (nihongo). Sebelum b, p, dan m, sebagian buku menulis m. Jadi tempura dan tenpura adalah kata yang sama, yaitu てんぷら. Apostrof pada hon\'ya menandakan ん berdiri sendiri, bukan bagian dari にゃ. Sebagian tes menulisnya hon-ya.',ex:['にほんご','てんぷら','ほんや','みんな'],set:'word'}
];
const PLAN=[
 {s:0,e:100,t:'Huruf dasar per baris',d:'10 baris, sekitar 8 menit per baris. Tiap 3 baris, latihan campuran 5 menit, lalu istirahat 5 menit tanpa layar.',go:'learn',set:'base'},
 {s:100,e:120,t:'Tabel Kosong pertama',d:'Tulis 46 huruf dari ingatan. Yang salah jadi bahan latihan berikutnya.',go:'table'},
 {s:120,e:150,t:'Perbaiki kesalahan',d:'Latih set Yang salah, lalu Pasangan mirip.',go:'drill',set:'weak'},
 {s:150,e:165,t:'Istirahat',d:'Tanpa layar dan tanpa hiragana. Jeda membantu ingatan mengendap.',go:null},
 {s:165,e:195,t:'Aturan tambahan',d:'Dakuten, huruf kecil, っ, vokal panjang, dan ん. Baca kartunya, lalu latih tiap set.',go:'learn',set:'daku'},
 {s:195,e:210,t:'Tabel Kosong kedua',d:'Bandingkan waktu dan jumlah salah dengan percobaan pertama.',go:'table'},
 {s:210,e:230,t:'Simulasi tes',d:'20 soal campuran. 8 di antaranya kata.',go:'test'},
 {s:230,e:240,t:'Tabel Kosong terakhir',d:'Target: 46 benar, dua kali berturut-turut. Besok pagi, tulis lagi ke-46 huruf di kertas sebelum membuka aplikasi.',go:'table'}
];
const MODES=[
 {m:'base',g:'Huruf',l:'Huruf dasar',ex:'あ か さ',u:'huruf'},
 {m:'daku',g:'Huruf',l:'Dakuten dan handakuten',ex:'が ぱ',u:'huruf'},
 {m:'combo',g:'Huruf',l:'Huruf kecil ゃ ゅ ょ',ex:'きゃ',u:'huruf'},
 {m:'word',g:'Kata',l:'Kata',ex:'きって',u:'kata'},
 {m:'pairs',g:'Fokus',l:'Pasangan mirip',ex:'ぬ め',u:'huruf'},
 {m:'weak',g:'Fokus',l:'Yang salah',ex:'',u:'kartu'},
 {m:'all',g:'Fokus',l:'Campuran',ex:'あ が きゃ',u:'kartu'}
];
const REC_DEFAULT='all';
/* recognizer: へ and り are drawn the same in both scripts, so their katakana readings count as hiragana */
const MINE=/^[ぁ-ゖ]+$/,OTHER=/^[ァ-ヺー]+$/;
const NORM={'ヘ':'へ','ベ':'べ','ペ':'ぺ','リ':'り'};
