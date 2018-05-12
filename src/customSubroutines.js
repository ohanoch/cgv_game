"use strict";

/*<<<<<<<<<<<<<<<<<<<<<< C U S T O M 	S U B   R O U T I N E S >>>>>>>>>>>>>>>>>>>>>>>>>>>
			                                 |_
			                           _____|~ |____
			                          (  --         ~~~~--_,
			                           ~~~~~~~~~~~~~~~~~~~'`  

*/

/* /////////////////////////////////////////////////////////////
	This function takes a number and splits it randomly into numParts parts.
	Called from createPowerups
	INPUT: num - number to be split, numParts - amount of sections to dplit the number to
	OUTPUT: none - this function adds lights directly to the scene
 *//////////////////////////////////////////////////////////////
function splitNumToParts(num, numParts){
	var numPerSplit = []; 
	var currNum = num;
	for(var i = 0; i < numParts -1; i++){
		var currAmount = Math.floor(Math.random() * currNum);
		numPerSplit.push(currAmount);
		currNum -= currAmount;
	}
	numPerSplit.push(currNum);

	return numPerSplit;
}


/*///////////////////////////////////////////////////////////////////////////////// 
	Gets a random vector for a new position.
	Called by randomMoveArray
	INPUT: none
	OUTPUT: THREE.Vector3 with the new randomised position
//////////////////////////////////////////////////////////////////////////////////*/
function randomPlace(){
	var move = [];
	move.push(Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * (worldMap.width / 2));
	move.push(Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * worldMap.atmosphereHeight + 5);
	move.push(Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * (worldMap.depth / 2));
	return new THREE.Vector3(move[0],move[1],move[2]);

}

/*///////////////////////////////////////////////////////////////////////////////// 
	For every object in the input array, calls randomPlace to get a new random position, places the object in that position, then finds a new position until it is no longer colliding with another object
	Called in createWorld for the collectibles and powerups
	INPUT: array of objects to place in random positions
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function randomMoveArray( arr ){
	for(var i = 0; i < arr.length; i++){
		var move = randomPlace();
		arr[i].position.set(move.x, move.y, move.z);
		arr[i].geometry.computeBoundingBox();
		while(buildingBoxCollision(arr[i]).length != 0){
			move = randomPlace();
			arr[i].position.set(move.x, move.y, move.z);
		}
	}
}


/*///////////////////////////////////////////////////////////////////////////////// 
	Reset the camera's to be behind the player (chase cam), after viewing the world.
	Called by 
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function resetCameraPosition(){
	var cameraRotationSpeed = 0.1;
	mainCamera.translateX((alpha.position.x - mainCamera.position.x) * cameraRotationSpeed);
	mainCamera.translateY((alpha.position.y - mainCamera.position.y) * cameraRotationSpeed);
	mainCamera.translateZ((alpha.position.z + level.alphaCameraDistance - mainCamera.position.z) * cameraRotationSpeed);
	mainCamera.lookAt(alpha.position);

	if(Math.abs(alpha.position.x - mainCamera.position.x) <= 0.01 &&
		Math.abs(alpha.position.y - mainCamera.position.y <= 0.01) &&
		Math.abs(alpha.position.z + level.alphaCameraDistance - mainCamera.position.z <= 0.01)){
		
		resetCameraFlag = false;
	}
}


///////////////////////////////////\				  //////////////////////////////
//================================== end sub routines =============================
///////////////////////////////////////////////////////////////////////////////////

