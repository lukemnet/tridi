/*
  Tridi v0.0.3 - JavaScript 3D Product Viewer
  Author: Łukasz Wójcik
  License: MIT
  Homepage: https://tridi.lukem.net
  GitHub: http://github.com/lukemnet/tridi
*/
var Tridi=function(){function r(e){this.validateOptions=function(e){e.element||console.error(r.h(),"'element' property is missing or invalid. Container element must be specified."),void 0===e.images&&void 0===e.imageFormat&&console.error(r.h(),"'imageFormat' property is missing or invalid. Image format must be provided for 'numbered' property."),"numbered"!==e.images||e.imageLocation||console.error(r.h(),"'imageLocation' property is missing or invalid. Image location must be provided for 'numbered' property."),Array.isArray(e.images)&&e.imageFormat&&console.warn(r.h(),"Got array of images as initalizing parameter. 'imageFormat' property will be ignored."),Array.isArray(e.images)&&e.imageLocation&&console.warn(r.h(),"Got array of images as initalizing parameter. 'imageLocation' property will be ignored."),Array.isArray(e.images)&&e.imageCount&&console.warn(r.h(),"Got array of images as initalizing parameter. 'imageCount' property will be ignored."),!e.showHintOnStartup&&e.hintText&&console.warn(r.h(),"'showHintOnStartup is set to 'false'. 'hintText' parameter will be ignored."),!e.draggable&&e.mouseleaveDetect&&console.warn(r.h(),"'draggable is set to 'false'. 'mouseleaveDetect' parameter will be ignored."),!e.autoplay&&e.autoplaySpeed&&console.warn(r.h(),"'autoplay is set to 'false'. 'autoplaySpeed' parameter will be ignored."),!e.autoplay&&e.stopAutoplayOnMouseenter&&console.warn(r.h(),"'autoplay is set to 'false'. 'stopAutoplayOnMouseenter' parameter will be ignored."),!e.autoplay&&e.resumeAutoplayOnMouseleave&&console.warn(r.h(),"'autoplay is set to 'false'. 'resumeAutoplayOnMouseleave' parameter will be ignored."),!e.autoplay&&e.resumeAutoplayDelay&&console.warn(r.h(),"'autoplay is set to 'false'. 'resumeAutoplayDelay' parameter will be ignored.")},this.validateOptions(e),this.element=e.element,this.images=e.images||"numbered",this.imageFormat=e.imageFormat||void 0,this.imageLocation=e.imageLocation||"./images",this.imageCount=Array.isArray(this.images)?this.images.length:e.imageCount,this.draggable=void 0===e.draggable||e.draggable,this.showHintOnStartup=e.showHintOnStartup||!1,this.hintText=e.hintText||null,this.lazy=e.lazy||!1,this.autoplay=e.autoplay||!1,this.autoplaySpeed=void 0!==e.autoplaySpeed?e.autoplaySpeed:50,this.stopAutoplayOnClick=e.stopAutoplayOnClick||!1,this.stopAutoplayOnMouseenter=e.stopAutoplayOnMouseenter||!1,this.resumeAutoplayOnMouseleave=e.resumeAutoplayOnMouseleave||!1,this.resumeAutoplayDelay=e.resumeAutoplayDelay||0,this.buttons=e.buttons||!1,this.scroll=e.scroll||!1,this.spinner=e.spinner||!1,this.touch=void 0===e.touch||e.touch,this.mousewheel=e.mousewheel||!1,this.wheelInverse=e.wheelInverse||!1,this.inverse=e.inverse||!1,this.dragInterval=e.dragInterval||3.5,this.touchDragInterval=e.touchDragInterval||1,this.mouseleaveDetect=void 0!==e.mouseleaveDetect&&e.mouseleaveDetect,this.verbose=e.verbose||!1,this.imageIndex=1,this.moveBuffer=[],this.moveState=0,this.dragActive=!1,this.intervals=[],this.timeouts=[],this.verbose&&console.log(r.h(this.element),"Class intialized")}return r.h=function(e){return"Tridi"+(e?" ["+e+"]":"")+":"},r.prototype.appendClass=function(e,t){e.className+=0===e.className.length?t:" "+t},r.prototype.addClassName=function(t,e){var i=this;"string"==typeof e?t.classList.contains(e)||this.appendClass(t,e):Array.isArray(e)&&e.forEach(function(e){t.classList.contains(e)||i.appendClass(t,e)})},r.prototype.removeClassName=function(t,e){"string"==typeof e?t.classList.contains(e)&&t.classList.remove(e):Array.isArray(e)&&e.forEach(function(e){t.classList.contains(e)&&t.classList.remove(e)})},r.prototype.getElem=function(e,t){return document.querySelector(this.element+(t?" ":"")+(e||""))},r.prototype.container=function(){return this.getElem()},r.prototype.viewer=function(){return this.getElem(".tridi-viewer")},r.prototype.stash=function(){return this.getElem(".tridi-stash",!0)},r.prototype.leftBtn=function(){return this.getElem(".tridi-btn-left",!0)},r.prototype.rightBtn=function(){return this.getElem(".tridi-btn-right",!0)},r.prototype.getHintOverlay=function(){return this.getElem(".tridi-hint-overlay",!0)},r.prototype.getLoadingScreen=function(){return this.getElem(".tridi-loading",!0)},r.prototype.image=function(e){return this.imgs()[e-1]},r.prototype.firstImage=function(){return this.image(1)},r.prototype.viewerImage=function(){return this.getElem(".tridi-viewer .tridi-viewer-image")},r.prototype.lazyLoad=function(e,t){this.lazy&&!t?(this.viewerImage().addEventListener("click",function(){e()}),this.touch&&this.viewerImage().addEventListener("touchstart",function(){e()})):e()},r.prototype.imgs=function(){if("numbered"!==this.images)return Array.isArray(this.images)?this.images:(console.error(r.h(this.element),"Error getting images from source."),null);var e=this.imageCount,i=this.imageLocation,n=this.imageFormat;return Array.apply(null,{length:e}).map(function(e,t){return i+"/"+(t+1)+"."+n})},r.prototype.generateViewer=function(){var e=this.container();e?(this.verbose&&console.log(r.h(this.element),"Appending Tridi CSS classes"),this.addClassName(e,["tridi-viewer","tridi-viewer-"+this.element.substr(1),"tridi-draggable-"+this.draggable,"tridi-touch-"+this.touch,"tridi-mousewheel-"+this.mousewheel,"tridi-wheelInverse-"+this.wheelInverse,"tridi-showHintOnStartup-"+this.showHintOnStartup,"tridi-lazy-"+this.lazy,"tridi-buttons-"+this.buttons])):console.error(this.element,"Viewer element not found")},r.prototype.generateLoadingScreen=function(){var e=document.createElement("div");e.className="tridi-loading",e.style.display="none";var t=document.createElement("div");t.className="tridi-spinner",e.appendChild(t),this.viewer().appendChild(e)},r.prototype.setLoadingState=function(e){this.getLoadingScreen().style.display=e?"block":"none"},r.prototype.generateStash=function(){if(!this.stash()){this.verbose&&console.log(r.h(this.element),"Generating image stash");var e=document.createElement("div");e.className="tridi-stash",e.style.display="none",this.viewer().appendChild(e)}},r.prototype.displayHintOnStartup=function(n){var o=this;if(this.showHintOnStartup){this.verbose&&console.log(r.h(this.element),"Generating hint on startup");var s=this.element.substr(1),e=document.createElement("div");e.className="tridi-hint-overlay tridi-"+s+"-hint-overlay",e.tabIndex=0;var t=document.createElement("div");t.className+="tridi-hint tridi-"+s+"-hint",this.hintText&&(t.innerHTML='<span class="tridi-hint-text tridi-'+s+'-hint-text">'+this.hintText+"</span>"),e.appendChild(t),this.viewer().appendChild(e);var i=function(e){var t=e.target.classList.contains("tridi-"+s+"-hint-overlay"),i=e.target.classList.contains("tridi-"+s+"-hint");(t||i)&&(o.getHintOverlay().style.display="none",n())};document.addEventListener("click",i),this.touch&&document.addEventListener("touchstart",i),document.addEventListener("keydown",function(e){13===e.which&&i(e)})}else n()},r.prototype.populateStash=function(){var i=this.stash(),e=this.imgs();i&&e?e.forEach(function(e,t){i.innerHTML+='<img src="'+e+'" class="tridi-image-'+(t+1)+'" alt="" />'}):console.error(this.element,"Error populating stash!")},r.prototype.generateViewerImage=function(){this.verbose&&console.log(r.h(this.element),"Generating first image");var e=this.element.substr(1),t=this.viewer(),i=this.firstImage();t.innerHTML='<img src="'+i+'" alt="" class="tridi-viewer-image tridi-viewer-'+e+'-image" draggable="false" />'+t.innerHTML},r.prototype.nextFrame=function(){var e=this.viewerImage();this.imageIndex=this.imageIndex<=1?this.imageCount:this.imageIndex-1,e.src=this.image(this.imageIndex)},r.prototype.prevFrame=function(){var e=this.viewerImage();this.imageIndex=this.imageIndex>=this.imageCount?1:this.imageIndex+1,e.src=this.image(this.imageIndex)},r.prototype.rotateViewerImage=function(e){var t=this,i=e.touches?this.touchDragInterval:this.dragInterval;this.moveState+=1;var n=(e.touches?e.touches[0].clientX:e.clientX)-this.viewerImage().offsetLeft;this.moveBuffer.push(n);var o=this.moveBuffer.length,s=this.moveBuffer[o-2],r=this.moveBuffer[o-1];!(this.moveState%i)&&(r<s?t.inverse?t.prevFrame():t.nextFrame():s<r&&(t.inverse?t.nextFrame():t.prevFrame()))},r.prototype.startDragging=function(){this.addClassName(this.viewer(),"tridi-dragging"),this.dragActive=!0},r.prototype.stopDragging=function(){this.removeClassName(this.viewer(),"tridi-dragging"),this.dragActive=!1},r.prototype.resetMoveBuffer=function(){this.moveBuffer=[]},r.prototype.attachCosmeticEvents=function(){var e=this;this.verbose&&console.log(r.h(this.element),"Attaching common events");var t=this.viewer();t.addEventListener("mouseenter",function(){e.verbose&&console.log(r.h(e.element),"Mouseenter event triggered"),e.addClassName(t,"tridi-viewer-hovered")}),t.addEventListener("mouseleave",function(){e.verbose&&console.log(r.h(e.element),"Mouseleave event triggered"),e.removeClassName(t,"tridi-viewer-hovered")})},r.prototype.attachDragEvents=function(){var t=this;if(this.draggable){var e=this.viewerImage();this.verbose&&console.log(r.h(this.element),"Attaching drag events"),e.addEventListener("mouseup",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Mouseup triggered"),t.stopDragging(),t.resetMoveBuffer()}),e.addEventListener("mousedown",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Mousedown triggered"),t.startDragging(),t.rotateViewerImage(e)}),e.addEventListener("mousemove",function(e){t.dragActive&&(e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Mousemove triggered"),t.rotateViewerImage(e))}),e.addEventListener("mouseleave",function(){t.verbose&&console.log(r.h(t.element),"Mouseleave triggered"),t.resetMoveBuffer()})}},r.prototype.attachMouseLeaveDetection=function(){var e=this;this.mouseleaveDetect&&(this.verbose&&console.log(r.h(this.element),"Attaching mouseleave detection"),this.viewer().addEventListener("mouseleave",function(){e.verbose&&console.log(r.h(e.element),"Viewer mouseleave triggered"),e.stopDragging(),e.resetMoveBuffer()}))},r.prototype.attachTouchEvents=function(){var t=this;if(this.touch){this.verbose&&console.log(r.h(this.element),"Attaching touch events");var e=this.viewerImage();e.addEventListener("touchstart",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Touchstart triggered"),t.startDragging(),t.rotateViewerImage(e)}),e.addEventListener("touchmove",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Touchmove triggered"),t.rotateViewerImage(e)}),e.addEventListener("touchend",function(e){e.preventDefault&&e.preventDefault(),t.verbose&&console.log(r.h(t.element),"Touchend triggered"),t.stopDragging(),t.resetMoveBuffer()})}},r.prototype.attachMousewheelEvents=function(){var t=this;if(this.mousewheel){this.verbose&&console.log(r.h(this.element),"Attaching mousewheel events");var e=this.viewerImage();e.addEventListener("wheel",function(e){e.preventDefault&&e.preventDefault(),0<e.deltaY/120?t.wheelInverse?t.prevFrame():t.nextFrame():t.wheelInverse?t.nextFrame():t.prevFrame()})}},r.prototype.generateButtons=function(){if(this.buttons&&!this.leftBtn()&&!this.rightBtn()){this.verbose&&console.log(r.h(this.element),"Generating buttons");var e=document.createElement("div"),t=document.createElement("div");e.className+="tridi-btn tridi-btn-left",e.setAttribute("tabindex","0"),t.className+="tridi-btn tridi-btn-right",t.setAttribute("tabindex","0"),this.viewer().appendChild(e),this.viewer().appendChild(t)}},r.prototype.attachButtonEvents=function(){var t=this;if(this.buttons){var e=this.leftBtn(),i=this.rightBtn();e&&(this.verbose&&console.log(r.h(this.element),"Attaching left button click event"),e.addEventListener("click",function(){t.verbose&&console.log(r.h(t.element),"Left button click triggered"),t.inverse?t.prevFrame():t.nextFrame()}),e.addEventListener("keydown",function(e){13===e.which&&(t.verbose&&console.log(r.h(t.element),"Left button Enter keydown triggered"),t.inverse?t.prevFrame():t.nextFrame())})),i&&(this.verbose&&console.log(r.h(this.element),"Attaching right button click event"),i.addEventListener("click",function(){t.verbose&&console.log(r.h(t.element),"Right button click triggered"),t.inverse?t.nextFrame():t.prevFrame()}),i.addEventListener("keydown",function(e){13===e.which&&(t.verbose&&console.log(r.h(t.element),"Right button Enter keydown triggered"),t.inverse?t.nextFrame():t.prevFrame())}))}},r.prototype.toggleAutoplay=function(e,t){var i=this,n=this.autoplaySpeed;if(!1===e)this.intervals.forEach(clearInterval),this.intervals=[];else if(this.timeouts.forEach(clearTimeout),this.timeouts=[],t){var o=window.setInterval(function(){i.nextFrame()},n);this.intervals.push(o)}else{var s=window.setTimeout(function(){var e=window.setInterval(function(){i.nextFrame()},n);i.intervals.push(e)},this.resumeAutoplayDelay);this.timeouts.push(s)}},r.prototype.startAutoplay=function(){var t=this;this.autoplay&&(this.verbose&&console.log(r.h(this.element),"Starting autoplay"),this.toggleAutoplay(!0,!0),this.stopAutoplayOnClick&&(this.verbose&&console.log(r.h(this.element),"Enable stop autoplay on click event"),this.viewerImage().addEventListener("mousedown",function(){t.toggleAutoplay(!1)})),this.stopAutoplayOnMouseenter&&(this.verbose&&console.log(r.h(this.element),"Enable stop autoplay on hover event"),this.viewerImage().addEventListener("mouseenter",function(){t.verbose&&console.log(r.h(t.element),"Stopping autoplay on mouseenter"),t.toggleAutoplay(!1)})),this.resumeAutoplayOnMouseleave&&this.viewerImage().addEventListener("mouseleave",function(e){t.verbose&&console.log(r.h(t.element),"Resuming autoplay on mouseleave"),e.target.classList.contains("tridi-btn")||t.toggleAutoplay(!0)}))},r.prototype.start=function(){var e=this;this.generateViewer(),this.generateLoadingScreen(),this.setLoadingState(!0),this.generateViewerImage(),this.setLoadingState(!1),this.displayHintOnStartup(function(){e.lazyLoad(function(){e.setLoadingState(!0),e.generateStash(),e.populateStash(),e.attachCosmeticEvents(),e.attachDragEvents(),e.attachMouseLeaveDetection(),e.attachTouchEvents(),e.attachMousewheelEvents(),e.generateButtons(),e.attachButtonEvents(),e.startAutoplay(),e.setLoadingState(!1)})})},r.prototype.load=function(){this.start()},r}();