//  important = document.querySelector(".important");


    var importantDB = JSON.parse(localStorage.getItem("importantDB"))
      ? JSON.parse(localStorage.getItem("importantDB"))
      : [];

    var searchTaskDB = JSON.parse(localStorage.getItem("searchTaskDB"))
      ? JSON.parse(localStorage.getItem("searchTaskDB"))
      : [];
    searchTaskDB = [...importantDB];
     writeTask = () => {
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
        importantDB.push(task);
        searchTaskDB = [...importantDB];
        localStorage.setItem("importantDB", JSON.stringify(importantDB));
        writeTask();
        inputTask.value = "";
      } else {
        alert("Task was not added");
      }
    });

     checked = (id) => {
      importantDB.map((task) => {
        return task.id == id
          ? ((task.checkedClass = "checkedTask"),
            (task.notCheck = "none"),
            (task.checkTask = "display"))
          : "notChecked";
      });
      localStorage.setItem("importantDB", JSON.stringify(importantDB));
      writeTask();
    };

     deleteTask = (id) => {
      filteredDB = importantDB.filter((task) => {
        return task.id != id;
      });
      importantDB = filteredDB;
      localStorage.setItem("importantDB", JSON.stringify(importantDB));
      searchTaskDB = [...importantDB];
      writeTask();
    };

    searchInput.addEventListener("input", () => {
      resultDb = importantDB.filter((item) => {
        return item.task.includes(searchInput.value);
      });
      console.log(resultDb);
      searchTaskDB = resultDb;
      writeTask();
    });

