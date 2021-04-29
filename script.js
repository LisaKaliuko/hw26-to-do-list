'use strict';

const buttonsController = function() {
    if( event.target.matches('.add') ) {
        addElement();
    } else if( event.target.matches('.delete') ) {
        deleteElement();
    } else if( event.target.matches('.edit') ) {
        editElement();
    } else if( event.target.matches('.save') ) {
        saveChanges();
    }
}

const addElement = function() {
    const input = event.target.previousElementSibling;
    const ul = event.target.nextElementSibling;
    
    if(input.value === '') {
        alert('Field is empty!');
    } else if( findReplays(input.value) ) {
        alert('You already have it in your list!');
    } else {
        const li = document.createElement('li');
        li.innerHTML = `<span>${input.value}</span>`;
        ul.append(li);
        input.value = '';

        const editInput = document.createElement('input');
        editInput.className = 'hidden editInput';
        li.append(editInput);

        const buttonSave = document.createElement('button');
        buttonSave.className = 'save hidden';
        buttonSave.innerText = 'Save';
        li.append(buttonSave);

        const buttonDelete = document.createElement('button');
        buttonDelete.className = 'delete';
        buttonDelete.innerText = 'Delete';
        li.append(buttonDelete);

        const buttonEdit = document.createElement('button');
        buttonEdit.className = 'edit';
        buttonEdit.innerText = 'Edit';
        li.append(buttonEdit);
    } 
};

const deleteElement = function() {
    event.target.parentElement.remove();
};

const editElement = function() {
    const buttonEdit = event.target;
    const buttonDelete = buttonEdit.previousElementSibling;
    const buttonSave = buttonDelete.previousElementSibling;
    const editInput = buttonSave.previousElementSibling;

    editInput.classList.remove('hidden');
    buttonSave.classList.remove('hidden');
    buttonDelete.classList.add('hidden');
    buttonEdit.classList.add('hidden');
};

const saveChanges = function() {
    const buttonSave = event.target;
    const buttonDelete = buttonSave.nextElementSibling;
    const buttonEdit = buttonDelete.nextElementSibling;
    const editInput = buttonSave.previousElementSibling;

    if(editInput.value === '') {
        alert('Field is empty!');
    } else {
        buttonSave.parentElement.firstElementChild.innerText = editInput.value;
        
        editInput.classList.add('hidden');
        buttonSave.classList.add('hidden');
        buttonDelete.classList.remove('hidden');
        buttonEdit.classList.remove('hidden');
    }
}

const findReplays = function(value) {
    const element = value;
    const arrOfElements = [];
    
    (Array.from(event.target.nextElementSibling.children)).forEach((item) => {
        arrOfElements.push(item.firstElementChild.innerText);
    });

    return arrOfElements.includes(element);
}

document.addEventListener('click', buttonsController);