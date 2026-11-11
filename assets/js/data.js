const corridor = [
  {id:'istanbul',name:'İstanbul · Ataşehir',km:0,x:125,y:245},
  {id:'izmit',name:'Kocaeli · İzmit',km:90,x:208,y:252},
  {id:'sakarya',name:'Sakarya · Arifiye',km:141,x:300,y:265},
  {id:'duzce',name:'Düzce · Merkez',km:204,x:396,y:275},
  {id:'bolu',name:'Bolu · Merkez',km:254,x:486,y:296},
  {id:'gerede',name:'Bolu · Gerede',km:306,x:594,y:310},
  {id:'ankara',name:'Ankara · Gölbaşı',km:445,x:811,y:408}
];
const segments = [
  [[145,244],[168,243],[188,252]], [[230,249],[246,246],[268,252]], [[324,282],[363,273]],
  [[424,292],[460,299]], [[505,289],[523,303],[558,295]], [[629,319],[657,343],[689,348],[719,379],[753,385],[773,405]]
];
const vehicles = [
  {id:'togg',name:'Togg T10X V2',capacity:88.5,use:21}, {id:'tesla',name:'Tesla Model Y Long Range',capacity:75,use:18},
  {id:'mercedes',name:'Mercedes-Benz EQB 250+',capacity:70.5,use:20.5}, {id:'renault',name:'Renault Megane E-Tech',capacity:60,use:18.5}
];
const stations = [
  {id:'atasehir',name:'Ataşehir Şarj Noktası',network:'ZES',city:'İstanbul',km:8,x:143,y:221,kw:150,rate:10.9,group:'west',sockets:['ok','busy']},
  {id:'gebze',name:'Gebze Şarj Noktası',network:'Voltrun',city:'Kocaeli',km:55,x:180,y:238,kw:90,rate:9.9,group:'west',sockets:['busy','busy']},
  {id:'izmit',name:'İzmit Otoyol İstasyonu',network:'Eşarj',city:'Kocaeli',km:93,x:216,y:274,kw:180,rate:11.4,sockets:['ok','ok']},
  {id:'sakarya',name:'Arifiye Şarj Noktası',network:'Trugo',city:'Sakarya',km:140,x:296,y:261,kw:180,rate:11.5,sockets:['ok','busy']},
  {id:'duzce',name:'Düzce Merkez İstasyonu',network:'ZES',city:'Düzce',km:204,x:399,y:275,kw:120,rate:10.4,sockets:['ok','ok']},
  {id:'bolu',name:'Bolu Dağı O-4',network:'Trugo',city:'Bolu',km:251,x:474,y:298,kw:180,rate:11.5,sockets:['ok','ok','busy'],acSocket:2},
  {id:'gerede',name:'Gerede Dinlenme Tesisi',network:'ZES',city:'Bolu',km:306,x:593,y:310,kw:120,rate:10.4,sockets:['ok','busy']},
  {id:'kazan',name:'Kahramankazan O-4',network:'Voltrun',city:'Ankara',km:410,x:755,y:386,kw:90,rate:9.9,sockets:['busy','busy']},
  {id:'golbasi',name:'Gölbaşı Şarj Noktası',network:'Trugo',city:'Ankara',km:440,x:824,y:394,kw:180,rate:11.5,sockets:['ok','ok']},
  {id:'eskisehir',name:'Eskişehir Merkez',network:'ZES',city:'Eskişehir',km:null,x:432,y:421,kw:60,rate:9.5,sockets:['ok','busy']},
  {id:'sivrihisar',name:'Sivrihisar DC',network:'Eşarj',city:'Eskişehir',km:null,x:584,y:460,kw:150,rate:11.4,sockets:['fault','fault']}
];
const statusName={ok:'Müsait',busy:'Dolu',fault:'Arızalı'};
const statusIcon={ok:'check',busy:'clock',fault:'alert'};
const reportText={ok:'Şarj başarılı',busy:'Kuyruk var',fault:'Arıza var'};
