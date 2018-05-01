"use strict";

class Menu {
	
	constructor(cubeSize, skyboxDirectoryURL, buttonDirectoryURL) {


		//-------------------------------------- SKYBOX -------------------------------------------------
        //stolen from: https://jeremypwalton.wordpress.com/2014/09/19/skybox-in-three-js/
        //other maybe useful link: http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
        if(skyboxDirectoryURL != ""){
			this.addSkybox(skyboxDirectoryURL, cubeSize);
		}
			//------------------------------------------ BUTTONS ---------------------------------------
		if(buttonDirectoryURL != "")
			this.buttons = [];
			this.addButton(buttonDirectoryURL, "resume_button");
			this.addButton(buttonDirectoryURL, "exit_button");
			this.addButton(buttonDirectoryURL, "restart_button");

		console.log("menu created")
	}

	addSkybox(skyboxDirectoryURL, cubeSize){
		var textureLoader = new THREE.TextureLoader();
		var materialArray = [];
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "posx.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "negx.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "posy.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "negy.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "posz.jpg") }));
		materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "negz.jpg") }));

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
