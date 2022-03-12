import {MathUtils, ConeGeometry, BoxGeometry, Box3, PlaneGeometry, BufferGeometry, SphereGeometry, Mesh, Vector2, Vector3, MeshPhongMaterial, MeshLambertMaterial, RepeatWrapping, Quaternion, TextureLoader} from 'three'
let crab = null
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import {ConvexObjectBreaker} from 'three/examples/jsm/misc/ConvexObjectBreaker.js'
import {Water} from 'three/examples/jsm/objects/Water2.js'
import { importFBXModel } from '../importFBXModel.js'
import {ConvexGeometry} from 'three/examples/jsm/geometries/ConvexGeometry.js'
//code from https://github.com/mrdoob/three.js/blob/dev/examples/physics_ammo_break.html
			// Graphics variables
			let container, stats;
			let camera, controls, scene, renderer;
			let raycaster
			let textureLoader;
			let terrainMesh;
			let oldTime = 0
			let posNeg = 1
			let incMax = 0.1
			let incMin = 0.1
			let clickRequest = false;
			const mouseCoords = new Vector2();

			const ballMaterial = new MeshPhongMaterial( { color: 0x202020 } );
			const pos = new Vector3();
			const quat = new Quaternion();

			// Heightfield parameters
			const terrainWidthExtents = 100;
			const terrainDepthExtents = 100;
			const terrainWidth = 128;
			const terrainDepth = 128;
			const terrainHalfWidth = terrainWidth / 2;
			const terrainHalfDepth = terrainDepth / 2;
			let terrainMaxHeight = 1;
			let terrainMinHeight = -1;
		//Physics
		let groundBody
		let groundShape
		let groundMotionState
		let groundTransform
		let groundMass
		let groundLocalInertia
const geometry = new PlaneGeometry( terrainWidthExtents, terrainDepthExtents, terrainWidth - 1, terrainDepth - 1 );
//movement
let modelObject = null
let moveDirection = { left: 0, right: 0, forward: 0, back: 0 }

			let heightData = null;
			let ammoHeightData = null;

			// Physics variables
			const gravityConstant = -60;
			let physicsWorld;
			const rigidBodies = [];
			const softBodies = [];
			const margin = 0.05;
			let transformAux1;
			let softBodyHelpers;
			let start = 0
			let inc = 3
			let depthMod = 222
			let widthMod = 222
			let phaseMult = 3.5
      function addModel(model, mat) {
        //let myModel = new THREE.Mesh(model, mat)
      console.log('model: ', model)
//       model.rotation.x = MathUtils.degToRad(-90)
//      model.rotation.z = THREE.MathUtils.degToRad(90)
//        mode.highLow = getHighLow(myModel.geometry)
//        model.position.z = 155
        model.scale.set(0.01, 0.01, 0.01)
        return model
      }


			function initPhysics() {
			scene = this.scene
				camera = this.camera
				raycaster = this.raycaster
				renderer = this.renderer
			textureLoader = new TextureLoader()
				heightData = generateHeight( terrainWidth, terrainDepth, terrainMinHeight, terrainMaxHeight );
				geometry.rotateX( - Math.PI / 2 );
//				geometry.rotateY( - Math.PI / 2 );
				createTerrain()
				// Physics configuration

				const collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
				const dispatcher = new Ammo.btCollisionDispatcher( collisionConfiguration );
				const broadphase = new Ammo.btDbvtBroadphase();
				const solver = new Ammo.btSequentialImpulseConstraintSolver();
				const softBodySolver = new Ammo.btDefaultSoftBodySolver();
				physicsWorld = new Ammo.btSoftRigidDynamicsWorld( dispatcher, broadphase, solver, collisionConfiguration, softBodySolver );
				physicsWorld.setGravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );
				physicsWorld.getWorldInfo().set_m_gravity( new Ammo.btVector3( 0, gravityConstant, 0 ) );

				transformAux1 = new Ammo.btTransform();
				softBodyHelpers = new Ammo.btSoftBodyHelpers();
				// ground
