/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lights.ts":
/*!*******************!*\
  !*** ./lights.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * Universidad de La Laguna\n * Escuela Superior de Ingeniería y Tecnología\n * Grado en Ingeniería Informática\n * Programación de Aplicaciones Interactivas\n *\n * @author Oscar Garcia Gonzalez\n * @since March 29 2022\n * @desc funcionamiento con la clase main\n*/\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst THREE = __webpack_require__(/*! three */ \"../node_modules/three/build/three.cjs\");\n/**\n * Función principal que inicializa la aplicación.\n */\nfunction init() {\n    const scene = new THREE.Scene();\n    const fov = 45;\n    const aspect = window.innerWidth / window.innerHeight;\n    const near = 0.1;\n    const far = 100;\n    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);\n    camera.position.set(0, 5, 20);\n    const renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    document.body.appendChild(renderer.domElement);\n    const cubeSize = 4;\n    const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);\n    const cubeMat = new THREE.MeshPhongMaterial({ color: 'blue' });\n    const cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);\n    cubeMesh.position.set(cubeSize + 1, cubeSize / 2, 0);\n    scene.add(cubeMesh);\n    const sphereRadius = 3;\n    const sphereWidthDivisions = 32;\n    const sphereHeightDivisions = 16;\n    const sphereGeo = new THREE.SphereGeometry(sphereRadius, sphereWidthDivisions, sphereHeightDivisions);\n    const sphereMat = new THREE.MeshPhongMaterial({ color: 'red' });\n    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);\n    sphereMesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);\n    scene.add(sphereMesh);\n    const color = 0xFFFFFF;\n    const intensityDirectLight = 150;\n    const lightDirect = new THREE.DirectionalLight(color, intensityDirectLight);\n    lightDirect.position.set(3, 8, 0);\n    scene.add(lightDirect);\n    scene.add(lightDirect.target);\n    const intensityAmbientLight = 0.3;\n    const lightAmbient = new THREE.AmbientLight(color, intensityAmbientLight);\n    lightAmbient.position.set(3, 8, 0);\n    scene.add(lightAmbient);\n    function render() {\n        requestAnimationFrame(render);\n        renderer.render(scene, camera);\n    }\n    render();\n}\ninit();\n/**\n * Forma de compilar:\n * npx tsc materials.ts\n * npx webpack\n */ \n\n\n//# sourceURL=webpack:///./lights.ts?");

/***/ }),

/***/ "../node_modules/three/build/three.cjs":
/*!*********************************************!*\
  !*** ../node_modules/three/build/three.cjs ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lights.ts");
/******/ 	
/******/ })()
;