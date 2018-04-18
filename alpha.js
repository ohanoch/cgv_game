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

class Alpha {
	
	constructor(geometry, material, radius, x, y, z, initRotateX, initRotateY, initRotateZ) {		//initial rotation, making the object face different ways
		
		this.speedY = 0;
		this.speedZ = -0.01;
		this.maxSpeedY = 0.5;
		this.maxSpeedZ = -0.5;
		this.minSpeedZ = -0.01;
		
		this.lives = 3;
		this.radius = radius;
		
		this.obj = new THREE.Mesh(geometry,material);
		this.obj.position.set(x,y + radius,z);
		this.obj.rotation.x = initRotateX;
		this.obj.rotation.y = initRotateY;
		this.obj.rotation.z = initRotateZ;
		
		//scene.add(this.obj);
		
		console.log("CLASS");
		
	}
	
	getObj() {
		return this.obj;
	}
	
	getRadius() {
		return this.radius;
	}
	
	getX() {
		return this.obj.position.x;
	}
	
	getY() {
		return this.obj.position.y;
	}
	
	getX() {
		return this.obj.position.z;
	}
	
	getSpeedY() {
		return this.speedY;
	}
	
	getSpeedZ() {
		return this.speedZ;
	}
	
	setX(newX) {
		this.obj.position.x = newX;
	}
	
	setY(newY) {
		this.obj.position.y = newY;
	}
	
	setZ(newZ) {
		this.obj.position.z = newZ;
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