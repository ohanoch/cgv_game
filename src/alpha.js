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

class Alpha extends THREE.Mesh{
	
	constructor(geometry, material, radius) {
		
		super(geometry, material);
		
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
	
	setRadius(rad) {
		this.radius = rad;
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
