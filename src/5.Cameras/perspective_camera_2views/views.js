// Importing necessary modules from Three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Importing OrbitControls for camera manipulation
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'; // Importing GUI for creating graphical user interface controls

function main() {
  // Selecting the canvas and DOM elements for views
  const canvas = document.querySelector('#canvas');
  const view1Elem = document.querySelector('#view1');
  const view2Elem = document.querySelector('#view2');

  // Creating WebGL renderer with antialiasing enabled
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

  // Defining camera properties
  const fov = 45;
  const aspect = 2; // the canvas default
  const near = 5;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 10, 20); // Setting initial camera position

  // Creating a helper for the camera
  const cameraHelper = new THREE.CameraHelper(camera);

  // Helper class for controlling minimum and maximum values
  class MinMaxGUIHelper {
    constructor(obj, minProp, maxProp, minDif) {
      this.obj = obj;
      this.minProp = minProp;
      this.maxProp = maxProp;
      this.minDif = minDif;
    }
    get min() {
      return this.obj[this.minProp];
    }
    set min(v) {
      this.obj[this.minProp] = v;
      this.obj[this.maxProp] = Math.max(
        this.obj[this.maxProp],
        v + this.minDif
      );
    }
    get max() {
      return this.obj[this.maxProp];
    }
    set max(v) {
      this.obj[this.maxProp] = v;
      this.min = this.min; // this will call the min setter
    }
  }

  // Creating GUI for camera properties adjustment
  const gui = new GUI();
  gui.add(camera, 'fov', 1, 180); // Adding control for field of view
  const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1);
  gui
    .add(minMaxGUIHelper, 'min', 0.1, 50, 0.1)
    .name('near'); // Adding control for near plane
  gui
    .add(minMaxGUIHelper, 'max', 0.1, 50, 0.1)
    .name('far'); // Adding control for far plane

  // Creating OrbitControls for camera manipulation in the first view
  const controls = new OrbitControls(camera, view1Elem);
  controls.target.set(0, 5, 0); // Setting the target point for the controls
  controls.update(); // Updating controls

  // Creating a second perspective camera
  const camera2 = new THREE.PerspectiveCamera(60, 2, 0.1, 500); // fov, aspect, near, far
  camera2.position.set(40, 10, 30); // Setting initial position for the second camera
  camera2.lookAt(0, 5, 0); // Setting the look-at point for the second camera

  // Creating OrbitControls for camera manipulation in the second view
  const controls2 = new OrbitControls(camera2, view2Elem);
  controls2.target.set(0, 5, 0); // Setting the target point for the controls
  controls2.update(); // Updating controls

  // Creating a scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('black'); // Setting scene background color
  scene.add(cameraHelper); // Adding camera helper to the scene

  // Adding a textured plane to the scene
  {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'https://threejs.org/manual/examples/resources/images/checker.png'
    ); // Loading texture for the plane
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize); // Creating plane geometry
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -0.5;
    scene.add(mesh); // Adding plane mesh to the scene
  }

  // Adding a cube to the scene
  {
    const cubeSize = 4;
    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize); // Creating cube geometry
    const cubeMat = new THREE.MeshPhongMaterial({ color: '#8AC' });
    const mesh = new THREE.Mesh(cubeGeo, cubeMat);
    mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(mesh); // Adding cube mesh to the scene
  }

  // Adding a sphere to the scene
  {
    const sphereRadius = 3;
    const sphereWidthDivisions = 32;
    const sphereHeightDivisions = 16;
    const sphereGeo = new THREE.SphereGeometry(
      sphereRadius,
      sphereWidthDivisions,
      sphereHeightDivisions
    ); // Creating sphere geometry
    const sphereMat = new THREE.MeshPhongMaterial({ color: '#CA8' });
    const mesh = new THREE.Mesh(sphereGeo, sphereMat);
    mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(mesh); // Adding sphere mesh to the scene
  }

  // Adding directional light to the scene
  {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light); // Adding light to the scene
    scene.add(light.target); // Adding light target to the scene
  }

  // Function to resize the renderer to match the display size
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Function to set scissor for an element
  function setScissorForElement(elem) {
    const canvasRect = canvas.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();

    // compute a canvas relative rectangle
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // setup the scissor to only render to that part of the canvas
    const positiveYUpBottom = canvasRect.height - bottom;
    renderer.setScissor(left, positiveYUpBottom, width, height);
    renderer.setViewport(left, positiveYUpBottom, width, height);

    // return the aspect
    return width / height;
  }

  // Function to render the scene
  function render() {
    resizeRendererToDisplaySize(renderer);

    // turn on the scissor
    renderer.setScissorTest(true);

    // render the original view
    {
      const aspect = setScissorForElement(view1Elem);

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      cameraHelper.update();

      // don't draw the camera helper in the original view
      cameraHelper.visible = false;

      scene.background.set(0x000000); // Setting background color for the first view

      // render
      renderer.render(scene, camera);
    }

    // render from the 2nd camera
    {
      const aspect = setScissorForElement(view2Elem);

      // adjust the camera for this aspect
      camera2.aspect = aspect;
      camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      cameraHelper.visible = true;

      scene.background.set(0x000040); // Setting background color for the second view

      renderer.render(scene, camera2);
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main(); // Calling the main function to start the application