export default class initThreeBasic {
  constructor(vertexShader,fragmentShader,texturePath1,texturePath2,texturePath3) {
    this.DOM = {};
    this.DOM.container = document.getElementById('canvas-container');
    this.DOM.textElement = document.getElementById('text');
    this.textRect;
    this.fixedAxis;
    this.meshInitOffsetY = 0;
    this.geometry;
    this.material;
    this.camera = new THREE.Camera();
    this.light;
    this.scene = new THREE.Scene();
    this.mesh;
    this.loader = new THREE.TextureLoader();
    this.renderer = new THREE.WebGLRenderer();

    this.mouseP = new THREE.Vector2();
    this.scrollP = new THREE.Vector2();

    this.mousemoveFn = e => {
      this.mouseCoordGet(e.clientX, e.clientY);
    };

    this.scrollFn = e => {
      this.scrollPositionGet();
    };

    this.initDomEvents();
    this.initThree();
  }

  initDomEvents() {
    document.addEventListener("mousemove", this.mousemoveFn, false);
    document.addEventListener("scroll", this.scrollFn, false);
  }

  mouseCoordGet(x,y) {
    this.mouseP.x =  x - (window.innerWidth / 2);// 原点を中心に持ってくる
    this.mouseP.y = -y + (window.innerHeight / 2);// 軸を反転して原点を中心に持ってくる

    // ライトの xy座標 をマウス位置にする
    this.light.position.x = this.mouseP.x;
    this.light.position.y = this.mouseP.y;
  }

  scrollPositionGet() {
    this.scrollP.x = window.pageXOffset;
    this.scrollP.y = window.pageYOffset;
  }

  initThree() {//three.js開始
    this.getDomRect();
    this.domAxisToGl();
    this.setCanvas();
    this.setPixelRatio();
    this.setCamera();
    this.setLight();
    this.setGeometry();
    this.setMaterial();
    this.addScene();
    this.setCanvasSize();

    this.renderTick();
  }

  getDomRect() {
    this.textRect = this.DOM.textElement.getBoundingClientRect();
  }

  domAxisToGl() {
    this.fixedAxis = new THREE.Vector2(this.textRect.x - (window.innerWidth / 2) + (this.textRect.width / 2), this.textRect.y - (window.innerHeight / 2) + (this.textRect.height / 2));
  }

  setGeometry() {//ジオメトリ（形状）をセットする〜シェーダーに渡す頂点と考えてOK
    this.geometry = new THREE.BoxGeometry(this.textRect.width, this.textRect.height, 300);
  }

  setPixelRatio() {
    this.renderer.setPixelRatio( window.devicePixelRatio );
  }

  setCanvas() {
    this.DOM.container.appendChild( this.renderer.domElement );
  }

  setCanvasSize() {//canvasを用意する
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  setCamera() {//カメラをセット
    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = (window.innerHeight / 2) / Math.tan(fovRad);
    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, dist * 2);
    this.camera.position.z = dist;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    let axesHelper = new THREE.AxesHelper( dist );
    this.scene.add( axesHelper );
  }

  setLight() {
    this.light = new THREE.PointLight(0x00fa9a);
    this.light.position.set(0, 0, 500);
  }

  setMaterial() {
    this.material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  }

  addScene() {//メッシュ（表示3Dオブジェクト）を作成し、シーンに追加する
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    console.log(this.fixedAxis);
    this.mesh.position.set(this.fixedAxis.x, -(this.fixedAxis.y + this.scrollP.y), (-300 / 2));
    this.meshInitOffsetY = this.mesh.position.y;
    // this.mesh.rotation.x = Math.PI / 4;
    // this.mesh.rotation.y = Math.PI / 4;
    this.scene.add( this.light );
    this.scene.add( this.mesh );
  }

  renderTick() {//レンダリング開始
    this.renderer.render(this.scene, this.camera);
    // this.renderer.setScissorTest(true);
    let width = this.textRect.right - this.textRect.left;
    let height = this.textRect.bottom - this.textRect.top;
    let left = this.textRect.left;
    let bottom = this.renderer.domElement.clientHeight - this.textRect.bottom;
    // this.renderer.setViewport( 400, 375, 300, 300 );
    // this.renderer.setScissor(400, 375, 300, 300);
    // this.renderer.setViewport( left, bottom, width, height );
    // this.renderer.setScissor( left, bottom, width, height );
    this.mesh.position.y = this.meshInitOffsetY + this.scrollP.y;

    requestAnimationFrame(this.renderTick.bind(this));
  }
}