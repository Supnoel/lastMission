const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let pendingToDoArray = [];
let finishedToDoArray = [];

function loadList() {
  const loadPendList = localStorage.getItem(PENDING_LS);
  const loadFinishList = localStorage.getItem(FINISHED_LS);

  if (loadFinishList !== null) {
    const parsedFinishedToDoList = JSON.parse(loadFinishList);
    parsedFinishedToDoList.forEach(function (toDo) {
      paintFinishList(toDo.text);
    });
  }

  if (loadPendList !== null) {
    const parsedPendingToDoList = JSON.parse(loadPendList);
    parsedPendingToDoList.forEach(function (toDo) {
      paintToDoList(toDo.text);
    });
  }
}

function deletePendingToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanPendingArray = pendingToDoArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDoArray = cleanPendingArray;
  saveToDoList();
}

function deleteFinishedToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanFinishedArray = finishedToDoArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDoArray = cleanFinishedArray;
  saveToDoList();
}

function pendingToFinish(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const plusFinishedArray = pendingToDoArray.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  const cleanPendingArray = pendingToDoArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  pendingToDoArray = cleanPendingArray;
  saveToDoList();
  plusFinishedArray.forEach(function (toDo) {
    paintFinishList(toDo.text);
  });
}

function finishToPending(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const plusPendingArray = finishedToDoArray.filter(function (toDo) {
    return toDo.id === parseInt(li.id);
  });

  const cleanFinishedArray = finishedToDoArray.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finishedToDoArray = cleanFinishedArray;
  saveToDoList();
  plusPendingArray.forEach(function (toDo) {
    paintToDoList(toDo.text);
  });
}

function saveToDoList() {
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingToDoArray));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDoArray));
}

function paintToDoList(text) {
  const toDoList = document.createElement("li");
  const pendingDelBtn = document.createElement("span");
  const pendingToFinishBtn = document.createElement("span");
  const pendingSpan = document.createElement("span");
  const newId = pendingToDoArray.length + 1;

  pendingDelBtn.innerHTML = "❌";
  pendingDelBtn.classList.add("cursor");
  pendingDelBtn.addEventListener("click", deletePendingToDo);
  pendingToFinishBtn.innerHTML = "✅";
  pendingToFinishBtn.classList.add("cursor");
  pendingToFinishBtn.addEventListener("click", pendingToFinish);
  pendingSpan.innerHTML = text;

  toDoList.appendChild(pendingToFinishBtn);
  toDoList.appendChild(pendingDelBtn);
  toDoList.appendChild(pendingSpan);
  toDoList.id = newId;
  pendingList.appendChild(toDoList);

  const toDoObj = {
    text: text,
    id: newId
  };
  pendingToDoArray.push(toDoObj);
  saveToDoList();
}

function paintFinishList(text) {
  const finishedLi = document.createElement("li");
  const finishedDelBtn = document.createElement("span");
  const finishToPendingBtn = document.createElement("span");
  const finishedSpan = document.createElement("span");
  const newId = finishedToDoArray.length + 1;

  finishedDelBtn.innerHTML = "❌";
  finishedDelBtn.classList.add("cursor");
  finishedDelBtn.addEventListener("click", deleteFinishedToDo);
  finishToPendingBtn.innerHTML = "🔙";
  finishToPendingBtn.classList.add("cursor");
  finishToPendingBtn.addEventListener("click", finishToPending);
  finishedSpan.innerHTML = text;

  finishedLi.appendChild(finishToPendingBtn);
  finishedLi.appendChild(finishedDelBtn);
  finishedLi.appendChild(finishedSpan);
  finishedLi.id = newId;
  finishedList.appendChild(finishedLi);

  const finishObj = {
    text: text,
    id: newId
  };
  finishedToDoArray.push(finishObj);
  saveToDoList();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentInputValue = toDoInput.value;
  paintToDoList(currentInputValue);
  toDoInput.value = "";
}

function init() {
  loadList();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
