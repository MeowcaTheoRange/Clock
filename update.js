function reqData(start) {
  var donedata = (e) => {
    var resp = e;

    if (resp != prevSha) {
      window.sessionStorage.setItem("commitsha", resp);
      if (start) return;
      document.querySelector("#updatesha").innerHTML = `from ${prevSha} to ${resp}`;
      document.querySelector("#updatedialog").classList.add("open");
    }
  };

  fetch("https://ClockCheckGithub.meowcatheorange.repl.co")
  .then(x => x.text())
  .then(y => donedata(y));
}

setInterval(reqData, 60000);

reqData(true);
