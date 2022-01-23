import { Mesh, BoxGeometry, BufferAttribute, Matrix4 } from 'three'

function createBuilding() {
  const geo = new BoxGeometry(3, 3, 3)
  // change pivot point to be at bottom of cube by translating geometry
  geo.applyMatrix(new Matrix4().makeTranslation(0, 0.5, 0))
  // TODO: remove bottom face (will never be seen)
  // need to convert Float32array and splice out bottom face
  // Need better understanding of how position relates to former face attribute
  console.log('geo position: ', geo.getAttribute('position'))
//  geo.setAttribute('position', BufferAttribute(geo.getAttribute('position').array.splice(3, 1)))
  console.log('color: ', geo.getAttribute('color'))
  // TODO: fix UVs (setAttribute(uvs))?
  console.log('uvs: ', geo.getAttribute('uvs'))
  return geo
}

export { createBuilding }
