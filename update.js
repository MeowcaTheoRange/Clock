var prevSha = localStorage.getItem("commitsha") ?? "ThisShouldntBeASHA";

setInterval(reqData, 60000);

//balls lmao

function reqData() {
  var donedata = (e) => {
    var resp = e;

//     if (event.target.status.toString().includes("40")) {
//       console.log(event.target.status + " error :[")
//       return;
//     }

    if (resp != prevSha) {
      if (prevSha == "ThisShouldntBeASHA") {
        localStorage.setItem("commitsha", resp);
      } else {
<<<<<<< HEAD
        document.querySelector("#updatedialog").classList.add("open");
=======
        document.querySelector(".scr-update--").classList.add("open");
>>>>>>> 95b1e7e587ca410500cd9bcb6658d96b1c4e993b
        localStorage.setItem("commitsha", resp);
      }
    }
  };

  fetch("https://ClockCheckGithub.meowcatheorange.repl.co")
  .then(x => x.text())
  .then(y => donedata(y));
}

reqData();
