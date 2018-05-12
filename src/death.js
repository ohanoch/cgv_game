"use strict";

/*///////////////////////////////////////////////////////////////////////////////////
	Restart game - reset all alpha variables, reload all models, respawn alpha at origin
	Called by Crash when the player crashes and has no more lives, menuInteraction when the restart game option is chosen and collisions when all collectibles are found
	INPUT: none
	OUTPUT: none
////////////////////////////////////////////////////////////////////////////////////*/
function restartGame(){
	console.log("restarting game");
	level.reinitializeGlobals();
	createWorld();
	installOrbitControls();
	console.log("game restarted");	
}



/*//////////////////////////////////////////////////////////////////////////
	Reduce player Y speed for for gravity and make them crash if they touch the floor
	Called by updateForFrame every frame
	INPUT: none
	OUTPUT: returns false if the player crashes and true if they dont
///////////////////////////////////////////////////////////////////////////*/
function putOnFloor() {
	if(player.position.y > worldMap.floorHeight + alpha.getRadius() - 2) {			//check if player has reached the "floor" + some leeway
		alpha.incSpeedY(-0.01);																		//if they have not, reduce speed (gravity)
		return true;
	} else {																		//if they have, the player crashes
		Crash();
		return false;
	}	
}

/*//////////////////////////////////////////////////////////////////////////
	Crash: Explosion, respawn from crash site, decrement lives, game over
	Called by colllisions, updateForFrame and putOnFloor
	INPUT: none
	OUTPUT: none
///////////////////////////////////////////////////////////////////////////*/
function Crash() {
	//play crash sound
	//crashSound.play();

	// Update Alpha stats
	alpha.lives -= 1;
	
	// if no more lives, game over
	if (alpha.lives == 0){
		animating = false;
		window.alert("G A M E    O V E R\nYour final score: " + Score + "\nClick OK to start a new game");
		document.getElementById('xyz').play();
		restartGame();
	}else{
	// TODO : Crash animation, respawn
		console.log("alpha crashed...");
		animating = false;
		window.alert("C R A S H E D!\n Lives left: " + alpha.lives);
		alpha.respawn();
	}
}


