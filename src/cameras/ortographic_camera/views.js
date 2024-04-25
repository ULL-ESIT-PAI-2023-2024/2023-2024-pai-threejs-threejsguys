// Import necessary modules from the Three.js library
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// Define the main function
function main() {
	// Get the canvas and view elements from the DOM
	const canvas = document.querySelector( '#c' );
	const view1Elem = document.querySelector( '#view1' );
	const view2Elem = document.querySelector( '#view2' );

	// Create a WebGLRenderer and attach it to the canvas
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );

	// Set up orthographic camera properties
	const size = 1;
	const near = 5;
	const far = 50;
	const camera = new THREE.OrthographicCamera( - size, size, size, - size, near, far );
	camera.zoom = 0.2;
	camera.position.set( 0, 10, 20 );

	// Create a camera helper to visualize the camera's frustum
	const cameraHelper = new THREE.CameraHelper( camera );

	// Define a helper class for GUI controls
	class MinMaxGUIHelper {
		constructor( obj, minProp, maxProp, minDif ) {
			this.obj = obj;
			this.minProp = minProp;
			this.maxProp = maxProp;
			this.minDif = minDif;
		}
		get min() {
			return this.obj[ this.minProp ];
		}
		set min( v ) {
			this.obj[ this.minProp ] = v;
			this.obj[ this.maxProp ] = Math.max( this.obj[ this.maxProp ], v + this.minDif );
		}
		get max() {
			return this.obj[ this.maxProp ];
		}
		set max( v ) {
			this.obj[ this.maxProp ] = v;
			this.min = this.min; // this will call the min setter
		}
	}

	// Create a GUI for controlling camera properties
	const gui = new GUI();
	gui.add( camera, 'zoom', 0.01, 1, 0.01 ).listen();
	const minMaxGUIHelper = new MinMaxGUIHelper( camera, 'near', 'far', 0.1 );
	gui.add( minMaxGUIHelper, 'min', 0.1, 50, 0.1 ).name( 'near' );
	gui.add( minMaxGUIHelper, 'max', 0.1, 50, 0.1 ).name( 'far' );

	// Set up OrbitControls for camera manipulation
	const controls = new OrbitControls( camera, view1Elem );
	controls.target.set( 0, 5, 0 );
	controls.update();

	// Set up a perspective camera for the second view
	const camera2 = new THREE.PerspectiveCamera( 60, 2, 0.1, 500 );
	camera2.position.set( 16, 28, 40 );
	camera2.lookAt( 0, 5, 0 );

	// Set up OrbitControls for the second camera
	const controls2 = new OrbitControls( camera2, view2Elem );
	controls2.target.set( 0, 5, 0 );
	controls2.update();

	// Create a scene
	const scene = new THREE.Scene();
	scene.background = new THREE.Color( 'black' );
	scene.add( cameraHelper );

	// Add objects to the scene (plane, cube, sphere, light)
	{
		const planeSize = 40;
		const loader = new THREE.TextureLoader();
		const texture = loader.load( 'https://threejs.org/manual/examples/resources/images/checker.png' );
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.magFilter = THREE.NearestFilter;
		texture.colorSpace = THREE.SRGBColorSpace;
		const repeats = planeSize / 2;
		texture.repeat.set( repeats, repeats );

		const planeGeo = new THREE.PlaneGeometry( planeSize, planeSize );
		const planeMat = new THREE.MeshPhongMaterial( {
			map: texture,
			side: THREE.DoubleSide,
		} );
		const mesh = new THREE.Mesh( planeGeo, planeMat );
		mesh.rotation.x = Math.PI * - .5;
		scene.add( mesh );
	}

	{
		const cubeSize = 4;
		const cubeGeo = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize );
		const cubeMat = new THREE.MeshPhongMaterial( { color: '#8AC' } );
		const mesh = new THREE.Mesh( cubeGeo, cubeMat );
		mesh.position.set( cubeSize + 1, cubeSize / 2, 0 );
		scene.add( mesh );
	}

	{
		const sphereRadius = 3;
		const sphereWidthDivisions = 32;
		const sphereHeightDivisions = 16;
		const sphereGeo = new THREE.SphereGeometry( sphereRadius, sphereWidthDivisions, sphereHeightDivisions );
		const sphereMat = new THREE.MeshPhongMaterial( { color: '#CA8' } );
		const mesh = new THREE.Mesh( sphereGeo, sphereMat );
		mesh.position.set( - sphereRadius - 1, sphereRadius + 2, 0 );
		scene.add( mesh );
	}

	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( 0, 10, 0 );
		light.target.position.set( - 5, 0, 0 );
		scene.add( light );
		scene.add( light.target );
	}

	// Function to resize renderer to match display size
	function resizeRendererToDisplaySize( renderer ) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if ( needResize ) {
			renderer.setSize( width, height, false );
		}
		return needResize;
	}

	// Function to set scissor for a given element
	function setScissorForElement( elem ) {
		const canvasRect = canvas.getBoundingClientRect();
		const elemRect = elem.getBoundingClientRect();

		const right = Math.min( elemRect.right, canvasRect.right ) - canvasRect.left;
		const left = Math.max( 0, elemRect.left - canvasRect.left );
		const bottom = Math.min( elemRect.bottom, canvasRect.bottom ) - canvasRect.top;
		const top = Math.max( 0, elemRect.top - canvasRect.top );

		const width = Math.min( canvasRect.width, right - left );
		const height = Math.min( canvasRect.height, bottom - top );

		const positiveYUpBottom = canvasRect.height - bottom;
		renderer.setScissor( left, positiveYUpBottom, width, height );
		renderer.setViewport( left, positiveYUpBottom, width, height );

		return width / height;
	}

	// Function to render the scene
	function render() {
		resizeRendererToDisplaySize( renderer );

		renderer.setScissorTest( true );

		{
			const aspect = setScissorForElement( view1Elem );

			camera.left = - aspect;
			camera.right = aspect;
			camera.updateProjectionMatrix();
			cameraHelper.update();

			cameraHelper.visible = false;

			scene.background.set( 0x000000 );
			renderer.render( scene, camera );
		}

		{
			const aspect = setScissorForElement( view2Elem );

			camera2.aspect = aspect;
			camera2.updateProjectionMatrix();

			cameraHelper.visible = true;

			scene.background.set( 0x000040 );
			renderer.render( scene, camera2 );
		}
		requestAnimationFrame( render );
	}
	requestAnimationFrame( render );
}

// Call the main function to start the application
main();
