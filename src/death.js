"use strict";

//create nelson sprite
var spriteMap = new THREE.TextureLoader().load( "sprites/nelson.png" );
var spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } );
var sprite = new THREE.Sprite( spriteMaterial );

// explosion variables
var group, shockwaveGroup, shockwave, debris, fireball, mist, flash;
/*///////////////////////////////////////////////////////////////////////////////////
	Restart game - reset all alpha variables, reload all models, respawn alpha at origin
	Called by Crash when the player crashes and has no more lives, menuInteraction when the restart game option is chosen and collisions when all collectibles are found
	INPUT: none
	OUTPUT: none
////////////////////////////////////////////////////////////////////////////////////*/
function restartGame(levelToRestart){
	console.log("restarting game");
	playingSound.pause();
	currLevel = levelToRestart;
	createLevel(currLevel);
	level.reinitializeGlobals();
	if(currLevel == 1){
		score = 0;
		lives = STARTING_LIVES;
	}
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
		alpha.incSpeedY(level.gravity);																		//if they have not, reduce speed (gravity)
		return true;
	} else {
		if (!exploding){
			Explosion();						//if they have, the player crashes
		}
		return false;
	}
}

/*//////////////////////////////////////////////////////////////////////////
	Crash: respawn from crash site, decrement lives, game over
	Called by updateForFrame when explosion is finished.
	INPUT: none
	OUTPUT: none
///////////////////////////////////////////////////////////////////////////*/
function Crash() {

	//play crash sound
	// crashSound.play();
	document.getElementById('xyz').play();		// the right way
	// Update Alpha stats
	lives -= 1;
	exploding = false;
	clock.stop();

	// if no more lives, game over
	if (lives == 0){
		animating = false;
		window.alert("G A M E    O V E R\nYour final score: " + score + "\nClick OK to start a new game");
		restartGame(1);
	}else{
	// TODO : Crash animation, respawn
		console.log("alpha crashed...");
		animating = false;
		setTimeout(function() { alert("C R A S H E D!\n Lives left: " + lives); }, 3);
	//	window.alert("C R A S H E D!\n Lives left: " + lives);
	//	scene.remove( sprite );
		alpha.respawn();
		alpha.visible = true;
		sprite.position.set( player.position.x, player.position.y, player.position.z);
		sprite.scale.set( 16, 16, 1.0 ); // imageWidth, imageHeight
		scene.add( sprite );
	}
	for(var i = 0; i < activePowerups.length; i++){
		activePowerups[i].deactivatePower();
	}
}


/* /////////////////////////////////////////////////////////////
	Starts the explosion and stops alpha from moving
	Called by colllisions, updateForFrame and putOnFloor
	INPUT: none
	OUTPUT: none
 *//////////////////////////////////////////////////////////////
function Explosion() {
	console.log("explosion function");
	alpha.speedZ = 0;
	alpha.speedY = 0;
	alpha.minSpeedY = 0;
	alpha.minSpeedZ = 0;
	alpha.visible = false;
	exploding = true;
	document.getElementById('exp').play();
	clock.start();
	initParticles();
}

/* /////////////////////////////////////////////////////////////
	Creates the particle effect for the explosion and adds them to the scene.
	Called by explosion in death.js
	Code from: https://github.com/squarefeet/ShaderParticleEngine
	INPUT: none
	OUTPUT: none
 *//////////////////////////////////////////////////////////////
