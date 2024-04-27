// Import the necessary modules from the Three.js library
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { AxisGridHelper } from './axisGridHelper.js';

function main() {
	// Get the canvas element from the HTML
	const canvas = document.querySelector('#canvas');
	// Create a WebGLRenderer and link it to the canvas
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
	// Create a GUI for interactive controls
	const gui = new GUI();

	// Set up camera parameters
	const fov = 40;
	const aspect = 2; // the canvas default
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(0, 50, 0);
	camera.up.set(0, 0, 1);
	camera.lookAt(0, 0, 0);

	// Create a scene
	const scene = new THREE.Scene();
	
	// Add a point light to the scene
	{
		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.PointLight( color, intensity );
		scene.add( light );
	}

	// Array to store objects in the scene
	const objects = [];

	// Define parameters for creating a sphere
	const radius = 1;
	const widthSegments = 6;
	const heightSegments = 6;
	const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

	// Create an Object3D to represent the solar system
	const solarSystem = new THREE.Object3D();
	scene.add(solarSystem);
	objects.push(solarSystem);

	// Create a sun mesh and add it to the solar system
	const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
	const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
	sunMesh.scale.set(5, 5, 5);
	solarSystem.add(sunMesh);
	objects.push(sunMesh);

	// Create an object for the Earth's orbit and add it to the solar system
	const earthOrbit = new THREE.Object3D();
	earthOrbit.position.x = 10;
	solarSystem.add(earthOrbit);
	objects.push(earthOrbit);

	// Create an Earth mesh and add it to the Earth's orbit
	const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
	const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
	earthOrbit.add(earthMesh);
	objects.push(earthMesh);

	// Create an object for the Moon's orbit and add it to the Earth's orbit
	const moonOrbit = new THREE.Object3D();
	moonOrbit.position.x = 2;
	earthOrbit.add(moonOrbit);

	// Create a Moon mesh and add it to the Moon's orbit
	const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
	const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
	moonMesh.scale.set(.5, .5, .5);
	moonOrbit.add(moonMesh);
	objects.push(moonMesh);

	// Function to create and add axis grid helpers with GUI controls
	function makeAxisGrid(node, label, units) {
		const helper = new AxisGridHelper(node, units);
		gui.add(helper, 'visible').name(label);
	}

	// Add axis grid helpers for different objects
	makeAxisGrid(solarSystem, 'solarSystem', 26);
	makeAxisGrid(sunMesh, 'sunMesh');
	makeAxisGrid(earthOrbit, 'earthOrbit');
	makeAxisGrid(earthMesh, 'earthMesh');
	makeAxisGrid(moonOrbit, 'moonOrbit');
	makeAxisGrid(moonMesh, 'moonMesh');

	// Function to resize the renderer to fit the display size
	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false );
		}
		return needResize;
	}

	// Function to render the scene
	function render(time) {
		time *= 0.001;

		if (resizeRendererToDisplaySize(renderer)) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		// Rotate objects over time
		objects.forEach((obj) => {
			obj.rotation.y = time;
		});

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();