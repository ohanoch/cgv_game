"use strict";

//create paused sprite
var pausedSpriteMap = new THREE.TextureLoader().load( "sprites/menu_sprites/paused.png" );
var pausedSpriteMaterial = new THREE.SpriteMaterial( { map: pausedSpriteMap } );
var pausedSprite = new THREE.Sprite( pausedSpriteMaterial );
//create level 1 sprite
var level1SpriteMap = new THREE.TextureLoader().load( "sprites/menu_sprites/level1.png" );
var level1SpriteMaterial = new THREE.SpriteMaterial( { map: level1SpriteMap } );
var level1Sprite = new THREE.Sprite( level1SpriteMaterial );
//create level 2 sprite
var level2SpriteMap = new THREE.TextureLoader().load( "sprites/menu_sprites/level2.png" );
var level2SpriteMaterial = new THREE.SpriteMaterial( { map: level2SpriteMap } );
var level2Sprite = new THREE.Sprite( level2SpriteMaterial );
//create level 3 sprite
var level3SpriteMap = new THREE.TextureLoader().load( "sprites/menu_sprites/level3.png" );
var level3SpriteMaterial = new THREE.SpriteMaterial( { map: level3SpriteMap } );
var level3Sprite = new THREE.Sprite( level3SpriteMaterial );
//create level 4 sprite
var level4SpriteMap = new THREE.TextureLoader().load( "sprites/menu_sprites/level4.png" );
var level4SpriteMaterial = new THREE.SpriteMaterial( { map: level4SpriteMap } );
var level4Sprite = new THREE.Sprite( level4SpriteMaterial );


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< M E N U   F U N C T I O N S >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/*///////////////////////////////////////////////////////////////////////////////// 
	Creates  menu variables and inserts them into menus array
	Called by createWorld
	INPUT: none
	OUTPUT: none - adds variables directly to global menus array
//////////////////////////////////////////////////////////////////////////////////*/

function createMenus(){
	var startMenu = new Menu(
			level.alphaCameraDistance * 2 * 2, 
			"textures/skyboxes/ulam_words/", 
			"textures/buttons/", 
			["exit_button", "start_button","controls_button","credits_button"]
		);
	menusArr.startMenu = startMenu;
	var pauseMenu = new Menu(
			level.alphaCameraDistance * 2 * 2, 
			level.pauseMenuTextureURL,
			"textures/buttons/", 
			["exit_button", "restart_button", "resume_button", "controls_button"]
		);
		menusArr.pauseMenu = pauseMenu;
}

/*///////////////////////////////////////////////////////////////////////////////// 
	Returns the current open menu
	Called by menuInteraction and keysPressed
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function openMenu(){
	var menu;
	if(menusArr.startMenu.isOpen){
		menu = menusArr.startMenu;
	} else if(menusArr.pauseMenu.isOpen){
		menu = menusArr.pauseMenu;
	} else {
		menu = null;
	}
	return menu;
}


/*///////////////////////////////////////////////////////////////////////////////// 
	Exits the menu.
	Called by exitMenu and menuInteraction
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function exitMenu(){
	var menu = openMenu();
	
	console.log("exiting menu");
	scene.remove(menu.skybox);
	for(var i = 0; i< menu.buttons.length; i++){
		scene.remove(menu.buttons[i]);
	}
	scene.add(worldMap.floor);
	
	menu.isOpen = false;
	document.removeEventListener("mousedown", menuInteraction);

	if(menu == menusArr.startMenu){
		window.alert(level.lore);
		var currLevelSprite;
		switch(currLevel){
			case 2:
				currLevelSprite = level2Sprite;
				break;
			case 3:
				currLevelSprite = level3Sprite;
				break;
			case 4:
				currLevelSprite = level4Sprite;
				break;
			default:
				currLevelSprite = level1Sprite;
		}
		scene.remove(currLevelSprite)
	} else if( menu == menusArr.pauseMenu ){
		scene.remove(pausedSprite);
	}

	//change sounds to game sounds
	if(mute == false){
		console.log("changing sounds to game sounds");
		playingSound.play();
		pauseSound.pause();
	}
}



