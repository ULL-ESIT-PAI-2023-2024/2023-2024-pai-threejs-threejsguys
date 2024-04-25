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
exports.__esModule = true;
var THREE = require("three");
/**
 * Función principal que inicializa la aplicación.
 */
function init() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: "red" });
    var cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(1, 2, 3); // Rotar el cubo
    scene.add(cube);
    camera.position.z = 5;
    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
}
// Llamar a la función init al cargar la página
init();
// npx tsc main.ts 
// npx webpack