function initParticles() {
	//var explosionPosition = new THREE.Vector3( -32, 64, 32 );
	var explosionPosition = player.position;
	group = new SPE.Group( {
			texture: {
				value: THREE.ImageUtils.loadTexture( 'textures/sprite-explosion2.png' ),
				frames: new THREE.Vector2( 5, 5 ),
				loop: 1
			},
			depthTest: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			scale: 600
		} ),
		shockwaveGroup = new SPE.Group( {
			texture: {
				value: THREE.ImageUtils.loadTexture( 'textures/smokeparticle.png' ),
			},
			depthTest: false,
			depthWrite: true,
			blending: THREE.NormalBlending,
		} ),
		shockwave = new SPE.Emitter( {
			particleCount: 200,
			type: SPE.distributions.DISC,
			position: {
				value: explosionPosition,
				radius: 5,
				spread: new THREE.Vector3( 5 )
			},
			maxAge: {
				value: 2,
				spread: 0
			},
			// duration: 1,
			activeMultiplier: 2000,

			velocity: {
				value: new THREE.Vector3( 40 )
			},
			rotation: {
				axis: new THREE.Vector3( 1, 0, 0 ),
				angle: Math.PI * 0.5,
				static: true
			},
			size: { value: 2 },
			color: {
				value: [
					new THREE.Color( 0.4, 0.2, 0.1 ),
					new THREE.Color( 0.2, 0.2, 0.2 )
				]
			},
			opacity: { value: [0.5, 0.2, 0] }
		}),
		debris = new SPE.Emitter( {
			particleCount: 100,
			type: SPE.distributions.SPHERE,
			position: {
				value: explosionPosition,
				radius: 0.1,
			},
			maxAge: {
				value: 2
			},
			// duration: 2,
			activeMultiplier: 40,

			velocity: {
				value: new THREE.Vector3( 100 )
			},
			acceleration: {
				value: new THREE.Vector3( 0, -20, 0 ),
				distribution: SPE.distributions.BOX
			},
			size: { value: 2 },
			drag: {
				value: 1
			},
			color: {
				value: [
					new THREE.Color( 1, 1, 1 ),
					new THREE.Color( 1, 1, 0 ),
					new THREE.Color( 1, 0, 0 ),
					new THREE.Color( 0.4, 0.2, 0.1 )
				]
			},
			opacity: { value: [0.4, 0] }
		}),
		fireball = new SPE.Emitter( {
			particleCount: 20,
			type: SPE.distributions.SPHERE,
			position: {
				value: explosionPosition,
				radius: 1
			},
			maxAge: { value: 2 },
			// duration: 1,
			activeMultiplier: 20,
			velocity: {
				value: new THREE.Vector3( 10 )
			},
			size: { value: [20, 100] },
			color: {
				value: [
					new THREE.Color( 0.5, 0.1, 0.05 ),
					new THREE.Color( 0.2, 0.2, 0.2 )
				]
			},
			opacity: { value: [0.5, 0.35, 0.1, 0] }
		}),
		mist = new SPE.Emitter( {
			particleCount: 50,
			position: {
				spread: new THREE.Vector3( 10, 10, 10 ),
				value: explosionPosition,
				distribution: SPE.distributions.SPHERE
			},
			maxAge: { value: 2 },
			// duration: 1,
			activeMultiplier: 2000,
			velocity: {
				value: new THREE.Vector3( 8, 3, 10 ),
				distribution: SPE.distributions.SPHERE
			},
			size: { value: 40 },
			color: {
				value: new THREE.Color( 0.2, 0.2, 0.2 )
			},
			opacity: { value: [0, 0, 0.2, 0] }
		}),
		flash = new SPE.Emitter( {
			particleCount: 50,
			position: { spread: new THREE.Vector3( 5, 5, 5 ), value: explosionPosition },
			velocity: {
				spread: new THREE.Vector3( 30 ),
				distribution: SPE.distributions.SPHERE
			},
			size: { value: [2, 20, 20, 20] },
			maxAge: { value: 2 },
			activeMultiplier: 2000,
			opacity: { value: [0.5, 0.25, 0, 0] }
		} );

		group.addEmitter( fireball ).addEmitter( flash );
		shockwaveGroup.addEmitter( debris ).addEmitter( mist );
		scene.add( shockwaveGroup.mesh );
		scene.add( group.mesh );
	}
