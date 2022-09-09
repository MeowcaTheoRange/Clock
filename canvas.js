var tone = new Audio("./assets/tone.mp3");

document.querySelectorAll(".clock").forEach((clock) => {
  var canvas = clock.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  ctx.resetTransform();
  ctx.translate(32, 32);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  update();
});
document.querySelectorAll(".timer").forEach((clock) => {
  var canvas = clock.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  ctx.resetTransform();
  ctx.translate(32, 32);
  ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  update();
});
function update() {
  document.querySelectorAll(".clock").forEach((clock, i) => {
    var canvas = clock.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
    if (clock.classList.contains("main-clock")) return;
    ctx.resetTransform();
    ctx.translate(32, 32);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    var canvas = clock.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var now = new Date();
    var hour = now.toLocaleTimeString(undefined, {
      timeZone: clock.dataset.timezone,
      hour: "2-digit",
      hour12: false
    }) % 12;
    var minute = now.getMinutes();
    clock.querySelector(".timezone").innerHTML = now.toLocaleDateString(undefined, {
      timeZone: clock.dataset.timezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
      timeZoneName: 'long'
    });
    clock.querySelector(".title").innerHTML = now.toLocaleTimeString(undefined, {
      timeZone: clock.dataset.timezone,
      hc: "h12", timeStyle: "short"
    });
    ctx.clearRect(-32,-32, 64, 64);
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.stroke();
    drawHand(ctx, (hour*Math.PI/6)+(minute*Math.PI/(6*60)), 16);
    drawHand(ctx, (minute*Math.PI/30), 24);
  });
}

function drawHand(ctx, pos, length) {
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

var theClock = document.querySelector(".main-clock");
var prevMin = new Date().getMinutes();
function updateMain() {
  var canvas = theClock.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var now = new Date();
  var hour = now.getHours() % 12;
  var minute = now.getMinutes();
  if (prevMin != minute) update();
  prevMin = minute;
  theClock.querySelector(".timezone").innerHTML = now.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZoneName: 'long'
  });
  theClock.querySelector(".title").innerHTML = now.toLocaleTimeString(undefined, {
    hc: "h12", timeStyle: "short"
  });
  ctx.clearRect(-32,-32, 64, 64);
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.stroke();
  drawHand(ctx, (hour*Math.PI/6)+(minute*Math.PI/(6*60)), 16);
  drawHand(ctx, (minute*Math.PI/30), 24);
  window.requestAnimationFrame(updateMain);
}

window.requestAnimationFrame(updateMain);

function updateTimer() {
  document.querySelectorAll(".timer-enabled").forEach((clock, i) => {
    var timer = clock.dataset.time;
    var mins = Math.floor(timer / 60);
    mins = (mins < 10 ? "0" + mins : mins);
    var secs = timer % 60;
    secs = (secs < 10 ? "0" + secs : secs);
    
    var canvas = clock.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--foreground');
    ctx.resetTransform();
    ctx.translate(32, 32);
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    var canvas = clock.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    clock.querySelector(".mins").innerHTML = mins;
    clock.querySelector(".seconds").innerHTML = secs;
    ctx.clearRect(-32,-32, 64, 64);
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.stroke();
    drawHand(ctx, (secs*Math.PI/30), 16);
  });
}

setInterval(() => {
  document.querySelectorAll(".timer-enabled:not(.timer-paused)").forEach((clock, i) => {
    var timer = clock.dataset.time;
    clock.dataset.time--;
    if (timer <= 0) {
      clock.classList.remove("timer-enabled");
      tone.play();
    }
  });
  updateTimer();
}, 1000);
updateTimer();