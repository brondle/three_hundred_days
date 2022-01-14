/*! For license information please see main.bundle.js.LICENSE.txt */
(self.webpackChunkthreejs_es6_webpack_boilerplate=self.webpackChunkthreejs_es6_webpack_boilerplate||[]).push([["main"],{"./src/js/app.js":(e,t,s)=>{"use strict";s.r(t);var i=s("./src/js/data/config.js"),o=s("./src/js/utils/detector.js"),n=s("./src/js/app/main.js");s("./src/css/app.scss");console.log("----- RUNNING IN DEV ENVIRONMENT! -----"),i.default.isDev=!0,function(){if(o.default.webgl){document.getElementById("appContainer");(new n.default).render()}else o.default.addGetWebGLMessage()}()},"./src/js/app/main.js":(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>n});var i=s("./node_modules/three/build/three.module.js"),o=s("./node_modules/three/examples/jsm/controls/OrbitControls.js");s("./node_modules/randomcolor/randomColor.js");new i.Color,new i.Color;class n{constructor(){this.mySwitch=!0;this.camera=new i.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.1,100),this.camera.position.set(0,0,50),this.scene=new i.Scene,this.renderer=new i.WebGLRenderer,this.renderer.shadowMapEnabled=!0,document.body.appendChild(this.renderer.domElement);const e=new o.OrbitControls(this.camera,this.renderer.domElement);e.target.set(0,5,0),e.update(),this.makeOval=this.makeOval.bind(this),this.blink1=this.blink1.bind(this),this.blink2=this.blink2.bind(this);let t=this.makeOval(22,"#0xffff00");t.rotation.z=Math.PI/2;const s=new i.SphereGeometry(1.5,25,17),n=new i.MeshBasicMaterial({color:new i.Color("#0d0a0a")}),a=new i.Mesh(s,n);a.position.z=3.5,a.position.x=-4,this.scene.add(a),this.lids=[],console.log("eye rotation",t.rotation),this.scene.add(t),this.xRad=7.7,this.yRad=2.6,console.log("camera position: ",this.camera.position),console.log("shape position: ",t.position),this.camera.lookAt(t.position),this.render=this.render.bind(this);for(let e=0;e<100;e++);}makeOval(e,t){const s=[];for(let t=0;t<e;++t)s.push(new i.Vector2(3*Math.sin(.15*t),.8*(t-5)));console.log("points: ",s);const o=new i.LatheGeometry(s),n=new i.MeshBasicMaterial({color:new i.Color(t)});return new i.Mesh(o,n)}blink1(e,t){if(this.xRad>0&&this.yRad>0&&this.xRad<=7.7&&this.yRad<=2.6&&this.mySwitch){this.xRad-=t,this.yRad-=t;const s=new i.EllipseCurve(-4,0,this.xRad,this.yRad,0,2*Math.PI/2,!1,0).getPoints(50),o=(new i.BufferGeometry).setFromPoints(s),n=new i.LineBasicMaterial({color:new i.Color(e)}),a=new i.Line(o,n);a.position.z=5,this.scene.add(a),this.lids.push(a)}else 7.7==this.Xrad&&2.6==this.yRad?this.mySwitch=!0:1==this.mySwitch?this.mySwitch=!1:(this.scene.remove(this.lids[this.lids.length-1]),this.lids.pop(),this.xRad+=t,this.yRad+=t)}blink2(e,t){if(this.xRad>0&&this.yRad>0&&this.xRad<=7.7&&this.yRad<=2.6&&this.mySwitch){const t=new i.EllipseCurve(-4,0,0-this.xRad,0-this.yRad,0,2*Math.PI/2,!1,0).getPoints(50),s=(new i.BufferGeometry).setFromPoints(t),o=new i.LineBasicMaterial({color:new i.Color(e)}),n=new i.Line(s,o);n.position.z=5,this.scene.add(n),this.lids.push(n)}else 7.7==this.Xrad&&2.6==this.yRad?this.mySwitch=!0:1==this.mySwitch?(console.log("foo1"),this.mySwitch=!1):(console.log("foo2"),console.log(this.xRad),console.log(this.yRad),this.scene.remove(this.lids[this.lids.length-1]),this.lids.pop(),this.xRad+=t,this.yRad+=t)}render(e){this.blink1("#4b5699",.01),this.blink2("#4b5699",.01),this.renderer.render(this.scene,this.camera),requestAnimationFrame(this.render)}}},"./src/js/data/config.js":(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});const i={isDev:!1,isShowingStats:!0,isLoaded:!1,isTweening:!1,isRotating:!0,isMouseMoving:!1,isMouseOver:!1,maxAnisotropy:1,dpr:1,easing:s("./node_modules/@tweenjs/tween.js/dist/tween.esm.js").default.Easing.Quadratic.InOut,duration:500,model:{selected:0,initialTypes:["gltf","object"],type:"gltf"},models:[{path:"./assets/models/duck.gltf",scale:20,type:"gltf"},{path:"./assets/models/Teapot.json",scale:20,type:"object"}],texture:{path:"./assets/textures/",imageFiles:[{name:"UV",image:"UV_Grid_Sm.jpg"}]},mesh:{enableHelper:!0,wireframe:!1,translucent:!1,material:{color:16777215,emissive:16777215}},fog:{color:16777215,near:8e-4},camera:{fov:40,near:2,far:1e3,aspect:1,posX:0,posY:30,posZ:40},controls:{autoRotate:!0,autoRotateSpeed:-.5,rotateSpeed:.5,zoomSpeed:.8,minDistance:200,maxDistance:600,minPolarAngle:Math.PI/5,maxPolarAngle:Math.PI/2,minAzimuthAngle:-1/0,maxAzimuthAngle:1/0,enableDamping:!0,dampingFactor:.5,enableZoom:!0,target:{x:0,y:0,z:0}},ambientLight:{enabled:!0,color:1315860},directionalLight:{enabled:!0,color:15790320,intensity:.4,x:-75,y:280,z:150},shadow:{enabled:!0,helperEnabled:!0,bias:0,mapWidth:2048,mapHeight:2048,near:250,far:400,top:100,right:100,bottom:-100,left:-100},pointLight:{enabled:!0,color:16777215,intensity:.34,distance:115,x:0,y:0,z:0},hemiLight:{enabled:!0,color:13158600,groundColor:16777215,intensity:.55,x:0,y:0,z:0}}},"./src/js/utils/detector.js":(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});const i={canvas:!!window.CanvasRenderingContext2D,webgl:function(){try{var e=document.createElement("canvas");return!(!window.WebGLRenderingContext||!e.getContext("webgl")&&!e.getContext("experimental-webgl"))}catch(e){return!1}}(),workers:!!window.Worker,fileapi:window.File&&window.FileReader&&window.FileList&&window.Blob,getWebGLErrorMessage:function(){var e=document.createElement("div");return e.id="webgl-error-message",e.style.fontFamily="monospace",e.style.fontSize="13px",e.style.fontWeight="normal",e.style.textAlign="center",e.style.background="#fff",e.style.color="#000",e.style.padding="1.5em",e.style.width="400px",e.style.margin="5em auto 0",this.webgl||(e.innerHTML=window.WebGLRenderingContext?['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000000">WebGL</a>.<br />','Find out how to get it <a href="http://get.webgl.org/" style="color:#000000">here</a>.'].join("\n"):['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000000">WebGL</a>.<br/>','Find out how to get it <a href="http://get.webgl.org/" style="color:#000000">here</a>.'].join("\n")),e},addGetWebGLMessage:function(e){var t,s,i;t=void 0!==(e=e||{}).parent?e.parent:document.body,s=void 0!==e.id?e.id:"oldie",(i=this.getWebGLErrorMessage()).id=s,t.appendChild(i)}}},"./src/css/app.scss":(e,t,s)=>{"use strict";s.r(t)}},e=>{"use strict";e.O(0,["vendors"],(()=>{return t="./src/js/app.js",e(e.s=t);var t}));e.O()}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90aHJlZWpzLWVzNi13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2pzL2FwcC5qcyIsIndlYnBhY2s6Ly90aHJlZWpzLWVzNi13ZWJwYWNrLWJvaWxlcnBsYXRlLy4vc3JjL2pzL2FwcC9tYWluLmpzIiwid2VicGFjazovL3RocmVlanMtZXM2LXdlYnBhY2stYm9pbGVycGxhdGUvLi9zcmMvanMvZGF0YS9jb25maWcuanMiLCJ3ZWJwYWNrOi8vdGhyZWVqcy1lczYtd2VicGFjay1ib2lsZXJwbGF0ZS8uL3NyYy9qcy91dGlscy9kZXRlY3Rvci5qcyJdLCJuYW1lcyI6WyJjb25zb2xlIiwibG9nIiwiQ29uZmlnIiwiRGV0ZWN0b3IiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiRXllIiwicmVuZGVyIiwiaW5pdCIsIlRIUkVFIiwiY29uc3RydWN0b3IiLCJ0aGlzIiwibXlTd2l0Y2giLCJjYW1lcmEiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwiaW5uZXJIZWlnaHQiLCJwb3NpdGlvbiIsInNldCIsInNjZW5lIiwicmVuZGVyZXIiLCJzaGFkb3dNYXBFbmFibGVkIiwiYm9keSIsImFwcGVuZENoaWxkIiwiZG9tRWxlbWVudCIsImNvbnRyb2xzIiwiT3JiaXRDb250cm9scyIsInRhcmdldCIsInVwZGF0ZSIsIm1ha2VPdmFsIiwiYmluZCIsImJsaW5rMSIsImJsaW5rMiIsImV5ZSIsInJvdGF0aW9uIiwieiIsIk1hdGgiLCJQSSIsInNwaEdlb21ldHJ5Iiwic3BoTWF0ZXJpYWwiLCJjb2xvciIsInB1cGlsIiwieCIsImFkZCIsImxpZHMiLCJ4UmFkIiwieVJhZCIsImxvb2tBdCIsImkiLCJudW1Qb2ludHMiLCJwb2ludHMiLCJwdXNoIiwic2luIiwiZ2VvbWV0cnkiLCJtYXRlcmlhbCIsInQiLCJnZXRQb2ludHMiLCJzZXRGcm9tUG9pbnRzIiwiZWxsaXBzZSIsIlhyYWQiLCJyZW1vdmUiLCJsZW5ndGgiLCJwb3AiLCJ0aW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaXNEZXYiLCJpc1Nob3dpbmdTdGF0cyIsImlzTG9hZGVkIiwiaXNUd2VlbmluZyIsImlzUm90YXRpbmciLCJpc01vdXNlTW92aW5nIiwiaXNNb3VzZU92ZXIiLCJtYXhBbmlzb3Ryb3B5IiwiZHByIiwiZWFzaW5nIiwiVFdFRU4iLCJkdXJhdGlvbiIsIm1vZGVsIiwic2VsZWN0ZWQiLCJpbml0aWFsVHlwZXMiLCJ0eXBlIiwibW9kZWxzIiwicGF0aCIsInNjYWxlIiwidGV4dHVyZSIsImltYWdlRmlsZXMiLCJuYW1lIiwiaW1hZ2UiLCJtZXNoIiwiZW5hYmxlSGVscGVyIiwid2lyZWZyYW1lIiwidHJhbnNsdWNlbnQiLCJlbWlzc2l2ZSIsImZvZyIsIm5lYXIiLCJmb3YiLCJmYXIiLCJhc3BlY3QiLCJwb3NYIiwicG9zWSIsInBvc1oiLCJhdXRvUm90YXRlIiwiYXV0b1JvdGF0ZVNwZWVkIiwicm90YXRlU3BlZWQiLCJ6b29tU3BlZWQiLCJtaW5EaXN0YW5jZSIsIm1heERpc3RhbmNlIiwibWluUG9sYXJBbmdsZSIsIm1heFBvbGFyQW5nbGUiLCJtaW5BemltdXRoQW5nbGUiLCJJbmZpbml0eSIsIm1heEF6aW11dGhBbmdsZSIsImVuYWJsZURhbXBpbmciLCJkYW1waW5nRmFjdG9yIiwiZW5hYmxlWm9vbSIsInkiLCJhbWJpZW50TGlnaHQiLCJlbmFibGVkIiwiZGlyZWN0aW9uYWxMaWdodCIsImludGVuc2l0eSIsInNoYWRvdyIsImhlbHBlckVuYWJsZWQiLCJiaWFzIiwibWFwV2lkdGgiLCJtYXBIZWlnaHQiLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJwb2ludExpZ2h0IiwiZGlzdGFuY2UiLCJoZW1pTGlnaHQiLCJncm91bmRDb2xvciIsImNhbnZhcyIsIkNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCIsIndlYmdsIiwiY3JlYXRlRWxlbWVudCIsIldlYkdMUmVuZGVyaW5nQ29udGV4dCIsImdldENvbnRleHQiLCJlIiwid29ya2VycyIsIldvcmtlciIsImZpbGVhcGkiLCJGaWxlIiwiRmlsZVJlYWRlciIsIkZpbGVMaXN0IiwiQmxvYiIsImdldFdlYkdMRXJyb3JNZXNzYWdlIiwiZWxlbWVudCIsImlkIiwic3R5bGUiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwidGV4dEFsaWduIiwiYmFja2dyb3VuZCIsInBhZGRpbmciLCJ3aWR0aCIsIm1hcmdpbiIsImlubmVySFRNTCIsImpvaW4iLCJhZGRHZXRXZWJHTE1lc3NhZ2UiLCJwYXJhbWV0ZXJzIiwicGFyZW50IiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiO2lTQVNFQSxRQUFRQyxJQUFJLDJDQUVaQyxpQkFBZSxFQUdqQixXQUVFLEdBQUlDLGdCQUVHLENBQ2FDLFNBQVNDLGVBQWUsaUJBQ2hDLElBQUlDLFdBQ1ZDLGNBSkpKLCtCQVFKSyxJLG9QQ3BCdUIsSUFBSUMsUUFDUixJQUFJQSxRQUlSLE1BQU1ILEVBQ2pCSSxjQUNJQyxLQUFLQyxVQUFXLEVBT2hCRCxLQUFLRSxPQUFTLElBQUlKLG9CQUF3QixHQUFJSyxPQUFPQyxXQUFhRCxPQUFPRSxZQUFhLEdBQUssS0FDM0ZMLEtBQUtFLE9BQU9JLFNBQVNDLElBQUksRUFBRyxFQUFHLElBQy9CUCxLQUFLUSxNQUFRLElBQUlWLFFBQ2pCRSxLQUFLUyxTQUFXLElBQUlYLGdCQUNwQkUsS0FBS1MsU0FBU0Msa0JBQW1CLEVBQ2pDakIsU0FBU2tCLEtBQUtDLFlBQVlaLEtBQUtTLFNBQVNJLFlBQ3hDLE1BQU1DLEVBQVcsSUFBSUMsZ0JBQWNmLEtBQUtFLE9BQVFGLEtBQUtTLFNBQVNJLFlBQzlEQyxFQUFTRSxPQUFPVCxJQUFJLEVBQUcsRUFBRyxHQUMxQk8sRUFBU0csU0FZVGpCLEtBQUtrQixTQUFXbEIsS0FBS2tCLFNBQVNDLEtBQUtuQixNQUNuQ0EsS0FBS29CLE9BQVNwQixLQUFLb0IsT0FBT0QsS0FBS25CLE1BQy9CQSxLQUFLcUIsT0FBU3JCLEtBQUtxQixPQUFPRixLQUFLbkIsTUFDaEMsSUFBSXNCLEVBQU10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SCxNIiwiZmlsZSI6Im1haW4uYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbmZpZyBmcm9tICcuL2RhdGEvY29uZmlnJztcbmltcG9ydCBEZXRlY3RvciBmcm9tICcuL3V0aWxzL2RldGVjdG9yJztcbmltcG9ydCBFeWUgZnJvbSAnLi9hcHAvbWFpbic7XG5cbi8vIFN0eWxlc1xuaW1wb3J0ICcuLy4uL2Nzcy9hcHAuc2Nzcyc7XG5cbi8vIENoZWNrIGVudmlyb25tZW50IGFuZCBzZXQgdGhlIENvbmZpZyBoZWxwZXJcbmlmKF9fRU5WX18gPT09ICdkZXYnKSB7XG4gIGNvbnNvbGUubG9nKCctLS0tLSBSVU5OSU5HIElOIERFViBFTlZJUk9OTUVOVCEgLS0tLS0nKTtcblxuICBDb25maWcuaXNEZXYgPSB0cnVlO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAvLyBDaGVjayBmb3Igd2ViR0wgY2FwYWJpbGl0aWVzXG4gIGlmKCFEZXRlY3Rvci53ZWJnbCkge1xuICAgIERldGVjdG9yLmFkZEdldFdlYkdMTWVzc2FnZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHBDb250YWluZXInKTtcbiAgICBsZXQgZXllID0gbmV3IEV5ZSgpO1xuICAgIGV5ZS5yZW5kZXIoKVxuICB9XG59XG5cbmluaXQoKTtcbiIsIi8vIEdsb2JhbCBpbXBvcnRzIC1cbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IE9yYml0Q29udHJvbHMgfSBmcm9tICd0aHJlZS9leGFtcGxlcy9qc20vY29udHJvbHMvT3JiaXRDb250cm9scy5qcyc7XG5pbXBvcnQgcmFuZG9tQ29sb3IgZnJvbSAncmFuZG9tY29sb3InXG5cbmxldCBjdXJyZW50R29hbENvbG9yID0gbmV3IFRIUkVFLkNvbG9yXG5sZXQgY3VycmVudENvbG9yID0gbmV3IFRIUkVFLkNvbG9yXG5cblxuLy8gVGhpcyBjbGFzcyBpbnN0YW50aWF0ZXMgYW5kIHRpZXMgYWxsIG9mIHRoZSBjb21wb25lbnRzIHRvZ2V0aGVyLCBzdGFydHMgdGhlIGxvYWRpbmcgcHJvY2VzcyBhbmQgcmVuZGVycyB0aGUgbWFpbiBsb29wXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeWUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm15U3dpdGNoID0gdHJ1ZVxuICAgICAgICAvLyBzZXQgdXAgc2NlbmVcbiAgICAgICAgY29uc3QgZm92ID0gNzU7XG4gICAgICAgIGNvbnN0IGFzcGVjdCA9IDI7ICAvLyB0aGUgY2FudmFzIGRlZmF1bHRcbiAgICAgICAgY29uc3QgbmVhciA9IDAuMTtcbiAgICAgICAgY29uc3QgZmFyID0gNTtcbiAgICAgICAgLy8gZm92LCBhc3BlY3QsIG5lYXIsIGZhclxuICAgICAgICB0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSg0NSwgd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQsIDAuMSwgMTAwKTtcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24uc2V0KDAsIDAsIDUwKVxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlcigpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNoYWRvd01hcEVuYWJsZWQgPSB0cnVlXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KVxuICAgICAgICBjb25zdCBjb250cm9scyA9IG5ldyBPcmJpdENvbnRyb2xzKHRoaXMuY2FtZXJhLCB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpXG4gICAgICAgIGNvbnRyb2xzLnRhcmdldC5zZXQoMCwgNSwgMClcbiAgICAgICAgY29udHJvbHMudXBkYXRlKClcbiAgICAgICAgLy8gYm94IGZvciBkZWJ1Z2dpbmdcbi8vICAgICAgICBjb25zdCBib3hXaWR0aCA9IDE7XG4vLyAgICAgICAgY29uc3QgYm94SGVpZ2h0ID0gMTtcbi8vICAgICAgICBjb25zdCBib3hEZXB0aCA9IDE7XG4vLyAgICAgICAgY29uc3QgYm94Z2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoYm94V2lkdGgsIGJveEhlaWdodCwgYm94RGVwdGgpO1xuLy8gICAgICAgIGNvbnN0IGJveG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKCk7XG4vLyAgICAgICAgbGV0IGN1YmVPYmogPSBuZXcgVEhSRUUuTWVzaChib3hnZW9tZXRyeSwgYm94bWF0ZXJpYWwpO1xuLy8gICAgICAgIHRoaXMuc2NlbmUuYWRkKGN1YmVPYmopO1xuLy8gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChjdWJlT2JqLnBvc2l0aW9uKVxuXG4gICAgICAgIC8vIG1ha2Ugc2hhcGVcbiAgICAgICAgdGhpcy5tYWtlT3ZhbCA9IHRoaXMubWFrZU92YWwuYmluZCh0aGlzKVxuICAgICAgICB0aGlzLmJsaW5rMSA9IHRoaXMuYmxpbmsxLmJpbmQodGhpcylcbiAgICAgICAgdGhpcy5ibGluazIgPSB0aGlzLmJsaW5rMi5iaW5kKHRoaXMpXG4gICAgICAgbGV0IGV5ZSA9IHRoaXMubWFrZU92YWwoMjIsIFwiIzB4ZmZmZjAwXCIpXG4gICAgICAgIGV5ZS5yb3RhdGlvbi56ID0gTWF0aC5QSS8yXG4gICAgICAgIGNvbnN0IHJhZGl1cyA9MS41XG4gICAgICAgIGNvbnN0IHdpZHRoU2VnbWVudHMgPSAyNTtcbiAgICAgICAgY29uc3QgaGVpZ2h0U2VnbWVudHMgPSAxNztcbiAgICAgICAgY29uc3Qgc3BoR2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkocmFkaXVzLCB3aWR0aFNlZ21lbnRzLCBoZWlnaHRTZWdtZW50cylcbiAgICAgICAgY29uc3Qgc3BoTWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaEJhc2ljTWF0ZXJpYWwoeyBjb2xvcjogbmV3IFRIUkVFLkNvbG9yKFwiIzBkMGEwYVwiKX0pO1xuICAgICAgICBjb25zdCBwdXBpbCA9IG5ldyBUSFJFRS5NZXNoKHNwaEdlb21ldHJ5LCBzcGhNYXRlcmlhbClcbiAgICAgICAgcHVwaWwucG9zaXRpb24ueiA9IDMuNVxuICAgICAgICBwdXBpbC5wb3NpdGlvbi54ID0gLTRcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQocHVwaWwpXG5cbiAgICAgICAgdGhpcy5saWRzID0gW11cbiAgICAgICAgY29uc29sZS5sb2coJ2V5ZSByb3RhdGlvbicsIGV5ZS5yb3RhdGlvbilcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZXllKTtcbiAgICAgICAgdGhpcy54UmFkID0gNy43XG4gICAgICAgIHRoaXMueVJhZCA9IDIuNlxuICAgICAgICBjb25zb2xlLmxvZygnY2FtZXJhIHBvc2l0aW9uOiAnLCB0aGlzLmNhbWVyYS5wb3NpdGlvbilcbiAgICAgICAgY29uc29sZS5sb2coJ3NoYXBlIHBvc2l0aW9uOiAnLCBleWUucG9zaXRpb24pXG4gICAgICAgIHRoaXMuY2FtZXJhLmxvb2tBdChleWUucG9zaXRpb24pXG4gICAgICAgIHRoaXMucmVuZGVyID0gdGhpcy5yZW5kZXIuYmluZCh0aGlzKSAvL2JpbmQgdG8gY2xhc3MgaW5zdGVhZCBvZiB3aW5kb3cgb2JqZWN0XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTAwOyBpICsrKSB7XG4vLyAgICAgICAgICAgIHRoaXMuYmxpbmsoXCIjNGI1Njk5XCIsIGkqMC4wMSlcbiAgICAgICAgfVxuXG4gICAgfVxuICAgIG1ha2VPdmFsKG51bVBvaW50cywgY29sb3IpIHtcbiAgICAgICAgY29uc3QgcG9pbnRzID0gW11cbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgbnVtUG9pbnRzOyArK2kpIHtcbiAgICAgICAgICAgIHBvaW50cy5wdXNoKG5ldyBUSFJFRS5WZWN0b3IyKE1hdGguc2luKGkqMC4xNSkgKiAzLCAoaS01KSAqLjgpKVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdwb2ludHM6ICcsIHBvaW50cylcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuTGF0aGVHZW9tZXRyeShwb2ludHMpO1xuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiBuZXcgVEhSRUUuQ29sb3IoY29sb3IpfSk7XG4gICAgICAgIGNvbnN0IHNoYXBlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICAgICAgcmV0dXJuIHNoYXBlXG5cbiAgICB9XG5cbiAgICBibGluazEoY29sb3IsIHQpIHtcbiAgICAgICAgaWYgKHRoaXMueFJhZCA+IDAgJiYgdGhpcy55UmFkID4gMCAmJiB0aGlzLnhSYWQgPD0gNy43ICYmIHRoaXMueVJhZCA8PTIuNiAmJiB0aGlzLm15U3dpdGNoKSB7XG4gICAgICAgICAgICB0aGlzLnhSYWQgLT0gdFxuICAgICAgICAgICAgdGhpcy55UmFkIC09IHRcbiAgICAgICAgbGV0IGN1cnZlID0gbmV3IFRIUkVFLkVsbGlwc2VDdXJ2ZShcbiAgICAgICAgICAtNCwgIDAsICAgICAgICAgICAgLy8gYXgsIGFZXG4gICAgICAgICAgdGhpcy54UmFkLCB0aGlzLnlSYWQsICAgICAgICAgICAvLyB4UmFkaXVzLCB5UmFkaXVzXG4gICAgICAgICAgMCwgIDIgKiBNYXRoLlBJLzIsICAvLyBhU3RhcnRBbmdsZSwgYUVuZEFuZ2xlXG4gICAgICAgICAgZmFsc2UsICAgICAgICAgICAgLy8gYUNsb2Nrd2lzZVxuICAgICAgICAgIDAgICAgICAgICAgICAgICAgIC8vIGFSb3RhdGlvblxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IHBvaW50cyA9IGN1cnZlLmdldFBvaW50cyggNTAgKTtcbiAgICAgICAgY29uc3QgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKS5zZXRGcm9tUG9pbnRzKCBwb2ludHMgKTtcblxuICAgICAgICBjb25zdCBtYXRlcmlhbCA9IG5ldyBUSFJFRS5MaW5lQmFzaWNNYXRlcmlhbCggeyBjb2xvciA6IG5ldyBUSFJFRS5Db2xvcihjb2xvcikgfSApO1xuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgZmluYWwgb2JqZWN0IHRvIGFkZCB0byB0aGUgc2NlbmVcbiAgICAgICAgY29uc3QgZWxsaXBzZSA9IG5ldyBUSFJFRS5MaW5lKCBnZW9tZXRyeSwgbWF0ZXJpYWwgKTtcbiAgICAgICAgZWxsaXBzZS5wb3NpdGlvbi56ID0gNVxuICAgICAgICB0aGlzLnNjZW5lLmFkZChlbGxpcHNlKVxuICAgICAgICB0aGlzLmxpZHMucHVzaChlbGxpcHNlKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuWHJhZCA9PSA3LjcgJiYgdGhpcy55UmFkID09IDIuNikge1xuICAgICAgICAgICAgdGhpcy5teVN3aXRjaCA9IHRydWVcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLm15U3dpdGNoID09IHRydWUpe1xuICAgICAgICAgICAgdGhpcy5teVN3aXRjaCA9IGZhbHNlXG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMubGlkc1t0aGlzLmxpZHMubGVuZ3RoIC0gMV0pXG4gICAgICAgICAgICB0aGlzLmxpZHMucG9wKClcbiAgICAgICAgICAgIHRoaXMueFJhZCArPSB0XG4gICAgICAgICAgICB0aGlzLnlSYWQgKz0gdFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmxpbmsyKGNvbG9yLCB0KSB7XG4gICAgICAgIGlmICh0aGlzLnhSYWQgPiAwICYmIHRoaXMueVJhZCA+IDAgJiYgdGhpcy54UmFkIDw9IDcuNyAmJiB0aGlzLnlSYWQgPD0yLjYgJiYgdGhpcy5teVN3aXRjaCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VydmUgPSBuZXcgVEhSRUUuRWxsaXBzZUN1cnZlKFxuICAgICAgICAgIC00LCAgMCwgICAgICAgICAgICAvLyBheCwgYVlcbiAgICAgICAgICAwIC0gdGhpcy54UmFkLCAwIC0gdGhpcy55UmFkLCAgICAgICAgICAgLy8geFJhZGl1cywgeVJhZGl1c1xuICAgICAgICAgIDAsICAyICogTWF0aC5QSS8yLCAgLy8gYVN0YXJ0QW5nbGUsIGFFbmRBbmdsZVxuICAgICAgICAgIGZhbHNlLCAgICAgICAgICAgIC8vIGFDbG9ja3dpc2VcbiAgICAgICAgICAwICAgICAgICAgICAgICAgICAvLyBhUm90YXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBwb2ludHMgPSBjdXJ2ZS5nZXRQb2ludHMoIDUwICk7XG4gICAgICAgIGNvbnN0IGdlb21ldHJ5ID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCkuc2V0RnJvbVBvaW50cyggcG9pbnRzICk7XG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTGluZUJhc2ljTWF0ZXJpYWwoIHsgY29sb3IgOiBuZXcgVEhSRUUuQ29sb3IoY29sb3IpIH0gKTtcblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGZpbmFsIG9iamVjdCB0byBhZGQgdG8gdGhlIHNjZW5lXG4gICAgICAgIGNvbnN0IGVsbGlwc2UgPSBuZXcgVEhSRUUuTGluZSggZ2VvbWV0cnksIG1hdGVyaWFsICk7XG4gICAgICAgIGVsbGlwc2UucG9zaXRpb24ueiA9IDVcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZWxsaXBzZSlcbiAgICAgICAgdGhpcy5saWRzLnB1c2goZWxsaXBzZSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLlhyYWQgPT0gNy43ICYmIHRoaXMueVJhZCA9PSAyLjYpIHtcbiAgICAgICAgICAgIHRoaXMubXlTd2l0Y2ggPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5teVN3aXRjaCA9PSB0cnVlKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdmb28xJylcbiAgICAgICAgICAgIHRoaXMubXlTd2l0Y2ggPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ZvbzInKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy54UmFkKVxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy55UmFkKVxuICAgICAgICAgICAgdGhpcy5zY2VuZS5yZW1vdmUodGhpcy5saWRzW3RoaXMubGlkcy5sZW5ndGggLSAxXSlcbiAgICAgICAgICAgIHRoaXMubGlkcy5wb3AoKVxuICAgICAgICAgICAgdGhpcy54UmFkICs9IHRcbiAgICAgICAgICAgIHRoaXMueVJhZCArPSB0XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbiAgICByZW5kZXIodGltZSkge1xuLy8gICAgICAgIGlmIChNYXRoLnJvdW5kKHRoaXMuc2hhcGUubWF0ZXJpYWwuY29sb3IucioxMDApLzEwMCA9PSBNYXRoLnJvdW5kKGN1cnJlbnRHb2FsQ29sb3IucioxMDApLzEwMCB8fCB0aW1lID09IDIwKXtcbi8vICAgICAgICAgICAgY3VycmVudEdvYWxDb2xvciA9IG5ldyBUSFJFRS5Db2xvcihyYW5kb21Db2xvcih7Zm9ybWF0OiAncmdiJ30pKVxuLy8gICAgICAgIH1cbiAgICAgICAgLy90aGlzLnNoYXBlLm1hdGVyaWFsLmNvbG9yLnNldChjdXJyZW50Q29sb3IubGVycENvbG9ycyggdGhpcy5zaGFwZS5tYXRlcmlhbC5jb2xvciwgY3VycmVudEdvYWxDb2xvciwgMC4wMykpXG4gICAgICAgIHRpbWUgKj0gMC4wMDFcbi8vICAgICAgICB0aGlzLnNoYXBlLnJvdGF0aW9uLnggPSB0aW1lO1xuLy8gICAgICAgIHRoaXMuc2hhcGUucm90YXRpb24ueSA9IHRpbWVcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5ibGluazEoXCIjNGI1Njk5XCIsIDAuMDEpXG4gICAgICAgIHRoaXMuYmxpbmsyKFwiIzRiNTY5OVwiLCAwLjAxKVxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSlcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMucmVuZGVyKSAgICAgfVxuXG59XG5cblxuIiwiaW1wb3J0IFRXRUVOIGZyb20gJ0B0d2VlbmpzL3R3ZWVuLmpzJztcblxuLy8gVGhpcyBvYmplY3QgY29udGFpbnMgdGhlIHN0YXRlIG9mIHRoZSBhcHBcbmV4cG9ydCBkZWZhdWx0IHtcbiAgaXNEZXY6IGZhbHNlLFxuICBpc1Nob3dpbmdTdGF0czogdHJ1ZSxcbiAgaXNMb2FkZWQ6IGZhbHNlLFxuICBpc1R3ZWVuaW5nOiBmYWxzZSxcbiAgaXNSb3RhdGluZzogdHJ1ZSxcbiAgaXNNb3VzZU1vdmluZzogZmFsc2UsXG4gIGlzTW91c2VPdmVyOiBmYWxzZSxcbiAgbWF4QW5pc290cm9weTogMSxcbiAgZHByOiAxLFxuICBlYXNpbmc6IFRXRUVOLkVhc2luZy5RdWFkcmF0aWMuSW5PdXQsXG4gIGR1cmF0aW9uOiA1MDAsXG4gIG1vZGVsOiB7XG4gICAgc2VsZWN0ZWQ6IDAsXG4gICAgaW5pdGlhbFR5cGVzOiBbJ2dsdGYnLCAnb2JqZWN0J10sXG4gICAgdHlwZTogJ2dsdGYnXG4gIH0sXG4gIG1vZGVsczogW1xuICAgIHtcbiAgICAgIHBhdGg6ICcuL2Fzc2V0cy9tb2RlbHMvZHVjay5nbHRmJyxcbiAgICAgIHNjYWxlOiAyMCxcbiAgICAgIHR5cGU6ICdnbHRmJ1xuICAgIH0sXG4gICAge1xuICAgICAgcGF0aDogJy4vYXNzZXRzL21vZGVscy9UZWFwb3QuanNvbicsXG4gICAgICBzY2FsZTogMjAsXG4gICAgICB0eXBlOiAnb2JqZWN0J1xuICAgIH1cbiAgXSxcbiAgdGV4dHVyZToge1xuICAgIHBhdGg6ICcuL2Fzc2V0cy90ZXh0dXJlcy8nLFxuICAgIGltYWdlRmlsZXM6IFtcbiAgICAgIHsgbmFtZTogJ1VWJywgaW1hZ2U6ICdVVl9HcmlkX1NtLmpwZycgfVxuICAgIF1cbiAgfSxcbiAgbWVzaDoge1xuICAgIGVuYWJsZUhlbHBlcjogdHJ1ZSxcbiAgICB3aXJlZnJhbWU6IGZhbHNlLFxuICAgIHRyYW5zbHVjZW50OiBmYWxzZSxcbiAgICBtYXRlcmlhbDoge1xuICAgICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgICAgZW1pc3NpdmU6IDB4ZmZmZmZmXG4gICAgfVxuICB9LFxuICBmb2c6IHtcbiAgICBjb2xvcjogMHhmZmZmZmYsXG4gICAgbmVhcjogMC4wMDA4XG4gIH0sXG4gIGNhbWVyYToge1xuICAgIGZvdjogNDAsXG4gICAgbmVhcjogMixcbiAgICBmYXI6IDEwMDAsXG4gICAgYXNwZWN0OiAxLFxuICAgIHBvc1g6IDAsXG4gICAgcG9zWTogMzAsXG4gICAgcG9zWjogNDBcbiAgfSxcbiAgY29udHJvbHM6IHtcbiAgICBhdXRvUm90YXRlOiB0cnVlLFxuICAgIGF1dG9Sb3RhdGVTcGVlZDogLTAuNSxcbiAgICByb3RhdGVTcGVlZDogMC41LFxuICAgIHpvb21TcGVlZDogMC44LFxuICAgIG1pbkRpc3RhbmNlOiAyMDAsXG4gICAgbWF4RGlzdGFuY2U6IDYwMCxcbiAgICBtaW5Qb2xhckFuZ2xlOiBNYXRoLlBJIC8gNSxcbiAgICBtYXhQb2xhckFuZ2xlOiBNYXRoLlBJIC8gMixcbiAgICBtaW5BemltdXRoQW5nbGU6IC1JbmZpbml0eSxcbiAgICBtYXhBemltdXRoQW5nbGU6IEluZmluaXR5LFxuICAgIGVuYWJsZURhbXBpbmc6IHRydWUsXG4gICAgZGFtcGluZ0ZhY3RvcjogMC41LFxuICAgIGVuYWJsZVpvb206IHRydWUsXG4gICAgdGFyZ2V0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMCxcbiAgICAgIHo6IDBcbiAgICB9XG4gIH0sXG4gIGFtYmllbnRMaWdodDoge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgY29sb3I6IDB4MTQxNDE0XG4gIH0sXG4gIGRpcmVjdGlvbmFsTGlnaHQ6IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGNvbG9yOiAweGYwZjBmMCxcbiAgICBpbnRlbnNpdHk6IDAuNCxcbiAgICB4OiAtNzUsXG4gICAgeTogMjgwLFxuICAgIHo6IDE1MFxuICB9LFxuICBzaGFkb3c6IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGhlbHBlckVuYWJsZWQ6IHRydWUsXG4gICAgYmlhczogMCxcbiAgICBtYXBXaWR0aDogMjA0OCxcbiAgICBtYXBIZWlnaHQ6IDIwNDgsXG4gICAgbmVhcjogMjUwLFxuICAgIGZhcjogNDAwLFxuICAgIHRvcDogMTAwLFxuICAgIHJpZ2h0OiAxMDAsXG4gICAgYm90dG9tOiAtMTAwLFxuICAgIGxlZnQ6IC0xMDBcbiAgfSxcbiAgcG9pbnRMaWdodDoge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgY29sb3I6IDB4ZmZmZmZmLFxuICAgIGludGVuc2l0eTogMC4zNCxcbiAgICBkaXN0YW5jZTogMTE1LFxuICAgIHg6IDAsXG4gICAgeTogMCxcbiAgICB6OiAwXG4gIH0sXG4gIGhlbWlMaWdodDoge1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgY29sb3I6IDB4YzhjOGM4LFxuICAgIGdyb3VuZENvbG9yOiAweGZmZmZmZixcbiAgICBpbnRlbnNpdHk6IDAuNTUsXG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHo6IDBcbiAgfVxufTtcbiIsIi8qKlxuICogQGF1dGhvciBhbHRlcmVkcSAvIGh0dHA6Ly9hbHRlcmVkcXVhbGlhLmNvbS9cbiAqIEBhdXRob3IgbXIuZG9vYiAvIGh0dHA6Ly9tcmRvb2IuY29tL1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgY2FudmFzOiAhIXdpbmRvdy5DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gIHdlYmdsOiAoZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgcmV0dXJuICEhKHdpbmRvdy5XZWJHTFJlbmRlcmluZ0NvbnRleHQgJiYgKGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpIHx8IGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnKSkpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSkoKSxcblxuICB3b3JrZXJzOiAhIXdpbmRvdy5Xb3JrZXIsXG4gIGZpbGVhcGk6IHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYixcblxuICBnZXRXZWJHTEVycm9yTWVzc2FnZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbGVtZW50LmlkID0gJ3dlYmdsLWVycm9yLW1lc3NhZ2UnO1xuICAgIGVsZW1lbnQuc3R5bGUuZm9udEZhbWlseSA9ICdtb25vc3BhY2UnO1xuICAgIGVsZW1lbnQuc3R5bGUuZm9udFNpemUgPSAnMTNweCc7XG4gICAgZWxlbWVudC5zdHlsZS5mb250V2VpZ2h0ID0gJ25vcm1hbCc7XG4gICAgZWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZic7XG4gICAgZWxlbWVudC5zdHlsZS5jb2xvciA9ICcjMDAwJztcbiAgICBlbGVtZW50LnN0eWxlLnBhZGRpbmcgPSAnMS41ZW0nO1xuICAgIGVsZW1lbnQuc3R5bGUud2lkdGggPSAnNDAwcHgnO1xuICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luID0gJzVlbSBhdXRvIDAnO1xuXG4gICAgaWYoIXRoaXMud2ViZ2wpIHtcbiAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gd2luZG93LldlYkdMUmVuZGVyaW5nQ29udGV4dCA/IFtcbiAgICAgICAgJ1lvdXIgZ3JhcGhpY3MgY2FyZCBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgPGEgaHJlZj1cImh0dHA6Ly9raHJvbm9zLm9yZy93ZWJnbC93aWtpL0dldHRpbmdfYV9XZWJHTF9JbXBsZW1lbnRhdGlvblwiIHN0eWxlPVwiY29sb3I6IzAwMDAwMFwiPldlYkdMPC9hPi48YnIgLz4nLFxuICAgICAgICAnRmluZCBvdXQgaG93IHRvIGdldCBpdCA8YSBocmVmPVwiaHR0cDovL2dldC53ZWJnbC5vcmcvXCIgc3R5bGU9XCJjb2xvcjojMDAwMDAwXCI+aGVyZTwvYT4uJ1xuICAgICAgXS5qb2luKCdcXG4nKSA6IFtcbiAgICAgICAgJ1lvdXIgYnJvd3NlciBkb2VzIG5vdCBzZWVtIHRvIHN1cHBvcnQgPGEgaHJlZj1cImh0dHA6Ly9raHJvbm9zLm9yZy93ZWJnbC93aWtpL0dldHRpbmdfYV9XZWJHTF9JbXBsZW1lbnRhdGlvblwiIHN0eWxlPVwiY29sb3I6IzAwMDAwMFwiPldlYkdMPC9hPi48YnIvPicsXG4gICAgICAgICdGaW5kIG91dCBob3cgdG8gZ2V0IGl0IDxhIGhyZWY9XCJodHRwOi8vZ2V0LndlYmdsLm9yZy9cIiBzdHlsZT1cImNvbG9yOiMwMDAwMDBcIj5oZXJlPC9hPi4nXG4gICAgICBdLmpvaW4oJ1xcbicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xuICB9LFxuXG4gIGFkZEdldFdlYkdMTWVzc2FnZTogZnVuY3Rpb24ocGFyYW1ldGVycykge1xuICAgIHZhciBwYXJlbnQsIGlkLCBlbGVtZW50O1xuXG4gICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMgfHwge307XG5cbiAgICBwYXJlbnQgPSBwYXJhbWV0ZXJzLnBhcmVudCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5wYXJlbnQgOiBkb2N1bWVudC5ib2R5O1xuICAgIGlkID0gcGFyYW1ldGVycy5pZCAhPT0gdW5kZWZpbmVkID8gcGFyYW1ldGVycy5pZCA6ICdvbGRpZSc7XG5cbiAgICBlbGVtZW50ID0gdGhpcy5nZXRXZWJHTEVycm9yTWVzc2FnZSgpO1xuICAgIGVsZW1lbnQuaWQgPSBpZDtcblxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=