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
			3, 											//startingLives
			2,											//numRandomLights 
			0.5,										//mapBuildingRatio
			['models/tree/tree', 'models/mill/mill'], 	//buildingModelURLs
			"models/stork.js",							//alphaModelURL
			"textures/floor.jpg",						//floorTextureURL
			"textures/skyboxes/dawnmountain/", 			//backgroundURL
			30, 										//numPowerups
			30, 										//numCollectibles
			[0,1,2], 									//powerupsTypes
			1,											//alphaMaxSpeedY
			-10,										//alphaMinSpeedY
			-2,											//alphaMaxSpeedZ
			-0.01,										//alphaMinSpeedZ
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
