"use strict";


// expiration
// location
// model
// animation
// type

var powerupTypes = ["gun", "invisible", "gravity"];  //dictionary to make powerup types readable

class Powerup extends THREE.Mesh{

	constructor(type) {
		super(
			new THREE.SphereGeometry( 4, 32, 32 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0xaa00bb, transparent: true} )
		);

		this.expiration = 600;
		this.type = type;

		if(this.type == 0){	//gun type
		//load model here	
			this.add(
				new THREE.Mesh(
					new THREE.TorusKnotGeometry( 2, 0.1, 100, 16, 4, 13 ),
					new THREE.MeshBasicMaterial( { color: 0xff0000 } )
				)
			);
			
		} else if (this.type == 1){
		//load model here
			this.add(
				new THREE.Mesh(
					new THREE.TorusKnotGeometry( 2, 0.1, 100, 16, 4, 13 ),
					new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
				)
			);
		} else if (this.type == 2){
		//load model
			this.add(
					new THREE.Mesh(
						new THREE.TorusKnotGeometry( 2, 0.1, 100, 16, 4, 13 ),
						new THREE.MeshBasicMaterial( { color: 0x0000ff } )
					)
			);
		}

		console.log("");
		
	}
	
	getExpiration() {
		return this.expiration;
	}
	
	activatePower( ) {
	// test powerup. make your own!
	
		if (this.type == powerupTypes["gravity"] ) {
			alpha.setMinSpeedY(0);
		}
	}
	
	deactivatePower() {
		if(this.type == powerupTypes["gravity"]) {
			alpha.setMinSpeedY(-1000);
		}
	}
	
	decrementExpiration() {
		this.expiration--;
	}
	
	animate() {
		this.children[0].rotateX(0.1);
	}
}
