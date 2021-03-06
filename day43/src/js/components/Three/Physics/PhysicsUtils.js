import {MathUtils, ConeGeometry, BoxGeometry, BufferGeometry, SphereGeometry, Mesh, Vector2, Vector3, MeshPhongMaterial, RepeatWrapping, Quaternion, TextureLoader} from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import {ConvexObjectBreaker} from 'three/examples/jsm/misc/ConvexObjectBreaker.js'
import {Water} from 'three/examples/jsm/objects/Water2.js'
import { importGLTFModel} from '../importGLTFModel.js'
import {ConvexGeometry} from 'three/examples/jsm/geometries/ConvexGeometry.js'
//code from https://github.com/mrdoob/three.js/blob/dev/examples/physics_ammo_break.html
			// Graphics variables
			let container, stats;
			let camera, controls, scene, renderer;
			let raycaster
			let textureLoader;
			let clickRequest = false;
			const mouseCoords = new Vector2();
			const ballMaterial = new MeshPhongMaterial( { color: 0x202020 } );
			const pos = new Vector3();
			const quat = new Quaternion();

			// Physics variables
			const gravityConstant = -8.2;
			let physicsWorld;
			const rigidBodies = [];
			const softBodies = [];
			const margin = 0.05;
			let transformAux1;
			let softBodyHelpers;


			function initPhysics() {
			textureLoader = new TextureLoader()
			scene = this.scene
			camera = this.camera
			controls = this.controls
			renderer = this.renderer
				raycaster = this.raycaster
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

			}

			function createObjects() {

				// Ground
				pos.set( 0, - 0.5, 0 );
				quat.set( 0, 0, 0, 1 );
				const ground = createParalellepiped( 40, 1, 40, 0, pos, quat, new MeshPhongMaterial( { color: 0xFFFFFF } ) );
				ground.castShadow = true;
				ground.receiveShadow = true;
				textureLoader.load( 'textures/grid.png', function ( texture ) {

					texture.wrapS = RepeatWrapping;
					texture.wrapT = RepeatWrapping;
					texture.repeat.set( 40, 40 );
					ground.material.map = texture;
					ground.material.needsUpdate = true;

				} );

				// Create soft volumes
				const volumeMass = 12;

				const sphereGeometry = new SphereGeometry( 2.5, 40, 25 );
				sphereGeometry.translate( 5, 5, 0 );
				createSoftVolume( sphereGeometry, volumeMass, 350 );

				// Ramp
				pos.set( 5, 1, 0 );

				quat.setFromAxisAngle( new Vector3( 0, 0, 1 ), 0 * Math.PI / 180 );
				const obstacleRadius = 4
				const obstacleMass = 800
				let obstacle = new Mesh(new ConeGeometry(obstacleRadius, 6, 10), new MeshPhongMaterial({color: 'black'}))
				obstacle.castShadow = true;
				obstacle.receiveShadow = true;
const obstacleShape = new Ammo.btSphereShape(obstacleRadius)
				//createRigidBody(obstacle, obstacleShape, obstacleMass, pos, quat)

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
				scene.add( volume );

				textureLoader.load( 'textures/hank.jpg', function ( texture ) {
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
				console.log('volume soft body: ', volumeSoftBody)

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

				const transform = new Ammo.btTransform();
				transform.setIdentity();
				transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
				transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
				const motionState = new Ammo.btDefaultMotionState( transform );

				const localInertia = new Ammo.btVector3( 0, 0, 0 );
				physicsShape.calculateLocalInertia( mass, localInertia );

				const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
				const body = new Ammo.btRigidBody( rbInfo );

				threeObject.userData.physicsBody = body;

				scene.add( threeObject );

				if ( mass > 0 ) {

					rigidBodies.push( threeObject );

					// Disable deactivation
					body.setActivationState( 4 );

				}

				physicsWorld.addRigidBody( body );

				return body;

			}

			function initInput() {

				window.addEventListener( 'pointerdown', function ( event ) {

					if ( ! clickRequest ) {

						mouseCoords.set(
							( event.clientX / window.innerWidth ) * 2 - 1,
							- ( event.clientY / window.innerHeight ) * 2 + 1
						);

						clickRequest = true;

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




			function updatePhysics( deltaTime ) {

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
export { initPhysics, createObjects, initInput, updatePhysics, processClick}
