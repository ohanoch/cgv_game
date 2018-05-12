"use strict";

// all capital global variables
// array of urls for building models
// alpha model urls
// floor urls
// map background urls
// num powerups
// num collects
// which powerups - list
// alpha attributes


class Level {

	constructor(levelNum,
				worldWidth,
				worldDepth,
				atmosphereHeight,
				alphaCameraDistance,
				numRandomLights,
				mapBuildingRatio,
				buildingModelURLs,
				alphaModelURL,
				floorTextureURL,
				backgroundURL,
				numPowerups,
				numCollectibles,
				collectiblesToWin,
				powerupTypes,
				alphaMaxSpeedY,
				alphaMinSpeedY,
				alphaMaxSpeedZ,
				alphaMinSpeedZ,
				minimapWidth,
				minimapHeight,
				pauseMenuTextureURL,
				crashSoundURL,
				pauseSoundURL,
				playingSoundURL,
				lore
	) {
		
		this.levelNum = levelNum;
		this.worldWidth = worldWidth;
		this.worldDepth = worldDepth;
		this.atmosphereHeight = atmosphereHeight;
		this.alphaCameraDistance = alphaCameraDistance;
		this.numRandomLights = numRandomLights;
		this.buildingModelURLs = buildingModelURLs;
		this.alphaModelURL = alphaModelURL;
		this.floorTextureURL = floorTextureURL;
		this.backgroundURL = backgroundURL;
		this.numPowerups = numPowerups;
		this.numCollectibles = numCollectibles;
		this.collectiblesToWin = collectiblesToWin;
		this.powerupTypes = powerupTypes;
		this.alphaMaxSpeedY = alphaMaxSpeedY;
		this.alphaMinSpeedY = alphaMinSpeedY;
		this.alphaMaxSpeedZ = alphaMaxSpeedZ;
		this.alphaMinSpeedZ  = alphaMinSpeedZ;
		this.mapBuildingRatio = mapBuildingRatio;
		this.minimapWidth = minimapWidth;
		this.minimapHeight = minimapHeight;
		this.pauseMenuTextureURL = pauseMenuTextureURL;
		this.crashSoundURL = crashSoundURL;
		this.pauseSoundURL = pauseSoundURL;
		this.playingSoundURL = playingSoundURL;
		this.lore = lore;
	}

	reinitializeGlobals(){
		scene = null;
		mainCamera = null;
		animating = false;
		player = new THREE.Object3D();
		keys = []; //records current keys being pressed
		resetCameraFlag = false //flag to reset the camera position to original position
		alpha = null;	// player stats tracking + model  object
		collideMeshArray = []; // array to store  all collidable mesh's (buildings + items)
		powerups = [];			// items providing certain powerups or "boosts" to the player for a short time when picked up
		activePowerup = null;
		collectibles = [];			// the items that the player needs to collect in order to progress to the next level
		mixer = null;  // The object that animates the model, of type THREE.AnimationMixer
		minimapCamera = null; 
		worldMap = null;
		joshSucks = null; // he does
	}
}