groundShape = createTerrainShape();
				groundTransform = new Ammo.btTransform();
				groundTransform.setIdentity();
				// Shifts the terrain, since bullet re-centers it on its bounding box.
				groundTransform.setOrigin( new Ammo.btVector3( 0, ( terrainMaxHeight + terrainMinHeight ) / 2, 0 ) );
				groundMass = 0;
				groundLocalInertia = new Ammo.btVector3( 0, 0, 0 );
				groundMotionState = new Ammo.btDefaultMotionState( groundTransform );
				groundShape.calculateLocalInertia(groundMass, groundLocalInertia)

				groundBody = new Ammo.btRigidBody( new Ammo.btRigidBodyConstructionInfo( groundMass, groundMotionState, groundShape, groundLocalInertia ) );
				groundBody.setRestitution(1.5)
				groundBody.setDamping(0.8, 0)
				physicsWorld.addRigidBody( groundBody );

			}


			function generateHeight( width, depth, minHeight, maxHeight ) {

				// Generates the height data (a sinus wave)

				const size = width * depth;
				const data = new Float32Array( size );

				const hRange = maxHeight - minHeight;
				// good setting: w2: 2, d2: 6, phaseMult: 9, pow: 1.5, height: cos
				const w2 = width / widthMod;
				const d2 = depth / depthMod;
				;

				let p = 0;

				for ( let j = 0; j < depth; j ++ ) {

					for ( let i = 0; i < width; i ++ ) {

						const radius = Math.sqrt(
							Math.pow( ( i - w2 ) / w2, 2.0 ) +
								Math.pow( ( j - d2 ) / d2, 2.0 ) );

						const height = ( Math.sin( radius * phaseMult ) + 1 ) * 0.5 * hRange + minHeight;

						data[ p ] = height;

						p ++;

					}

				}
				return data;

			}

			function createTerrainShape() {

				// This parameter is not really used, since we are using PHY_FLOAT height data type and hence it is ignored
				const heightScale = 1;

				// Up axis = 0 for X, 1 for Y, 2 for Z. Normally 1 = Y is used.
				const upAxis = 1;

				// hdt, height data type. "PHY_FLOAT" is used. Possible values are "PHY_FLOAT", "PHY_UCHAR", "PHY_SHORT"
				const hdt = 'PHY_FLOAT';

				// Set this to your needs (inverts the triangles)
				const flipQuadEdges = false;

				// Creates height data buffer in Ammo heap
				ammoHeightData = Ammo._malloc( 4 * terrainWidth * terrainDepth );

				// Copy the javascript height data array to the Ammo one.
				let p = 0;
				let p2 = 0;

				for ( let j = 0; j < terrainDepth; j ++ ) {

					for ( let i = 0; i < terrainWidth; i ++ ) {

						// write 32-bit float data to memory
						Ammo.HEAPF32[ ammoHeightData + p2 >> 2 ] = heightData[ p ];

						p ++;

						// 4 bytes/float
						p2 += 4;

					}

				}

				// Creates the heightfield physics shape
				const heightFieldShape = new Ammo.btHeightfieldTerrainShape(
					terrainWidth,
					terrainDepth,
					ammoHeightData,
					heightScale,
					terrainMinHeight,
					terrainMaxHeight,
					upAxis,
					hdt,
					flipQuadEdges
				);

				// Set horizontal scale
				const scaleX = terrainWidthExtents / ( terrainWidth - 1 );
				const scaleZ = terrainDepthExtents / ( terrainDepth - 1 );
				heightFieldShape.setLocalScaling( new Ammo.btVector3( scaleX, 1, scaleZ ) );

				heightFieldShape.setMargin( 0.05 );

				return heightFieldShape;

			}
			function updateVertices(){
				let vertices = geometry.attributes.position.array;
				if (start >= vertices.length) {
					start = 0
				} else {
					start+=3
				}


				for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += inc ) {

					// j + 1 because it is the y component that we modify
					vertices[ j + 1 ] = heightData[ i];

				}
				geometry.attributes.position.needsUpdate = true
				geometry.computeVertexNormals();

			}
			function createTerrain() {

		const groundMaterial = new MeshLambertMaterial( { color: 0xC7C7C7 } );
				updateVertices()
				terrainMesh = new Mesh( geometry, groundMaterial );
				terrainMesh.receiveShadow = true;
				terrainMesh.castShadow = true;

				scene.add( terrainMesh );

				textureLoader.load( 'textures/colors.png', function ( texture ) {

					texture.wrapS = RepeatWrapping;
					texture.wrapT = RepeatWrapping;
					//texture.repeat.set( terrainWidth - 1, terrainDepth - 1 );
					texture.repeat.set(2, 2);
//					texture.offset.set(0, 1.2)

					groundMaterial.map = texture;
					groundMaterial.needsUpdate = true;

			})
			}
			function createObjects() {

				// Ground
				// Create soft volumes
				const volumeMass = 142;
				quat.set(0, 25, 0, 1)
				const sphereRadius = 2.5
				let sphereGeometry  = new Mesh(new SphereGeometry( sphereRadius, 40, 25 ), new MeshPhongMaterial({color: 'red'}));
				sphereGeometry.castShadow = true
				sphereGeometry.receiveShadow = true
//				sphereGeometry.translate( 0, 25, 0 );

const sphereShape = new Ammo.btSphereShape(sphereRadius)


				pos.set(35, 45, 0)
//				let sphereBody = createRigidBody( sphereGeometry, sphereShape, volumeMass, pos, quat );
//				sphereGeometry.userData.physicsBody = sphereBody;
//sphereBody.setRestitution(2)
//				sphereBody.setDamping(0.8, 0)
//				sphereBody.setFriction(2)
//				sphereBody.setRollingFriction(4)
				//TODO: turn this into some sort of "add to scene & physicsWorld" function, took out of createRigidBody so I could do things like set restitution
//					rigidBodies.push( sphereGeometry );
//				scene.add( sphereGeometry );
				//physicsWorld.addRigidBody( sphereBody );
					//			sphereBody.setFriction(0)
				// Ramp
				pos.set( 0, 4, 0 );

				quat.setFromAxisAngle( new Vector3( 0, 0, 1 ), 0 * Math.PI / 180 );
				const obstacleRadius = 4
				const obstacleMass = 800
				let obstacle = new Mesh(new ConeGeometry(obstacleRadius, 6, 10), new MeshPhongMaterial({color: 'black'}))
				obstacle.castShadow = true;
				obstacle.receiveShadow = true;
const obstacleShape = new Ammo.btSphereShape(obstacleRadius)
				//createRigidBody(obstacle, obstacleShape, obstacleMass, pos, quat)
				quat.set(0, 25, 0, 1)
				const globeMass = 2
				for (let globe of this.globes) {
					let globeShape = new Ammo.btSphereShape(this.globeRadius)
					pos.set(globe.position)
					createRigidBody(globe, globeShape, globeMass, pos, quat)
				}

			}

			function processGeometry( bufGeometry ) {

				// Ony consider the position values when merging the vertices
				const posOnlyBufGeometry = new BufferGeometry();
				posOnlyBufGeometry.setAttribute( 'position', bufGeometry.getAttribute( 'position' ) );
				posOnlyBufGeometry.setIndex( bufGeometry.getIndex() );

				// Merge the vertices so the triangle soup is converted to indexed triangles
				const indexedBufferGeom = BufferGeometryUtils.mergeVertices( posOnlyBufGeometry );

				// Create index arrays mapping the indexed vertices to bufGeometry vertices
				mapIndices( bufGeometry, indexedBufferGeom );

			}

			function isEqual( x1, y1, z1, x2, y2, z2 ) {

				const delta = 0.000001;
				return Math.abs( x2 - x1 ) < delta &&
						Math.abs( y2 - y1 ) < delta &&
						Math.abs( z2 - z1 ) < delta;

			}

			function mapIndices( bufGeometry, indexedBufferGeom ) {

				// Creates ammoVertices, ammoIndices and ammoIndexAssociation in bufGeometry

				const vertices = bufGeometry.attributes.position.array;
				const idxVertices = indexedBufferGeom.attributes.position.array;
				const indices = indexedBufferGeom.index.array;

				const numIdxVertices = idxVertices.length / 3;
				const numVertices = vertices.length / 3;

				bufGeometry.ammoVertices = idxVertices;
				bufGeometry.ammoIndices = indices;
				bufGeometry.ammoIndexAssociation = [];

				for ( let i = 0; i < numIdxVertices; i ++ ) {

					const association = [];
					bufGeometry.ammoIndexAssociation.push( association );

					const i3 = i * 3;

					for ( let j = 0; j < numVertices; j ++ ) {

						const j3 = j * 3;
						if ( isEqual( idxVertices[ i3 ], idxVertices[ i3 + 1 ], idxVertices[ i3 + 2 ],
							vertices[ j3 ], vertices[ j3 + 1 ], vertices[ j3 + 2 ] ) ) {

							association.push( j3 );

						}

					}

				}

			}

			function createSoftVolume( bufferGeom, mass, pressure ) {

				processGeometry( bufferGeom);
        const flowMap = textureLoader.load('textures/Water_1_M_Flow.jpg')
        const normalMap0 = textureLoader.load('textures/Water_1_M_Normal.jpg')
        const normalMap1 = textureLoader.load('textures/Water_2_M_Normal.jpg')



				const volume = new Mesh( bufferGeom,  new MeshPhongMaterial());
//				volume.rotation.x = MathUtils.degToRad(-45)
				camera.target = volume
				volume.castShadow = true;
				volume.receiveShadow = true;
				volume.frustumCulled = false;
				//scene.add( volume );

				textureLoader.load( 'textures/colors.png', function ( texture ) {
					texture.offset.set(0, -0.55, 0)

					texture.repeat.set(1.9, 1.9, 1.9)

					volume.material.map = texture;
					volume.material.needsUpdate = true;

				} );

				// Volume physic object

				const volumeSoftBody = softBodyHelpers.CreateFromTriMesh(
					physicsWorld.getWorldInfo(),
					bufferGeom.ammoVertices,
					bufferGeom.ammoIndices,
					bufferGeom.ammoIndices.length / 3,
					true );

				const sbConfig = volumeSoftBody.get_m_cfg();
				sbConfig.set_viterations( 40 );
				sbConfig.set_piterations( 40 );

				// Soft-soft and soft-rigid collisions
				sbConfig.set_collisions( 0x11 );

				// Friction
				sbConfig.set_kDF( 0.001 );
				// Damping
				sbConfig.set_kDP( 0.01 );
				// Pressure
				sbConfig.set_kPR( pressure );
				// Stiffness
				volumeSoftBody.get_m_materials().at( 0 ).set_m_kLST( 0.9 );
				volumeSoftBody.get_m_materials().at( 0 ).set_m_kAST( 0.9 );

				volumeSoftBody.setTotalMass( mass, false );
				Ammo.castObject( volumeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( margin );
				physicsWorld.addSoftBody( volumeSoftBody, 1, - 1 );
				volume.userData.physicsBody = volumeSoftBody;
				// Disable deactivation
				volumeSoftBody.setActivationState( 4 );

				softBodies.push( volume );

			}

			function createParalellepiped( sx, sy, sz, mass, pos, quat, material ) {

				const threeObject = new Mesh( new BoxGeometry( sx, sy, sz, 1, 1, 1 ), material );
				const shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
				shape.setMargin( margin );

				createRigidBody( threeObject, shape, mass, pos, quat );

				return threeObject;

			}

			function createRigidBody( threeObject, physicsShape, mass, pos, quat ) {

				threeObject.position.copy( pos );
				threeObject.quaternion.copy( quat );
				console.log('position: ', threeObject.position)

				const transform = new Ammo.btTransform();
				transform.setIdentity();
				transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
				transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
				console.log('pos, quat: ', pos, quat)
				const motionState = new Ammo.btDefaultMotionState( transform );

				const localInertia = new Ammo.btVector3( 0, 0, 0 );
				physicsShape.calculateLocalInertia( mass, localInertia );

				const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
				const body = new Ammo.btRigidBody( rbInfo );
				body.setRestitution(1.2)
				body.setDamping(0.8, 0)

				if ( mass > 0 ) {


					// Disable deactivation
//					body.setActivationState( 4 );

				}

				return body;

			}

			function initInput() {
				setupEventHandlers()
				window.addEventListener( 'pointerdown', function ( event ) {

					if ( ! clickRequest ) {

						mouseCoords.set(
							( event.clientX / window.innerWidth ) * 2 - 1,
							- ( event.clientY / window.innerHeight ) * 2 + 1
						);

//						clickRequest = true;

					}

				} );

			}

			function processClick() {

				if ( clickRequest ) {

					raycaster.setFromCamera( mouseCoords, camera );

					// Creates a ball
					const ballMass = 3;
					const ballRadius = 0.4;

					const ball = new Mesh( new SphereGeometry( ballRadius, 18, 16 ), ballMaterial );
					ball.castShadow = true;
					ball.receiveShadow = true;
					const ballShape = new Ammo.btSphereShape( ballRadius );
					ballShape.setMargin( margin );
					pos.copy( raycaster.ray.direction );
					pos.add( raycaster.ray.origin );
					quat.set( 0, 0, 0, 1 );
					const ballBody = createRigidBody( ball, ballShape, ballMass, pos, quat );
					ballBody.setFriction( 0.5 );

					pos.copy( raycaster.ray.direction );
					pos.multiplyScalar( 14 );
					ballBody.setLinearVelocity( new Ammo.btVector3( pos.x, pos.y, pos.z ) );

					clickRequest = false;

				}

			}




			function updatePhysics( deltaTime, elapsedTime ) {
				if (modelObject == null) {
				importFBXModel('models/AnimatedRobot/FBX/Robot.fbx', addModel).then(model => {
					console.log('model: ', model)
					pos.set(0, 25, 0)
					quat.set(0, 0, 0, 1)
					const modelShape = new Ammo.btSphereShape(1)
					let volumeMass = 1
					modelObject = model
					let modelBody = createRigidBody( modelObject, modelShape, volumeMass, pos, quat );
					modelObject.userData.physicsBody = modelBody;
					scene.add(modelObject)
					rigidBodies.push(modelObject)
					physicsWorld.addRigidBody(modelBody)
				})
}
//				moveBall()
				let newTime = Math.round((elapsedTime*100))
				if (newTime % 1 == 0 && newTime != oldTime) {
//						phaseMult -= .05*posNeg
//
//					console.log('elapsed time: ', Math.round(elapsedTime))
				oldTime = newTime
//				if (newTime % 10 == 0) {
//
					posNeg = Math.random() >= 0.5 ? -1: 1
//					incMax = Math.random()
//					incMin = Math.random()
//				if (inc < 3) {
//					inc += 3
//								} else {
//					inc = 3
//				}
//			terrainMaxHeight -= 0.02*posNeg
//			terrainMinHeight += 0.02*posNeg
//

				}
					depthMod+=0.05*posNeg
					widthMod-=0.05*posNeg

				phaseMult +=0.0001

				heightData = generateHeight( terrainWidth, terrainDepth, terrainMinHeight, terrainMaxHeight );
//
				updateVertices()
//
//
//				physicsWorld.removeCollisionObject(groundBody)
//					groundBody.setCollisionShape(createTerrainShape())
//					physicsWorld.addRigidBody(groundBody)
//
//				}
//


				// Step world
				physicsWorld.stepSimulation( deltaTime, 10 );

				// Update soft volumes
				for ( let i = 0, il = softBodies.length; i < il; i ++ ) {

					const volume = softBodies[ i ];
					const geometry = volume.geometry;
					const softBody = volume.userData.physicsBody;
					const volumePositions = geometry.attributes.position.array;
					const volumeNormals = geometry.attributes.normal.array;
					const association = geometry.ammoIndexAssociation;
					const numVerts = association.length;
					const nodes = softBody.get_m_nodes();
					for ( let j = 0; j < numVerts; j ++ ) {

						const node = nodes.at( j );
						const nodePos = node.get_m_x();
						const x = nodePos.x();
						const y = nodePos.y();
						const z = nodePos.z();
						const nodeNormal = node.get_m_n();
						const nx = nodeNormal.x();
						const ny = nodeNormal.y();
						const nz = nodeNormal.z();

						const assocVertex = association[ j ];

						for ( let k = 0, kl = assocVertex.length; k < kl; k ++ ) {

							let indexVertex = assocVertex[ k ];
							volumePositions[ indexVertex ] = x;
							volumeNormals[ indexVertex ] = nx;
							indexVertex ++;
							volumePositions[ indexVertex ] = y;
							volumeNormals[ indexVertex ] = ny;
							indexVertex ++;
							volumePositions[ indexVertex ] = z;
							volumeNormals[ indexVertex ] = nz;

						}

					}

					geometry.attributes.position.needsUpdate = true;
					geometry.attributes.normal.needsUpdate = true;

				}

				// Update rigid bodies
				for ( let i = 0, il = rigidBodies.length; i < il; i ++ ) {

					const objThree = rigidBodies[ i ];
					const objPhys = objThree.userData.physicsBody;
					const ms = objPhys.getMotionState();
					if ( ms ) {

						ms.getWorldTransform( transformAux1 );
						const p = transformAux1.getOrigin();
						const q = transformAux1.getRotation();
						objThree.position.set( p.x(), p.y(), p.z() );
						objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

					}

				}
	}

//MOVEMENT
function setupEventHandlers(){

    window.addEventListener( 'keydown', handleKeyDown, false);
    window.addEventListener( 'keyup', handleKeyUp, false);

}


function handleKeyDown(event){
    let keyCode = event.keyCode;

    switch(keyCode){

        case 87: //W: FORWARD
            moveDirection.forward = 1
            break;

        case 83: //S: BACK
            moveDirection.back = 1
            break;

        case 65: //A: LEFT
            moveDirection.left = 1
            break;

        case 68: //D: RIGHT
            moveDirection.right = 1
            break;

    }
}


function handleKeyUp(event){
    let keyCode = event.keyCode;

    switch(keyCode){
        case 87: //FORWARD
            moveDirection.forward = 0
            break;

        case 83: //BACK
            moveDirection.back = 0
            break;

        case 65: //LEFT
            moveDirection.left = 0
            break;

        case 68: //RIGHT
            moveDirection.right = 0
            break;

    }

}

function moveBall(){

    let scalingFactor = 40;

    let moveX =  moveDirection.right - moveDirection.left;
    let moveZ =  moveDirection.back - moveDirection.forward;
    let moveY =  0;

    if( moveX == 0 && moveY == 0 && moveZ == 0) return;

    let resultantImpulse = new Ammo.btVector3( moveX, moveY, moveZ )
    resultantImpulse.op_mul(scalingFactor);
		console.log('resultant impuls: ', resultantImpulse)
		let physicsBody = modelObject.userData.physicsBody;
		console.log('physics body: ', physicsBody)
		physicsBody.setLinearVelocity( resultantImpulse );
		console.log('physicsBodyVel: ', physicsBody.getLinearVelocity().z())
}
export { initPhysics, createObjects, initInput, updatePhysics, processClick, updateVertices}
