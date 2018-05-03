"use strict";

class Menu {
	
	constructor(cubeSize, skyboxDirectoryURL, buttonDirectoryURL, buttonNames) {

		this.isOpen = false;
		//-------------------------------------- SKYBOX -------------------------------------------------
        //stolen from: https://jeremypwalton.wordpress.com/2014/09/19/skybox-in-three-js/
        //other maybe useful link: http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
        if(skyboxDirectoryURL != ""){
			this.addSkybox(skyboxDirectoryURL, cubeSize);
		}
			//------------------------------------------ BUTTONS ---------------------------------------
		if(buttonDirectoryURL != []){
			this.buttons = [];
			for(var i = 0; i < buttonNames.length; i++){
				this.addButton(buttonDirectoryURL, buttonNames[i]);
			}
		}
		console.log("menu created")
	}

	/* /////////////////////////////////////////////////////////////
    Adds skybox to menu
	called from menu constructor
    INPUT: URL for skybox images folder, size of skybox cube
    OUTPUT: none - adds skybox directly to this.skybox
 *//////////////////////////////////////////////////////////////
	addSkybox(skyboxDirectoryURL, cubeSize){
		var textureLoader = new THREE.TextureLoader();
		var materialArray = [];
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "xpos.jpg") }));
console.log("")
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "xneg.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "ypos.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "yneg.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "zpos.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "zneg.jpg") }));

		for (var i = 0; i < 6; i++) {
			materialArray[i].side = THREE.BackSide;
		}

		this.skybox = new THREE.Mesh(
			new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize, 1, 1, 1 ),
			materialArray
		);

		this.skybox.position.x = player.position.x;
		this.skybox.position.y = player.position.y;
		this.skybox.position.z = player.position.z;

		console.log("added menu skybox");
	}

	/* /////////////////////////////////////////////////////////////
    Adds a button to the menu
    Called by menu constructor
    INPUT: directory with button image URLS, name of button
    OUTPUT: none - adds button directly to this.buttons array
 *//////////////////////////////////////////////////////////////

	addButton(buttonDirectoryURL, buttonName){
		var textureLoader = new THREE.TextureLoader();
		var materialArray = [];
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + "generel_button_side.png") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + "generel_button_side.png") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + buttonName + ".png") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + buttonName + ".png") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + buttonName + ".png") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(buttonDirectoryURL + buttonName + ".png") }));

		var button = new THREE.Mesh(
			new THREE.BoxGeometry(4,2,2),
			materialArray
		);
		button.name = buttonName;
		this.buttons.push(button);

		console.log("added menu button " + buttonName);
	}
}
