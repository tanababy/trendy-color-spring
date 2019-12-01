import TweenMax from "gsap/TweenMax";
import ScrollToPlugin from "gsap/ScrollToPlugin";
const plugins = [ScrollToPlugin];

// import '@simonwep/pickr/dist/themes/classic.min.css';   // 'classic' theme

import BrowserCheck from "./utils/browserCheck";
import gsapEasing from "./utils/gsapEasing";
import colorPicker from "./modules/colorPicker";
import firebaseRdb from "./model/firebase";

$(function () {
  /*===================================================*/
  /* device/BrowserCheck
  /*===================================================*/
  BrowserCheck();

  /*===================================================*/
  /* gsap CustomEase Setting
  /*===================================================*/
  gsapEasing();

  /*===================================================*/
  /* firebase realtime database
  /*===================================================*/
  // let $input = document.querySelector('#message_input');
  // let $output = document.querySelector('#message_output');

  let firebaseDB = new firebaseRdb();
  let colorP = new colorPicker();
  let updateCount = 0;
  
  firebaseDB.palletteRef.once('value').then((snapshot) => {//init時
    colorP.initEvents(snapshot.val());
  });

  firebaseDB.palletteRef.on('value', (snapshot) => {//パレットの値が更新されたら
    if (updateCount == 0) {
      updateCount++;
      return;

    } else {

      setTimeout(() => {
        $('.color-picker-wrap').append('<div class="color-picker"></div>');
        colorP.initEvents(snapshot.val());
      }, 1000);
    }
  });

  // let db = firebase.database();
  // let palletteRef = db.ref('/pallette');
  // let pallette;
  // let currentPallette;
  // let countRef = db.ref('/count');
  // let countNumber = 0;

  // countRef.on('value', (snapshot) => {//データに変更があったとき的なイベントリスナー（双方向）
  //   countNumber = Number(snapshot.val());
  // });

  // palletteRef.once('value').then((snapshot) => {//init時の一回だけ作動する
  //   pallette = snapshot.val();

  //   colorP.initEvents(pallette);
  //   colorP.onChangeColor();
  // });

  // palletteRef.on('value', (snapshot) => {//データに変更があったとき的なイベントリスナー（双方向）
  //   currentPallette = snapshot.val();
  //   colorP.initEvents(currentPallette);
  //   colorP.onChangeColor();
  // });


  // $input.addEventListener('input', e => {
  //   let target = e.target;
  //   palletteRef.set(target.value);
  //   countRef.set(countNumber++);
  // });

  // console.log(blend_colors('#000', '#fff', .5));
});
