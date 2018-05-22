"use strict";

var modelList;

class Map {
	
	constructor(width, depth, atmosphereHeight, floorTextureURL, backgroundDirectoryURL, inputModelList) {		//create and initialize map
		
		this.width = width; // x axis
		this.atmosphereHeight = atmosphereHeight; // y axis
		this.depth = depth; // z axis
		this.buildings = []; // array of buildings
		this.buildingBoxes = [];
		modelList = inputModelList;

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
				new THREE.MeshStandardMaterial({ map: floorTexture, side: THREE.DoubleSide })
			);
			this.floorHeight = -4;
			this.floor.position.set(0,this.floorHeight,0);
			this.floor.rotation.x = -Math.PI / 2;
			this.floor.receiveShadow = true;			

			console.log("Floor texture added to map");
		}
	
		if(backgroundDirectoryURL != ""){
			
			this.background = new THREE.CubeTextureLoader()
				.setPath(backgroundDirectoryURL)
				.load([
					'xpos.png',
					'xneg.png',
					'ypos.png',
					'yneg.png',
					'zpos.png',
					'zneg.png'
				]);

			console.log("background added to map");
		}

		console.log("Map Created");
	
	}

	/**
	 * The createBuildings function adds buildings in the worldMap on top of the worldPlane
	 * Input = map-building ratio
	 * Output = None - the worldMap global variable will be edited inside the function
	 */
	createBuildings(ratio) {
		var numBuildings = Math.floor(Math.pow(worldMap.width * worldMap.depth, ratio/1.3));
		console.log("adding " + numBuildings + " buildings to map")

		var materialLoader = new THREE.MTLLoader();		
		
		//split numBuildings between different models
		var numPerModel = splitNumToParts(numBuildings, modelList.length);
		console.log("split of building types " + numPerModel);

		var numLoaded = 0;
		function loadingDone(){
			numLoaded++;
			if (numLoaded == modelList.length){
				mapDone = true;
				alpha.startup();
			}
		}
		//load models
		var modelLoader = function(modelURL, numModels){
			materialLoader.load(
				modelURL + '.mtl' ,
				function(materials){
					materials.preload();
					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials(materials);
					objLoader.load(
						modelURL + '.obj',
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
							objectGeo.computeBoundingBox();

							for(var j = 1; j < numModels; j++){

								var currObject = object.clone();
								var currObjectBox = objectGeo.boundingBox;

								//resize loaded object with relation to its size (should apply to any object)
								var resizeNum = Math.pow(worldMap.atmosphereHeight, ratio) * (1/objectGeo.boundingSphere.radius) * Math.random();
								currObject.scale.set(resizeNum, resizeNum, resizeNum);

								currObject.rotateY(Math.random()*2*Math.PI);

								//put building on surface of world (may be a elevated)
								currObject.translateX(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.width / 2); 
								currObject.translateY(Math.random() * (worldMap.atmosphereHeight - objectGeo.boundingSphere.radius + objectGeo.boundingSphere.radius / 2));
								currObject.translateZ(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.depth / 2);
								
								worldMap.buildings.push( currObject );
								scene.add( currObject );

								//get geometry of object after it moved to get correct bounding box coordinates
								var box = new THREE.Box3();
								box.setFromObject( currObject );
								worldMap.buildingBoxes.push(box);
							}
							loadingDone();
						}
					);
				}
			);
		
		}

		// Calls loader for each object
		for (var i = 0; i < modelList.length; i++){
			modelLoader(modelList[i], numPerModel[i]);
		}

	}


}
