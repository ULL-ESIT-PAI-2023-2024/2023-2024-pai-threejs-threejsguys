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

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: "green" });
  const cube = new THREE.Mesh(geometry, material);

  cube.rotation.set(1,2,3); // Rotar el cubo

  scene.add(cube);

  camera.position.z = 5;

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  render();
}

init();


/** 
 * Forma de compilar: 
 * npx tsc simpleProgram.ts 
 * npx webpack
 */
