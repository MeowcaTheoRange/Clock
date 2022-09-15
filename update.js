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
      document.querySelector("#updatesha").innerHTML = `from ${prevSha} to ${resp}`;
      if (prevSha == "ThisShouldntBeASHA") {
        localStorage.setItem("commitsha", resp);
      } else {
        document.querySelector("#updatedialog").classList.add("open");
        localStorage.setItem("commitsha", resp);
      }
    }
  };

  fetch("https://ClockCheckGithub.meowcatheorange.repl.co")
  .then(x => x.text())
  .then(y => donedata(y));
}

reqData();
