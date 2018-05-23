"use strict";


/* /////////////////////////////////////////////////////////////
	creates a level with all game attributes
	Called by init.
	INPUT: level number
	OUTPUT: none - sets level variable directly
 *//////////////////////////////////////////////////////////////
function createLevel(levelNum){
	currLevel = levelNum;
	if (levelNum == 0){
		level = new Level(
			levelNum,									//levelNum
			1500,										//width
			1500,										//depth
			300,										//atmosphereHeight
			20,											//alphaCameraDistance
			2,											//numRandomLights
			0xffffff,									//alphaLightColour
			0.5,										//mapBuildingRatio
			'models/oil_drum/oil_drum',							//collectibleURL
			['models/tree/tree', 'models/mill/mill'], 	//buildingModelURLs
			"models/stork.js",							//alphaModelURL
			"textures/floors/floor.jpg",						//floorTextureURL
			"textures/skyboxes/dawnmountain/", 			//backgroundURL
			0xffffff,									//fog colour
			30, 										//numPowerups
			30, 										//numCollectibles
			1,											//collectiblesToWin
			[1,2],	 									//powerupsTypes
			1,											//alphaMaxSpeedY
			-10,										//alphaMinSpeedY
			-2,											//alphaMaxSpeedZ
			-0.01,										//alphaMinSpeedZ
			1,											//changeSpeedY
			0.05,										//changeSpeedZ
			1,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.01,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/tantolunden5_words/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/highway_to_hell_8bit.mp3",				//pauseSoundURL
			"sounds/stayin_alive_8bit.mp3",				//playingSoundURL
			lore0										//lore for level story
		);
	} else if(levelNum == 1){
		level = new Level(
			levelNum,									//levelNum
			1000,										//width
			1000,										//depth
			400,										//atmosphereHeight
			20,											//alphaCameraDistance
			4,											//numRandomLights
			0x900036,									//alphaLightColour
			0.55,										//mapBuildingRatio
			'models/oil_drum/oil_drum',							//collectibleURL
			['models/ship/ship', 'models/car/car'], 	//buildingModelURLs
			"models/horse.js",							//alphaModelURL
			"textures/floors/lava_floor.png",						//floorTextureURL
			"textures/skyboxes/mp_mercury/", 			//backgroundURL
			0x900036,									//fog colour
			30, 										//numPowerups
			30, 										//numCollectibles
			1,                                          //collectiblesToWin
			[1,2],	 									//powerupsTypes
			0.8,											//alphaMaxSpeedY
			-3,										//alphaMinSpeedY
			-7,											//alphaMaxSpeedZ
			-3.5,										//alphaMinSpeedZ
			0.9,											//changeSpeedY
			0.007,										//changeSpeedZ
			1.2,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.02,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/nec_hell/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/highway_to_hell_8bit.mp3",				//pauseSoundURL
			"sounds/stayin_alive_8bit.mp3",				//playingSoundURL
			lore1										//lore for level story
		);

	} else if (levelNum == 2) {
		level = new Level(
			levelNum,									//levelNum
			1000,										//width
			1000,										//depth
			300,										//atmosphereHeight
			20,											//alphaCameraDistance
			0,											//numRandomLights
			0x00ffff,									//alphaLightColour
			0.55,										//mapBuildingRatio
			'models/carrot/Carrot',							//collectibleURL
			['models/blue_shards/blue_shards', 'models/mill/mill', 'models/crystal/Crystal'], 	//buildingModelURLs
			"models/stork.js",							//alphaModelURL
			"textures/skyboxes/mp_whirlpool/yneg.png",						//floorTextureURL
			"textures/skyboxes/mp_whirlpool/", 			//backgroundURL
			0x028ea8,									//fog colour
			30, 										//numPowerups
			30, 										//numCollectibles
			1,											//collectiblesToWin
			[1,2],	 									//powerupsTypes
			1,											//alphaMaxSpeedY
			-10,										//alphaMinSpeedY
			-2,											//alphaMaxSpeedZ
			-0.01,										//alphaMinSpeedZ
			1,											//changeSpeedY
			0.01,										//changeSpeedZ
			1,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.01,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/mp_midnight/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/under_the_sea_8bit.mp3",				//pauseSoundURL
			"sounds/blue_8bit.mp3",				//playingSoundURL
			lore2										//lore for level story
		);
	} else if (levelNum == 3) {
		level = new Level(
			levelNum,									//levelNum
			1000,										//width
			1000,										//depth
			300,										//atmosphereHeight
			20,											//alphaCameraDistance
			0,											//numRandomLights
			0x00ffff,									//alphaLightColour
			0.55,										//mapBuildingRatio
			'models/carrot/Carrot',							//collectibleURL
			['models/blue_shards/blue_shards', 'models/mill/mill', 'models/crystal/Crystal'], 	//buildingModelURLs
			"models/stork.js",							//alphaModelURL
			"textures/skyboxes/mp_whirlpool/yneg.png",						//floorTextureURL
			"textures/skyboxes/mp_whirlpool/", 			//backgroundURL
			0x028ea8,									//fog colour
			30, 										//numPowerups
			30, 										//numCollectibles
			1,											//collectiblesToWin
			[1],	 									//powerupsTypes
			1,											//alphaMaxSpeedY
			-10,										//alphaMinSpeedY
			-2,											//alphaMaxSpeedZ
			-0.01,										//alphaMinSpeedZ
			1,											//changeSpeedY
			0.01,										//changeSpeedZ
			1,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.01,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/mp_midnight/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/under_the_sea_8bit.mp3",				//pauseSoundURL
			"sounds/blue_8bit.mp3",				//playingSoundURL
			lore3									//lore for level story
		);
	
	} else if (levelNum == 4) {
		level = new Level(
			levelNum,									//levelNum
			1000,										//width
			1000,										//depth
			1000,										//atmosphereHeight
			20,											//alphaCameraDistance
			0,											//numRandomLights
			0xffffff,									//alphaLightColour
			0.0,										//mapBuildingRatio
			'models/carrot/Carrot',							//collectibleURL
			['models/blue_shards/blue_shards', 'models/mill/mill', 'models/crystal/Crystal'], 	//buildingModelURLs
			"models/stork.js",							//alphaModelURL
			"textures/skyboxes/mp_whirlpool/yneg.png",						//floorTextureURL
			"textures/skyboxes/mp_whirlpool/", 			//backgroundURL
			0x028ea8,									//fog colour
			0, 										//numPowerups
			0, 										//numCollectibles
			1,											//collectiblesToWin
			[1],	 									//powerupsTypes
			1,											//alphaMaxSpeedY
			-10,										//alphaMinSpeedY
			-2,											//alphaMaxSpeedZ
			-0.01,										//alphaMinSpeedZ
			1,											//changeSpeedY
			0.01,										//changeSpeedZ
			1,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.01,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/mp_midnight/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/under_the_sea_8bit.mp3",				//pauseSoundURL
			"sounds/blue_8bit.mp3",				//playingSoundURL
			lore4									//lore for level story
		);
	}
}
