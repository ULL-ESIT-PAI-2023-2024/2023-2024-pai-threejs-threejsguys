/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Oscar Garcia Gonzalez
 * @since March 29 2022
 * @desc funcionamiento con la clase main
*/

import * as THREE from 'three';

/**
 * Función principal que inicializa la aplicación.
 */
function init() {
  const scene = new THREE.Scene();

  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 5, 20);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const cubeSize = 4;
  const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: 'blue' });
  const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
  cubeMesh.position.set(cubeSize + 1, cubeSize / 2, 0);
  scene.add(cubeMesh);

  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({ color: 'red' });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
  scene.add(sphereMesh);

  const color = 0xFFFFFF;
  const intensityDirectLight = 150;
  const lightDirect = new THREE.DirectionalLight(color, intensityDirectLight);
  lightDirect.position.set(3, 8, 0);
  scene.add(lightDirect);
  scene.add(lightDirect.target);

  const intensityAmbientLight = 0.3;
  const lightAmbient = new THREE.AmbientLight(color, intensityAmbientLight);
  lightAmbient.position.set(3, 8, 0);
  scene.add(lightAmbient);


  


  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

init();

/** 
 * Forma de compilar: 
 * npx tsc materials.ts 
 * npx webpack
 */