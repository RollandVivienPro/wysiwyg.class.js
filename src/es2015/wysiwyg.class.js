"use strict";

function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

var Wysiwyg =
    /*#__PURE__*/
    function () {
        function Wysiwyg(textarea) {
            var _this$baseBtns;

            var elems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            _classCallCheck(this, Wysiwyg);

            if (textarea.type !== 'textarea') {
                throw new TypeError('Object must be a textarea');
            }

            if (!Array.isArray(elems)) {
                throw new TypeError('elems must be an array');
            }

            this.baseBtns = [{
                icon: '<i class="fas fa-undo"></i>',
                cmd: 'undo'
            }, {
                icon: '<i class="fas fa-redo"></i>',
                cmd: 'redo'
            }, {
                class: 'v-wysiwyg-toggle-code',
                icon: '<i class="fas fa-glasses"></i>'
            }];

            (_this$baseBtns = this.baseBtns).splice.apply(_this$baseBtns, [2, 0].concat(_toConsumableArray(elems)));

            this.textarea = textarea;
            this.container = document.createElement('div');
            this.container.setAttribute('class', 'v-wysiwyg-container');
            this.box = document.createElement('div');
            this.box.setAttribute('class', 'v-wysiwyg-text');
            this.box.setAttribute('contentEditable', true);
            this.menu = document.createElement('div');
            this.menu.setAttribute('class', 'v-wysiwyg-menu');
            this.viewSource = true;
            this.createWrapper();
        }

        _createClass(Wysiwyg, [{
            key: "createWrapper",
            value: function createWrapper() {
                var _this = this;

                this.textarea.parentNode.insertBefore(this.container, this.textarea);
                this.container.appendChild(this.textarea);
                this.textarea.style.display = "none";
                this.textarea.parentNode.insertBefore(this.box, this.textarea);
                this.box.parentNode.insertBefore(this.menu, this.box);
                this.box.innerHTML = this.textarea.value;
                this.allBtns = [];
                this.baseBtns.forEach(function (elem) {
                    var btn = document.createElement('button');

                    if (elem.class == undefined) {
                        btn.setAttribute('class', 'v-wysiwyg-btn');
                    } else {
                        btn.setAttribute('class', elem.class);
                    }

                    btn.addEventListener('click', function (e) {
                        e.preventDefault();

                        if (elem.cmd !== undefined) {
                            _this._execCommand(elem.cmd);

                            _this.box.focus();

                            _this.textarea.value = _this.box.innerHTML;
                        }
                    });
                    btn.innerHTML = elem.icon;

                    _this.allBtns.push(btn);

                    _this.menu.appendChild(btn);
                });
                this.createBtnListeners();
                this.createBoxListeners();
            }
        }, {
            key: "createBtnListeners",
            value: function createBtnListeners() {
                var _this2 = this;

                this.allBtns.forEach(function (element) {
                    if (element.classList.contains('v-wysiwyg-toggle-code')) {
                        element.addEventListener('click', function (e) {
                            e.preventDefault();

                            if (true === _this2.viewSource) {
                                _this2.viewSource = false;
                                var contents = _this2.box.innerHTML;
                                _this2.box.style.display = "none";
                                _this2.textarea.value = contents;
                                _this2.textarea.style.display = "block";
                            } else {
                                _this2.viewSource = true;
                                var _contents = _this2.textarea.value;
                                _this2.textarea.style.display = "none";
                                _this2.box.innerHTML = _contents;
                                _this2.box.style.display = "block";
                            }
                        });
                    }
                });
            }
        }, {
            key: "createBoxListeners",
            value: function createBoxListeners() {
                var _this3 = this;

                document.execCommand("defaultParagraphSeparator", false, "p");
                this.box.addEventListener('keydown', function () {
                    var text = _this3.box.innerHTML.replace(/(<([^>]+)>)/ig, "");

                    if (text.length == 1) {
                        _this3.box.innerHTML = '<p>' + text + '</p>';
                        var range = document.createRange();
                        var sel = window.getSelection();
                        range.setStart(_this3.box.querySelector('p'), 1);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                });
            }
        }, {
            key: "_execCommand",
            value: function _execCommand(cmd) {
                var val = false;

                switch (cmd) {
                    case 'formatBlock':
                        val = 'blockquote';
                        break;

                    case 'createLink':
                        val = prompt("Entrez l'URL du lien :");
                        break;

                    case 'insertImage':
                        val = prompt("Entrez l'URL de l'image :");
                        break;
                }

                document.execCommand(cmd, false, val);
                return true;
            }
        }]);

        return Wysiwyg;
    }();