

const Keyboard_numbers = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "" 
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".import-number-keyboard").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                    element.focus();
                });
            });  
        });
        document.querySelectorAll(".import-usual-keyboard").forEach(element => {
            element.addEventListener("focus", () => {
                this.close();
            });  
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout = [
            "-", "7", "8", "9", "/", "4", "5", "6",":",  "1", "2", "3", ".", "0", "done","backspace" 
        ]; 
        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["9", "6", "3"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    }); 
                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();
                    keyElement.style.width = "12%";  
                    keyElement.addEventListener("click", () => {
                        this.properties.value += (this.properties.capsLock || this.properties.shift)? key.toUpperCase() : key.toLowerCase();
                        if (this.properties.shift == true) {  
                            this._toggleShift();
                        };
                        this._triggerEvent("oninput"); 
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        }); 
        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },
 
    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
        let tmpelem = document.createElement('div');
        tmpelem.setAttribute('id', 'tmp_elem_forkeyboard');  
        document.getElementById('right-panel').appendChild(tmpelem); 
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
        document.getElementById('tmp_elem_forkeyboard').remove(); 
    },
};
 
 
const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: [],
    },

    eventHandlers: {
        oninput: null,
        onclose: null,
    },

    properties: {
        value: '',
        capsLock: false,
        shift: false,
        myRuLang: false,
    },

    keyLayout: [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",  "-", "=", "backspace", "tab",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]","\\",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";", `"`, "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","done",
            ".com","language","space" //, "left","right",
        ],

    keyLayoutRu: [
            "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",  "-", "=", "backspace", "tab",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","\\",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж", `э`, "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".","done",
            ".com","language","space" //, "left","right",
        ],
   
    keyLayout_shift: [
            "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")",  "_", "+", "backspace", "tab",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}","|",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",":", `'`, "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","done",
            ".com","language","space" //, "left","right",
        ],

    keyLayoutRu_shift: [
            "`", "1", "\"", "№", ";", "%", ":", "?", "*", "(", ")",  "_", "+", "backspace", "tab",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","/",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж", `э`, "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ",","done",
            ".com","language","space" //, "left","right",
        ],
        

    init() {
        // Create main elements
        this.elements.main = document.createElement('div');
        this.elements.keysContainer = document.createElement('div');

        // Setup main elements
        this.elements.main.classList.add('keyboard', 'keyboard--hidden');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(
            '.keyboard__key'
        );

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll('.import-usual-keyboard').forEach((element) => {
            element.addEventListener('focus', () => {
                this.open(element.value, (currentValue) => {
                    element.value = currentValue;
                    element.focus();
                });
            });
        });

        document.querySelectorAll(".import-number-keyboard").forEach(element => {
            element.addEventListener("focus", () => {
                this.close();
            });  
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayout =  [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",  "-", "=", "backspace", "tab",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]","\\",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l",";", `"`, "enter",
        "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?","done",
        ".com","language","space" //, "left","right",
    ];

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach((key) => {
            const keyElement = document.createElement('button');
            const insertLineBreak =
                ['backspace', '\\', 'enter', 'done'].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute('type', 'button');
            keyElement.classList.add('keyboard__key');

            switch (key) {
                case 'backspace':
                    keyElement.classList.add('keyboard__key--wide');
                  //  keyElement.classList.add('ti-check-box');
                    keyElement.innerHTML = createIconHTML('backspace');

                    keyElement.addEventListener('click', () => {
                        this.properties.value = this.properties.value.substring(
                            0,
                            this.properties.value.length - 1
                        );
                        this._triggerEvent('oninput');
                    });

                    break;

                case 'caps':
                    keyElement.classList.add(
                        'keyboard__key--wide',
                        'keyboard__key--activatable'
                    );
                    keyElement.innerHTML = createIconHTML('keyboard_capslock');

                    keyElement.addEventListener('click', () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle(
                            'keyboard__key--active',
                            this.properties.capsLock
                        );
                    });
                    break;

                case 'enter':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_return');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\n';
                        this._triggerEvent('oninput');
                    });

                    break;

                case 'tab':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('keyboard_tab');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '\t';
                        this._triggerEvent('oninput');
                    }); 
                    break;

                case '.com':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value += '.com';
                        this._triggerEvent('oninput');
                    });

                    break;

                case 'shift':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this._toggleShift();
                    });
                    break;

                case 'language':
                    keyElement.classList.add('keyboard__key--wide');
                    keyElement.innerHTML = createIconHTML('language');

                    keyElement.addEventListener('click', () => {
                        this._toggleLang();
                    });
                    break;

                case 'space':
                    keyElement.classList.add('keyboard__key--extra-wide');
                    keyElement.innerHTML = createIconHTML('space_bar');

                    keyElement.addEventListener('click', () => {
                        this.properties.value += ' ';
                        this._triggerEvent('oninput');
                    });

                    break;

                case 'done':
                    keyElement.classList.add(
                        'keyboard__key--wide',
                        'keyboard__key--dark'
                    );
                    keyElement.innerHTML = createIconHTML('check_circle');

                    keyElement.addEventListener('click', () => {
                        this.close();
                        this._triggerEvent('onclose');
                    });

                    break;

                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener('click', () => {
                        this.properties.value +=
                            this.properties.capsLock || this.properties.shift
                                ? key.toUpperCase()
                                : key.toLowerCase();
                        if (this.properties.shift == true) {
                            this._toggleShift();
                        }
                        this._triggerEvent('oninput');
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement('br'));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == 'function') {
            this.eventHandlers[handlerName](this.properties.value);
            this.properties.shift = false;
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (
                key.childElementCount === 0 &&
                key.textContent != 'shift' &&
                key.textContent != '.com'
            ) {
                key.textContent = this.properties.capsLock
                    ? key.textContent.toUpperCase()
                    : key.textContent.toLowerCase();
            }
        }
    },

    _toggleLang() {
        this.properties.myRuLang = !this.properties.myRuLang;
        let i = 0;
        for (const key of this.elements.keys) { 
            if (
                key.childElementCount === 0 &&
                key.textContent != 'shift' &&
                key.textContent != 'keyboard_capslock' &&
                key.textContent != 'keyboard_tab' &&
                key.textContent != 'shift' &&
                key.textContent != 'language' &&
                key.textContent != 'keyboard_return' &&
                key.textContent != 'space_bar' &&
                key.textContent != 'check_circle' &&
                key.textContent != '.com'
            ) {
                if (this.properties.myRuLang)
                    key.textContent = this.keyLayoutRu[i];
                else key.textContent = this.keyLayout[i];
            }

            i += 1;
        }
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        let i = 0;

        for (const key of this.elements.keys) {
            if (
                key.childElementCount === 0 &&
                key.textContent != 'shift' &&
                key.textContent != '.com'
            ) {
                if (this.properties.shift) {
                    if (this.properties.myRuLang)
                        key.textContent = this.keyLayoutRu_shift[i];
                    else key.textContent = this.keyLayout_shift[i];
                    if (key.childElementCount === 0)
                        key.textContent.toUpperCase();

                    key.textContent = key.textContent.toUpperCase();
                } else {
                    if (this.properties.myRuLang)
                        key.textContent = this.keyLayoutRu[i];
                    else key.textContent = this.keyLayout[i];
                }
            }
            i += 1;
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove('keyboard--hidden');
        
        let tmpelem = document.createElement('div');
        tmpelem.setAttribute('id', 'tmp_elem_forkeyboard');  
        document.getElementById('right-panel').appendChild(tmpelem); 
    },

    close() {
        this.properties.value = '';
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add('keyboard--hidden');
        document.getElementById('tmp_elem_forkeyboard').remove(); 
    },
}; 


window.addEventListener("DOMContentLoaded", function () {
    Keyboard_numbers.init();
    Keyboard.init();
});