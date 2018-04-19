"use strict";


// expiration
// location
// model
// animation
// type
var powerupTypes = {gun: 0, invinsible: 1, gravity: 2};  

class Powerup extends THREE.Mesh{

	constructor(type) {
		super(
			new THREE.SphereGeometry( 2, 32, 32 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0xaa00bb, transparent: true} )
		);

		this.expiration = 15;
		this.type = powerupTypes.gun;

		//this.object = new THREE.Mesh(
		//	new THREE.SphereGeometry( 2, 32, 32 ),
		//	new THREE.MeshBasicMaterial( { wireframe: true, opacity: 0.5 } )
		//);

		if(this.type == 0){
		//load model here	
			this.add(
				new THREE.Mesh(
					new THREE.TorusKnotGeometry( 1, 0.1, 100, 16 ),
					new THREE.MeshBasicMaterial( { color: 0xff0000 } )
				)
			);
			console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		} else if (this.type == 1){
		//load model here
			this.add(
				new THREE.Mesh(
					new THREE.TorusKnotGeometry( 1, 0.1, 100, 16 ),
					new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
				)
			);
		} else if (this.type == 2){
		//load model
			this.add(
					new THREE.Mesh(
						new THREE.TorusKnotGeometry( 1, 0.1, 100, 16 ),
						new THREE.MeshBasicMaterial( { color: 0x0000ff } )
					)
			);
		}

		console.log("");
		
	}
	
	animate() {
		this.children[0].rotateX(0.1);
	}
}
