"use strict";

class Collectible extends THREE.Mesh {
	
	constructor(geometry, material) {
	
		super(
			new THREE.SphereGeometry( 4, 32, 32 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0xaa00bb, transparent: true} )
		);
		
		this.add( new THREE.Mesh(geometry, material) );
	}

	animate() {
		this.children[0].rotateX(0.1);
	}
}
