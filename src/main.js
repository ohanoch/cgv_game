"use strict";

var STARTING_LIVES = 3;
var currLevel = 3; //level variable mostly for display purposes at the moment
var level;

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< G L O B A L    V A R I A B L E S >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

/* General mechanics variables */
var canvas, renderer, scene, mainCamera; // Standard three.js requirements.
var container, stats;
var minimapCamera;  //minimap variables
var controls;  											// An OrbitControls object that is used to implement
              											// rotation of the scene using the mouse.  (It actually rotates
               											// the camera around the scene.)
var listener, crashSound, playingSound, pauseSound;  //sound variables

/* flags for different instances */
var fullscreen = false;
var animating = false;  					// Set to true when an animation is in progress.
var alpha_centered =true;							// used to recenter alpha avater after doing a rotation animation
var keys = []; 								// records current keys being pressed
var resetCameraFlag = false 				// flag to reset the camera position to original position
var jumping = false;						// whether player is jumping or not
var alphaDone = false;
var mapDone = false;
var score = 0;
var lives = STARTING_LIVES;
var collectibleCount = 0;
var activePowerups = [];
var crot = Math.PI;									// iterator for doing object rotation animation
var mixer = null;  							// The object that animates the model, of type THREE.AnimationMixer
var mute = false;
var frameNumber = 0;

/* Global object variables */
var player = new THREE.Object3D();
var alpha;									// player stats tracking + model  object
var worldMap; 								// make global so it can be accessed by collision function

/* Global object arrays */
var menusArr = {};
var collideMeshArray = []; 					// array to store  all collidable mesh's (buildings + items)
var powerups = [];							// items providing certain powerups or "boosts" to the player for a short time when picked up
var collectibles = [];						// the items that the player needs to collect in order to progress to the next level


/* text sculputure*/
var discoBall;
var sculpt;
var joshSucks;								// he does
// for the text; there is no better way, sorry.
var textMesh1;
var font;
var text;
var text_height;
var text_size;

var curveSegments;	
var text_object_container;			
var cubeCamera;			// for dynamic reflections
var reflection_on_off; //turn cubeCam on or off

//shooting: https://github.com/saucecode/threejs-demos/blob/master/09_Shooting/demo.js
var bullets = []


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< CUTSCENE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var cutscenePlaying = true;
var cutscene = new THREE.Scene();
// var cutsceneCamera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 0.1, 100);
var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
var cutsceneCamera =new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);


// custom global variables
var video, videoImage, videoImageContext, videoTexture;

	///////////
	// VIDEO //
	///////////
	
	// create the video element
	video = document.createElement( 'video' );
	// video.id = 'video';
	// video.type = ' video/ogg; codecs="theora, vorbis" ';
	video.src = "videos/sw2.ogv";
	video.load(); // must call after setting/changing source
	video.play();
	
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 	480;
	videoImage.height = 204;

	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = 'red';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );
	// the geometry on which the movie will be displayed;
	// 		movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( 480, 204, 4, 4 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
	movieScreen.position.set(0,50,0);
	// movieScreen.rotateX(-Math.PI/3);
	cutscene.add(movieScreen);
	
	cutsceneCamera.position.set(0,50,200);
	cutsceneCamera.lookAt(movieScreen.position);

	var cutsceneFrames = 0;

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< I N I T I A L I S A T I O N   F U N C T I O N S >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


/* /////////////////////////////////////////////////////////////
	Creates the world map, lights, cameras, player and collectibles and powerups.
	Called by restartGame and init.
	INPUT: none
	OUTPUT: none
 *//////////////////////////////////////////////////////////////
