document.querySelectorAll(".clock").forEach((clock) => {
  var canvas = clock.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  ctx.resetTransform();
  ctx.translate(32, 32);
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  update();
});
function update() {
  document.querySelectorAll(".clock").forEach((clock, i) => {
    if (clock.classList.contains("main-clock")) return;
    var canvas = clock.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    ctx.resetTransform();
    ctx.translate(32, 32);
    ctx.strokeStyle = "#FFFFFF";
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