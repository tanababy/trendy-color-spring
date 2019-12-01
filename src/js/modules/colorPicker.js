import Pickr from '@simonwep/pickr/dist/pickr.es5.min';
import blend_colors from "./colorBlender";
import firebaseRdb from "../model/firebase";

export default class colorPicker {

  constructor() {
    this.pickr;
    this.pickedColor;

    this.firebaseDB = new firebaseRdb();
  }

  initEvents(color) {
    this.pickr = Pickr.create({
      el: '.color-picker',
      theme: 'classic', // or 'monolith', or 'nano'
      default: color, //firebaseのデータから持ってくる
      swatches: [
          'rgba(244, 67, 54, 1)',
          'rgba(233, 30, 99, 0.95)',
          'rgba(156, 39, 176, 0.9)',
          'rgba(103, 58, 183, 0.85)',
          'rgba(63, 81, 181, 0.8)',
          'rgba(33, 150, 243, 0.75)',
          'rgba(3, 169, 244, 0.7)',
          'rgba(0, 188, 212, 0.7)',
          'rgba(0, 150, 136, 0.75)',
          'rgba(76, 175, 80, 0.8)',
          'rgba(139, 195, 74, 0.85)',
          'rgba(205, 220, 57, 0.9)',
          'rgba(255, 235, 59, 0.95)',
          'rgba(255, 193, 7, 1)'
      ],
      components: {
          // Main components
          preview: true,
          opacity: true,
          hue: true,
          // Input / output Options
          interaction: {
              hex: false,
              rgba: false,
              hsla: false,
              hsva: false,
              cmyk: false,
              input: true,
              clear: false,
              save: true
          }
      }
    });
    this.onChangeColor();
  }

  onChangeColor() {
    this.pickr.on('save', (color, instance) => {
      this.pickedColor = this.pickr.getColor().toHEXA().toString();
      let blendedColor;

      if (this.pickedColor.length !== 7) {//カラーコードの文字列が多い場合
        blendedColor = blend_colors(this.currentColor, this.pickedColor.slice(0, -2), .5);
      } else {
        blendedColor = blend_colors(this.currentColor, this.pickedColor, .5);
      }

      this.hide();
      this.destroy();
      this.firebaseDB.updatePallette(blendedColor);

    });
  }

  destroy() {
    this.pickr.destroyAndRemove();
  }

  hide() {
    this.pickr.hide();
  }
}