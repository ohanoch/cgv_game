"use strict";

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<< MOUSE AND KEYBOARD SUPPORT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// Event listeners for keydown and keyup events
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

// keyboard control taken from: http://www.johannes-raida.de/tutorials/three.js/tutorial07/tutorial07.htm
// multiple keypresses from: https://www.kirupa.com/html5/keyboard_events_in_javascript.htm

/*///////////////////////////////////////////////////////////////////////////////// 
	Keyboard key lookups:  Check if arrow, a,w,s,d and space keys are down using keys array
	Called by updateForFrame
	keycodes taken from: https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes	
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function keyCheck(){

	// Up Arrow or "w" - camera moves forwad = speed up
	if(keys[38] || keys[87]){ 
		alpha.incSpeedZ(-1 * level.changeSpeedZ);
	}
    // Down Arrow or "s" - camera moves back = speed down
    if(keys[40] || keys[83]){  
		alpha.incSpeedZ(level.changeSpeedZ);
	}

    // a key: strafe left
    if (keys[65]) {     
        player.translateX(-1 * level.strafeSpeed);
    }

    // d key: strafe right
    if (keys[68]) {     
        player.translateX(level.strafeSpeed);
    }

    // right arrow: turn right
    if (keys[39]) {     
        player.rotateY(-1 * level.rotateSpeed * Math.PI/180);
        //animate avatar anti-clockwise in z
        if(crot < Math.PI + 0.4){
        	alpha.rotation.z = crot;
        	crot += 0.1;
        }

		minimapCamera.rotateZ(-1 * Math.PI/180);
    }

    // left arrow: turn left
    if (keys[37]) {     
        player.rotateY(level.rotateSpeed * Math.PI/180);
        // animate avatar clockwise in z
        if(crot < Math.PI + 0.4){
        	alpha.rotation.z = -crot;
        	crot += 0.1;
        }
    
		minimapCamera.rotateZ(Math.PI/180) ;
    }

   // z key: fight gravity
   if (keys[90]) {
		if (!alpha.jumping) {			// Set limit on jumping
			alpha.incSpeedY(level.changeSpeedY);
		}
		alpha.jumping = true;
    }
}


/*///////////////////////////////////////////////////////////////////////////////// 
	This function gets called when a key is pressed
	Callback function for keydown event listener
	INPUT: keydown event e
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function keysPressed(e) {
	// "p" for pause and play           
	if(e.keyCode == 80){
		if(openMenu() != null){
			exitMenu();
			animating = true;
			requestAnimationFrame(doFrame);
		} else {
			if(animating == true){
				animating = false;
				displayMenu(menusArr.pauseMenu);
			} else {
				animating = true;
				requestAnimationFrame(doFrame);
			}
		}
		render();
		return;
	}
	
	// "m" for mute and unmute ofo sound
	if(e.keyCode == 77){
		if(mute == true){
			mute = false;
			if (openMenu() != null){
				if (openMenu() == menusArr.startMenu) {
					startMusic.play();
				} else {
					pauseSound.play();
				}
			} else {
				playingSound.play();
			}
		} else {
			mute = true;
			playingSound.pause();
			pauseSound.pause();
			startMusic.pause();
		}
	}

	// F11 to enter and exit fullscreen
	if(e.keyCode == 122){
		if(!fullscreen){
			fullscreen = true;
			document.requestFullscreen();
		} else {
			fullscreen = false
			document.exitFullscreen();
		}
		return;
	}

	// F5 to refresh page
	if(e.keyCode == 116){
		window.location.reload(false); 
		return
	}


	// "j" for Josh sucks cubeCamera on/off
	if(e.keyCode == 74){
		if(reflection_on_off == true){
			reflection_on_off = false;
		}else {
			reflection_on_off = true;
		}
	}
	
    // store an entry for every key pressed
    keys[e.keyCode] = true;
    // NB: prevent default browser behavior - disable during testing
    //e.preventDefault();
}

/*///////////////////////////////////////////////////////////////////////////////// 
	Callback function for keyup event listener
	INPUT: keyup event e
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
    if (e.keyCode == 90) {
		alpha.jumping = false;
	}
	
	// Undo avatar rotation if left or right arrows are pressed
	if(e.keyCode == 37 || e.keyCode == 39) {
		alpha_centered = false;
	}

}

/*///////////////////////////////////////////////////////////////////////////////// 
	Function to re-center alpha's rotation after making a banking animation while turning.
	Called in updateForFrame().
	It's under mouse and keyboard functions because it deals with variables used in keyCheck() and keysReleased(e).
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function reCenterAlpha(){
	if(alpha_centered == false){

		if(crot == Math.PI){									// If alpha is centered, we are done; so update the vars that track this.
	    	alpha.rotation.z =  crot;
			alpha_centered = true;
		}else if(crot > Math.PI && crot*alpha.rotation.z < 0){	// Exploit the fact that z = -crot for left turns, to determine if we're recovering from a left or right turn.
			crot -= 0.1;
	    	alpha.rotation.z =  -crot ;
		}else {													// Otherwise we're recovering from a right turn
			crot -= 0.1;
	    	alpha.rotation.z =  crot ;
		}

	}

}

 /*///////////////////////////////////////////////////////////////////////////////// 
	Uses THREE.OrbitControls from the graphics course to allow the user to rotate the view with the mouse
	Called by init and restartGame
	INPUT: none
	OUTPUT: none
//////////////////////////////////////////////////////////////////////////////////*/
function installOrbitControls() {
    controls = new THREE.OrbitControls(mainCamera,canvas);
    controls.noPan = true; 
    controls.noZoom = true;
    controls.staticMoving = true;
    function move() {
        controls.update();
        if (! animating) {
            render();
        }
    }
    function down() {
        document.addEventListener("mousemove", move, false);
    }
    function up() {
        document.removeEventListener("mousemove", move, false);
    }
    function touch(event) {
        if (event.touches.length == 1) {
            move();
        }
    }
    document.addEventListener("mousedown", down, false);
    document.addEventListener("touchmove", touch, false);
}

// END OF MOUSE AND KEYBOARD FUNCTIONS

