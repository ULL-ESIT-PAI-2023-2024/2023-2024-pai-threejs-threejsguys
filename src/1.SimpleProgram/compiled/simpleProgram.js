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

/***/ "./simpleProgram.ts":
/*!**************************!*\
  !*** ./simpleProgram.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n/**\n * Universidad de La Laguna\n * Escuela Superior de Ingeniería y Tecnología\n * Grado en Ingeniería Informática\n * Programación de Aplicaciones Interactivas\n *\n * @author Oscar Garcia Gonzalez\n * @since March 29 2022\n * @desc funcionamiento con la clase main\n*/\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst THREE = __webpack_require__(/*! three */ \"../../node_modules/three/build/three.cjs\");\n/**\n * Función principal que inicializa la aplicación.\n */\nfunction init() {\n    const scene = new THREE.Scene();\n    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n    const renderer = new THREE.WebGLRenderer();\n    renderer.setSize(window.innerWidth, window.innerHeight);\n    document.body.appendChild(renderer.domElement);\n    const geometry = new THREE.BoxGeometry(1, 1, 1);\n    const material = new THREE.MeshBasicMaterial({ color: \"red\" });\n    const cube = new THREE.Mesh(geometry, material);\n    cube.rotation.set(1, 2, 3); // Rotar el cubo\n    scene.add(cube);\n    camera.position.z = 5;\n    function render() {\n        requestAnimationFrame(render);\n        renderer.render(scene, camera);\n    }\n    render();\n}\n// Llamar a la función init al cargar la página\ninit();\n// npx tsc main.ts \n// npx webpack\n\n\n//# sourceURL=webpack:///./simpleProgram.ts?");

/***/ }),

/***/ "../../node_modules/three/build/three.cjs":
/*!************************************************!*\
  !*** ../../node_modules/three/build/three.cjs ***!
  \************************************************/
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
/******/ 	var __webpack_exports__ = __webpack_require__("./simpleProgram.ts");
/******/ 	
/******/ })()
;