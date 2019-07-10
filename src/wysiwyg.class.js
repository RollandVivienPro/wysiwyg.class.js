"use strict";

class Wysiwyg {

    constructor(textarea, elems = []) {

        if (textarea.type !== 'textarea') {
            throw new TypeError('Object must be a textarea');
        }


        if (!Array.isArray(elems)) {
            throw new TypeError('elems must be an array');
        }

        this.baseBtns = [{
                icon: '<i class="fas fa-undo"></i>',
                cmd: 'undo'
            },
            {
                icon: '<i class="fas fa-redo"></i>',
                cmd: 'redo'
            }, 
            {
                class: 'v-wysiwyg-toggle-code',
                icon: '<i class="fas fa-glasses"></i>'
            }
        ];

        this.baseBtns.splice(2, 0, ...elems);

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

    createWrapper() {

        this.textarea.parentNode.insertBefore(this.container, this.textarea);
        this.container.appendChild(this.textarea);

        this.textarea.style.display = "none";
        this.textarea.parentNode.insertBefore(this.box, this.textarea);
        this.box.parentNode.insertBefore(this.menu, this.box);
        this.box.innerHTML = this.textarea.value;

        this.allBtns = [];
        this.baseBtns.forEach((elem) => {
            let btn = document.createElement('button');
            if (elem.class == undefined) {
                btn.setAttribute('class', 'v-wysiwyg-btn');
            } else {
                btn.setAttribute('class', elem.class);
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (elem.cmd !== undefined) {
                    this._execCommand(elem.cmd);
                    this.box.focus();
                    this.textarea.value = this.box.innerHTML;
                }
            });

            btn.innerHTML = elem.icon;
            this.allBtns.push(btn);
            this.menu.appendChild(btn);

        });

        this.createBtnListeners();
        this.createBoxListeners();

    }

    createBtnListeners() {
        this.allBtns.forEach(element => {

            if (element.classList.contains('v-wysiwyg-toggle-code')) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (true === this.viewSource) {
                        this.viewSource = false;
                        let contents = this.box.innerHTML;
                        this.box.style.display = "none";
                        this.textarea.value = contents;
                        this.textarea.style.display = "block";
                    } else {
                        this.viewSource = true;
                        let contents = this.textarea.value;
                        this.textarea.style.display = "none";
                        this.box.innerHTML = contents;
                        this.box.style.display = "block";
                    }
                });
            }

        });
    }

    createBoxListeners(){
        document.execCommand("defaultParagraphSeparator", false, "p");
        this.box.addEventListener('keydown',() => {
            let text = this.box.innerHTML.replace(/(<([^>]+)>)/ig, "");
            if(text.length==1){
                this.box.innerHTML = '<p>'+text+'</p>';
                let range = document.createRange();
                let sel = window.getSelection();
                range.setStart(this.box.querySelector('p'), 1);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        });
    }


    _execCommand(cmd) {
        let val = false;
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


}