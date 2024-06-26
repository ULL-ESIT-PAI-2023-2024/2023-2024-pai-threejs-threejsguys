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
  
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 'green' });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.set(1,2,3); 
  scene.add(cube);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

init();

/** 
 * Forma de compilar: 
 * npx webpack
 */
