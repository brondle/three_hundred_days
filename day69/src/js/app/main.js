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
import {initPhysics, createObjects, initInput, updatePhysics} from '../components/Three/Physics/PhysicsUtils.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { createText } from '../components/Three/createText.js'
const clock = new THREE.Clock()
let mouse = new THREE.Vector2()

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Texture {
    constructor(text) {
      this.render = this.render.bind(this) //bind to class instead of window object
      this.setup = this.setup.bind(this)
      this.initPhysics = initPhysics.bind(this)
      this.createObjects = createObjects.bind(this)
      this.initInput = initInput.bind(this)
      this.updatePhysics = updatePhysics.bind(this)
      this.text = []
        // set up scene
      Ammo().then(AmmoLib => {
        Ammo = AmmoLib
        this.setup(text)
        this.initPhysics()
        this.createObjects()
        this.initInput(this.raycaster)
        this.render()
      })


        //GROUND
//        document.addEventListener('mouseclick', onDocumentMouseClick, false)

}
updateText(newText) {
    console.log('newText: ', newText)
  for (let text of this.text) {
    text.geometry.dispose()
    text.material.dispose()
    this.scene.remove(text)

    text = createText(newText, helvetiker)
    this.scene.add(text)
    //TODO: move text position to somewhere smarter
      //text.position.set(-150, 500, 0)
  }
}
setup(text) {
  // CAMERA
        // fov, aspect, near, far

      this.camera = createCamera()
   //     this.camera.up.set(0, 0, -1)
//      this.camera.lookAt(new THREE.Vector3(5000,200, 20000))
        // SCENE & RENDER
        this.renderer = createRenderer()
        this.scene = new THREE.Scene();
        this.camera.lookAt(this.scene.position)
        this.raycaster = new THREE.Raycaster()
      document.addEventListener('mousemove', onPointerMove)

        //LIGHTS
        const color = 0xFFFFFF
        const intensity = 2.5
       this.light = createLights({color: color, intensity: intensity})
        console.log('light: ', this.light)
        this.light[0].position.set(0, 30, 50)
      this.light[0].target.position.set(0, 0, 0)
      this.scene.add(this.light[0].target)
//        this.light[0].position.setScalar(1)
        this.scene.add(this.light[0], new THREE.AmbientLight(color, 0.9))
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
      function createOutline(mesh, defaultMaterial) {
        let group = new THREE.Group()
      const outlineMaterial = new THREE.MeshLambertMaterial({
        color: 'black',
        side: THREE.BackSide
      })

        const outline = new THREE.Mesh(mesh.geometry, outlineMaterial)
        mesh.geometry.computeVertexNormals()
        outline.scale.set(0.053, 0.053, 0.053)
        newText.geometry.attributes.position.array.needsUpdate = true
        outline.geometry.computeVertexNormals()
        group.add(outline)
        group.add(mesh)
        return group
      }
    this.controls = createControls(this.camera, this.renderer)
  let inc = 0;
        for (let letter of text.split('')) {
          console.log('letter: ', letter)
          let newText = createText(letter, helvetiker)
//          let group = createOutline(newText)
          this.text.push(newText)
        }

    }

    render(time, i) {
   //   console.log('foo')
        let range = 1
        this.renderer.setAnimationLoop(() => {

        const xSpd = time * 0.00015
            //TODO: update to proper animation loop per https://discoverthreejs.com/book/first-steps/animation-loop/#timing-in-the-animation-system

//            console.log('camera pos: ', this.camera.position)

            this.updatePhysics(clock.getDelta())
//            this.controls.update()

    if (this.anim != undefined) {
            this.mixer.update(clock.getDelta())


    }
 //            this.floor.rotation.y += xSpd
      raycastSelector(this.camera, this.scene, this.raycaster)
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