/*y///////////////////////////////////////////////////////////////////////////////// 
	Uses raycasting to check which menu box the user clicks
	Callback function for mouseclick event listener in displayMenu
	INPUT: click eventscene.add( pausedSprite );
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function menuInteraction(e){
	var raycaster = new THREE.Raycaster();
	var menu = openMenu();
	//var r = window.getBoundingClientRect();
	var x = e.clientX							// take in click coordinates
	var y = e.clientY	// 

	var a = 2 * x / window.innerWidth - 1; // convert canvas pixel coords to clip coords
	var b = 1 - 2 * y / window.innerHeight;

	raycaster.setFromCamera( new THREE.Vector2(a,b), mainCamera );		//COMMENT

	var intersections = raycaster.intersectObjects( menu.buttons, true );
	if(intersections.length >= 1){
		if(intersections[0].object.name == "restart_button"){
			console.log("restarting game");
			exitMenu();
			restartGame();
		} else if(intersections[0].object.name == "start_button"){
			console.log("starting game");
			exitMenu();
			animating = true;
			requestAnimationFrame(doFrame);
		} else if (intersections[0].object.name == "resume_button"){
			console.log("resuming game");
			exitMenu();
			animating = true;
			requestAnimationFrame(doFrame);
		} else if(intersections[0].object.name == "exit_button"){
			window.alert("This is, sadly, a web game.\nIf you want to close it you are welcome to close this browser tab.\nJust know that it cannot be proven that exiting this game will not result in you being dead one month later\nYou have been warned");
		} else if(intersections[0].object.name == "controls_button"){
			window.alert("P - Play/Pause\nM - mute/unmute\nJ - turn cube camera on and off\n\nMovement:\nZ - jump\nLeft/Right Arrows - rotate\nUp/Down Arrows - move forward back\nWASD - strafe\n\n\Powerups:\nGreen - gravity off\nBlue - minimize __alpha__\nRed - shooting, cause its pretty");
		} else if(intersections[0].object.name == "credits_button"){
			window.alert("This game was technically made by Avi Bank, Niambh Blundell, Or Hanoch but..\nIt was actually brought to life by the awesome Dr. Richard Klein, Phd, who taught us everything we know and inspired us to be better people. Everything we Do we owe to him.\nWE LOVE YOU RICHARD!");
		}
	}
}

/*////////////////////////////////////////////////////////////////////////////////
	Display pause menu, sets position of menu skybox and buttons and places them in the scene, makes an event listener for mouseclicks
	Called by keysPressed when the 'p' key is pressed
	INPUT: none
	OUTPUT: none
/////////////////////////////////////////////////////////////////////////////////*/
function displayMenu(menu){
	menu.isOpen = true;
	menu.skybox.position.x = player.position.x;
	menu.skybox.position.y = player.position.y;
	menu.skybox.position.z = player.position.z;
	scene.add(menu.skybox);

	for(var i = 0; i < menu.buttons.length; i++){
		menu.buttons[i].position.x = player.position.x + Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * ((level.alphaCameraDistance * 2 - 5) / 2);
		menu.buttons[i].position.y = player.position.y +  Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * ((level.alphaCameraDistance * 2 - 5) / 2);
		menu.buttons[i].position.z = player.position.z + Math.pow(-1, Math.floor(Math.random() * 2 + 1)) * Math.random() * ((level.alphaCameraDistance * 2 - 5) / 2);

		scene.add(menu.buttons[i]);
	}
	scene.remove(worldMap.floor);

	//change sounds
	if(mute == false){
		console.log("changing sounds to pause sounds");
		playingSound.pause();
		pauseSound.play();
	}

	if(menu == menusArr.pauseMenu){
		pausedSprite.position.set( player.position.x, player.position.y, player.position.z);
		pausedSprite.scale.set( 12, 6, 1.0 );
		scene.add( pausedSprite );
	} else if(menu == menusArr.startMenu){
		var currLevelSprite;
		switch(currLevel){
			case 2:
				currLevelSprite = level2Sprite;
				break;
			case 3:
				currLevelSprite = level3Sprite;
				break;
			case 4:
				currLevelSprite = level4Sprite;
				break;
			default:
				currLevelSprite = level1Sprite;
		}
		currLevelSprite.position.set( player.position.x, player.position.y, player.position.z - 20);
		currLevelSprite.scale.set( 12, 6, 1.0 );
		scene.add( currLevelSprite  )
	}
	console.log("displaying menu...");

	document.addEventListener("mousedown", menuInteraction, false);
}

//END OF MENU FUNCTIONS

