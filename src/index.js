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

//----------------------------------------------------------- Main logic function

const tasks = [
  {
    id:`${Math.random()}`,
    task: "ma duc sa ma plimb",
  },
];

const taskUi = [];



const appendUi = (refli) => {
  contentLists.appendChild(refli);
};

const renderUI = () => {
  if (tasks.length === 0) {
    console.log("nu sunt elemente");
    return;
  }
  if (tasks.length > 0) {
    tasks.forEach((elem) => {
      createLiRef(elem);
    });
    taskUi.forEach((elem) => appendUi(elem.taskUi));
  }
};

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
  li.classList = `content-list`;
  div.classList = "list--element";
  removeButton1.classList = "remove--btn";
  renameButton1.classList = "rename--btn";
  copyButton1.classList = "copy--btn";

  cehckButton.appendChild(checkImg);
  removeButton1.appendChild(removeImg);
  renameButton1.appendChild(renameImg);
  copyButton1.appendChild(copyImg);

  cehckButton.addEventListener('click', checkFunc);
  removeButton1.addEventListener("click", removeFunc);
  renameButton1.addEventListener("click", renameFunc);
  copyButton1.addEventListener("click", copyFunc);

  listElementContent.append(cehckButton, p);
  listElementBtns.append(renameButton1, copyButton1, removeButton1);
  div.append(listElementContent, listElementBtns);
  li.appendChild(div);
  li.setAttribute("data-id", elem.id);
  li.setAttribute('draggable', true);
  taskUi.push({
    id: elem.id,
    taskUi: li,
  });
  return li;
};


//----------------------------------------------------------- helpul function

const clearInput = () => {
  taskInput.value = "";
};

const connectDrag = ()=>{
    li.addEventListener('dragstart',event=>{
      event.dataTransfer.setData('text/plain', elem.id);
      event.dataTransfer.effectAllowed = 'move';
    })
}


const connectDropArea = () =>{
 contentLists.addEventListener('dragenter', event=> event.preventDefault());
 contentLists.addEventListener('dragover', event=> event.preventDefault());
}


//----------------------------------------------------------- button function
const removeFunc = (event) => {
  const elementToRemove = event.target.closest("li");
  const dataId = elementToRemove.getAttribute('data-id');
  const arrId = tasks.findIndex(el=> el.id === dataId);
  const arrUiId = tasks.findIndex(el =>el.id === dataId);
  taskUi.splice(arrUiId, 1),
  tasks.splice(arrId);
  elementToRemove.remove();
};

const copyFunc = (event) => {
  const elementToCopy = event.target.closest("li");
  const newLi = elementToCopy.cloneNode(true);
  const dataId = Math.random();
  newLi.setAttribute('data-id',`${dataId}`)
  const textOfNewLi = newLi.querySelector('p').textContent;
  tasks.push({id:`${dataId}`, task: textOfNewLi});
  taskUi.push({id:`${dataId}`,taskUi: newLi});
  newLi.querySelector(".remove--btn").addEventListener("click", removeFunc);
  newLi.querySelector(".rename--btn").addEventListener("click", renameFunc);
  newLi.querySelector(".copy--btn").addEventListener("click", copyFunc);
  contentLists.appendChild(newLi);
};

const renameFunc = (event) => {
  const textOutput = prompt("Rename");
  if (textOutput.trim() === "" && textOutput === null) {
    return;
  }
  const referenceNode = event.target.closest("div");
  const referenceLi = event.target.closest('li');
  const idLi = referenceLi.getAttribute('data-id');
  tasks.forEach(el=>{if(el.id === idLi){
    el.task = textOutput;
  }})
  referenceNode.previousElementSibling.querySelector("p").textContent = textOutput;
  
};


const checkFunc = (event)=>{
  const elementToCopy = event.target.closest("li");
  const paragraph = elementToCopy.querySelector('p');
  paragraph.classList.toggle('complete');
}


const search = (event) => {
  const ref = event.target.closest("span").previousElementSibling;
  if(ref.value.trim() !== ''){
    const referenceValue = taskUi.filter((item) => {
      return !item.taskUi.querySelector('p').textContent.toLowerCase().includes(ref.value.toLowerCase().trim());
    });
    referenceValue.map((el) => {
      el.taskUi.remove();
    });
    ref.value = "";
  }else{
    taskUi.forEach((elem) => appendUi(elem.taskUi));
  }
};
//----------------------------------------------------------- Add task function

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
  const li = createLiRef(newTask);
  appendUi(li);
  clearInput();
  modalHandler();
};

//----------------------------------------------------------- Other function

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

searchButton.addEventListener("click", search);

//-----------------------------------------------------------Creating li and work with add btn and modal
