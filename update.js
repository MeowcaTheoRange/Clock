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
        document.querySelector(".scr-update--").classList.add("open");
        setTimeout(() => {
          window.location.href = window.location.href;
        }, 15000);
        localStorage.setItem("commitsha", resp);
      }
    }
  };

  fetch("https://ClockCheckGithub.meowcatheorange.repl.co")
  .then(x => x.text())
  .then(y => donedata(y));
}

reqData();
