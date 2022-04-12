const addButton = document.getElementById("footer--btn");
//-----------------------------------------------------------

const searchButton = document.querySelector(".btn--search");

//-----------------------------------------------------------

const contentLists = document.getElementById("app---content-lists");
const contentList = document.querySelector(".content-list");
const elemntList = document.querySelector(".list--element");

//-----------------------------------------------------------

const backDrop = document.getElementById("backdrop");
const modal = document.getElementById("add-modal");
const cancelAddTask = modal.querySelector(".btn--passive");
const taskInput = modal.querySelector("input");
const addTaskBtn = cancelAddTask.nextElementSibling;

//-----------------------------------------------------------

let tasks = [
  {
    id: Math.random().toString(),
    task: 'ma duc sa ma plimb',
  },
];

//-----------------------------------------------------------

//search function

//-----------------------------------------------------------
const removeFunc = (event) => {
  const elementToRemove = event.target.closest("li");
  elementToRemove.remove();
};

const copyFunc = (event) => {
  const elementToCopy = event.target.closest("li");
  const newLi = elementToCopy.cloneNode(true);
  newLi.querySelector(".remove--btn").addEventListener("click", removeFunc);
  newLi.querySelector(".rename--btn").addEventListener("click", renameFunc);
  newLi.querySelector(".copy--btn").addEventListener("click", copyFunc);
  contentLists.appendChild(newLi);
};

const renameFunc = (event) => {
  const textOutput = prompt("Rename");
  if (textOutput.trim() === "") {
    return;
  }
  const referenceNode = event.target.closest("div");
  referenceNode.previousElementSibling.querySelector("p").textContent =
    textOutput;
};
//----------------------------------------------------------- Functional for Event Btn


const clearInput = () => {
  taskInput.value = "";
};


const search = (event) => {
  const ref = event.target.closest('span').previousElementSibling
  console.log(ref.value);
  tasks.forEach(task => )
}


const renderUI = ()=> {
if(tasks.length === 0){
  return console.log('nu sunt elemente')
}
tasks.forEach((elem)=>{
  createLiRef(elem);
})
}

const createLiRef = (elem) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const img = document.createElement("img");
  const p = document.createElement("p");

  const checkImg = img.cloneNode(true);
  const removeImg = img.cloneNode(true);
  const renameImg = img.cloneNode(true);
  const copyImg = img.cloneNode(true);

  checkImg.setAttribute("src", "./style/check.svg");
  removeImg.setAttribute("src", "../style/remove.svg");
  renameImg.setAttribute("src", "./style/rename.svg");
  copyImg.setAttribute("src", "./style/copy.svg");

  p.textContent = elem.task;

  const cehckButton = span.cloneNode(true);
  const removeButton1 = span.cloneNode(true);
  const renameButton1 = span.cloneNode(true);
  const copyButton1 = span.cloneNode(true);

  const listElementContent = div.cloneNode(true);
  const listElementBtns = div.cloneNode(true);

  listElementContent.classList = "list--element-content";
  listElementBtns.classList = "list--element-btn";
  li.classList = "content-list";
  div.classList = "list--element";
  removeButton1.classList = "remove--btn";
  renameButton1.classList = "rename--btn";
  copyButton1.classList = "copy--btn";

  cehckButton.appendChild(checkImg);
  removeButton1.appendChild(removeImg);
  renameButton1.appendChild(renameImg);
  copyButton1.appendChild(copyImg);

  removeButton1.addEventListener("click", removeFunc);
  renameButton1.addEventListener("click", renameFunc);
  copyButton1.addEventListener("click", copyFunc);

  listElementContent.append(cehckButton, p);
  listElementBtns.append(renameButton1, copyButton1, removeButton1);
  div.append(listElementContent, listElementBtns);
  li.appendChild(div);
  contentLists.appendChild(li);
  console.log(li);
};



const addTasks = () => {
  if (taskInput.value.trim() === "") {
    alert("add some text");
    return;
  }
  const textContent = taskInput.value;
  const newTask = {
    id: Math.random().toString(),
    task: textContent,
  };
  tasks.push(newTask);
  createLiRef(newTask)
  clearInput();
  modalHandler();
};

const backDropHandler = () => {
  backDrop.classList.toggle("visible");
};

const modalHandler = () => {
  modal.classList.toggle("visible");
  backDropHandler();
};

const cancelTaskHandler = () => {
  modalHandler();
};

addButton.addEventListener("click", () => modalHandler());
backDrop.addEventListener("click", modalHandler);
cancelAddTask.addEventListener("click", cancelTaskHandler);
addTaskBtn.addEventListener("click", addTasks);
renderUI();

searchButton.addEventListener('click',search)

//-----------------------------------------------------------Creating li and work with add btn and modal

