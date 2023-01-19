
const imageMouseOver = (event) => {
        const imageTarget = event.target;
        imageTarget.src = "./image/button_active.svg";
}

const imageMouseOut = (event) => {
        const imageTarget = event.target;
        imageTarget.src = "./image/button.svg";
}

const imageMouseClick = (event) => {
        const liTarget = event.target;
        liTarget.parentNode.remove();
}

const AddElement = (txt) => {
        const newClone = liClone.cloneNode(true);
        if (typeof(txt) === "string") {
                const input = newClone.querySelector('input');
                input.value = txt;
        }
        ul.append(newClone);
        // console.log();
        ul.lastChild.children[0].focus();
        const images = document.getElementsByClassName('image');
        for (let elem of images) {
                elem.addEventListener('mouseover', imageMouseOver)
                elem.addEventListener('mouseout', imageMouseOut)
                elem.addEventListener('click', imageMouseClick)
        }
}

const renderList = (event) => {
        const inputs = document.querySelectorAll('.input');
        const li = document.querySelectorAll('.li');
        for (let elem of li) elem.remove();

        const inputsValue = [];
        for (let i=0; i<inputs.length; i++) {
                inputsValue.push(inputs[i].value);
        }
        (renderDirection > 0) 
                ? inputsValue.sort((a,b) => {return a.localeCompare(b, 'en', { sensitivity: 'base' })}) 
                : inputsValue.sort((a,b) => {return a.localeCompare(b, 'en', { sensitivity: 'base' })}).reverse();
        renderDirection = -renderDirection; 
        renderMouseOver(event);
        for (let i=0; i<inputsValue.length; i++) {
                AddElement(inputsValue[i]);
        }
}

const renderMouseOver = (event) => {
        const imageTarget = event.target;
        (renderDirection > 0) ? imageTarget.src = "./image/sort_acs_active.svg" : imageTarget.src = "./image/sort_desc_active.svg";
}

const renderMouseOut = (event) => {
        const imageTarget = event.target;
        (renderDirection < 0) ? imageTarget.src = "./image/sort_acs_passive.svg" : imageTarget.src = "./image/sort_desc_passive.svg";
}

const ul = document.querySelector('ul');
var liClone = ul.children[0].cloneNode(true);
ul.children[0].remove();

AddElement();

const imageAddElement = document.querySelector('.imageAddElement');
imageAddElement.addEventListener('click', AddElement);

var renderDirection = 1;
const render = document.querySelector('.render');
render.addEventListener('click', renderList);
render.addEventListener('mouseover', renderMouseOver);
render.addEventListener('mouseout', renderMouseOut);

const container = document.querySelector('.container');
container.addEventListener('keyup', (event) => { if (event.keyCode == 13) {AddElement()} });

let dragged;

const dragList = document.querySelector('.dragList');
dragList.addEventListener('dragstart', event => {
    dragged = event.target;
}, false);

container.addEventListener('drop', event => {
        event.preventDefault();
        AddElement(dragged.textContent);
}, false);

document.addEventListener('dragover', event => event.preventDefault(), false);
