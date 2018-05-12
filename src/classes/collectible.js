"use strict";

class Collectible extends THREE.Mesh {
	
	constructor(geometry, material) {
	
		super(
			new THREE.BoxGeometry( 4, 4, 4 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0x112233, transparent: true} )
		);
		
		this.add( new THREE.Mesh(geometry, material) );
	}

	animate() {
		this.children[0].rotateX(0.1);
	}
}
