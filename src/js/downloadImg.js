// canvas上のイメージを保存
function saveCanvas(saveType){
  var imageType = "image/png";
  var fileName = "novelgame.png";
  if(saveType === "jpeg"){
      imageType = "image/jpeg";
      fileName = "novelgame.jpg";
  }
  var canvas = document.getElementById("canvas");
  // base64エンコードされたデータを取得 「data:image/png;base64,iVBORw0k～」
  var base64 = canvas.toDataURL(imageType);
  // base64データをblobに変換
  var blob = Base64toBlob(base64);
  // blobデータをa要素を使ってダウンロード
  saveBlob(blob, fileName);
}

// Base64データをBlobデータに変換
function Base64toBlob(base64)
{
  // カンマで分割して以下のようにデータを分ける
  // tmp[0] : データ形式（data:image/png;base64）
  // tmp[1] : base64データ（iVBORw0k～）
  var tmp = base64.split(',');
  // base64データの文字列をデコード
  var data = atob(tmp[1]);
  // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
var mime = tmp[0].split(':')[1].split(';')[0];
  //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
var buf = new Uint8Array(data.length);
for (var i = 0; i < data.length; i++) {
      buf[i] = data.charCodeAt(i);
  }
  // blobデータを作成
var blob = new Blob([buf], { type: mime });
  return blob;
}

// 画像のダウンロード
function saveBlob(blob, fileName)
{
  var url = (window.URL || window.webkitURL);
  // ダウンロード用のURL作成
  var dataUrl = url.createObjectURL(blob);
  // イベント作成
  var event = document.createEvent("MouseEvents");
  event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
  // a要素を作成
  var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
  // ダウンロード用のURLセット
  a.href = dataUrl;
  // ファイル名セット
  a.download = fileName;
  // イベントの発火
  a.dispatchEvent(event);
}

const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", saveCanvas);