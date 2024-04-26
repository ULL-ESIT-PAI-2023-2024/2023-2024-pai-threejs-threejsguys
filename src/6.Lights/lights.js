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
    var fov = 45;
    var aspect = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 100;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var cubeSize = 4;
    var cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMat = new THREE.MeshPhongMaterial({ color: 'blue' });
    var cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    cubeMesh.position.set(cubeSize + 1, cubeSize / 2, 0);
    scene.add(cubeMesh);
    var sphereRadius = 3;
    var sphereWidthDivisions = 32;
    var sphereHeightDivisions = 16;
    var sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);
    var sphereMat = new THREE.MeshPhongMaterial({ color: 'red' });
    var sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
    scene.add(sphereMesh);
    var color = 0xFFFFFF;
    var intensity = 1;
    var light = new THREE.DirectionalLight(color, intensity);
    light.position.set(3, 8, 0);
    scene.add(light);
    scene.add(light.target);
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
