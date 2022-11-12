function reqData(start) {
  console.log("Pinged API server. Starting: " + start);
  var donedata = (e) => {
    var resp = e;
    var prevSha = "A";
    if (!start) prevSha = window.sessionStorage.getItem("commitsha");

    if (resp != prevSha) {
      window.sessionStorage.setItem("commitsha", resp);
      if (start) return;
      document.querySelector("#updatesha").innerHTML = `from job v. ${prevSha} to job v. ${resp}`;
      document.querySelector("#updatedialog").classList.add("open");
    }
  };

  fetch("https://ClockCheckGithub.meowcatheorange.repl.co")
  .then(x => x.text())
  .then(y => donedata(y));
}

setInterval(reqData, 60000);

reqData(true);
