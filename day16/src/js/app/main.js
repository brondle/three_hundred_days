// Global imports -
import * as THREE from 'three';
import {BufferGeometryUtils} from 'three/examples/jsm/utils/BufferGeometryUtils.js'

import {createCamera} from '../components/Three/camera.js'
import {createLights} from '../components/Three/lights.js'
import {createRenderer} from '../components/Three/renderer.js'
import { createFog} from '../components/Three/fog.js'
import {createControls} from '../components/Three/controls.js'
import {createText, lerpColor} from '../components/Three/createText.js'
import { crabMode, animateCrab, addPipe } from '../components/Three/crabMode.js'
import { createParticles } from '../components/Three/particleSystem.js'
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json'

const clock = new THREE.Clock()

// This class instantiates and ties all of the components together, starts the loading process and renders the main loop
export default class Texture {
    constructor(text) {
        // set up scene
        // CAMERA
        // fov, aspect, near, far
      this.camera = createCamera()
//      this.camera.lookAt(new THREE.Vector3(5000,200, 20000))
        // SCENE & RENDER
        this.renderer = createRenderer()
        this.scene = new THREE.Scene();

        //LIGHTS
        const color = 0xFFFFFF
        const intensity = 1.3
        this.light = createLights(color, intensity)
        this.scene.add(this.light.target)
        this.scene.add(this.light, new THREE.AmbientLight(color, 1))

        //BACKGROUND & FOG
        let backgroundColor = new THREE.Color(0xFFFFFF)
        this.scene.background = backgroundColor
//        this.scene.fog = createFog(0xffea4d, 15, 2000)
        // CONTROLS
        createControls(this.camera, this.renderer, this.light)
        // shapes & textures

//        this.text = createText(text, helvetiker)
 //       this.textValue = text
  //      this.textFont = helvetiker
  //      this.scene.add(this.text)
  //      this.text.position.y = 100
        //bind class functions
//        this.camera.lookAt(text)
        this.beginCrabMode = this.beginCrabMode.bind(this)
        this.beginCrabMode()
        this.render = this.render.bind(this) //bind to class instead of window object

    }
    beginCrabMode() {
    if (this.crabs === undefined || this.crabs.length < 100) {
        crabMode().then(crab => {
            console.log('crab: ', crab)
            if (this.crabs === undefined) {
                this.crabs = []
            }
                this.crabs.push(crab)
                this.scene.add(crab)
        })
        let max = new THREE.Vector3(50, -30, 100)
        let min = new THREE.Vector3(10, -80, -20)
        this.particleSystem = createParticles(200, 0x635554, 20, max, min)
        this.particleSystem.mesh.position.set(50, -400, 250)
        console.log(this.particleSystem.mesh.position)
      this.scene.add(this.particleSystem.mesh)
//        this.camera.rotation.set(45, 0, 0)
        addPipe().then(pipe => {
            console.log('pipe: ', pipe)
            this.scene.add(pipe)
            pipe.position.set(0, -300, 55)
            pipe.rotation.set(45, -45, -0.4)
            pipe.scale.set(0.5, 0.5, 0.5)
            console.log('pipe position: ', pipe.position)
//            let myGroup = new THREE.Group()
 //           myGroup.add(this.particleSystem)
//            myGroup.add(this.crabs[0])
  //          myGroup.add(this.pipe)
     //       myGroup.rotation.set(45, 90, 0)

        })


    }

    }
    updateText(input = {font: undefined, value: undefined}) {
        console.log('input value: ', input.value)
        if (input.font !== undefined) {
            console.log('changing font', input.font)
            this.textFont = input.font
        }

        if (input.value !== undefined) {
            console.log('changing text: ', input.value)
            this.textValue = input.value
        }
        this.text.geometry.dispose()
        this.text.material.dispose()
        this.scene.remove(this.text)

        this.text = createText(this.textValue, this.textFont)
        this.scene.add(this.text)
        //TODO: move text position to somewhere smarter
    }
    render(time, i) {

        this.renderer.setAnimationLoop(() => {
        const xSpd = time * 0.15
        //TODO: update to proper animation loop per https://discoverthreejs.com/book/first-steps/animation-loop/#timing-in-the-animation-system
        if (this.crabs !== undefined && (Math.round(clock.getElapsedTime()*100)*10) % 100 == 0 ) {
            console.log('add crab')
    }
        //console.log('camera pos: ', this.camera.position)
//        this.text.material.needsUpdate = true
//        this.train.rotation.y += xSpd
//          this.camera.position.x -= xSpd
//          this.camera.position.z -= xSpd
//          this.camera.position.y -= xSpd/2
//        this.text.rotation.x += xSpd
        this.particleSystem.animate(xSpd)
        this.renderer.render(this.scene, this.camera)
})
}
}
