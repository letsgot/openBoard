let isMouseDown = false;
let iX, iY, fX, fY;
let topBoard = board.getBoundingClientRect().top;
// console.log(topBoard); 
let leftBoard = board.getBoundingClientRect().left;

board.addEventListener("mousedown", function (e) {
  ctx.beginPath();
  iX = e.clientX - leftBoard;
  iY = e.clientY - topBoard;
  let top = getLocation();
  ctx.moveTo(e.clientX, e.clientY - top);
  isMouseDown = true;

  let point = {
    x: e.clientX,
    y: e.clientY - top,
    identifier: "mousedown",
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
    iX: e.clientX - leftBoard,
    iY :e.clientY - topBoard,
    fX: 0,
    fY:0
  };

  undoStack.push(point);

  socket.emit("mousedown", point);
  // event emit
});
// mmousedown x,y beginPath,moveTo(x,y),color,size
// mouseMove=> x1,y1, lineTo,stroke
board.addEventListener("mousemove", function (e) {
  if (isMouseDown == true&&cTool!="rectTool"&&cTool!="lineTool") {
    // console.log(ctx);
    let top = getLocation();

    ctx.lineTo(e.clientX, e.clientY - top);
    ctx.stroke();
    let point = {
      x: e.clientX,
      y: e.clientY - top,
      identifier: "mousemove",
      color: ctx.strokeStyle,
      width: ctx.lineWidth,
    };
    undoStack.push(point);
    socket.emit("mousemove", point);
  }
 
});

board.addEventListener("mouseup", function (e) {
  isMouseDown = false;
  fX = e.clientX - leftBoard;
  fY = e.clientY - topBoard;
  let height = fY - iY;
  let width = fX - iX;

  let point = {
    x: e.clientX,
    y: e.clientY - top,
    identifier: "mouseup",
    color: ctx.strokeStyle,
    width: ctx.lineWidth,
  };

  if (cTool == "rectTool") {
    ctx.strokeRect(iX, iY, width, height);
    // cTool = "";
  }
  else if (cTool == "lineTool") {
    ctx.beginPath();
    ctx.moveTo(iX, iY);
    ctx.lineTo(fX, fY);
    ctx.stroke();
    // cTool = "";
  }

  socket.emit("mouseup", point);
  
});

const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");

let interval = null;

undo.addEventListener("mousedown", function () {
  interval = setInterval(function () {
    if (undoMaker()) socket.emit("undo");
  }, 50);
});

undo.addEventListener("mouseup", function () {
  clearInterval(interval);
});
redo.addEventListener("mousedown", function () {
  interval = setInterval(function () {
    if (redoMaker()) socket.emit("redo");
  }, 50);
});
redo.addEventListener("mouseup", function () {
  clearInterval(interval);
});

function redraw() {
  ctx.clearRect(0, 0, board.width, board.height);

  for (let i = 0; i < undoStack.length; i++) {
    let { x, y, identifier, color, width } = undoStack[i];
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (identifier == "mousedown") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (identifier == "mousemove") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function getLocation() {
  const { top } = board.getBoundingClientRect();
  return top;
}