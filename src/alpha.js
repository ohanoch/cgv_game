"use strict";


// lives
// rewards
// score
// boosts
// speedY
// speedZ
// speedRotation ???
// position -  x,y,z
// geometry - threejs geometry, may be a model
// material - threejs material, includes shading, may include a texture
// radius of object

class Alpha extends THREE.Mesh {
	
	constructor(modelName) {
		
		if(modelName != "") {
			
			var loader = new THREE.JSONLoader();
			loader.load(modelName, function (geometry, materials) {

					var material = new THREE.MeshLambertMaterial( {
						vertexColors: THREE.FaceColors,  // use colors from the geometry
						morphTargets: true
					});
					
					super(geometry, materials);
					
					
			} );
			
		} else {
			
			var geometry = new THREE.CylinderGeometry(2,2,8,6,1);
			var material = new THREE.MeshPhongMaterial({color: 0x00FF00});
		
			super(geometry,material);
		}
		
		this.speedY = 0;
		this.speedZ = -0.01;
		this.maxSpeedY = 0.5;
		this.maxSpeedZ = -0.5;
		this.minSpeedZ = -0.01;
		
		this.lives = 3;
		this.radius = radius;
		
		console.log("Alpha created");
		
	}
	
	getRadius() {
		return this.radius;
	}
	
	getSpeedY() {
		return this.speedY;
	}
	
	getSpeedZ() {
		return this.speedZ;
	}
	
	setSpeedY(newSpeedY) {
		if(newSpeedY < this.maxSpeedY) {
			this.speedY = newSpeedY;
		} else {
			this.speedY = this.maxSpeedY;
		}
	}
	
	setSpeedZ(newSpeedZ) {
		if(newSpeedZ > this.maxSpeedZ) {
			this.speedZ = newSpeedZ;
		} else {
			this.speedZ = this.maxSpeedZ;
		}
		if(newSpeedZ > this.minSpeedZ) {
			this.speedZ = this.minSpeedZ;
		}
	}
	
	incSpeedY(incY) {
		this.speedY += incY;
		if(this.speedY > this.maxSpeedY) {
			this.speedY = this.maxSpeedY;
		}
	}
	
	incSpeedZ(incZ) {
		this.speedZ += incZ;
		if(this.speedZ <= this.maxSpeedZ) {
			this.speedZ = this.maxSpeedZ;
		}
		if(this.speedZ >= this.minSpeedZ) {
			this.speedZ = this.minSpeedZ;
		}
	}
	
	
	
}
