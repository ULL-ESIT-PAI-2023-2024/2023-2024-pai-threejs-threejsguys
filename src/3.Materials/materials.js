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
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material1 = new THREE.MeshPhongMaterial({
    color: 'yellow',    
    shininess: 150
  });
  const cube1 = new THREE.Mesh(geometry, material1);
  cube1.position.set(-3, 0, 0);
  scene.add(cube1);

  const geometry2 = new THREE.BoxGeometry(1, 1, 1);

  const material2 = new THREE.MeshStandardMaterial({
    color: 'red',    
    shininess: 0, 
    roughness: 100
  });
  const cube2 = new THREE.Mesh(geometry2, material2);
  cube2.position.set(3, 0, 0);
  scene.add(cube2);

  const spotLight = new THREE.SpotLight('white', 300); 
  spotLight.position.set(-3, 2, 5); 
  spotLight.target.position.set(3, -5, 0); 
  scene.add(spotLight);
  scene.add(spotLight.target);

  const helper = new THREE.SpotLightHelper(spotLight); 
  scene.add(helper);



  function render(time) {
    time *= 0.001;
  
    // Rotate cubes
    const speed = 0.2;
    const rot = time * speed;
    cube1.rotation.x = rot;
    cube1.rotation.y = rot;
    cube2.rotation.x = rot;
    cube2.rotation.y = rot;
  
    // Render the scene
    renderer.render(scene, camera);
  
    // Request the next animation frame
    requestAnimationFrame(render);
  }
  
  // Start the animation
  render();
}

init();

/** Forma de Compilar 
 * npx webpack
 */
