/* ---------- KATAKANA: content ----------
   Shape notes describe the strokes as drawn in the stroke data, then the feature that separates a kana from its look-alike.
   Every note was checked against the stroke coordinates. */
const APP={
  id:'kata',key:'kata4h.v1',script:'katakana',other:'hiragana',
  title:'Menulis katakana dari romaji',
  logo:[['カ','k'],['タ','t'],['カ','k'],['ナ','n']],tabGlyph:'ア',
  romStyles:[['double','koohii'],['macron','kōhī']],romDefault:'double',
  wordsLabel:'kata serapan',glossLabel:'Asal kata',
  test:{base:5,daku:3,combo:2,foreign:2,word:8,coreWords:5},
  testIntro:'20 soal: 5 huruf dasar, 3 dakuten, 2 huruf kecil, 2 bunyi asing, dan 8 kata serapan. Romaji tampil tanpa warna dan tanpa kata asalnya, seperti di kertas ujian. Jawaban baru terlihat setelah soal terakhir.',
  learnIntro:'Tiga tahap per baris: lihat, jiplak, lalu tulis dari ingatan. Warna baris sama dengan aplikasi hiragana, dan hiragana yang sebunyi ditampilkan di samping romaji.',
  rulesIntro:'Pelajari setelah 46 huruf dasar dikuasai. Sebagian besar nilai tes katakana ditentukan di sini.',
  howto:[
   ['Manfaatkan hiragana yang sudah Anda kuasai.','Sebagian katakana hampir sama dengan hiragananya: か カ, き キ, へ ヘ, り リ, せ セ, も モ, や ヤ. Huruf-huruf ini cepat selesai. Pakai waktunya untuk yang bentuknya berbeda.'],
   ['Vokal ganda di romaji berarti ー.','Dalam kata serapan, aa, ii, uu, ee, dan oo hampir selalu ditulis dengan garis panjang. Romaji koohii ditulis コーヒー.']
  ]
};
const ROWS=[
 {id:'a',name:'Baris A',items:[
  ['ア','a',0,'Garis datar yang ujung kanannya berkait ke bawah, lalu garis yang turun melengkung ke kiri dari tengah. マ tidak punya garis turun panjang, hanya titik pendek.'],
  ['イ','i',1,'Garis miring panjang yang turun ke kiri, lalu garis tegak dari tengahnya. Hanya dua goresan.'],
  ['ウ','u',2,'Titik di atas, garis tegak pendek, lalu atap yang turun melengkung ke kiri. ワ sama tanpa titik.'],
  ['エ','e',3,'Seperti huruf I kapital: garis atas, garis tegak, dan garis bawah yang lebih panjang.'],
  ['オ','o',4,'Garis datar ditembus garis tegak yang berkait di bawah, lalu garis miring ke kiri bawah.']]},
 {id:'k',name:'Baris K',items:[
  ['カ','ka',0,'Seperti か tanpa goresan pendek di kanan. Bentuknya sama dengan kanji 力 (tenaga).'],
  ['キ','ki',1,'Dua garis datar ditembus satu garis tegak. Seperti き tanpa lengkung bawah.'],
  ['ク','ku',2,'Goresan pendek miring, lalu atap yang turun panjang ke kiri. Pada ケ, garis datarnya lebih panjang dan garis turun dimulai dari tengahnya. タ punya goresan pendek di dalam.'],
  ['ケ','ke',3,'Goresan miring pendek, garis datar ke kanan, lalu garis yang turun ke kiri dari tengah garis datar.'],
  ['コ','ko',4,'Dua garis membentuk kotak yang terbuka di kiri. ロ tertutup di keempat sisi.']]},
 {id:'s',name:'Baris S',items:[
  ['サ','sa',0,'Garis datar ditembus dua garis tegak. Garis kanan turun melengkung ke kiri.'],
  ['シ','shi',1,'Dua titik bertumpuk di kiri, lalu garis yang ditarik dari bawah naik ke kanan atas. ツ kebalikannya: garis terakhir ditarik dari atas ke bawah.'],
  ['ス','su',2,'Atap pendek yang turun melengkung ke kiri, lalu goresan pendek ke kanan bawah. ヌ punya goresan yang menembus lengkungnya.'],
  ['セ','se',3,'Garis datar yang berkait ke bawah di kanan, lalu garis tegak yang berbelok ke kanan. Mirip せ.'],
  ['ソ','so',4,'Titik pendek yang agak tegak di kiri atas, lalu garis panjang yang turun dari kanan atas ke kiri bawah. Kedua goresan mulai dari atas, hampir sama tinggi. Pada ン, garis panjang ditarik dari bawah ke atas.']]},
 {id:'t',name:'Baris T',items:[
  ['タ','ta',0,'Seperti ク, dengan goresan pendek di dalam lengkungnya.'],
  ['チ','chi',1,'Goresan miring pendek di atas, ditarik dari kanan ke kiri. Lalu garis datar panjang. Terakhir, garis tegak yang mulai dari goresan atas, menembus garis datar, dan melengkung ke kiri. Pada テ, goresan atasnya datar, dan garis turun mulai dari garis datar kedua tanpa menembusnya.'],
  ['ツ','tsu',2,'Dua titik berjajar di atas, lalu garis panjang yang turun dari kanan atas. Ketiganya ditulis dari atas ke bawah.'],
  ['テ','te',3,'Garis datar pendek, garis datar panjang, lalu garis yang turun ke kiri dari tengah.'],
  ['ト','to',4,'Garis tegak dengan satu goresan pendek ke kanan di tengahnya.']]},
 {id:'n',name:'Baris N',items:[
  ['ナ','na',0,'Garis datar ditembus garis yang turun melengkung ke kiri. メ tidak punya garis datar.'],
  ['ニ','ni',1,'Dua garis datar, yang bawah lebih panjang. Sama dengan に tanpa garis tegak.'],
  ['ヌ','nu',2,'Seperti ス, dengan goresan pendek yang menembus lengkungnya.'],
  ['ネ','ne',3,'Titik di atas, garis yang berbelok turun ke kiri, garis tegak, lalu titik kecil di kanan.'],
  ['ノ','no',4,'Satu garis miring yang turun dari kanan atas ke kiri bawah.']]},
 {id:'h',name:'Baris H',items:[
  ['ハ','ha',0,'Dua garis yang saling menjauh di bawah, seperti kanji 八 (delapan).'],
  ['ヒ','hi',1,'Garis datar pendek ke kanan, lalu garis tegak yang berbelok ke kanan di bawah.'],
  ['フ','fu',2,'Satu goresan: garis datar yang melengkung turun ke kiri. ウ dan ワ punya goresan tambahan.'],
  ['ヘ','he',3,'Satu goresan seperti atap: naik pendek, turun panjang. Sama dengan へ.'],
  ['ホ','ho',4,'Garis datar ditembus garis tegak berkait, ditambah titik di kiri dan kanan bawah.']]},
 {id:'m',name:'Baris M',items:[
  ['マ','ma',0,'Garis datar yang berbelok tajam dan turun miring ke kiri bawah, lalu titik pendek di ujungnya. ア punya garis turun yang lebih panjang.'],
  ['ミ','mi',1,'Tiga goresan pendek yang berjajar ke bawah. Masing-masing ditarik dari kiri ke kanan bawah. Goresan terakhir paling panjang.'],
  ['ム','mu',2,'Garis yang turun lalu berbelok ke kanan, ditambah titik di sudut kanan.'],
  ['メ','me',3,'Garis panjang yang turun ke kiri, lalu goresan pendek yang menyilangnya. ナ punya garis datar.'],
  ['モ','mo',4,'Dua garis datar, lalu garis tegak yang berbelok ke kanan di bawah. Garis tegak mulai dari garis datar atas dan tidak menembusnya. Berbeda dengan も, yang garis tegaknya ditulis lebih dulu.']]},
 {id:'y',name:'Baris Y',items:[
  ['ヤ','ya',0,'Garis datar yang naik sedikit lalu berkait ke kiri bawah, ditembus garis panjang yang turun agak miring ke kanan. Mirip や tanpa titik.'],
  ['ユ','yu',2,'Garis datar pendek yang berbelok turun, lalu alas panjang. Alasnya melewati garis tegak di kanan. Pada コ, alasnya berhenti di sudut.'],
  ['ヨ','yo',4,'Tiga garis datar yang disatukan garis tegak di kanan, seperti huruf E terbalik.']]},
 {id:'r',name:'Baris R',items:[
  ['ラ','ra',0,'Garis datar pendek, lalu garis datar yang berbelok turun ke kiri. Seperti フ dengan atap.'],
  ['リ','ri',1,'Dua garis tegak, yang kanan lebih panjang dan melengkung. Hampir sama dengan り.'],
  ['ル','ru',2,'Garis yang turun ke kiri, lalu garis tegak yang ujungnya naik ke kanan.'],
  ['レ','re',3,'Satu goresan: turun, lalu naik ke kanan.'],
  ['ロ','ro',4,'Kotak tertutup, seperti kanji 口 (mulut).']]},
 {id:'w',name:'Baris W dan ン',items:[
  ['ワ','wa',0,'Garis tegak pendek, lalu atap yang turun melengkung ke kiri. ウ punya titik di atas.'],
  ['ヲ','wo',4,'Dua garis datar dan satu garis yang turun ke kiri. Hampir tidak pernah muncul di kata serapan. Romajinya wo, kadang ditulis o.'],
  ['ン','n',null,'Titik pendek yang agak rebah di kiri atas, lalu garis panjang yang ditarik dari kiri bawah naik ke kanan atas. Garis panjang mulai di bawah titik. Pada ソ, kedua goresan mulai dari atas.']]}
];
const SMALL={'ァ':'ア','ィ':'イ','ゥ':'ウ','ェ':'エ','ォ':'オ','ッ':'ツ','ャ':'ヤ','ュ':'ユ','ョ':'ヨ','ヮ':'ワ'};
const DAKU_LIST='ガ ギ グ ゲ ゴ ザ ジ ズ ゼ ゾ ダ デ ド バ ビ ブ ベ ボ パ ピ プ ペ ポ'.split(' ');
const DAKU_NOTE='Dua titik mengubah k, s, t, h menjadi g, z, d, b. Lingkaran kecil mengubah h menjadi p. Untuk romaji ji dan zu, tulis ジ dan ズ.';
const COMBO_LIST=[];'キ シ チ ニ ヒ ミ リ ギ ジ ビ ピ'.split(' ').forEach(k=>'ャ ュ ョ'.split(' ').forEach(s=>COMBO_LIST.push(k+s)));
const comboNote=k=>[...k][0]+', lalu '+[...k][1]+' yang ditulis kecil dan agak rendah.';
/* [kana, rare]: rare sounds are drilled last and never drawn in the mock test */
const FOREIGN_LIST=[['ファ'],['フィ'],['フェ'],['フォ'],['ティ'],['ディ'],['ウィ'],['ウェ'],['ウォ'],['シェ'],['ジェ'],['チェ'],['デュ'],['トゥ',1],['ドゥ',1],['ヴァ',1],['ヴィ',1],['ヴ',1]];
const foreignNote=k=>{const f=[...k][0];
  if(f==='フ')return'Bunyi f ditulis フ ditambah vokal kecil. Hanya fu yang berdiri sendiri (フ).';
  if(f==='テ'||f==='デ')return k.endsWith('ュ')?'デ ditambah ュ kecil, untuk bunyi dyu.':'Bunyi ti dan di tidak ada dalam bahasa Jepang asli, jadi ditulis テ atau デ ditambah ィ kecil. Bandingkan dengan チ (chi).';
  if(f==='ト'||f==='ド')return'ト atau ド ditambah ゥ kecil, untuk bunyi tu dan du. Bandingkan dengan ツ (tsu). Bunyi ini jarang muncul.';
  if(f==='ウ')return'ウ ditambah vokal kecil, untuk bunyi wi, we, dan wo pada kata serapan. Jangan tertukar dengan ヲ, yang juga beromaji wo.';
  if(f==='ヴ')return'ヴ adalah ウ dengan dakuten. Banyak kata justru menulis bunyi v dengan baris B, seperti ビデオ (video). Bunyi ini jarang muncul.';
  return f+' ditambah ェ kecil, untuk bunyi she, je, dan che.'};
