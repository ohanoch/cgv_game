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

			var cubeSize = Math.max(this.width, this.atmosphereHeight, this.depth);
			this.skybox = new THREE.Mesh(
				new THREE.CubeGeometry( cubeSize, cubeSize, cubeSize, 1, 1, 1 ),
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
		console.log("adding " + Math.pow(this.width*this.depth,ratio/1.3) + " buildings to map")
		var materialLoader = new THREE.MTLLoader();
		
		for(var i = 1;
			i < Math.pow(this.width*this.depth,ratio/1.3);
			i++){

			materialLoader.load( 'models/mill/mill.mtl' ,
				function(materials){
					materials.preload();
					
					var objLoader = new THREE.OBJLoader();
					objLoader.setMaterials(materials);				
					objLoader.load( 'models/mill/mill.obj',
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

							console.log((1/objectGeo.boundingSphere.radius) * Math.random() * Math.pow(worldMap.width, ratio));

							//resize loaded object with relation to its size (should apply to any object)
							var resizeNum = (1/objectGeo.boundingSphere.radius) * Math.random();
							object.scale.set(
								resizeNum * Math.pow(worldMap.width, ratio), //width
								resizeNum * Math.pow(worldMap.atmosphereHeight, ratio), //width
								resizeNum * Math.pow(worldMap.depth, ratio) //depth
							);

							//put building on surface of world (may be a elevated)
							object.translateX(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.width / 2); 
							object.translateY(Math.random() * (worldMap.atmosphereHeight - objectGeo.boundingSphere.radius + objectGeo.boundingSphere.radius / 2));
							object.translateZ(Math.pow(-1, Math.round(2 * Math.random())) * Math.random() * worldMap.depth / 2);
							
							worldMap.buildings.push( object );
							scene.add( object );
						}
					);
				}
			);
		}
	}
}
