"use strict";

class Map {
	
	constructor(width, height, depth, textureURL, skyboxURL) {		//create and initialize map
		
		this.width = width;
		this.height = height;
		this.depth = depth;
		this.buildings = [];	

		//-------------------------------------- FLOOR -------------------------------------------------
		if(textureURL != ""){
			var floorTexture = new THREE.ImageUtils.loadTexture( texturesURL );    //load floor texture
			floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;                 //wrap floor texture both sides
			floorTexture.repeat.set( 20, 20 );                                              //how many times the image repeats
			this.floor = new THREE.Mesh(
				new THREE.PlaneGeometry(this.width, this.height,1,1),
				new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
			);
			floor.position.set(0,-4,0);
			floor.rotation.x = -Math.PI / 2;

			console.log("Floor texture added to map");
		}
	
		//-------------------------------------- SKYBOX -------------------------------------------------
		//stolen from: https://jeremypwalton.wordpress.com/2014/09/19/skybox-in-three-js/
    	//other maybe useful link: http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
		if(skyboxURL != ""){
			var materialArray = [];
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-xpos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-xneg.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-ypos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-yneg.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-zpos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture(skyboxURL + "-zneg.png") }));

			for (var i = 0; i < 6; i++) {
				materialArray[i].side = THREE.BackSide;
			}

			this.skybox = new THREE.Mesh(
				new THREE.MeshFaceMaterial( materialArray ),
				new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 )
			);

			console.log("Skybox added to map");
		}

		console.log("Map Created");
		
	}

	/**
	 * The createBuildings function adds buildings in the worldMap on top of the worldPlane
	 * Input = map-building ratio
	 * Output = None - the worldMap global variable will be edited inside the function
	 */
	createBuildings(ratio) {
		var buildingMapRatio = Math.pow(WORLD_HEIGHT*WORLD_WIDTH, ratio);
		for(var i = 1;
			i < buildingMapRatio * 2;
			i++){
				var building = new THREE.Mesh(
					new THREE.BoxGeometry(
						Math.random() * buildingMapRatio + 1, //width
						Math.random() * buildingMapRatio + 1, //height
						Math.random() * buildingMapRatio + 1 //depth
					),
					new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} )
				);
				//put building on surface of world (may be a elevated)
				building.translateX(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * WORLD_WIDTH / 2); 
				building.translateY(Math.random() * (ATMOSPHERE_HEIGHT / building.geometry.parameters.height));
				building.translateZ(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * WORLD_HEIGHT / 2);
				this.buildings.push(building);
			}
	}

}
