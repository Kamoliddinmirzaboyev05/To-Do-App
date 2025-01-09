const checkeds = document.querySelectorAll(".check");
const inputTask = document.querySelector("#inputTask");
const addBtn = document.querySelector(".add-btn");
const tasks = document.querySelector(".tasks");
const complatedMyDay = document.querySelector(".complatedMyDay");
const mayDayRight = document.querySelector("#mayDayRight");
const complatedTasks = document.querySelector(".complated-tasks");
const checkedTask = document.querySelectorAll(".checkedTask");
var myDayDB = JSON.parse(localStorage.getItem("myDayDB"))
  ? JSON.parse(localStorage.getItem("myDayDB"))
  : [];

//   Taskni HTML ga yozib beradigan funksiya

const writeTask = () => {
  tasks.innerHTML = "";
  myDayDB.forEach((newtask) => {
    tasks.innerHTML += `
            <div class="task ${newtask.checkedClass}">
              <div class="task-text">
                <div onclick="checked(${newtask.id})" class="check"></div>
                <p>${newtask.task}</p>
              </div>
              <i class="fa-regular fa-star"></i>
            </div>`;
  });
};

writeTask();

addBtn.addEventListener("click", () => {
  if (inputTask.value != "") {
    var task = {
      id: Date.now(),
      task: inputTask.value,
      checkedClass: "notChecked",
      date: "8 - yanvar",
    };
    myDayDB.push(task);
    localStorage.setItem("myDayDB", JSON.stringify(myDayDB));
    writeTask();
    inputTask.value = "";
  } else {
    alert("Task was not added");
  }
});

const checked = (id) => {
  myDayDB.map((task) => {
    return task.id == id ? (task.checkedClass = "checkedTask") : "notChecked";
  });
  localStorage.setItem("myDayDB", JSON.stringify(myDayDB));
  writeTask();
};
