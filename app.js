
const checkeds = document.querySelectorAll(".check");
const inputTask = document.querySelector("#inputTask");
const addBtn = document.querySelector(".add-btn");
const tasks = document.querySelector(".tasks");
const complatedMyDay = document.querySelector(".complatedMyDay");
const mayDayRight = document.querySelector("#mayDayRight");
const complatedTasks = document.querySelector(".complated-tasks");
const searchInput = document.querySelector(".searchInput");
const checkedTask = document.querySelectorAll(".checkedTask");

// Registration start

const signIn = document.querySelector(".signIn");
const signUp = document.querySelector(".signUp");
const formBack = document.querySelector(".form-back");
const registeration = document.querySelector(".registeration");
const loginText = document.querySelector("#loginText");
const passwordText = document.querySelector("#passwordText");
const loginBtn = document.querySelector(".loginBtn");

var enter = localStorage.getItem("enter")
  ? localStorage.getItem("enter")
  : "false";

if (enter == "true") {
  registeration.style.top = "-2000px";
  registeration.style.zIndex = "-2000";

}

signIn.addEventListener("click", () => {
  formBack.classList.add("loginActive");
  registeration.style.backgroundImage = "url(img/back6.jpg)";
});
signUp.addEventListener("click", () => {
  formBack.classList.remove("loginActive");
  registeration.style.backgroundImage = "url(img/back5.jpg)";
});

loginBtn.addEventListener("click", () => {
  if (loginText.value == "admin" && passwordText.value == "1234") {
    registeration.style.top = "-2000px";
    enter = "true";
    localStorage.setItem("enter", enter);
  }
});

// Registration end

var myDayDB = JSON.parse(localStorage.getItem("myDayDB"))
  ? JSON.parse(localStorage.getItem("myDayDB"))
  : [];

var searchTaskDB = JSON.parse(localStorage.getItem("searchTaskDB"))
  ? JSON.parse(localStorage.getItem("searchTaskDB"))
  : [];
searchTaskDB = [...myDayDB];
const writeTask = () => {
  tasks.innerHTML = "";
  searchTaskDB.forEach((newtask) => {
    tasks.innerHTML += `
              <div class="task ${newtask.checkedClass}">
                <div class="task-text">
                  <div onclick="checked(${newtask.id})" class="check"><i class="fa-regular fa-circle ${newtask.notCheck}"></i>
                  <i class="fa-solid fa-circle-check ${newtask.checkTask}"></i>
                  </div>
                  <p>${newtask.task}</p>
                </div>
                <div class = "task-btns">
                <i onclick="deleteTask(${newtask.id})" class="fa-solid fa-trash trash"></i>
                <i class="fa-regular fa-star"></i>
                </div>
              </div>`;
  });
};
writeTask();
// Sanani ko'rsatib turuvchi funksiya
var date = new Date();

const weekDay = document.querySelector(".weekDay");
const month = document.querySelector(".month");
const monthDay = document.querySelector(".monthDay");
const hour = document.querySelector(".hour");
const minut = document.querySelector(".minut");
const second = document.querySelector(".second");
var week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var digitalClock = () => {
  hour.textContent = date.getHours();
  minut.textContent = date.getMinutes();
  second.textContent = date.getSeconds();
};
setInterval(() => {
  var date = new Date();
  weekDay.textContent = week[date.getDay()];
  month.textContent = months[date.getMonth()];
  monthDay.textContent = date.getDate();
  hour.textContent =
    date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
  minut.textContent =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
  second.textContent =
    date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
}, 1000);

//   Taskni HTML ga yozib beradigan funksiya

writeTask();

addBtn.addEventListener("click", () => {
  if (inputTask.value != "") {
    var task = {
      id: Date.now(),
      task: inputTask.value,
      notCheck: "display",
      checkTask: "none",
      checkedClass: "notChecked",
      date: "8 - yanvar",
    };
    myDayDB.push(task);
    searchTaskDB = [...myDayDB];
    localStorage.setItem("myDayDB", JSON.stringify(myDayDB));
    writeTask();
    inputTask.value = "";
  } else {
    alert("Task was not added");
  }
});

const checked = (id) => {
  myDayDB.map((task) => {
    return task.id == id
      ? ((task.checkedClass = "checkedTask"),
        (task.notCheck = "none"),
        (task.checkTask = "display"))
      : "notChecked";
  });
  localStorage.setItem("myDayDB", JSON.stringify(myDayDB));
  writeTask();
};

const deleteTask = (id) => {
  filteredDB = myDayDB.filter((task) => {
    return task.id != id;
  });
  myDayDB = filteredDB;
  localStorage.setItem("myDayDB", JSON.stringify(myDayDB));
  searchTaskDB = [...myDayDB];
  writeTask();
};

searchInput.addEventListener("input", () => {
  resultDb = myDayDB.filter((item) => {
    return item.task.includes(searchInput.value);
  });
  console.log(resultDb);
  searchTaskDB = resultDb;
  writeTask();
});
