"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}();!function(t){function e(s){if(i[s])return i[s].exports;var a=i[s]={i:s,l:!1,exports:{}};return t[s].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,i){Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(e,i){_classCallCheck(this,t),this.canvas={motion:document.getElementById("motion"),capture:document.createElement("canvas"),diff:document.createElement("canvas")};var s=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,a=0;a=s>2500?1500:s>930&&s<=2500?Math.floor(.6*s):Math.floor(.9*s);var n=this.gcd(e,i);this.captureIntervalTime=100,this.canvasWidth=a,this.canvasHeight=a/(e/n)*(i/n),this.isReadyToDiff=!1,this.pixelDiffThreshold=200,this.scoreThreshold=32,this.motionCoordsL=[],this.motionCoordsR=[],this.savedCoords=[],this.rgba=[],this.diffSwitch=!1,this.resettingStep=!1,this.score={right:0,left:0},this.debug=!1,this.canvas.capture.width=this.canvasWidth,this.canvas.capture.height=this.canvasHeight,this.captureContext=this.canvas.capture.getContext("2d"),this.canvas.diff.width=this.canvasWidth,this.canvas.diff.height=this.canvasHeight,this.diffContext=this.canvas.diff.getContext("2d"),this.canvas.motion.width=this.canvasWidth,this.canvas.motion.height=this.canvasHeight,this.motionContext=this.canvas.motion.getContext("2d")}return _createClass(t,[{key:"start",value:function(t){var e=this;this.canvas.motion.classList.add("visible"),this.captureInterval=setInterval(function(){e.capture(t)},this.captureIntervalTime)}},{key:"capture",value:function(t){this.captureContext.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.motionContext.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.captureContext.drawImage(t,0,0,this.canvasWidth,this.canvasHeight);for(var e=this.captureContext.getImageData(0,0,this.canvasWidth,this.canvasHeight),i=e.data,s=0;s<i.length;s+=4){var a=i[s],n=i[s+1],o=i[s+2],r=parseInt((a+n+o)/3);i[s]=r,i[s+1]=r,i[s+2]=r}this.motionContext.putImageData(e,0,0),this.diffContext.globalCompositeOperation="difference",this.diffContext.drawImage(t,0,0,this.canvasWidth,this.canvasHeight);var c=this.diffContext.getImageData(0,0,this.canvasWidth,this.canvasHeight);if(this.isReadyToDiff&&this.diffSwitch){this.rgba=c.data;for(var h=0;h<this.rgba.length;h+=4)if(.6*this.rgba[h]+.6*this.rgba[h+1]+.6*this.rgba[h+2]>=this.pixelDiffThreshold){var l=this.calculateCoordinates(h/4);l.x<this.canvasWidth/2?this.motionCoordsL.push({x:l.x,y:l.y}):this.motionCoordsR.push({x:l.x,y:l.y})}this.rgba=[]}if(this.isReadyToDiff&&(this.motionCoordsL.length>750&&(this.motionContext.fillStyle="#FFF200",this.draw(0,.4),this.saveDiff(this.motionCoordsL)),this.motionCoordsR.length>750&&(this.motionContext.fillStyle="#F46060",this.draw(this.canvasWidth/2,.4),this.saveDiff(this.motionCoordsR)),this.debug))for(var d=0;d<this.savedCoords.length;d++)this.savedCoords[d].x<this.canvasWidth/2?this.motionContext.fillStyle="#FFF200":this.motionContext.fillStyle="#F46060",this.motionContext.fillRect(this.savedCoords[d].x-2,this.savedCoords[d].y-2,4,4);this.resettingStep&&(this.score.left>1e3&&(this.motionContext.fillStyle="#FFF200",this.draw(0,.7)),this.score.right>1e3&&(this.motionContext.fillStyle="#F46060",this.draw(this.canvasWidth/2,.7))),this.motionContext.beginPath(),this.motionContext.moveTo(this.canvasWidth/2,0),this.motionContext.lineTo(this.canvasWidth/2,this.canvasHeight),this.motionContext.strokeStyle="#ffffff",this.motionContext.stroke(),this.diffContext.globalCompositeOperation="source-over",this.diffContext.drawImage(t,0,0,this.canvasWidth,this.canvasHeight),this.isReadyToDiff=!0}},{key:"calculateCoordinates",value:function(t){return{x:t%this.canvasWidth,y:Math.floor(t/this.canvasWidth)}}},{key:"draw",value:function(t,e){this.motionContext.globalAlpha=e,this.motionContext.fillRect(t,0,this.canvasWidth/2,this.canvasHeight),this.motionContext.globalAlpha=1}},{key:"saveDiff",value:function(t){this.savedCoords=this.savedCoords.concat(t)}},{key:"reset",value:function(t){this.motionCoordsL=[],this.motionCoordsR=[],t&&(this.savedCoords=[],this.score.right=0,this.score.left=0)}},{key:"backBase",value:function(){for(var t=0;t<this.savedCoords.length;t++)this.savedCoords[t].x>this.canvasWidth/2?this.score.right++:this.score.left++}},{key:"stop",value:function(){this.captureInterval&&(clearInterval(this.captureInterval),this.motionContext.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.diffContext.clearRect(0,0,this.canvasWidth,this.canvasHeight),this.canvas.motion.classList.remove("visible"),this.isReadyToDiff=!1)}},{key:"gcd",value:function(t,e){return 0==e?t:this.gcd(e,t%e)}}]),t}();e.default=s},function(t,e,i){i(0),t.exports=i(2)},function(t,e,i){function s(t){var e=t;if(!e)throw"Cannot start after init fail";f.video.addEventListener("canplay",a),f.video.srcObject=e,f.video.onloadedmetadata=function(){v=new d.default(this.videoWidth,this.videoHeight)}}function a(){f.video.removeEventListener("canplay",a),m=!0,g=!1,r(u.start,function(){u.start.el.classList.toggle("visible"),f.win.classList.remove("visible"),f.rules.classList.toggle("out"),f.alerts.classList.toggle("out"),n()})}function n(){v.start(f.video);var t=0,e=2;C=setInterval(function(){if(t>0&&t<u.game.sec){t+=1,u.game.el.innerHTML=t;var i=Math.floor(4*Math.random()+2);switch(e){case 1:v.reset(!1);break;case 2:l(t);break;case 3:c(i)}}else if(0!=t||g){if(t==u.game.sec&&!g){switch(u.game.el.innerHTML="..",e){case 1:v.reset(!1),v.savedCoords.length>0?(e=3,u.game.sec=5):e=2;break;case 2:u.game.el.innerHTML="SOLEIL",l("soleil"),e=1;break;case 3:f.step.innerHTML="Ready ?",e=2,u.game.sec=3}t=0}}else switch(t+=1,u.game.el.innerHTML=t,e){case 1:f.step.innerHTML="Watching",f.body.classList.add("watch"),p=!1,v.diffSwitch=!0,v.resettingStep=!1,c(2);break;case 2:f.step.innerHTML="",c(1),v.diffSwitch=!1,v.reset(!0),p=!0,f.body.classList.remove("watch"),f.body.classList.remove("on"),l(t);break;case 3:f.step.innerHTML="EXTRA TIME",f.body.classList.add("on"),c(3),v.diffSwitch=!1,v.backBase(),v.resettingStep=!0,v.reset(!1)}},1e3)}function o(t){f.rules.innerHTML=t}function r(t,e){var i=t.sec,s=setInterval(function(){i>=0?(t.el.innerHTML=i,i-=1):(t.el.innerHTML=0,clearInterval(s),e())},1e3)}function c(t){for(var e=0;e<f.eyes.length;e++)f.eyes[e].dataset.number==t?f.eyes[e].classList.add("visible"):f.eyes[e].classList.remove("visible")}function h(){m&&p&&(m=!1,g=!0,v.stop(),clearInterval(C),f.win.classList.add("visible"),f.playButton.innerHTML="Re-play",f.playButton.classList.toggle("visible"),f.rules.classList.toggle("out"),f.alerts.classList.toggle("out"),u.start.el.classList.toggle("visible"),c(-1),u.start.el.innerHTML=10)}function l(t){var e=new SpeechSynthesisUtterance;e.text=t,e.lang="fr-FR"}Object.defineProperty(e,"__esModule",{value:!0});var d=i(0),v=[],f={body:document.getElementById("body"),video:document.getElementById("video"),playButton:document.querySelector(".play-button"),eyes:document.querySelectorAll(".eyesPicto"),rules:document.querySelector(".rules"),alerts:document.querySelector(".alerts"),step:document.querySelector(".step"),win:document.querySelector(".win")},u={game:{el:document.getElementById("gameCount"),sec:3},start:{el:document.getElementById("start"),sec:10}},g=!1,m=!1,y=!0,C=void 0,p=!1;f.playButton.addEventListener("click",function(t){if(t.preventDefault(),f.playButton.classList.toggle("visible"),y){var e={audio:!1,video:{width:{min:640,ideal:1280,max:1920},height:{min:400,ideal:720},facingMode:"user",frameRate:{max:25}}};void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(t){var e=navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return e?new Promise(function(i,s){e.call(navigator,t,i,s)}):Promise.reject(new Error("getUserMedia is not implemented in this browser"))}),navigator.mediaDevices.getUserMedia(e).then(s).catch(o),y=!1}else a()}),document.onkeydown=function(t){"32"==(t=t||window.event).keyCode&&h(),"38"==t.keyCode&&void 0!=v&&(v.debug=1!=v.debug)},f.body.addEventListener("touchend",h,!1)}]);