function createWorld() {
    renderer.setClearColor("black"); // Background color for scene.
    scene = new THREE.Scene();
    var fogColour = new THREE.Color(level.fogColour);
	  scene.fog = new THREE.Fog(fogColour, level.alphaCameraDistance * 15, level.alphaCameraDistance * 20);
    scene.add(player);

	createMenus();

    // -------------------------------------- MAKE MAIN CAMERA -------------------------------------
    mainCamera = new THREE.PerspectiveCamera(
		30,
		window.innerWidth/window.innerHeight,
		0.1,
		level.alphaCameraDistance * 20
	);
  	mainCamera.position.z = level.alphaCameraDistance;
  	player.add(mainCamera);

    // -------------------------------------- MAKE SOUND -------------------------------------
	// create an AudioListener and add it to the camera
	listener = new THREE.AudioListener();
	mainCamera.add( listener );

	// create a global audio source
	crashSound = new THREE.Audio( listener );
	playingSound = new THREE.Audio( listener );
	pauseSound = new THREE.Audio( listener );

	addSounds();
	//-------------------------------------------- LIGHTING ------------------------------------------------
	createRandomLights();
	var viewLight = new THREE.PointLight(level.alphaLightColour, 1);
	player.add(viewLight);
	viewLight.position.z = level.alphaCameraDistance;


	//------------------------------------------ MINIMAP ----------------------------------------------
	minimapCamera = new THREE.OrthographicCamera(		// Orthographic camera does not change according to distance, which is what we want
	    window.innerHeight / -5,						// Left
		window.innerHeight / 5,							// Right
    	window.innerHeight / 5,							// Top
    	window.innerHeight / -5,						// Bottom
    	-3 * level.atmosphereHeight,					// Near
    	10000 );           								// Far
	minimapCamera.up = new THREE.Vector3(0,0,-1);		// COMMENT
	minimapCamera.lookAt( new THREE.Vector3(0,-1,0) );	// COMMENT
	scene.add(minimapCamera);							// Add minimap camera to scene



    //---------------------------------- CREATE THE WORLD -------------------------------------------
	worldMap = new Map(level.worldWidth, level.worldDepth, level.atmosphereHeight, level.floorTextureURL, level.backgroundURL, level.buildingModelURLs) //width, height, atmosphereHight, textureURL, skyboxDirectory

	scene.add(worldMap.floor);
	scene.background = worldMap.background;
	scene.add(worldMap.atmosphere);
	//add buildings to scene
	worldMap.createBuildings(level.mapBuildingRatio);

	for (var i = 0; i < worldMap.buildings.length; i++){
		scene.add(worldMap.buildings[i]);
	}



    //---------------------------------- Dynamic Sculpture -------------------------------------------
    // TODO: try cubecamera on lab computers
	// resources: http://learningthreejs.com/blog/2014/05/12/live-cube-maps-reflections-in-your-three-dot-js-game-with-threex-dot-cubecamera/

	sculpt = new THREE.Object3D(); 		// Sculpture container
	joshSucks = new THREE.Object3D();		// Sphere Sculpture object

	// Make a reflective sphere (only reflects skybox, at the moment)
	var geometry = new THREE.SphereGeometry(5, 32, 16);
	var material = new THREE.MeshPhongMaterial({
    color   : 0xffffff,
	envMap 	: scene.background
	});
	discoBall = new THREE.Mesh(geometry, material);
	discoBall.position.set(0,0,0);	// centre obj coords of sphere
	joshSucks.add(discoBall);

//diffuse stick
	var length = 8, width = 8;

	var shape = new THREE.Shape();
	shape.moveTo( 0,0 );
	shape.lineTo( 0, width );
	shape.lineTo( length, width );
	shape.lineTo( length, 0 );
	shape.lineTo( 0, 0 );

	var extrudeSettings = {
		steps: 2,
		amount: 100,
		bevelEnabled: true,
		bevelThickness: 1,
		bevelSize: 1,
		bevelSegments: 1
	};
	var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	var material = new THREE.MeshStandardMaterial({color: 0x517a, roughness: 0.6, })
	var stick = new THREE.Mesh( geometry, material ) ;
	stick.rotation.x=Math.PI/2;
	stick.position.set(-1.5,10,0);

///////////


//////////////////////////////////////////////////////////////////////////////////
//		add  text	 														//
///	///////////////////////////////////////////////////////////////////////////////
	text = "JOSH  SUCKS";
	text_height = 0.5;
	text_size = 2;
	curveSegments = 4;
	font = undefined;

	text_object_container = new THREE.Group();	
	text_object_container.position.set(-8,0,7);	// -8,0,7 is the magic tuple to get the text to rotate around the sphere.

	loadFont();
	joshSucks.add(text_object_container);
	joshSucks.children[1].rotateZ(0.2);	
	// joshSucks.add( stick );
	// var temp_test = player.position.clone();
	joshSucks.position.set(1,12,3.8);	//center the sphere
	
///// cube cam for reflections
	cubeCamera	= new THREEx.CubeCamera(discoBall);
	cubeCamera.update(renderer, scene);
	material.envMap	= cubeCamera.textureCube;
////////////////////////////////////////
	sculpt.add(joshSucks);
	sculpt.add(stick);
	sculpt.scale.set(5,5,5);
	sculpt.position.set(0,5,0);
	scene.add(sculpt);
	scene.add(cubeCamera.object3d);		// good enough



	//----------------------------------- CREATE THE PLAYER --------------------------------------------

	// alpha is created by modelLoader function and added to player

	var loader = new THREE.JSONLoader();					// create loader for .js models

	loader.load(level.alphaModelURL, modelLoader);			// load model and call model_loader


//------------------------------------- CREATE POWERUPS -----------------------------------------------
	createPowerups();
//--------------------------------------- CREATE COLLECTIBLES ------------------------------------------------
	createCollectibles(level.collectibleURL);

} // end function createWorld()



