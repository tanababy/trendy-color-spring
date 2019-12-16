import TweenMax from "gsap/TweenMax";
import ScrollToPlugin from "gsap/ScrollToPlugin";
const plugins = [ScrollToPlugin];

//util
import BrowserCheck from "./utils/browserCheck";
import gsapEasing from "./utils/gsapEasing";

//modules
import colorPicker from "./modules/colorPicker";
import mousePointer from "./modules/mousePointer";

//model
import firebaseRdb from "./model/firebase";

//three.js
import vertexShader from './shader/vertexShader.vert';
import fragmentShader from './shader/fragmentShader.frag';
import initShader from "./model/shaderCompile";
import App from "./App";

// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyB6MBHpgCNs2XeuNdr8QPvF7GsNT_SsBko",
  authDomain: "project-trendy-color-spring.firebaseapp.com",
  databaseURL: "https://project-trendy-color-spring.firebaseio.com",
  projectId: "project-trendy-color-spring",
  storageBucket: "project-trendy-color-spring.appspot.com",
  messagingSenderId: "1022152638833",
  appId: "1:1022152638833:web:7ee487a0e598f2dbe6b6d0",
  measurementId: "G-V1PVE118Q9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

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
  /* three.js init
  /*===================================================*/
  // const kv = new initShader(vertexShader,fragmentShader);
  const myApp = new App();

  /*===================================================*/
  /* mouse pointer
  /*===================================================*/
  const pointer = new mousePointer();

  /*===================================================*/
  /* scroll color change
  /*===================================================*/
	(function () {
    let $lazyTarget = Array.from(document.querySelectorAll(".is-enter-irritate"));
    let incrementNum = 0;
    let options = {
      rootMargin: "-10% 0%",
      threshold: .25
    };

    // 初期化
    let observer = new IntersectionObserver(callback, options);

    $lazyTarget.forEach(function (element) {
      observer.observe(element);
    });

    // コールバック
    function callback(entries, object) {
      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {//交差していないとき
          $('body').removeClass(`bg-irritate`);
          // incrementNum--;
        } else {//交差したとき
          // incrementNum++;
          $('body').addClass(`bg-irritate`);
          // console.log(incrementNum);
        }

        // 監視の解除
        // object.unobserve(entry.target);
      });
    };
  })();

	(function () {
    let $lazyTarget = Array.from(document.querySelectorAll(".is-enter-result"));
    let incrementNum = 0;
    let options = {
      rootMargin: "40% 0%",
      threshold: .25
    };

    // 初期化
    let observer = new IntersectionObserver(callback, options);

    $lazyTarget.forEach(function (element) {
      observer.observe(element);
    });

    // コールバック
    function callback(entries, object) {
      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {//交差していないとき
          $('body').removeAttr('style');
        } else {//交差したとき
          let firebaseDB = new firebaseRdb();

          firebaseDB.palletteRef.once('value').then((snapshot) => {
            $('body').css('background-color', snapshot.val());
            $('.section-result__hx').text(snapshot.val());
          });

          firebaseDB.rgbRef.once('value').then((snapshot) => {
            $('.section-result__rgb-unit--r').text(`R: ${Math.floor(snapshot.val().rgb.r)}`);
            $('.section-result__rgb-unit--g').text(`G: ${Math.floor(snapshot.val().rgb.g)}`);
            $('.section-result__rgb-unit--b').text(`B: ${Math.floor(snapshot.val().rgb.b)}`);
          });

          firebaseDB.countRef.once('value').then((snapshot) => {
            $('.section-result__count').text(`Number of votes: ${snapshot.val()}`);
          });
        }

        // 監視の解除
        // object.unobserve(entry.target);
      });
    };
  })();

  /*===================================================*/
  /* firebase realtime database
  /*===================================================*/
  const firebaseDB = new firebaseRdb();
  const colorP = new colorPicker();
  let updateCount = 0;
  
  firebaseDB.palletteRef.once('value').then((snapshot) => {//init時
    colorP.initEvents(snapshot.val());
  });

  firebaseDB.palletteRef.on('value', (snapshot) => {//パレットの値が更新されたら
    if (updateCount == 0) {//初期アクセス時
      updateCount++;
      return;

    } else {//2回目以降のパレット更新
      setTimeout(() => {
        $('.color-picker-wrap').append('<div class="color-picker"></div>');
        colorP.initEvents(snapshot.val());
      }, 1000);
    }
  });
});