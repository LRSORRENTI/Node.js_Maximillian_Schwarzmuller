class NameField {
    constructor(name) {
        const field = document.createElement('li')
        field.textContent = name;
        const nameListHook = document.querySelector('#names')
        nameListHook.appendChild(field);
    }
}

class nameGenerator {
    constructor() {
        const btn = document.querySelector('button');
        btn.addEventListener('click', () => {

        })
    }
        addName() {
            const name = new NameField("luke")
        
    }
}
const gen = new nameGenerator();

