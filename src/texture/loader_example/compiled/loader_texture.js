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

/***/ "./loader_texture.js":
/*!***************************!*\
  !*** ./loader_texture.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"../../../node_modules/three/build/three.module.js\");\n\n\nfunction main() {\n  // Select the canvas and set up the renderer\n  const canvas = document.querySelector('#c');\n  const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ antialias: true, canvas });\n\n  // Set up the camera\n  const fov = 75;\n  const aspect = 2; // the canvas's default\n  const near = 0.1;\n  const far = 5;\n  const camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(fov, aspect, near, far);\n  camera.position.z = 2;\n\n  // Create the scene\n  const scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n\n  // Create box geometry\n  const boxWidth = 1;\n  const boxHeight = 1;\n  const boxDepth = 1;\n  const geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(boxWidth, boxHeight, boxDepth);\n\n  // Array to store cubes\n  const cubes = [];\n\n  // Load texture\n  const loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader();\n  loader.load('./images/flower_example.jpg', (texture) => {\n    texture.colorSpace = three__WEBPACK_IMPORTED_MODULE_0__.SRGBColorSpace;\n    const material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ map: texture });\n    const cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\n    scene.add(cube);\n    cubes.push(cube); // add to cube list for rotation\n  });\n\n  // Function to resize renderer based on canvas size\n  function resizeRendererToDisplaySize(renderer) {\n    const canvas = renderer.domElement;\n    const width = canvas.clientWidth;\n    const height = canvas.clientHeight;\n    const needResize = canvas.width !== width || canvas.height !== height;\n    if (needResize) {\n      renderer.setSize(width, height, false);\n    }\n    return needResize;\n  }\n\n  // Function to render the scene\n  function render(time) {\n    time *= 0.001;\n\n    if (resizeRendererToDisplaySize(renderer)) {\n      const canvas = renderer.domElement;\n      camera.aspect = canvas.clientWidth / canvas.clientHeight;\n      camera.updateProjectionMatrix();\n    }\n\n    // Rotate cubes\n    cubes.forEach((cube, ndx) => {\n      const speed = 0.2 + ndx * 0.1;\n      const rot = time * speed;\n      cube.rotation.x = rot;\n      cube.rotation.y = rot;\n    });\n    renderer.render(scene, camera);\n    requestAnimationFrame(render);\n  }\n  requestAnimationFrame(render);\n}\n\nmain();\n\n\n//# sourceURL=webpack:///./loader_texture.js?");

/***/ }),

/***/ "../../../node_modules/three/build/three.module.js":
/*!*********************************************************!*\
  !*** ../../../node_modules/three/build/three.module.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./loader_texture.js");
/******/ 	
/******/ })()
;