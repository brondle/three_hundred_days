import { PerspectiveCamera } from 'three'
//TODO actually add args/make this good
function createCamera() {
    const camera = new PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 20000);
    camera.position.set(300, 20,700)

//    camera.zoom = 1.5
    return camera
}
export {createCamera}

