// Global imports -
import * as THREE from 'three';
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import {createSun} from '../components/Three/sun.js'
import {createCamera} from '../components/Three/camera.js'
import {createLights} from '../components/Three/lights.js'
import {createRenderer} from '../components/Three/renderer.js'
import { createFog} from '../components/Three/fog.js'
import {createControls, addToGUI} from '../components/Three/controls.js'
import {raycastSelector, onPointerMove} from '../components/Three/raycastSelector'
import {initPhysics, createObjects, initInput, updatePhysics, processClick, updateVertices} from '../components/Three/Physics/PhysicsUtils.js'
import { importSTLModel } from '../components/Three/importSTLModel.js'
import { flatten, getHighLow } from '../components/Three/flatten.js'

const clock = new THREE.Clock()
let mouse = new THREE.Vector2()

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Texture {
    constructor() {
      this.models = []
      this.render = this.render.bind(this) //bind to class instead of window object
      this.setup = this.setup.bind(this)
      this.initPhysics = initPhysics.bind(this)
      this.createObjects = createObjects.bind(this)
      this.initInput = initInput.bind(this)
      this.updatePhysics = updatePhysics.bind(this)
      let modelX = 0
      function addModel(model, mat) {
          let myModel = new THREE.Mesh(model, mat)
       myModel.rotation.x = THREE.MathUtils.degToRad(195)
       myModel.rotation.z = THREE.MathUtils.degToRad(90)
        myModel.highLow = getHighLow(myModel.geometry)
        this.models.push(myModel)

        this.scene.add(myModel)
        return myModel
      }
      this.addModel = addModel.bind(this)
        // set up scene
//      Ammo().then(AmmoLib => {
 //       Ammo = AmmoLib
        this.setup()
      importSTLModel('models/Eames-Base.stl', new THREE.MeshPhongMaterial({color: 'black'}), this.addModel).then(model => {
        model.position.x = -150
      })
        importSTLModel('models/Eames-Chair.stl', new THREE.MeshPhongMaterial({color: 'black'}),this.addModel).then(model => {
        model.position.z = 0
      })

      importSTLModel('models/Froggy_Chair.stl', new THREE.MeshPhongMaterial({color: 'green'}),this.addModel).then(model => {
        model.scale.set(0.2, 0.2, 0.2)
        model.position.x = 100
        model.position.z = -60

        model.rotation.z = THREE.MathUtils.degToRad(0)
      })
        importSTLModel('models/OversizedArmchair.stl', new THREE.MeshPhongMaterial({color: 'brown'}),this.addModel).then(model => {
          console.log('oversized armchair: ', model)
          model.scale.set(0.5, 0.5, 0.5)
          model.position.x = 240
      })

        importSTLModel('models/VicSideChair2.stl', new THREE.MeshPhongMaterial({color: 'blue'}),this.addModel).then(model => {
          console.log('vic side chair: ', model)
          model.rotation.z = THREE.MathUtils.degToRad(0)
          model.position.x = -100
      })

  //      this.initPhysics()
   //     this.createObjects()
    //    this.initInput(this.raycaster)
        this.render()
//      })


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
      document.addEventListener('mousemove', onPointerMove)

        //LIGHTS
        const color = 0xFFFFFF
        const intensity = 2.5
       this.light = createLights({color: color, intensity: intensity})
        this.light[0].position.set(40, 400, -185)
      this.light[0].target.position.set(0, -5, -20)
      this.scene.add(this.light[0].target)
//        this.light[0].position.setScalar(1)
        this.scene.add(this.light[0], new THREE.AmbientLight(color, 0.5))
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
    this.controls = createControls(this.camera, this.renderer)
  this.controls.target.set(0, 2, 0)
  this.controls.update()
    }

    render(time, i) {
   //   console.log('foo')
        let range = 1
        this.renderer.setAnimationLoop(() => {
processClick()
        const xSpd = time * 0.00015
            //TODO: update to proper animation loop per https://discoverthreejs.com/book/first-steps/animation-loop/#timing-in-the-animation-system

//            console.log('camera pos: ', this.camera.position)
          let elapsedTime = clock.getElapsedTime()
          if (Math.round(elapsedTime) % 1 == 0) {
//            console.log('foo')
//            updateVertices()
      if (this.models.length == 5) {
      for (let model of this.models) {
      flatten(model.geometry, 1, model.highLow)
      }
}
         }
//            this.controls.update()

    if (this.anim != undefined) {
            this.mixer.update(clock.getDelta())


    }
 //            this.floor.rotation.y += xSpd
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

