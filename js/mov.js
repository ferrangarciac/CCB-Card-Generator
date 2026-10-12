var customImgCanvas, customImgcontext,topCanvas;
var targetImage = new Image();
var isDraggable = false;

var currentX = 0;
var currentY = 0;

let moveInterval = null;

function moveImage(){
  customImgCanvas = document.getElementById("preview_0");
  topCanvas = document.getElementById("preview_14");
  customImgcontext = customImgCanvas.getContext("2d");

  currentX = customImgCanvas.width/2;
  currentY = customImgCanvas.height/2;

  targetImage.onload = function() {
    _Go();
  };
 
  targetImage.src=URL.createObjectURL(archivo);
};

function _Go() {
  _MouseEvents();
  
  // Evitar crear varios intervalos
    if (moveInterval !== null) {
        clearInterval(moveInterval);
    }

moveInterval = setInterval(function() {
    _ResetCanvas();
    _DrawImage();
  }, 1000/30);
}

function _ResetCanvas() {
  customImgcontext.fillStyle = '#fff';
  customImgcontext.fillRect(0,0, customImgCanvas.width, customImgCanvas.height);
}

function _MouseEvents() {
  topCanvas.onmousedown = function(e) {

    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;
	console.log(mouseX);

    if (mouseX >= (currentX - targetImage.width/2) &&
        mouseX <= (currentX + targetImage.width/2) &&
        mouseY >= (currentY - targetImage.height/2) &&
        mouseY <= (currentY + targetImage.height/2)) {
      isDraggable = true;
    }
  };
  
  topCanvas.onmousemove = function(e) {

    if (isDraggable) {
      currentX = e.pageX - this.offsetLeft;
      currentY = e.pageY - this.offsetTop;
    }
  };
  
  topCanvas.onmouseup = function(e) {
    isDraggable = false;
  };
  
  topCanvas.onmouseout = function(e) {
    isDraggable = false;
  };
}

function _DrawImage() {
  customImgcontext.drawImage(targetImage, currentX-(targetImage.width/2), currentY-(targetImage.height/2));
}

function stopMoveImage() {
    if (moveInterval !== null) {
        clearInterval(moveInterval);
        moveInterval = null;
    }
}

