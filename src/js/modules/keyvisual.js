export default class KeyvisualInteraction {

  constructor(el) {
    this.DOM = {el: el};
    this.DOM.pageNation = $('.slick-dots li');

    this.initEvents();
  }

  initEvents() {
    console.log('modules init!');
  }
}