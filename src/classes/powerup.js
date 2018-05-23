"use strict";


// expiration
// location
// model
// animation
// type

var powerupTypes = ["gun", "small", "gravity"];  //dictionary to make powerup types readable
var powerupColours = [0xff0000,0x0000ff,0x00ff00];

class Powerup extends THREE.Mesh{

	constructor(type) {
		super(
			new THREE.SphereGeometry( 8, 32, 32 ),
			new THREE.MeshBasicMaterial( { wireframe: false, opacity: 0.5, color: 0xffffff, transparent: true} )
		);

		this.expiration = 600;
		this.type = type;

		this.add(
				new THREE.Mesh(
					new THREE.TorusKnotGeometry( 3.5, 0.1, 100, 16, 13, 8 ),
					new THREE.MeshBasicMaterial( { color: powerupColours[this.type] } )
				)
		);

	}

	getExpiration() {
		return this.expiration;
	}

	activatePower( ) {
	// test powerup. make your own!
		if (this.type == 1){
			alpha.scale.set(0.01,0.01,0.01);
			alpha.collisionLeeway *= 0.01;
		} else if (this.type == 2 ) {
			alpha.setMinSpeedY(0);
		}
	}

	deactivatePower() {
		if(this.type == 1) {
			alpha.scale.set(
				500/Math.pow(alpha.geometry.boundingSphere.radius,2),
				500/Math.pow(alpha.geometry.boundingSphere.radius,2),
				500/Math.pow(alpha.geometry.boundingSphere.radius,2),
			);
		} else if(this.type == 2) {
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
