"use strict";


/* /////////////////////////////////////////////////////////////
	creates a level with all game attributes
	Called by init.
	INPUT: level number
	OUTPUT: none - sets level variable directly
 *//////////////////////////////////////////////////////////////
function createLevel(levelNum){
	currLevel = levelNum;
	var lore;
	if (levelNum == 0){
		lore = "The Centaurians are an advanced microbiological race that inhabits the Alpha Centauri star system.\n In order to survive the harsh conditions they have evolved the ability to shapeshift.\n They posses advanced technologies beyond human comprehension, except for emacs, they love emacs! Proxima Centauri, aka PC, is a red dwarf star that serves as the prison for the Alpha Centauri system.\n Once a being arrives in PC its identity is lost, and is given the name __alpha__\n\n We play as _alpha_, a falsely imprisoned centorian.\n alpha was accused of killing Bambi’s mother. Previous to _alpha_’s imprisonment _alpha_ and Walt Disney were lovers.\n When Walt discovered _alpha_ killed Bambi’s mother it was too much for him, he swore to never talk to alpha again. (Walt Disney was reincarnated as a centaurian after he was cryogenically frozen, which can be a side-effect of cryogenics).\n _alpha_ is on a mission to escape PC and tell Walt the truth and win his love back."

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
			"sounds/barbie_girl_8bit.mp3",				//pauseSoundURL
			"sounds/stayin_alive_8bit.mp3",				//playingSoundURL
			lore										//lore for level story
		);
	} else if(levelNum == 1){
		lore = "level 1";
		level = new Level(
			levelNum,									//levelNum
			1000,										//width
			1000,										//depth
			400,										//atmosphereHeight
			20,											//alphaCameraDistance
			4,											//numRandomLights 
			0xffffff,									//alphaLightColour
			0.5,										//mapBuildingRatio
			'models/oil_drum/oil_drum',							//collectibleURL
			['models/ship/ship', 'models/car/car'], 	//buildingModelURLs
			"models/horse.js",							//alphaModelURL
			"textures/floors/lava_floor.png",						//floorTextureURL
			"textures/skyboxes/dawnmountain/", 			//backgroundURL
			0xffffff,									//fog colour
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
			"textures/skyboxes/tantolunden5_words/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/barbie_girl_8bit.mp3",				//pauseSoundURL
			"sounds/stayin_alive_8bit.mp3",				//playingSoundURL
			lore										//lore for level story
		);

	} else if (levelNum == 2) {
		lore = "level 2";
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
			0.001,										//changeSpeedZ
			1,											//rotateSpeed
			0.5,										//strafeSpeed
			-0.01,										//gravity
			window.innerHeight/5,						//minimapWidth
			window.innerHeight/5,						//minimapHeight
			"textures/skyboxes/tantolunden5_words/",	//pauseMenuTextureURL
			"sounds/haha.wav",							//crashSoundURL
			"sounds/barbie_girl_8bit.mp3",				//pauseSoundURL
			"sounds/stayin_alive_8bit.mp3",				//playingSoundURL
			lore										//lore for level story
		);
	}
}
