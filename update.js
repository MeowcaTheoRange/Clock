var prevSha = localStorage.getItem("commitsha") ?? "ThisShouldntBeASHA";

setInterval(reqData, 60000);

//balls lmao

function reqData() {
  const XHR = new XMLHttpRequest();

  XHR.addEventListener("load", (event) => {
    var resp = event.target.response;

    if (event.target.status.toString().includes("40")) {
      console.log(event.target.status + " error :[")
      return;
    }

    if (resp != prevSha) {
      if (prevSha == "ThisShouldntBeASHA") {
        localStorage.setItem("commitsha", resp);
      } else {
        document.querySelector("#updatedialog").classList.add("open");
        localStorage.setItem("commitsha", resp);
      }
    }
  });

  XHR.addEventListener("error", (event) => {
    console.log('Oops! Something went wrong.');
  });

  XHR.open("GET", "https://ClockCheckGithub.meowcatheorange.repl.co");

  XHR.send();
}

reqData();