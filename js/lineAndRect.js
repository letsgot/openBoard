
let lineTool = document.querySelector(".fa-grip-lines-vertical");
let rectTool = document.querySelector(".fa-square");
let pencilTool = document.querySelector("#pencil-img");
let eraserTool = document.querySelector("#eraser-img");
let rect = document.querySelector("#rect");
let line = document.querySelector("#line");
let cStepTool = "pencil";
let options = document.querySelectorAll(".size-box");
let cTool = "pencilTool";
let mousedownfsa = false;
// console.log("j");
lineTool.addEventListener("click", function () {
    cTool = "lineTool";
    isMouseDown = false;
    // console.log("j");
})

rectTool.addEventListener("click", function () {
    cTool = "rectTool";
    isMouseDown = false;
    // console.log("j");
})

pencilTool.addEventListener("click", function () {
    cTool = "pencilTool";
    // isMouseDown = false;
    // console.log("j");
})


eraserTool.addEventListener("click", function () {
    cTool = "eraserTool";
    // isMouseDown = false;
    // console.log("j");
})
