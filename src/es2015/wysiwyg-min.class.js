"use strict";function _instanceof(e,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?t[Symbol.hasInstance](e):e instanceof t}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,a=new Array(e.length);t<e.length;t++)a[t]=e[t];return a}}function _classCallCheck(e,t){if(!_instanceof(e,t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,t,a){return t&&_defineProperties(e.prototype,t),a&&_defineProperties(e,a),e}var Wysiwyg=function(){function e(t){var a,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(_classCallCheck(this,e),"textarea"!==t.type)throw new TypeError("Object must be a textarea");if(!Array.isArray(n))throw new TypeError("elems must be an array");this.baseBtns=[{icon:'<i class="fas fa-undo"></i>',cmd:"undo"},{icon:'<i class="fas fa-redo"></i>',cmd:"redo"},{class:"v-wysiwyg-toggle-code",icon:'<i class="fas fa-glasses"></i>'}],(a=this.baseBtns).splice.apply(a,[2,0].concat(_toConsumableArray(n))),this.textarea=t,this.container=document.createElement("div"),this.container.setAttribute("class","v-wysiwyg-container"),this.box=document.createElement("div"),this.box.setAttribute("class","v-wysiwyg-text"),this.box.setAttribute("contentEditable",!0),this.menu=document.createElement("div"),this.menu.setAttribute("class","v-wysiwyg-menu"),this.viewSource=!0,this.createWrapper()}return _createClass(e,[{key:"createWrapper",value:function(){var e=this;this.textarea.parentNode.insertBefore(this.container,this.textarea),this.container.appendChild(this.textarea),this.textarea.style.display="none",this.textarea.parentNode.insertBefore(this.box,this.textarea),this.box.parentNode.insertBefore(this.menu,this.box),this.box.innerHTML=this.textarea.value,this.allBtns=[],this.baseBtns.forEach(function(t){var a=document.createElement("button");null==t.class?a.setAttribute("class","v-wysiwyg-btn"):a.setAttribute("class",t.class),a.addEventListener("click",function(a){a.preventDefault(),void 0!==t.cmd&&(e._execCommand(t.cmd),e.box.focus(),e.textarea.value=e.box.innerHTML)}),a.innerHTML=t.icon,e.allBtns.push(a),e.menu.appendChild(a)}),this.createBtnListeners(),this.createBoxListeners()}},{key:"createBtnListeners",value:function(){var e=this;this.allBtns.forEach(function(t){t.classList.contains("v-wysiwyg-toggle-code")&&t.addEventListener("click",function(t){if(t.preventDefault(),!0===e.viewSource){e.viewSource=!1;var a=e.box.innerHTML;e.box.style.display="none",e.textarea.value=a,e.textarea.style.display="block"}else{e.viewSource=!0;var n=e.textarea.value;e.textarea.style.display="none",e.box.innerHTML=n,e.box.style.display="block"}})})}},{key:"createBoxListeners",value:function(){var e=this;document.execCommand("defaultParagraphSeparator",!1,"p"),this.box.addEventListener("keydown",function(){var t=e.box.innerHTML.replace(/(<([^>]+)>)/gi,"");if(1==t.length){e.box.innerHTML="<p>"+t+"</p>";var a=document.createRange(),n=window.getSelection();a.setStart(e.box.querySelector("p"),1),a.collapse(!0),n.removeAllRanges(),n.addRange(a)}})}},{key:"_execCommand",value:function(e){var t=!1;switch(e){case"formatBlock":t="blockquote";break;case"createLink":t=prompt("Entrez l'URL du lien :");break;case"insertImage":t=prompt("Entrez l'URL de l'image :")}return document.execCommand(e,!1,t),!0}}]),e}();