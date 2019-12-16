// import "./styles.css";

import { WaterTexture } from "./TouchTexture";
// console.clear();
export default class App {
  constructor() {
    this.waterTexture = new WaterTexture({ debug: true });

    this.tick = this.tick.bind(this);
    this.init();
  }
  init() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.tick();
  }
  onMouseMove(ev) {
    const point = {
      x: ev.clientX / window.innerWidth,
      y: ev.clientY / window.innerHeight
    };

    this.waterTexture.addPoint(point);
  }
  tick() {
    this.waterTexture.update();
    requestAnimationFrame(this.tick);
  }
}
