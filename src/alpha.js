"use strict";


// lives
// score
// speedY
// speedZ
// position -  x,y,z
// geometry - threejs geometry, may be a model
// material - threejs material, includes shading, may include a texture
// radius of object

class Alpha extends THREE.Mesh{
	
	constructor(geometry, material, radius) {
		
		super(geometry, material);
		
		this.speedY = 0;
		this.speedZ = -0.01;
		
		this.maxSpeedY = level.alphaMaxSpeedY;
		this.minSpeedY = level.alphaMinSpeedY;
		this.maxSpeedZ = level.alphaMaxSpeedZ;
		this.minSpeedZ = level.alphaMinSpeedZ;
		
		this.jumping = false;
		
		this.lives = level.startingLives; //TODO: make a cat that gives you 9 lives
		this.radius = radius;
		
		this.geometry = geometry;	// save geometry of model so that it can be accessed later by collision fn.
		console.log("Alpha created");
		
	}
	
	resetMovement(){
		this.speedY = 0;
		this.speedZ = -0.01;
		this.maxSpeedY = level.alphaMaxSpeedY;
		this.minSpeedY = level.alphaMinSpeedY;
		this.maxSpeedZ = level.alphaMaxSpeedZ;
		this.minSpeedZ = level.alphaMinSpeedZ;
		this.jumping = false;
		
		console.log("alpha reset");
	}
	
	respawn() {
		var currLives = this.lives;
		while(true){
			console.log("respawning alpha");
			var randomX = Math.random();
			var randomZ = Math.random();
			player.position.set(randomX * (worldMap.width / 2), 40, randomZ * (worldMap.depth / 2));
			minimapCamera.position.set(randomX * (worldMap.width / 2), 40, randomZ * (worldMap.depth / 2));
			if(buildingBoxCollision(player).length == 0){
				console.log("alpha respawned to empty location");
				break;
			} else {
				console.log("alpha spawned to occupied location - respawning");
			}
		}
		this.resetMovement();
		keys = []

		if(this.lives == level.startingLives){
			displayMenu( menusArr.startMenu );
		}
	}
	
	
//make sure alpha doesn't spawn on an object
// this function gets called as a callback for when alpha finishes loading and for when map buildings get loaded
	startup() {
		if(alphaDone && mapDone){
			console.log("checking if alpha initialized on building");
			this.respawn();
		}
	}

	getRadius() {
		return this.radius;
	}
	
	setRadius(rad) {
		this.radius = rad;
	}
	
	setMinSpeedY (newMinSpeed) {
		this.minSpeedY = newMinSpeed;
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
		
		if(newSpeedY < this.minSpeedY) {
			this.speedY = this.minSpeedY;
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
		
		if(this.speedY < this.minSpeedY) {
			this.speedY = this.minSpeedY;
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
