//=============================
// get mouse position (マウスカーソルの絶対座標を返す)
//=============================
let getMousePos = e => {
  let posx = 0;
  let posy = 0;
  //スクロール分ずれるのを回避
  let docScrolls = { left: document.body.scrollLeft + document.documentElement.scrollLeft, top: document.body.scrollTop + document.documentElement.scrollTop };
  if (!e) e = window.event;
  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  let mousePos = { x: posx - docScrolls.left, y: posy - docScrolls.top }
  // let mousePos = { x: posx, y: posy }

  return mousePos;
}

export default class mousePointer {

  constructor(el) {
    this.pointer = $('.mouse-pointer');
    this.pointerChild = this.pointer.find('.mouse-pointer__point');
    this.pointerHalfWidth = this.pointerChild.width() / 2;
    this.pointerHalfHeight = this.pointerChild.height() / 2;
    this.pointerVote = this.pointer.find('.mouse-pointer__vote');
    this.pointerVoteHalfWidth = this.pointerVote.width() / 2;
    this.pointerVoteHalfHeight = this.pointerVote.height() / 2;
    this.pointerIrritate = this.pointer.find('.mouse-pointer__irritate');
    this.pointerIrritateHalfWidth = this.pointerIrritate.width() / 2;
    this.pointerIrritateHalfHeight = this.pointerIrritate.height() / 2;

    this.mouseP;

    this.mousemovePointerFn = e => {
      this.stalker(e);
    };
    // this.mousemoveFn = e => {
    //   this.tilt(e);
    // };
    // this.mouseleaveFn = e => {
    //   this.removeTilt(e);
    // };

    this.initEvents();
  }

  initEvents() {
    if ($('body').hasClass('iphone') || $('body').hasClass('android') || $('body').hasClass('ipad')) {
      // do nothing...
    } else {
      // $('body').on("mousemove scroll", this.mousemovePointerFn);
      $(document).on("mousemove", this.mousemovePointerFn);
      // this.DOM.el.on("mousemove", this.mousemoveFn);
      // this.DOM.el.on("mouseleave", this.mouseleaveFn);
    }

    $('.section-vote').each((idx,el) => {
      $(el).on('mouseenter', () => {
        this.pointer.addClass('is-vote');
      });
      $(el).on('mouseleave', () => {
        this.pointer.removeClass('is-vote');
      });
    });

    $('.section-irritate').each((idx,el) => {
      $(el).on('mouseenter', () => {
        this.pointer.addClass('is-irritate');
      });
      $(el).on('mouseleave', () => {
        this.pointer.removeClass('is-irritate');
      });
    });
  }

  stalker(e) {
    this.mouseP = getMousePos(e);

    TweenMax.to(this.pointerChild,.2, {
      x: this.mouseP.x - this.pointerHalfWidth,
      y: this.mouseP.y - this.pointerHalfHeight,
    });
    TweenMax.to(this.pointerVote,.2, {
      x: this.mouseP.x - this.pointerVoteHalfWidth,
      y: this.mouseP.y - this.pointerVoteHalfHeight,
    });
    TweenMax.to(this.pointerIrritate,.2, {
      x: this.mouseP.x - this.pointerIrritateHalfWidth,
      y: this.mouseP.y - this.pointerIrritateHalfHeight,
    });
  }

  // tilt(e) {
  //   const tiltconfig = {
  //     kvImgLarge: { translation: { x: [-60, 60], y: [-30, 30] } },
  //     kvImgSmall: { translation: { x: [-10, 10], y: [-15, 15] } },
  //     toolTip: { translation: { x: [-20, 20], y: [-20, 20] } },
  //     aboutImage: { translation: { x: [-20, 20], y: [-20, 20] } },
  //     marieGallery: {
  //       translation1: { x: [-20, 20], y: [-20, 20] },
  //       translation2: { x: [-40, 40], y: [-40, 40] },
  //       translation3: { x: [-30, 30], y: [-30, 30] },
  //       translation4: { x: [-20, 20], y: [-20, 20] },
  //       translation5: { x: [-10, 10], y: [-10, 10] },
  //       translation6: { x: [-10, 10], y: [-10, 10] },
  //       translation7: { x: [-25, 25], y: [-25, 25] },
  //       translation8: { x: [-35, 35], y: [-35, 35] }
  //     }
  //   };

  //   let mousepos = getMousePos(e);
  //   let t1 = tiltconfig.kvImgLarge.translation;
  //   let t2 = tiltconfig.kvImgSmall.translation;
  //   let t3 = tiltconfig.toolTip.translation;
  //   let t4 = tiltconfig.aboutImage.translation;

