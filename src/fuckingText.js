"use strict";

/*//////////////////////////////////////////////////////////////////////////
Fucking Text!
///////////////////////////////////////////////////////////////////////////*/

// get the font then run create text fn
// kind of redundant
// TODO: fix redundancy 
function loadFont() {
	var loader = new THREE.FontLoader();
	loader.load( 'fonts/Etienne/helvetiker_regular.typeface.js', function ( response ) {

		font = response;		// This is simply the URL of the font
		console.log("loadFont:" ,response);
		createText();			// Calls the text_geometry making function

	} );
}

// create text fn
// note: I tried changing this to take in text text,height,size etc, but javascript didn't like that
// main problem is returning the mesh...doesn't work out/ no time to think about it
function createText() {
	console.log("createText()");
	var textGeo = new THREE.TextGeometry( text, {			// This is where we actually pass in the required text.
		font: font,
		size: text_size,
		height: text_height,
		curveSegments: curveSegments
	});

	textGeo.computeBoundingBox();
	textGeo.computeVertexNormals();

	// "fix" side normals by removing z-component of normals for side faces
	// (this doesn't work well for beveled geometry as then we lose nice curvature around z-axis)
	var triangleAreaHeuristics = 0.1 * ( text_height * text_size );

	for ( var i = 0; i < textGeo.faces.length; i ++ ) {

		var face = textGeo.faces[ i ];

		if ( face.materialIndex == 1 ) {

			for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

				face.vertexNormals[ j ].z = 0;
				face.vertexNormals[ j ].normalize();

			}

			var va = textGeo.vertices[ face.a ];
			var vb = textGeo.vertices[ face.b ];
			var vc = textGeo.vertices[ face.c ];

			var s = THREE.GeometryUtils.triangleArea( va, vb, vc );

			if ( s > triangleAreaHeuristics ) {

				for ( var j = 0; j < face.vertexNormals.length; j ++ ) {

					face.vertexNormals[ j ].copy( face.normal );
				}
			}
		}
	}

	var centerOffset = -0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
	
	var Text_materials = [														
	new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } ), 	// front material
	new THREE.MeshPhongMaterial( { color: 0xffffff } ) 						// side material
	];
	textMesh1 = new THREE.Mesh( textGeo, Text_materials );
	//////////////////////////////////////////////////////////////////////////////////
	// Bend text
	// Source: https://github.com/alexan0308/threejs/blob/master/examples/webgl_simple_modifiers.html
	//////////////////////////////////////////////////////////////////////////////////
	
	var direction = new THREE.Vector3( 0, 0, -1 );
	var axis =  new THREE.Vector3( 0, 1, 0 );		// axis to bend in
	var angle = Math.PI / 3;
	var modifier = new THREE.BendModifier();
	modifier.set( direction, axis, angle ).modify( textMesh1.geometry );
	text_object_container.add(textMesh1);
	
	//////////////////////////////////////////////////////////////////////////////////
	// Make text glow
	// source: https://github.com/jeromeetienne/threex.geometricglow
	//////////////////////////////////////////////////////////////////////////////////

	var glowMesh	= new THREEx.GeometricGlowMesh(textMesh1);
	text_object_container.add(glowMesh.object3d);

	//////////////////////////////////////////////////////////////////////////////////
	//		customize glow mesh if needed											//
	//////////////////////////////////////////////////////////////////////////////////

	var insideUniforms	= glowMesh.insideMesh.material.uniforms
	insideUniforms.glowColor.value.set('hotpink')
	var outsideUniforms	= glowMesh.outsideMesh.material.uniforms
	outsideUniforms.glowColor.value.set('hotpink')
	
}	// end createText
