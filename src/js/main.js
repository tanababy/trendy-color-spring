import TweenMax from "gsap/TweenMax";
import ScrollToPlugin from "gsap/ScrollToPlugin";
const plugins = [ScrollToPlugin];

import BrowserCheck from "./utils/browserCheck";
import gsapEasing from "./utils/gsapEasing";
import KeyvisualInteraction from "./modules/keyvisual";

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
  /* init modules
  /*===================================================*/
  let keyvisual = new KeyvisualInteraction();
});