  //   TweenMax.to(this.DOM.largeImage, 5, {
  //       ease: Expo.easeOut,
  //       //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //       x: (t1.x[1] - t1.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + t1.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //       y: (t1.y[1] - t1.y[0]) / (this.DOM.el.width()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + t1.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.smallImage, 5, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (t2.x[1] - t2.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + t2.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (t2.y[1] - t2.y[0]) / (this.DOM.el.width()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + t2.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.tipIcon, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (t3.x[1] - t3.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + t3.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (t3.y[1] - t3.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + t3.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage1, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation1.x[1] - tiltconfig.marieGallery.translation1.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation1.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation1.y[1] - tiltconfig.marieGallery.translation1.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation1.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage2, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation2.x[1] - tiltconfig.marieGallery.translation2.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation2.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation2.y[1] - tiltconfig.marieGallery.translation2.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation2.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage3, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation3.x[1] - tiltconfig.marieGallery.translation3.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation3.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation3.y[1] - tiltconfig.marieGallery.translation3.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation3.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage4, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation4.x[1] - tiltconfig.marieGallery.translation4.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation4.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation4.y[1] - tiltconfig.marieGallery.translation4.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation4.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage5, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation5.x[1] - tiltconfig.marieGallery.translation5.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation5.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation5.y[1] - tiltconfig.marieGallery.translation5.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation5.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage6, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation6.x[1] - tiltconfig.marieGallery.translation6.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation6.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation6.y[1] - tiltconfig.marieGallery.translation6.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation6.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage7, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation7.x[1] - tiltconfig.marieGallery.translation7.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation7.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation7.y[1] - tiltconfig.marieGallery.translation7.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation7.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryImage8, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (tiltconfig.marieGallery.translation8.x[1] - tiltconfig.marieGallery.translation8.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation8.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (tiltconfig.marieGallery.translation8.y[1] - tiltconfig.marieGallery.translation8.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation8.y[0]//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryText1, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: ((tiltconfig.marieGallery.translation1.x[1] - tiltconfig.marieGallery.translation1.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation1.x[0]) * -1,//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: ((tiltconfig.marieGallery.translation1.y[1] - tiltconfig.marieGallery.translation1.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation1.y[0]) * -1//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.marieGalleryText6, 2, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: ((tiltconfig.marieGallery.translation6.x[1] - tiltconfig.marieGallery.translation6.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + tiltconfig.marieGallery.translation6.x[0]) * -1,//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: ((tiltconfig.marieGallery.translation6.y[1] - tiltconfig.marieGallery.translation6.y[0]) / (this.DOM.el.height()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + tiltconfig.marieGallery.translation6.y[0]) * -1//y軸も同じ
  //   });

  //   TweenMax.to(this.DOM.aboutImage, 5, {
  //     ease: Expo.easeOut,
  //     //中心を調整したマウス座標に、どれだけ動かしたいか？の比率を掛け算する。例えばマウス座標に対して2倍動かしたいなら比率は2になる。
  //     x: (t4.x[1] - t4.x[0]) / (this.DOM.el.width()) * (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft()) + t4.x[0],//マウス座標の値は左側が0だから中心を調整する必要がある
  //     y: (t4.y[1] - t4.y[0]) / (this.DOM.el.width()) * (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop()) + t4.y[0]//y軸も同じ
  // });

    // TweenMax.to(this.DOM.globalNavBg, 2, {
    //   ease: Expo.easeOut,
    //   rotationY: (mousepos.x - this.DOM.el.offset().left + $(window).scrollLeft() - (this.DOM.el.width() / 2)) * 0.004, //座標を真ん中にして、テキトー（勘）な割合を掛け算する
    //   rotationX: (mousepos.y - this.DOM.el.offset().top + $(window).scrollTop() - (this.DOM.el.height() / 2)) * -0.008, //座標を真ん中にして、テキトー（勘）な割合を掛け算する
    //   scale: 1.1,
    //   transformOrigin: "50% 50%"
    // });

  // }

  // removeTilt() {
  //   TweenMax.to(this.DOM.largeImage, 2, {
  //     ease: Expo.easeOut,
  //     x: 0,
  //     y: 0
  //   });

  //   TweenMax.to(this.DOM.smallImage, 2, {
  //     ease: Expo.easeOut,
  //     x: 0,
  //     y: 0
  //   });

  //   TweenMax.to(this.DOM.tipIcon, 1, {
  //     ease: Elastic.easeOut.config(1, 0.4),
  //     x: 0,
  //     y: 0
  //   });

  //   TweenMax.to(this.DOM.aboutImage, 1, {
  //     ease: Expo.easeOut,
  //     x: 0,
  //     y: 0
  //   });

    // TweenMax.to(this.DOM.globalNavBg, 1, {
    //   ease: Expo.easeOut,
    //   rotationY: 0,
    //   rotationX: 0,
    //   scale: 1.1,
    // });
  // }

}