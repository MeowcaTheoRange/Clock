var prevSha = localStorage.getItem("commitsha") ?? "ThisShouldntBeASHA";

setInterval(reqData, 30000);

function reqData() {
  const XHR = new XMLHttpRequest();

  XHR.addEventListener("load", (event) => {
    var resp = JSON.parse(event.target.response);

    if (resp.sha != prevSha) {
      if (prevSha == "ThisShouldntBeASHA") {
        localStorage.setItem("commitsha", resp.sha);
      } else {
        document.querySelector(".scr-update--").classList.add("open");
        localStorage.setItem("commitsha", resp.sha);
      }
    }
  });

  XHR.addEventListener("error", (event) => {
    console.log('Oops! Something went wrong.');
  });

  XHR.open("GET", "https://api.github.com/repos/meowcatheorange/clock/commits/master");

  XHR.send();
}

reqData();