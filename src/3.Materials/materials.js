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
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 'red',    // rojo
    shininess: 150
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.set(1,2,3); 

  scene.add(cube);

  const pointLight = new THREE.PointLight('white', 150); 
  pointLight.position.set(0, 0, 5); 
  scene.add(pointLight);

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

init();

/** Forma de Compilar 
 * npx webpack
 */
