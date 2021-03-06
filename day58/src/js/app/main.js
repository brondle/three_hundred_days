// Global imports -
import * as THREE from 'three';
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import {createSun} from '../components/Three/sun.js'
import {createCamera} from '../components/Three/camera.js'
import {createLights} from '../components/Three/lights.js'
import {createRenderer} from '../components/Three/renderer.js'
import { createFog} from '../components/Three/fog.js'
import {createControls, addToGUI} from '../components/Three/controls.js'
import { getRandomInt} from '../utils/RandomInt.js'

const clock = new THREE.Clock()
let mouse = new THREE.Vector2()

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Texture {
    constructor() {
      this.models = []
      this.render = this.render.bind(this) //bind to class instead of window object
      this.setup = this.setup.bind(this)
      this.addObjects = this.addObjects.bind(this)
        // set up scene
      Ammo().then(AmmoLib => {
        Ammo = AmmoLib
        this.setup()
        this.addObjects()
        this.render()
      })


        //GROUND
//        document.addEventListener('mouseclick', onDocumentMouseClick, false)

}
setup() {
  // CAMERA
        // fov, aspect, near, far

      this.camera = createCamera()
   //     this.camera.up.set(0, 0, -1)
//      this.camera.lookAt(new THREE.Vector3(5000,200, 20000))
  //
        // SCENE & RENDER
        this.renderer = createRenderer()
        this.scene = new THREE.Scene();
//        this.camera.lookAt(this.scene.position)
        this.raycaster = new THREE.Raycaster()

        //LIGHTS
        const color = 0xFFFFFF
        const intensity = 1.5
       this.light = createLights({color: color, intensity: intensity})
        this.light[0].position.set(0, 100, 20)
      this.light[0].target.position.set(0, -5, 0)
      this.scene.add(this.light[0].target)
//        this.light[0].position.1etScalar(1)
        this.scene.add(this.light[0], new THREE.AmbientLight(color, 2))
      const helper = new THREE.DirectionalLightHelper(this.light[0], 5, 0xff0008)
//      this.scene.add(helper)

//        this.scene.add(this.light[1])
        //BACKGROUND & FOG
//        let backgroundColor = new THREE.Color(0x34c9eb)
 //       this.scene.background = backgroundColor
        let loader = new THREE.TextureLoader()
        let backgroundImg = loader.load('studio-bg.jpg')
        this.scene.background = backgroundImg
//        this.scene.fog = createFog(0x9ab3b2, 40, 450)

        // CONTROLS
        this.controls = createControls(this.camera, this.renderer, {center: this.torusKnot, autorotate: true})
//        this.controls.target.set(0, 2, 0)
 //       this.controls.update()

    }

    addObjects() {
      //STUFF
      //Torus knot
      const radius = 40.5;  // ui: radius
      const torusKnotSegments = 48
      const tubeRadius = 10.5;  // ui: tubeRadius
      const radialSegments = torusKnotSegments;  // ui: radialSegments
      const tubularSegments = torusKnotSegments;  // ui: tubularSegments
      const p = 1;  // ui: p
      const q = 36;  // ui: q
      const geometry = new THREE.TorusKnotGeometry(
      radius, tubeRadius, tubularSegments, radialSegments, p, q);
      console.log('torus geo: ', geometry)
      const textureLoader = new THREE.TextureLoader()
            const torusMat = new THREE.MeshPhongMaterial({color: 'blue'/*, wireframe: true*/})
      this.torusKnot = new THREE.Mesh(geometry, torusMat)
      this.torusKnot.segments = torusKnotSegments

      this.scene.add(this.torusKnot)

      //Globes
      let numGlobes = 200
      //Texture
      const globeTex = textureLoader.load('textures/globe.jpg')
      const hankTex = textureLoader.load('textures/hank.jpg')
      hankTex.wrapS = THREE.RepeatWrapping
      hankTex.wrapT = THREE.RepeatWrapping
      hankTex.repeat.set(1.6, 1.6, 1.6)
      const golfTex = textureLoader.load('textures/golfball.jpg')
      const colorTex = textureLoader.load('textures/colors.png')
      const gridTex = textureLoader.load('textures/grid.png')
      gridTex.wrapS = THREE.RepeatWrapping
      gridTex.wrapT = THREE.RepeatWrapping
      gridTex.repeat.set(40, 40)
      const textureArr = [globeTex, hankTex, golfTex, colorTex, gridTex]
//      globeTex.repeat.set(64, 8, 1)
      this.globes = []
      for (let i =0; i < numGlobes; i++) {
        let globeGeo = new THREE.SphereGeometry(6, 10, 10)
        let globeMat = new THREE.MeshPhongMaterial({map: textureArr[getRandomInt(0, textureArr.length - 1)], color: 0xFFFFFF})
        let globeMesh = new THREE.Mesh(globeGeo, globeMat)
        globeMesh.orbitRadius = getRandomInt(40, 80)
        globeMesh.orbitSpeed = getRandomInt(5, 20) * 0.1
        globeMesh.orbitMod = Math.random() >= 0.5 ? globeMesh.orbitRadius : -globeMesh.orbitRadius
        globeMesh.position.set(0, 0, 0)
        this.scene.add(globeMesh)
        this.globes.push(globeMesh)
      }

    }

    render(time, i) {
   //   console.log('foo')
        let range = 1
        this.renderer.setAnimationLoop(() => {
        const xSpd = time *= 0.00065

        for (let globe of this.globes) {
         let elapsedTime = clock.getElapsedTime() * globe.orbitSpeed
          if (globe.orbitRadius % 2 == 0) {
          globe.position.set(Math.cos(elapsedTime) * globe.orbitRadius + globe.orbitMod, Math.cos(elapsedTime) * globe.orbitRadius + globe.orbitMod, Math.sin(elapsedTime) * globe.orbitRadius)
          } else if (globe.orbitRadius % 3 == 0) {

          globe.position.set(0, Math.cos(elapsedTime) * globe.orbitRadius + globe.orbitMod, Math.sin(elapsedTime) * globe.orbitRadius)
          } else if (globe.orbitRadius % 4 == 0) {
          globe.position.set(Math.sin(elapsedTime) * globe.orbitRadius, Math.cos(elapsedTime) * globe.orbitRadius + globe.orbitMod, Math.sin(elapsedTime) * globe.orbitRadius)
          } else {
          globe.position.set(Math.cos(elapsedTime) * globe.orbitRadius + globe.orbitMod, 0, Math.sin(elapsedTime) * globe.orbitRadius)
          }
        }
      this.camera.position.z += 0.1
//            this.controls.update()

    if (this.anim != undefined) {
            this.mixer.update(clock.getDelta())


    }
//      raycastSelector(this.camera, this.scene, this.raycaster)
          if (this.camera.target != undefined) {
          let worldPos = new THREE.Vector3()
 //         this.camera.target.getWorldPosition(worldPos)
//            this.camera.lookAt(worldPos)
          }
            this.renderer.render(this.scene, this.camera)
        })
    }
}


function onDocumentMouseClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log('mouse pos:', mouse)
}