/*//////////////////////////////////////////////////////////////////////////
	Model Loader function for alpha object. Creates alpha, places it in the scene and sets up animation
	Callback function for JSON loader in createWorld()
	INPUT: THREE geometry and material objects
	OUTPUT: none
///////////////////////////////////////////////////////////////////////////*/
function modelLoader(geometry, materials) {

	var material = new THREE.MeshLambertMaterial( {
        vertexColors: THREE.FaceColors,  			// use colors from the geometry
        morphTargets: true							// for animation
    });
	alpha = new Alpha(geometry,material, 1);		// create alpha object

// TRANSFORMS
	alpha.geometry.computeBoundingSphere();
	alpha.scale.set(
		500/Math.pow(alpha.geometry.boundingSphere.radius,2),
		500/Math.pow(alpha.geometry.boundingSphere.radius,2),
		500/Math.pow(alpha.geometry.boundingSphere.radius,2),
	);
	alpha.position.set(0,0,0);
	alpha.rotateY(Math.PI);
	alpha.castShadow = true;
	player.add(alpha);								// add alpha to player
	player.translateY(10);							// move player so that alpha doesn't crash on game start

	alpha.geometry.computeBoundingBox();			// Get bounding box for model, for doing collisions
	alphaDone = true;
	alpha.startup();


// ANIMATION STUFF
	mixer = new THREE.AnimationMixer( alpha );
	var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'motion', geometry.morphTargets, 30 );
    var animationAction = mixer.clipAction(clip);
    animationAction.setDuration(1);
    animationAction.play();
	render();
}

// END OF INITIALISATION

