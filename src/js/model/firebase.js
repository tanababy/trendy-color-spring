export default class firebaseRdb {

  constructor() {
    this.db = firebase.database();
    this.palletteRef = this.db.ref('/pallette');
    this.countRef = this.db.ref('/count');

    // this.initEvents();
  }

  // initEvents(callback) {
  //   this.palletteRef.once('value').then((snapshot) => {//init時の一回だけ作動する
  //     pallette = snapshot.val();

  //     callback();
  //     // colorP.initEvents(pallette);
  //     // colorP.onChangeColor();
  //   });
  // }

  updatePallette(color) {
    this.palletteRef.set(color);
  }
}