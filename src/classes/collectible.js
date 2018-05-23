"use strict";

class Collectible extends THREE.Mesh {

	constructor(object) {

		super(
			new THREE.BoxGeometry( 8, 8, 8 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0x112233, transparent: true} )
		);

		this.add( object );
	}

	animate() {
		//this.children[0].rotateX(0.1);
		var scaleNumber;
		if (level.levelNum == 2) {		//avi level
			scaleNumber = 20;
		}
		else {
			scaleNumber = 4;
		}
		this.children[0].scale.set(scaleNumber*Math.abs(Math.sin(frameNumber/50)), scaleNumber*Math.abs(Math.sin(frameNumber/50)), scaleNumber*Math.abs(Math.sin(frameNumber/50)));
	}
}
