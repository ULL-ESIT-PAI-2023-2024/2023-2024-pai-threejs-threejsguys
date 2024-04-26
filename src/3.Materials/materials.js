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
    // Crear una luz ambiente
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // color, intensidad
    scene.add(ambientLight);
    // Crear una luz direccional
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // color, intensidad
    directionalLight.position.set(1, 1, 1); // posición de la luz
    scene.add(directionalLight);
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        flatShading: true
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.rotation.set(1, 2, 3);
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
 * npx tsc materials.ts
 * npx webpack
 */
