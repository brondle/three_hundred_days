import {getRandomInt} from '../utils/RandomInt.js'
let endPt = 0
let startPt = 0
let posNeg = 1
let inc = getRandomInt(1, 3)* 0.00008
function morph(floor, segments) {
    if (startPt >= floor.attributes.position.count) {
        startPt = 0
    }
//    startPt += endPt
    endPt = floor.attributes.position.count
    console.log('inc: ', inc)
    console.log('pos neg: '), posNeg
    if (inc*posNeg > 0.1) {
        posNeg = -1
        inc = getRandomInt(1, 3)* 0.00008
    }
    if (inc*posNeg < -0.2) {
        posNeg = 1
        inc = getRandomInt(1, 3)* 0.00008
    }
       for (let i = startPt; i < endPt;  i+=1) {
           if (i % segments == 0) {
               inc *= 1.000009
           }

// can slowly remove object if you don't compare index to length (or just do length wrong idk)
    let X1 = floor.attributes.position.getX(i)
    let Z1 = floor.attributes.position.getZ(i)
    let Y1 = floor.attributes.position.getY(i)

            floor.attributes.position.setY(i, Y1 + (inc*posNeg))
            floor.attributes.position.setZ(i, Z1 + (inc*posNeg))
    }
        floor.attributes.position.needsUpdate = true
//        floor.computeVertexNormals()
}

export { morph}
