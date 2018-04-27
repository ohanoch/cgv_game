"use strict";

class Map {
	
	constructor(width, depth, atmosphereHeight, floorTextureURL, skyboxDirectoryURL) {		//create and initialize map
		
		this.width = width; // x axis
		this.atmosphereHeight = atmosphereHeight; // y axis
		this.depth = depth; // z axis
		this.buildings = []; // array of buildings

		//------------------------------------- Atmosphere --------------------------------------------
		this.atmosphere = new THREE.Mesh(
				new THREE.PlaneGeometry(this.width, this.depth,100,100),
				new THREE.MeshBasicMaterial({ 
					side: THREE.DoubleSide, 
					wireframe: true, 
					wireframeLinewidth: 2,
					opacity: 0.4, 
					color: 0xcc0000, 
					transparent: true,
				})
			);
		this.atmosphere.position.set(0,this.atmosphereHeight,0);
		this.atmosphere.rotation.x = -Math.PI / 2;

		var textureLoader = new THREE.TextureLoader();
		//-------------------------------------- FLOOR -------------------------------------------------
		if(floorTextureURL != ""){
			var floorTexture = textureLoader.load( floorTextureURL );    //load floor texture
			floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;                 //wrap floor texture both sides
			floorTexture.repeat.set( 20, 20 );                                              //how many times the image repeats
			this.floor = new THREE.Mesh(
				new THREE.PlaneGeometry(this.width, this.depth,1,1),
				new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide })
			);
			this.floorHeight = -4;
			this.floor.position.set(0,this.floorHeight,0);
			this.floor.rotation.x = -Math.PI / 2;

			console.log("Floor texture added to map");
		}
	
		//-------------------------------------- SKYBOX -------------------------------------------------
		//stolen from: https://jeremypwalton.wordpress.com/2014/09/19/skybox-in-three-js/
    	//other maybe useful link: http://learningthreejs.com/blog/2011/08/15/lets-do-a-sky/
		if(skyboxDirectoryURL != ""){
			var materialArray = [];
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "xpos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "xneg.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "ypos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "yneg.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "zpos.png") }));
			materialArray.push(new THREE.MeshBasicMaterial( { map: textureLoader.load(skyboxDirectoryURL + "zneg.png") }));

			for (var i = 0; i < 6; i++) {
				materialArray[i].side = THREE.BackSide;
			}

			this.skybox = new THREE.Mesh(
				new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 ),
				materialArray
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
		var buildingMapRatio = Math.pow(WORLD_DEPTH*WORLD_WIDTH, ratio);
		for(var i = 1;
			i < 2 /*buildingMapRatio * 2*/;
			i++){
		/**			console.log("loading toilet 1111111111111111111111111111111111");
				var loader = new THREE.ObjectLoader();
					console.log("loading toilet 2222222222222222222222222222222222");
	            loader.load( '/home/ash/Documents/cgv_game/models/tiefighter.json',
					function ( object ) {
						console.log("loading toilet 3333333333333333333333333333333333");
						var resizeNum = Math.random() * buildingMapRatio;
						object.scale.set(2,2,2);
					//		resizeNum, //width
					//		resizeNum, //height
					//		resizeNum //depth
					//	);
						object.position.set(
							Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.width / 2,
							Math.random() * worldMap.atmosphereHeight,
							Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.depth / 2
						);
						console.log("444444444444444444444444444444");
						//object.position.set(3,3,3);
						worldMap.buildings.push( object );
						scene.add(object);
					}, 
			 		function (){console.log("loading building in progress...")}, 
					function(e){
					alert("JSONLoader failed! because of error " + e.target.status + ", " + e.target.statusText);
					}
				);*/

				var building = new THREE.Mesh(
					new THREE.BoxGeometry(
						Math.random() * buildingMapRatio + 1, //width
						Math.min(this.atmosphereHeight, Math.random() * buildingMapRatio + 1), //height
						Math.random() * buildingMapRatio + 1 //depth
					),
					new THREE.MeshBasicMaterial( {color: Math.random() * 0xffffff} )
				);
				//put building on surface of world (may be a elevated)
				building.translateX(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * WORLD_WIDTH / 2); 
				building.translateY(Math.random() * (this.atmosphereHeight - building.geometry.parameters.height) + building.geometry.parameters.height / 2);
				building.translateZ(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * WORLD_DEPTH / 2);
				this.buildings.push(building);

			}
	}

}
