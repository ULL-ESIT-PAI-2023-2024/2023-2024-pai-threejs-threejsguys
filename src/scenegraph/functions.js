	// Function to render the scene
	export function render( time ) {
		time *= 0.001;

		if ( resizeRendererToDisplaySize( renderer ) ) {
			const canvas = renderer.domElement;
			camera.aspect = canvas.clientWidth / canvas.clientHeight;
			camera.updateProjectionMatrix();
		}

		// Rotate objects over time
		objects.forEach( ( obj ) => {
			obj.rotation.y = time;
		} );

		renderer.render( scene, camera );
		requestAnimationFrame( render );
	}