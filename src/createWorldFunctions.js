"use strict";

/* /////////////////////////////////////////////////////////////
	loads the sounds into their respective variables
	Called from createWorld
	INPUT: none
	OUTPUT: none - this function adds sounds directly to global variables
 *//////////////////////////////////////////////////////////////
function addSounds(){
   // load a sound and set it as the Audio object's buffer
    var audioLoader = new THREE.AudioLoader();
    audioLoader.load( level.crashSoundURL, function( buffer ) {
        crashSound.setBuffer( buffer );
        crashSound.setVolume( 0.5 );
    });
    audioLoader.load( level.pauseSoundURL, function( buffer ) {
        pauseSound.setBuffer( buffer );
        pauseSound.setLoop( true );
        pauseSound.setVolume( 0.5 );
    });
    audioLoader.load( level.playingSoundURL, function( buffer ) {
        playingSound.setBuffer( buffer );
        playingSound.setLoop( true );
        playingSound.setVolume( 0.5 );
    });
}

/* /////////////////////////////////////////////////////////////
	Creates random lights, Amount is specified when creating level. Lights are Point lights with shadows enabled
	Called from createWorld
	INPUT: none
	OUTPUT: none - this function adds lights directly to the scene
 *//////////////////////////////////////////////////////////////
function createRandomLights(){
	for(var i = 0; i < level.numRandomLights; i++){
		var light = new THREE.PointLight(0xffffff, 1, 1000000);
		//light.position.set(
		//	Math.pow(-1, Math.floor(Math.random() * 2) + 1) * level.worldWidth / (6 + Math.random() * 10),
		//	level.atmosphereHeight * (1 + Math.random()),
		//	Math.pow(-1, Math.floor(Math.random() * 2) + 1) * level.worldWidth / (6 + Math.random() * 10)
		//);
    light.position.set(0,10,0);

		//shadows for light 1
		light.castShadow = true;
		//Set up shadow properties for the light
		light.shadow.mapSize.width = level.worldWidth;
		light.shadow.mapSize.height = level.worldDepth;
		light.shadow.camera.near = 0.5;    // default
		light.shadow.camera.far = Math.sqrt(Math.pow(level.atmosphereHeight,2) + Math.pow(Math.pow(level.worldWidth,2) + Math.pow(level.worldDepth,2),2));     // Pythagoras equation for edge to edge diagonal of livable map cube

		scene.add(light);
	}
}


/* /////////////////////////////////////////////////////////////
	This function adds powerups to the scene. Amount of powerups specified when creating level.
	The different powerups are chosen with random probability
	Called when adding powerups  in createWorld
	INPUT: none
	OUTPUT: none - this function adds powerups directly to the scene
 *//////////////////////////////////////////////////////////////
function createPowerups(){
	var powerupsSplit = splitNumToParts(level.numPowerups, level.powerupTypes.length);
	console.log("Splitting " + level.numPowerups + " Powerups into " + level.powerupTypes.length +" groups. result is split: " + powerupsSplit);


	for(var i = 0; i < level.powerupTypes.length; i++){
		for(var j = 0; j < powerupsSplit[i]; j++){
			powerups.push(new Powerup(level.powerupTypes[i]));
		}
	}
	// move powerups to random place on map
	randomMoveArray(powerups);

	for(var i = 0; i < powerups.length; i++){
		scene.add(powerups[i]);
	}
}

/* /////////////////////////////////////////////////////////////
	This function adds collectibles to the scene. Amount of collectibles specified when creating level.
	Called when adding collectibles in createWorld
	INPUT: none
	OUTPUT: none - this function adds collectibles directly to the scene
 *//////////////////////////////////////////////////////////////
function createCollectibles(collectibleURL){
	var postLoading = function(){
		console.log("distributing collectibles")
		// move collectibles to random place on map
		randomMoveArray(collectibles);

		console.log("adding collectibles to scene")
		// add collectibles to class
		for(var i = 0; i < collectibles.length; i++){
			scene.add(collectibles[i]);
		}
		console.log("collectibles distributed and added to scene")
	}

	//load models
	var modelLoader = function(modelURL, numModels){
		var materialLoader = new THREE.MTLLoader();
		materialLoader.load(
			collectibleURL + '.mtl' ,
			function(materials){
				materials.preload();
				var objLoader = new THREE.OBJLoader();
				objLoader.setMaterials(materials);
				objLoader.load(
					collectibleURL + '.obj',
					function ( object ) {
						// get model geometry.
						// Note modules from .obj files are of type GeometryBuffer
						var objectGeo;
						object.traverse( function ( child ) {
							if ( child instanceof THREE.Mesh ) {
								objectGeo = child.geometry;
							}
						} );
						objectGeo.computeBoundingSphere();

						object.position.set(0, -3, 0);//*objectGeo.boundingSphere.radius, 0);
						//resize loaded object with relation to its size (should apply to any object)
						var resizeNum = (1/objectGeo.boundingSphere.radius);
						object.scale.set(
							resizeNum * Math.pow(worldMap.width, 0.075), //width
							resizeNum * Math.pow(worldMap.atmosphereHeight, 0.075), //width
							resizeNum * Math.pow(worldMap.depth, 0.075) //depth
						);
						for(var i = 0; i < level.numCollectibles; i++){
							var currObject = object.clone();
							collectibles.push(new Collectible(currObject))
						}
						console.log("all collectibles loaded")
						postLoading();
					}
				);
			}
		);
	}

	modelLoader(collectibleURL, level.numCollectibles);
}

function waltLoader(geometry, materials){
    var material = new THREE.MeshLambertMaterial( {
		vertexColors: THREE.FaceColors,             // use colors from the geometry
	});
	var walt = new THREE.Mesh(geometry,material);
	walt.position.set(0,0,-5);
	walt.scale.set(0.05, 0.05, 0.05);
	player.add(walt);
}
