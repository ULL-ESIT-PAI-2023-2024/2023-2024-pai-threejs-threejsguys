import * as THREE from 'three';

function main() {
  // Select the canvas and create the renderer
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({antialias: true, canvas});

  // Set up the camera
  const fov = 75;
  const aspect = 2; // the canvas's default value
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  // Create the scene
  const scene = new THREE.Scene();

  // Define box dimensions
  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  // Array to store cubes
  const cubes = [];

  // Load texture
  const loader = new THREE.TextureLoader();
  const texture = loader.load('./images/dog_example.jpg');
  texture.colorSpace = THREE.SRGBColorSpace;

  // Create material and apply texture
  const material = new THREE.MeshBasicMaterial({
    map: texture
  });

  // Create cube and add it to the scene
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  cubes.push(cube); // add to cube list for rotation

  // Function to adjust renderer size to window size
  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  // Function to render the scene
  function render(time) {
    time *= 0.001;

    // Resize renderer if window size changes
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // Rotate cubes
    cubes.forEach((cube, ndx) => {
      const speed = 0.2 + ndx * 0.1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    // Render the scene
    renderer.render(scene, camera);

    // Request the next animation frame
    requestAnimationFrame(render);
  }
  // Start the animation
  requestAnimationFrame(render);
}

// Call the main function to begin
main();