/* the prompt "wo" has two answers, so these two carry a label */
const QUAL={'ヲ':'huruf dasar','ウォ':'bunyi asing'};
const EXTRA_NOTE={'カ':'Bentuk hiragananya か. Di tes katakana, bentuk itu dihitung salah.','キ':'Bentuk hiragananya き. Di tes katakana, bentuk itu dihitung salah.','セ':'Bentuk hiragananya せ. Di tes katakana, bentuk itu dihitung salah.','モ':'Bentuk hiragananya も. Di tes katakana, bentuk itu dihitung salah.','ヤ':'Bentuk hiragananya や. Di tes katakana, bentuk itu dihitung salah.','リ':'Bentuk hiragana り hampir sama. Pada リ, garis kiri lurus tanpa kait.'};
/* [kana, asal kata, inti]: 40 core words cover every spelling pattern and are the target of the 4-hour session */
const WORD_LIST=[
 ['コーヒー','coffee',1],['ジュース','juice',1],['ミルク','milk'],['ケーキ','cake'],['チーズ','cheese'],['バター','butter'],['サラダ','salad'],['スープ','soup',1],
 ['ハンバーガー','hamburger'],['サンドイッチ','sandwich'],['ピザ','pizza'],['ステーキ','steak'],['チョコレート','chocolate',1],['アイスクリーム','ice cream'],['クッキー','cookie'],
 ['レモン','lemon'],['バナナ','banana'],['トマト','tomato'],['ポテト','potato'],['ソース','sauce',1],['フォーク','fork',1],['ナイフ','knife'],['スプーン','spoon'],['カップ','cup',1],
 ['グラス','glass'],['メニュー','menu',1],['レストラン','restaurant'],['ドーナツ','doughnut'],['ヨーグルト','yogurt'],['ミルクティー','milk tea'],['ディナー','dinner',1],
 ['コンピューター','computer'],['インターネット','internet'],['メール','e-mail'],['スマートフォン','smartphone'],['アプリ','app'],['ソフトウェア','software'],['ファイル','file',1],
 ['データ','data'],['パスワード','password'],['キーボード','keyboard'],['マウス','mouse'],['プリンター','printer'],['カメラ','camera'],['テレビ','television',1],['ラジオ','radio'],
 ['ビデオ','video'],['ゲーム','game'],['ウェブサイト','website'],['ダウンロード','download'],['クリック','click'],['システム','system'],['プログラム','program'],
 ['ネットワーク','network'],['サーバー','server'],['デザイン','design'],['オンライン','online'],['チャット','chat'],
 ['ホテル','hotel'],['デパート','department store'],['スーパー','supermarket'],['コンビニ','convenience store',1],['バス','bus'],['タクシー','taxi'],['エレベーター','elevator'],
 ['エスカレーター','escalator'],['トイレ','toilet'],['ドア','door'],['テーブル','table'],['ベッド','bed',1],['ソファ','sofa'],['カーテン','curtain'],['シャワー','shower'],
 ['キッチン','kitchen'],['アパート','apartment'],['ビル','building'],['オフィス','office'],['デスク','desk'],['パーティー','party',1],['コンサート','concert'],['プール','pool'],
 ['スタジアム','stadium'],['チケット','ticket',1],['パスポート','passport'],['ビザ','visa'],['スーツケース','suitcase'],['ガイド','guide'],['ツアー','tour'],
 ['ペン','pen'],['ノート','notebook'],['テスト','test'],['クラス','class'],['レポート','report'],['ニュース','news',1],['スポーツ','sports',1],['サッカー','soccer',1],['テニス','tennis'],
 ['ゴルフ','golf'],['バスケットボール','basketball'],['ジョギング','jogging',1],['ギター','guitar'],['ピアノ','piano'],['ドラマ','drama'],['アニメ','animation'],['シャツ','shirt',1],
 ['ジャケット','jacket'],['スカート','skirt'],['ネクタイ','necktie'],['セーター','sweater'],['ボタン','button'],['ポケット','pocket'],['バッグ','bag',1],['ハンカチ','handkerchief'],
 ['シャンプー','shampoo',1],['タオル','towel'],['カレンダー','calendar'],['スケジュール','schedule'],['ミーティング','meeting'],['プレゼント','present'],['カード','card'],
 ['メッセージ','message'],['ボランティア','volunteer'],['リーダー','leader'],['チーム','team'],['マネージャー','manager'],['エンジニア','engineer'],['スタッフ','staff',1],
 ['ユーザー','user'],['ヒーロー','hero'],['ファッション','fashion'],['フィルム','film',1],['フェリー','ferry',1],['ウェディング','wedding'],['チェック','check',1],['シェフ','chef',1],
 ['フィットネス','fitness'],['ティッシュ','tissue'],['ディスク','disk'],['フェスティバル','festival'],['ウェブ','web',1],['ジェット','jet',1],
 ['インドネシア','Indonesia'],['アメリカ','America'],['オーストラリア','Australia'],['カナダ','Canada'],['フランス','France'],['イタリア','Italy'],['スペイン','Spain'],
 ['ブラジル','Brazil'],['インド','India'],['マレーシア','Malaysia'],['シンガポール','Singapore',1],['タイ','Thailand'],['ベトナム','Vietnam'],['エジプト','Egypt'],
 ['ジャカルタ','Jakarta'],['ロンドン','London'],['ニューヨーク','New York'],
 ['ウィークエンド','weekend',1],['キャンプ','camp',1],['キャベツ','cabbage'],['ミュージアム','museum',1],['インタビュー','interview',1],['リュック','rucksack',1],
 ['チューリップ','tulip',1],['ギャラリー','gallery',1],['ウォーキング','walking',1],['プロデューサー','producer',1],['ヌードル','noodle'],['メモ','memo'],['トンネル','tunnel',1],
 ['タイヤ','tire'],['ヘルメット','helmet']
];
const PAIRS=[['シ','ツ'],['ソ','ン'],['シ','ン'],['ツ','ソ'],['ク','ケ','タ'],['ウ','ワ','フ'],['ア','マ'],['コ','ユ','ヨ','ロ'],['ス','ヌ'],['チ','テ'],['ナ','メ'],['ル','レ'],['ヤ','セ'],['ノ','メ'],['ク','ワ'],['ラ','ヲ','フ'],['マ','ム'],['ミ','シ'],['オ','ホ'],['ソ','リ']];
const RULES=[
 {t:'Garis panjang ー',d:'Vokal panjang di katakana ditulis dengan satu garis ー, bukan dengan menambah vokal. Romaji koohii ditulis コーヒー, bukan コオヒイ. Garis ini ditulis mendatar dari kiri ke kanan, selebar satu huruf, di tengah tinggi baris. Jangan ditulis pendek seperti tanda hubung. Pada romaji bergaris atas seperti kōhī, setiap huruf bergaris atas berarti satu ー.',ex:['コーヒー','チーズ','スープ','ケーキ','サーバー'],set:'core'},
 {t:'ッ kecil',cmp:['ツ','ッ'],d:'Romaji dengan konsonan ganda seperti kk, pp, ss, tt, dd, gg, ff, atau tch ditulis dengan ッ kecil sebelum huruf berikutnya. Pengecualian: nn tidak memakai ッ. Huruf n yang pertama ditulis ン, seperti pada トンネル (tonneru).',ex:['ベッド','カップ','チケット','バッグ','トンネル'],set:'core'},
 {t:'Huruf kecil ャ ュ ョ',cmp:['ヤ','ャ'],d:'Huruf berakhiran i, ditambah ya, yu, atau yo yang ditulis setengah ukuran. Keduanya dibaca dalam satu ketukan. Pada sha, shu, sho, cha, chu, cho, ja, ju, dan jo, huruf y tidak tampak di romaji, tetapi ャ, ュ, atau ョ kecil tetap ditulis.',ex:['シャツ','ジュース','メニュー','チョコレート'],set:'combo'},
 {t:'Bunyi asing',d:'Bunyi yang tidak ada dalam bahasa Jepang asli ditulis dengan huruf kecil di belakangnya: fa, fi, fe, fo, ti, di, wi, we, wo, she, je, che. Sebagian buku menulis thi dan dhi untuk ティ dan ディ. Yang jarang muncul: tu, du, dyu, dan bunyi v dengan ヴ. Pelajari yang jarang ini paling akhir. Di sebagian buku, si, hu, dan zi berarti シ, フ, dan ジ. Di aplikasi ini, ti dan tu berarti ティ dan トゥ.',ex:['ファッション','パーティー','ウェブ','シェフ','ディナー'],set:'foreign'},
 {t:'ン dalam romaji',d:'Romaji ng berarti ン lalu huruf baris g, seperti ジョギング (jogingu). Sebelum b, p, dan m, sebagian buku menulis m. Jadi hambaagaa dan hanbaagaa adalah kata yang sama, yaitu ハンバーガー. Huruf m yang langsung diikuti b, p, atau m selalu ditulis ン.',ex:['ジョギング','シンガポール','ハンバーガー','コンビニ','シャンプー'],set:'core'},
 {t:'Dakuten dan handakuten',d:'Sama seperti hiragana. Dua titik mengubah k, s, t, h menjadi g, z, d, b. Lingkaran kecil mengubah h menjadi p. Untuk romaji ji dan zu, tulis ジ dan ズ. Baris d juga punya ヂ dan ヅ, tetapi jarang dipakai.',ex:['ガ','ザ','ダ','バ','パ'],set:'daku'},
 {t:'シ ツ ソ ン',d:'Empat huruf ini paling sering tertukar. Lihat arah goresan terakhir. Pada シ dan ン ditarik dari bawah ke atas, pada ツ dan ソ dari atas ke bawah. Titik pada シ bertumpuk di kiri, titik pada ツ berjajar di atas. Di kertas, arah goresan sulit terlihat. Yang terlihat adalah letaknya. Pada シ dan ン, titiknya lebih rebah dan garis panjang mulai dari kiri bawah, di bawah titik. Pada ツ dan ソ, titiknya lebih tegak dan semua goresan mulai dari atas, hampir sama tinggi.',ex:['シ','ツ','ソ','ン'],set:'pairs'},
 {t:'Dari bahasa Inggris ke katakana',d:'Bahasa Jepang menambahkan vokal setelah konsonan yang tidak diikuti vokal. Biasanya u, seperti desk menjadi desuku. Setelah t dan d biasanya o, seperti bed menjadi beddo. Setelah ch dan j biasanya i, seperti sandwich menjadi sandoitchi. Huruf n tetap ン tanpa vokal, seperti pen menjadi pen. Ada pengecualian, misalnya cake menjadi keeki dan shirt menjadi shatsu. Karena itu, selalu ikuti romaji pada soal. Akhiran -er dan -or menjadi bunyi panjang, seperti server menjadi saabaa. Bunyi l ditulis dengan baris R, dan v umumnya dengan baris B.',ex:['ベッド','デスク','サーバー','ホテル','ビデオ'],set:'word'}
];
const PLAN=[
 {s:0,e:90,t:'Huruf dasar per baris',d:'10 baris, sekitar 7 menit per baris. Katakana yang mirip hiragananya cepat selesai. Tiap 3 baris, latihan campuran 5 menit, lalu istirahat 5 menit tanpa layar.',go:'learn',set:'base'},
 {s:90,e:105,t:'Tabel Kosong pertama',d:'Tulis 46 huruf dari ingatan. Yang salah jadi bahan latihan berikutnya.',go:'table'},
 {s:105,e:130,t:'Perbaiki kesalahan',d:'Latih set Yang salah, lalu Pasangan mirip, terutama シ ツ ソ ン.',go:'drill',set:'weak'},
 {s:130,e:140,t:'Istirahat',d:'Tanpa layar. Jeda membantu ingatan mengendap.',go:null},
 {s:140,e:170,t:'Aturan katakana',d:'Garis panjang ー, ッ kecil, ャ ュ ョ, bunyi asing, dan ン. Baca kartunya, lalu latih tiap set.',go:'learn',set:'foreign'},
 {s:170,e:205,t:'Kata inti',d:'Latih 40 kata inti. Satu kata terhitung dikuasai setelah benar dua kali berturut-turut. Kata serapan lainnya untuk hari-hari berikutnya.',go:'drill',set:'core'},
 {s:205,e:225,t:'Simulasi tes',d:'20 soal. 8 di antaranya kata serapan.',go:'test'},
 {s:225,e:240,t:'Tabel Kosong terakhir',d:'Target: 46 benar. Besok pagi, tulis lagi ke-46 huruf di kertas sebelum membuka aplikasi.',go:'table'}
];
const MODES=[
 {m:'base',g:'Huruf',l:'Huruf dasar',ex:'ア カ サ',u:'huruf'},
 {m:'daku',g:'Huruf',l:'Dakuten dan handakuten',ex:'ガ パ',u:'huruf'},
 {m:'combo',g:'Huruf',l:'Huruf kecil ャ ュ ョ',ex:'キャ',u:'huruf'},
 {m:'foreign',g:'Huruf',l:'Bunyi asing',ex:'ファ ティ',u:'bunyi'},
 {m:'core',g:'Kata',l:'Kata inti',ex:'コーヒー',u:'kata'},
 {m:'word',g:'Kata',l:'Semua kata serapan',ex:'テレビ',u:'kata'},
 {m:'pairs',g:'Fokus',l:'Pasangan mirip',ex:'シ ツ',u:'huruf'},
 {m:'weak',g:'Fokus',l:'Yang salah',ex:'',u:'kartu'},
 {m:'all',g:'Fokus',l:'Campuran',ex:'ア ガ キャ',u:'kartu'}
];
const REC_DEFAULT='core';
/* recognizer: katakana share shapes with some kanji and symbols, and へ and り are drawn the same in both scripts.
   The kanji below are what Google's recognizer actually returns first for a well-written katakana. */
const MINE=/^[ァ-ヺー]+$/,OTHER=/^[ぁ-ゖ]+$/;
const NORM={'一':'ー','—':'ー','－':'ー','ｰ':'ー','‐':'ー','-':'ー','―':'ー','─':'ー','力':'カ','工':'エ','口':'ロ','囗':'ロ','二':'ニ','八':'ハ','夕':'タ','卜':'ト','匕':'ヒ','才':'オ','〆':'メ','千':'チ','厶':'ム','又':'ヌ','丿':'ノ','三':'ミ','へ':'ヘ','べ':'ベ','ぺ':'ペ','り':'リ'};
