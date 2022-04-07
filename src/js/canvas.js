function resizeImg(imgData) {

  //画像オブジェクトを生成
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 800;
  const ctx = canvas.getContext('2d');
  ctx.fillRect(10, 210, 340, 80); 

  var img = new Image();
 

  img.onload = (event) => {
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL();
  }
  img.src = imgData;
}

// document.querySelector('#selectBgImg').addEventListener('change', (event) => {
//   const file = event.target.files[0]
//   if (!file) return
  
//   const reader = new FileReader()
//   reader.onload = (event) => {
//     imgData = event.target.result

//     const img = new Image();
//     img.onload = () => {
//       const orgWidth  = img.width;  // 元の横幅を保存
//       const orgHeight = img.height; // 元の高さを保存
//       const newWidth = 360;  // 横幅を360pxにリサイズ
//       const newHeight = orgHeight * (newWidth / orgWidth); // 高さを横幅の変化割合に合わせる
//       //画像オブジェクトを生成
//       const canvas = document.createElement('canvas');
//       canvas.width = newWidth;
//       canvas.height = newHeight;
//       const ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0, newWidth, newHeight);
//       document.querySelector('#bgImg').src = canvas.toDataURL()
//     }
//     img.src = imgData;
//   }
//   reader.readAsDataURL(file)
// })


document.querySelector('#selectPeopleImg').addEventListener('change', (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (event) => {
    imgData = event.target.result

    const img = new Image();
    img.onload = () => {
      const orgWidth  = img.width;  // 元の横幅を保存
      const orgHeight = img.height; // 元の高さを保存
      const newWidth = 300;  // 横幅を300pxにリサイズ
      const newHeight = orgHeight * (newWidth / orgWidth); // 高さを横幅の変化割合に合わせる
      //画像オブジェクトを生成
      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      document.querySelector('#peopleImg').src = canvas.toDataURL()
    }
    img.src = imgData;
  }
  reader.readAsDataURL(file)
})

const canvasView = document.getElementById("canvasView");
canvasView.addEventListener("click", function () {
  // 名前取得
  let nameText = document.getElementById('nameText');
  let name;
  if(nameText.value == ''){
    name = '名無し'
  }else{
    name = nameText.value;
  }
  // セリフ取得
  let wordsText = document.getElementById('wordsText');
  let words;
  if(wordsText.value == ''){
    words = 'セリフなし(´·ω·`)'
  }else{
    words = wordsText.value;
  }

  // 背景選択取得
  let selectBgImg = document.getElementsByName('bgImg');
  let bgImg
  for (let i = 0; i < selectBgImg.length; i++){
      if (selectBgImg.item(i).checked){
        bgImg = selectBgImg.item(i).value;
      }
  }

  // 人物選択取得
  const peopleImg = new Image();
  peopleImg.src = document.getElementById('peopleImg').src;

  // for (let i = 0; i < selectPeopleImg.length; i++){
  //     if (selectPeopleImg.item(i).checked){
  //       peopleImg = selectPeopleImg.item(i).value;
  //     }
  // }


  // 改行
  var textLimit = 32;
  var tmp = words.split("\n");

  var kaigyouBody = [];

  for (var key in tmp) {
    if(tmp[key] != ""){
      if(tmp[key].length >= textLimit){
        let oneSplit = tmp[key].split('');
        let oneBody = [];
        for (var key2 in oneSplit) {
          //key2 1文字目でなく、さらに textLimit の倍数の数値なら改行コードを挿入
          if(key2 != 0 && key2%textLimit == 0){
            oneBody.push("\n");
          }
          oneBody.push(oneSplit[key2]);
        }
        kaigyouBody.push(oneBody.join(""));
      } else {
        kaigyouBody.push(tmp[key]);
      }
    }
  }


  var result = kaigyouBody.join("\n");

  // キャンバスの取得
  const canvas = document.createElement('canvas');
  const canvasWidth = 360;
  const canvasHeight = 300;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  // コンテキスト取得
  const ctx = canvas.getContext("2d");
  // 画像のパス
  const directory = "./img/";
  const srcs = [
    bgImg
    // "balloon.png",
    // "name_balloon.png",
  ];
  const imageList = [];
  for (let i in srcs) {
    imageList[i] = new Image();
    imageList[i].src = directory + srcs[i];
  }
  let loadedCount = 1;
  for (let i in imageList) {
    imageList[i].onload = function () {
      if (loadedCount == imageList.length) {
        // 背景
        ctx.drawImage(imageList[0], 0, 0, imageList[0].width / 2, imageList[0].height / 2);
        // 人影
        const newPeopleImg = new Image();

        ctx.drawImage(peopleImg, 110, 50, peopleImg.width / 1.5, peopleImg.height / 1.5);
        // 吹き出し
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + [255, 255, 255, 0.8] + ")";
        ctx.fillRect(10, 210, 340, 80);   
        // // 名前吹き出し
        ctx.beginPath();
        ctx.fillStyle = "rgba(" + [120, 170, 255, 1] + ")";
        ctx.fillRect(10, 200, 120, 25);   
        // 名前テキスト
        ctx.beginPath();
        ctx.font = "12px sunserif";
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillText(name, 20, 218);
        // 本文
        // 設定
        // 最高７２文字
        var text = result;	// テキスト (2行)
        var fontSize = 10;	// フォントサイズ
        var lineHeight = 1.1618;	// 行の高さ (フォントサイズに対する倍率)
        var x = 20;	// 水平位置
        var y = 230;	// 垂直位置

        ctx.beginPath();
        ctx.font = "10px sunserif";
        ctx.fillStyle = "rgb(10, 10, 10)";
        // 1行ずつ描画
        for( var lines=text.split( "\n" ), i=0, l=lines.length; l>i; i++ ) {
          var line = lines[i] ;
          var addY = fontSize ;

          // 2行目以降の水平位置は行数とlineHeightを考慮する
          if ( i ) addY += fontSize * lineHeight * i ;

          ctx.fillText( line, x + 0, y + addY ) ;
        }
        document.querySelector('#canvas').src = canvas.toDataURL()
      }
      loadedCount++;
    };
  };
}, false);