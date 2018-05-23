"use strict";

/* /////////////////////////////////////////////////////////////
    Renders the camera given as input
    Called by render
    INPUT: camera to render, left and top are top left corner to start rendering from, width and height are size arguments of renderer
    OUTPUT: none
 *//////////////////////////////////////////////////////////////
function cameraRender( camera, inScene, left, top, width, height ){

    renderer.setViewport( left, top, width, height );
    renderer.setScissor( left, top, width, height );
    camera.updateProjectionMatrix();
    renderer.render(inScene, camera);
}

/* /////////////////////////////////////////////////////////////
    Places object markers above given object on minimap
    Called by addMinimapObjects
    INPUT: objectArray is an array of objects to put objects above, item is what to place above the object
    OUTPUT: array of objects added to scene
 *//////////////////////////////////////////////////////////////
function putAboveObject(objectArray, item){
    var newItemArray = new Array();
    for (var i = 0; i < objectArray.length; i++){
        var currItem = item.clone();
        currItem.translateX(objectArray[i].position.x - currItem.position.x);
        currItem.translateZ(objectArray[i].position.z - currItem.position.z);
        currItem.translateY(level.atmosphereHeight * 2);
        scene.add(currItem);

        newItemArray.push(currItem);
    }
    return newItemArray;
}

/* /////////////////////////////////////////////////////////////
    Adds minimap objects to scene using putAboveObject
    Called by render
    INPUT: none
    OUTPUT: array of objects to be removed from the scene after the minimap view is rendered
 *//////////////////////////////////////////////////////////////
function addMinimapObjects(){
    var removeObjects = new Array();

    //add yellow sphere for player
    var alphaMarker = new THREE.Mesh(
        new THREE.SphereGeometry( 20 ),
        new THREE.MeshBasicMaterial( {color: 0xffff00} )
    );
    removeObjects = removeObjects.concat(putAboveObject(new Array(player), alphaMarker));

    // add red cube for powerups
    var minimapPowerups = [];
    var powerupCube = new THREE.Mesh(
        new THREE.BoxGeometry( 20, 20, 20 ),
        new THREE.MeshBasicMaterial( {color: 0xff0000} )
    );
    removeObjects = removeObjects.concat(putAboveObject(powerups, powerupCube));

    //add blue dodecahedron for collectibles
    var minimapCollectibles = [];
    var collectibleDodec = new THREE.Mesh(
        new THREE.DodecahedronGeometry( 20 ),
        new THREE.MeshBasicMaterial( {color: 0x0000ff} )
    );
    removeObjects = removeObjects.concat(putAboveObject(collectibles, collectibleDodec));

    return removeObjects;
}

/* /////////////////////////////////////////////////////////////
    Removes given objects from the scene
    Called by render
    INPUT: array of objects to be removed
    OUTPUT: none
 *//////////////////////////////////////////////////////////////
function removeMinimapObjects( removeObjects ){
        for(var i = 0; i < removeObjects.length; i++){
            scene.remove(removeObjects[i]);
        }
}

/* /////////////////////////////////////////////////////////////
    The render function draws the scene.
    Called every frame and by init
    INPUT: none
    OUTPUT: none
 *//////////////////////////////////////////////////////////////
function render() {

    if(cutscenePlaying) {
        cameraRender(cutsceneCamera, cutscene, 0, 0, window.innerWidth, window.innerHeight);
            rendererCSS.render( cssScene, cutsceneCamera );
        return;
    }

    // Render main camera on entire screen
    cameraRender (mainCamera, scene, 0, 0, window.innerWidth, window.innerHeight)
    //if paused don't show minimap
    if(animating){
        scene.remove(worldMap.atmosphere);
        //add objects to minimap so it will be easier to see
        var removeObjects = addMinimapObjects();
        // Render minimap camera in top right corner
        cameraRender(minimapCamera, scene, window.innerWidth - level.minimapWidth - 50, 20, level.minimapWidth, level.minimapHeight);

        // remove objects from minimap
        removeMinimapObjects(removeObjects);
        scene.add(worldMap.atmosphere)
    }
}

