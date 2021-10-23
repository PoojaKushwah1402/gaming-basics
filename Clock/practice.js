
const makeCenter = (radius, ctx, color) => drawFullCircle(radius, ctx, color);

const makebackgrounGradient = (radius, canvas) => {
  let grad = canvas.createRadialGradient(0,0,radius*0.95,0,0,radius*1.05);
  grad.addColorStop(0,'#333');
  grad.addColorStop(0.5,'white');
  grad.addColorStop(1,'#333');

  canvas.strokeStyle = grad;
  canvas.lineWidth = radius*0.1
  canvas.stroke();
  
}

const drawFullCircle = (radius, canvas, color) => {
  canvas.beginPath();//The beginPath() method begins a path, or resets the current path.
  canvas.arc(0,0,radius,0,2*Math.PI);
  canvas.fillStyle = color;
  canvas.fill();
}

const setNumbers = (radius, canvas) => {
  canvas.font = radius * 0.15 + "px arial";
  canvas.textBaseline = 'middle';
  canvas.textAlign = 'center'

  for(let hour=1; hour<13; hour++) {
    let angle = hour*Math.PI/6;
    canvas.rotate(angle); //to rotate the the canvas so its x,y axis will changed
    canvas.translate(0,-radius*0.85);
    canvas.rotate(-angle);
    canvas.fillText(String(hour),0,0);
    canvas.rotate(angle);
    canvas.translate(0,radius*0.85);
    canvas.rotate(-angle)
  }
}

const drawHand = (position, canvas, length, width) => {
  canvas.beginPath();
  canvas.lineWidth = width;
  canvas.lineCap = 'round';
  canvas.moveTo(0,0);
  canvas.rotate(position);
  canvas.lineTo(0,-length)
  canvas.stroke();
  canvas.rotate(-position)

}

const drawClockHands = (radius, canvas) => {
  const date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  hour = hour%12
  //draw hour 
  hour = (hour*Math.PI/6) + (minute*Math.PI/(6*60)) + (second*Math.PI/(6*60*60));
  drawHand(hour, canvas, radius*0.5, radius*0.05)  
  //draw minute
  minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
  drawHand(minute, canvas, radius*0.7, radius*0.05)
  //draw seconds
  second = (second*Math.PI/30)
  drawHand(second, canvas, radius*0.9, radius*0.02)
}

const drawClock = (radius, ctx) => {
  drawFullCircle(radius, ctx, 'white');
  makebackgrounGradient(radius, ctx);
  makeCenter(radius*0.1, ctx, '#333');
  setNumbers(radius, ctx);
  drawClockHands(radius, ctx)
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let coordinate = canvas.height/2;
let radius = canvas.height/2*0.9
ctx.translate(coordinate, coordinate);
//drawClock(radius, ctx)
setInterval(()=>drawClock(radius, ctx),0)

