const addButton = document.getElementById("footer--btn");
const renameButton = document.querySelector(".rename--btn");
const copyButton = document.querySelector(".copy--btn");
const removeButton = document.querySelector(".remove--btn");
//-----------------------------------------------------------

const searchInput = document.getElementById("app--search");
const searchButton = document.querySelector(".btn--search");

//-----------------------------------------------------------

const contentLists = document.getElementById("app---content-lists");
const contentList = document.querySelector(".content-list");
const elemntList = document.querySelector(".list--element");

//-----------------------------------------------------------

const backDrop = document.getElementById("backdrop");
const modal = document.getElementById("add-modal");
const cancelAddTask = modal.querySelector(".btn--passive");
const taskInput = modal.querySelector('input')
const addTaskBtn = cancelAddTask.nextElementSibling;

//-----------------------------------------------------------

let tasks = [];


const removeFunc = (event)=>{
    const elementToRemove = event.target.closest('li');
    elementToRemove.remove()
};




const createLi = function (text) {
  const li = document.createElement("li");
  const contentLi = elemntList.cloneNode(true);
  contentLi
    .querySelector(".list--element-content")
    .querySelector("p").textContent = text;
  li.appendChild(contentLi);
  contentLists.append(li)
  const removeButton = contentLi.querySelector(".remove--btn");
  removeButton.addEventListener('click', removeFunc);
};

const clearInput = () => {
    taskInput.value = '';
}



const addTasks = () =>{
    if(taskInput.value.trim() === ''){
        alert('add some text')
        return;
    }
    const textContent = taskInput.value;
    const newTask = {
        id: Math.random().toString(),
        task : textContent,
    }
    tasks.push(newTask);
    createLi(newTask.id,newTask.task);
    clearInput()
    modalHandler()
}


const backDropHandler = () => {
  backDrop.classList.toggle("visible");
};

const modalHandler = () => {
  modal.classList.toggle("visible");
  backDropHandler();
};

const cancelTaskHandler = () => {
  modalHandler()
};

addButton.addEventListener("click", () => modalHandler());
backDrop.addEventListener("click", modalHandler);
cancelAddTask.addEventListener("click", cancelTaskHandler);
addTaskBtn.addEventListener('click', addTasks);
removeButton.addEventListener('click', removeFunc);
copyButton.addEventListener('click', (event)=>{
    const elementToCopy = event.target.closest('li');
    const newLi = elementToCopy.cloneNode(true);
    newLi.querySelector('.remove--btn').addEventListener('click',removeFunc)
    contentLists.appendChild(newLi);
})

renameButton.addEventListener('click',(event)=>{
    const textOutput = prompt('Rename')
    console.log(textOutput)
    const referenceNode = event.target.closest('div');
    referenceNode.previousElementSibling.querySelector('p').textContent = textOutput
})