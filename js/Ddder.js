import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const TRESHOLD = 0.2;
const LINE_MAX = 4;
class Ddder {
  scene;
  camera;
  renderer;
  controls;
  animating = false;
  origin = {
    x: 0,
    y: 0,
    z: 0
  };
  pointer;
  mouse;
  moveTimeout;
  disableAnimateLook = false;
  lastPosition = { x: 0, y: 0 }

  constructor() {
    this.origin = new THREE.Vector2();
    this.pointer = new THREE.Vector3(0, 0, 0);
    this.mouse = { x: 0 , y: 0 };
  }

  setSize(width, height) {
    this.renderer.setSize(width, height);
  }

  setup(width, height) {
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.setSize(width, height);


    this.renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild( this.renderer.domElement );

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
    this.boom = new THREE.Group();
    this.boom.add(this.camera);
    this.scene.add(this.boom);
    this.camera.position.set( 0, 0, 10 );
    this.camera.lookAt( 0, 0, 0 );

    // this.showHelpers();

    this.initLook();

    this.render();

    this.initOrbit();
  }

  showHelpers() {
    const axesHelper = new THREE.AxesHelper( 20 );
    this.scene.add( axesHelper );
  }

  randomNum() {
    return Math.ceil(Math.random() * (10 - 7 + 1)) * (Math.round(Math.random()) ? 1 : -1);
  }

  create() {
    for (let i = 0; i < LINE_MAX; i ++) {
      this.drawLine({ x: this.randomNum(), y: this.randomNum(), z: this.randomNum() });
    }
  }

  initOrbit() {
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
  }

  initLook() {
    this.renderer.domElement.addEventListener("mousemove", (e) => {
      clearTimeout(this.moveTimeout);
      this.animate = true;
      this.animateLook();

      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      this.moveTimeout = setTimeout(() => {
        this.animating = false;
      }, 500);
    });
  }

  animateLook() {
    if (this.disableAnimateLook) return;

    requestAnimationFrame( () => this.animating && this.animateLook() );

    const winWidth = this.renderer.domElement.width / window.devicePixelRatio;
    const winHeight = this.renderer.domElement.height / window.devicePixelRatio;

    const normX = (( this.mouse.x - winWidth / 2 ) / (winWidth / 2));
    const normY = (( this.mouse.y - winHeight / 2 ) / (winHeight / 2));

    this.boom.rotation.y = normX * TRESHOLD;
    this.boom.rotation.x = normY * TRESHOLD;

    this.render();
  }

  setOriginX(x) {
    this.origin.x = (x / window.innerWidth) * 2 - 1;
  }

  setOriginY(y) {
    this.origin.y = -(y / window.innerHeight) * 2 + 1;
  }

  drawLine({ x, y, z}, color = 0x000000) {
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(this.origin, this.camera);

    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersectPoint = new THREE.Vector3();
    raycaster.ray.intersectPlane(planeZ, intersectPoint);

    const points = [];
    points.push( intersectPoint );
    points.push( new THREE.Vector3( x, y, z ) );

    const geometry = new THREE.BufferGeometry().setFromPoints( points );

    const material = new THREE.LineBasicMaterial( { color } );

    const line = new THREE.Line( geometry, material );

    this.scene.add( line );
    this.render();
  }

  render() {
    this.renderer.render( this.scene, this.camera );
  }

  clear() {
    while(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0]);
    }
  }
}

export default Ddder;
