var complatedHead = document.querySelector(".complated-head");

var myDayDB = JSON.parse(localStorage.getItem("myDayDB"))
  ? JSON.parse(localStorage.getItem("myDayDB"))
  : [];
var complatedTasksDB = JSON.parse(localStorage.getItem("myDayDB"))
  ? JSON.parse(localStorage.getItem("myDayDB"))
  : [];

var writeComplatedTask = () => {
  complatedTasks.innerHTML = "";
  myDayDB.forEach((newComplatedTask) => {
    complatedTasks.innerHTML += `
              <div class="task">
                <div class="task-text">
                  <div onclick="checked(${newComplatedTask.id})" class="check"></div>
                  <p>${newComplatedTask.task}</p>
                </div>
                <i class="fa-regular fa-star"></i>
              </div>`;
  });
};

var checkedTask = (id) => {
  var complatedDB = myDayDB.filter((task) => {
    return (task.id = id);
  });
  var mergedDB = complatedTasksDB.concat(complatedDB);
  complatedTasksDB = mergedDB;
};

complatedHead.addEventListener("click", () => {
  mayDayRight.classList.toggle("rotate");
  complatedTasks.classList.toggle("open");
});
mayDayRight;
