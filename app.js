const checkeds = document.querySelectorAll(".check");
const inputTask = document.querySelector("#inputTask");
const addBtn = document.querySelector(".add-btn");
const tasks = document.querySelector(".tasks");
const complatedMyDay = document.querySelector(".complatedMyDay");
const mayDayRight = document.querySelector("#mayDayRight");
const complatedTasks = document.querySelector(".complated-tasks");
const searchInput = document.querySelector(".searchInput");
const checkedTask = document.querySelectorAll(".checkedTask");
const windTitle = document.querySelector(".windTitle");
const section = document.querySelector("section");
const important = document.querySelector(".important");
const logout = document.querySelector(".logout");

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

// type windows start

const myDay = document.querySelector(".myDay");
const planned = document.querySelector(".planned");
const tasksWind = document.querySelector(".tasksWind");

myDay.addEventListener("click", () => {
  planned.classList.remove("activeWind");
  myDay.classList.add("activeWind");
  important.classList.remove("activeWind");
  tasksWind.classList.remove("activeWind");

  var activeWindow = "myDay";

  // change window objects
  windTitle.textContent = "My Day";
  section.style.backgroundImage = 'url("img/mydayback.jpg")';
});
planned.addEventListener("click", () => {
  planned.classList.add("activeWind");
  myDay.classList.remove("activeWind");
  important.classList.remove("activeWind");
  tasksWind.classList.remove("activeWind");

  // change window objects
  windTitle.textContent = "Planned";
  section.style.backgroundImage = 'url("img/planned.jpg")';
});
important.addEventListener("click", () => {
  planned.classList.remove("activeWind");
  myDay.classList.remove("activeWind");
  important.classList.add("activeWind");
  tasksWind.classList.remove("activeWind");

  // change window objects
  windTitle.textContent = "Important";
  section.style.backgroundImage = 'url("img/important.jpg")';
});
tasksWind.addEventListener("click", () => {
  planned.classList.remove("activeWind");
  myDay.classList.remove("activeWind");
  important.classList.remove("activeWind");
  tasksWind.classList.add("activeWind");

  // change window objects
  windTitle.textContent = "Tasks";
  section.style.backgroundImage = 'url("img/tasks.jpg")';
});
// Registration start

const signIn = document.querySelector(".signIn");
const signUp = document.querySelector(".signUp");
const formBack = document.querySelector(".form-back");
const registeration = document.querySelector(".registeration");
const loginText = document.querySelector("#loginText");
const passwordText = document.querySelector("#passwordText");
const loginBtn = document.querySelector(".loginBtn");
logout.addEventListener("click", () => {
  localStorage.setItem("enter", "false");
});
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
  loginText.style.borderColor = "black";
    passwordText.style.borderColor = "black";
  if (loginText.value == "admin" && passwordText.value == "1234") {
    registeration.style.top = "-2000px";
    registeration.style.zIndex = "-2000";
    enter = "true";
    localStorage.setItem("enter", enter);
  }else{
    loginText.style.borderColor = "red";
    loginText.style.borderStyle = "dotted";
    passwordText.style.borderStyle = "dotted";
    passwordText.style.borderColor = "red";
    alert("Login yoki parol noto'g'ri! Iltimos qaytadan kiriting!")
    loginText.value = ""
    passwordText.value = ""
  }
});

// Registration end

// My day window tasks

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
