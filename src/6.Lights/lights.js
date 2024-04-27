"use strict";
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

  const fov = 60;
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
  cubeMesh.position.set(5, 2, 0);
  scene.add(cubeMesh);

  const sphereRadius = 3;
  const sphereWidthDivisions = 32;
  const sphereHeightDivisions = 16;
  const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
  const sphereMat = new THREE.MeshPhongMaterial({ color: 'red' });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  sphereMesh.position.set(-2, 5, 0);
  scene.add(sphereMesh);

  const color = 'white';
  const intensityDirectLight = 150;
  const lightDirect = new THREE.PointLight(color, intensityDirectLight);
  lightDirect.position.set(6, 8, 5);
  scene.add(lightDirect);
  const helper1 = new THREE.PointLightHelper(lightDirect);
  scene.add(helper1);


  const lightDirect2 = new THREE.PointLight(color, intensityDirectLight);
  lightDirect2.position.set(0, 0, 0);
  scene.add(lightDirect2);
  const helper2 = new THREE.PointLightHelper(lightDirect2);
  scene.add(helper2);

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
