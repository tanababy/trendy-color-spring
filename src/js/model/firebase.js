export default class firebaseRdb {

  constructor() {
    this.db = firebase.database();
    this.palletteRef = this.db.ref('/pallette');
    this.rgbRef = this.db.ref('/rgb');
    this.countRef = this.db.ref('/count');

    // this.initEvents();
  }

  // getCurrentPallette() {
  // }

  updatePallette(color) {
    this.palletteRef.set(color);//色の更新
  }

  updateRgb(arr) {
    this.rgbRef.set({
      rgb: {
        r: arr[0],
        g: arr[1],
        b: arr[2],
      }
    });//RGB配列の更新
  }

  incrementCount(num) {
    this.countRef.set(num + 1);//インクリメント
  }
}