/*/////////////////////////////////////////////////////////////////////////////////
	Updates frame by moving player, moving minimap camera, crashing player if they move above atmosphere or below floor, update animations, increment score and check for collisions
	Called by doFrame
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function updateForFrame() {
	frameNumber++;

	// make dynamic reflections
	if(reflection_on_off == true){
		cubeCamera.update(renderer, scene);
		discoBall.material.envMap = cubeCamera.textureCube;
	}

	//animate josh sucks (text) WOOHOO I CAN ACCESS CHILD NODES!
	// joshSucks.rotateY(0.1*Math.sin(Math.PI/6));
	sculpt.children[0].rotateY(0.1*Math.sin(Math.PI/6));

	//Move player backwards or forwards by their Z velocity
    player.translateZ(alpha.getSpeedZ());

    //Move player up or down by their Y velocity
	player.translateY(alpha.getSpeedY());

	// move minimap camera on x,z axis according to player
	// minimap height stays constant right and captures from right bellow the atmosphere
	minimapCamera.position.set(player.position.x, minimapCamera.position.y, player.position.z);

	// t to stop gravity, for testing
	if(keys[84]){
		alpha.setMinSpeedY(0);
	}

	// Put player on floor if they aren't already on it.
	if(!putOnFloor()){
		return;
	}

	//check for death by atmosphere (lasers) (height) + some leeway
	if(player.position.y > level.atmosphereHeight + 1){
		Crash();
		return;
	}

	// Slowly moving the camera back behind _alpha_
	if (resetCameraFlag){
		resetCameraPosition();
	}

	// Animate the avatar model to rotate back to center in it's z-axis, after banking
    reCenterAlpha();

	// Animate power-ups
	for(var i = 0; i < powerups.length; i++){
		powerups[i].animate();
	}

//check if a power has been activated
	if(activePowerups.length > 0) {
		for (var k = 0; k < activePowerups.length; k++) {
			if(activePowerups[k].getExpiration() < 0) {
				activePowerups[k].deactivatePower();
				activePowerups.splice(k, 1);
			} else {
				activePowerups[k].decrementExpiration();
			}
		}

	}

	// animate collectibles
	for(var j = 0; j < collectibles.length; j++) {
		collectibles[j].animate();
	}

	// update model animation
	if(mixer) {
		var updateSpeed = 0.02*(-1)*alpha.speedZ;
		if(updateSpeed > 0.05) {
			mixer.update(0.05);
		} else if(updateSpeed < 0.005) {
			mixer.update(0.005)
		} else {
			mixer.update(0.02*(-1)*alpha.speedZ);
		}
	}

	// camera can't got below floor
	if(new THREE.Vector3().setFromMatrixPosition(mainCamera.matrixWorld).y < worldMap.floorHeight + 0.1){
		mainCamera.position.y = worldMap.floorHeight + 1.1;
	}

	// Summon keyboard control lookups in one line.
	keyCheck();

	//Collision
	collisions();
	if(alpha == null){
		return;
	}

	// Score update: TODO: ut in function and tidy up
	if(Math.abs(player.position.x) <= level.worldWidth / 2 && Math.abs(player.position.z) <= level.worldDepth){
		score++;
	} else {
		score = score - 5;
	}

	document.getElementById("s0").innerHTML = "Level: " + level.levelNum;
 	document.getElementById("s1").innerHTML = "Score: " + score;
 	document.getElementById("s2").innerHTML = "Lives: " + lives; // this will need to go in Crash function maybe

}



/*/////////////////////////////////////////////////////////////////////////////////
	Drives the animation, called by system through requestAnimationFrame()
	Called by itself, exitMenu, init and keysPressed
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function doFrame() {
	if (cutscenePlaying) {
      	renderer.setClearColor("black");
        render();
		stats.update();
		cutsceneFrames++;
		// console.log(cutsceneFrames);
		if(cutsceneFrames < 300 ){
			requestAnimationFrame(doFrame);
		} else {
			cutscenePlaying = false;
			finishInit();
		}
        
	}

    if (animating) {
        updateForFrame();
        render();
		stats.update();
        requestAnimationFrame(doFrame);
    }
}

 /*/////////////////////////////////////////////////////////////////////////////////////
	Finishes initialisation of the world after cutscene is done.
	Called by doFrame
	INPUT: none
	OUTPUT: none
 //////////////////////////////////////////////////////////////////////////////////////*/
function finishInit() {

	createWorld();
    installOrbitControls();

	document.addEventListener("mousedown", function(){resetCameraFlag = false}, false);
	document.addEventListener("mouseup", function(){resetCameraFlag = true}, false);
    render();
}


 /*/////////////////////////////////////////////////////////////////////////////////////
	Creates the renderer, container for stats, scene object, calls createWorld and installOrbitControls. Renders initial view of the scene
	Called by onload event
	INPUT: none
	OUTPUT: none
 //////////////////////////////////////////////////////////////////////////////////////*/
function init() {
	createLevel(currLevel);
    try {
    	document.getElementById( 'container' ).style.margin = "0px 0px 0px 0px";
		container = document.getElementById( 'container' );
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.setScissorTest( true ); //important for minimap not to take control of entire screen even though it only occupies a corner
		//renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

		container.appendChild( renderer.domElement );

		stats = new Stats();
		container.appendChild( stats.dom );


    }
    catch (e) {
        document.getElementById("message").innerHTML="<b>Sorry, an error occurred:<br>" +
                e + "</b>";
        return;
    }

	cutscene.add(cutsceneCamera);		//starwars
	requestAnimationFrame(doFrame);
}
