var mouseDown = false;
var canvas1 = document.getElementById("problem-1");
var ctx1 = canvas1.getContext('2d');
var mouseX,mouseY=0;

function sketchpad_mouseDown() {
    mouseDown=true;
    drawDot(ctx,mouseX,mouseY);
}

function sketchpad_mouseUp() {
    mouseDown=false;
}

function sketchpad_mouseMove(e) { 
    // Update the mouse co-ordinates when moved
    getMousePos(e);
    // Draw a pixel if the mouse button is currently being pressed 
    if (mouseDown) { 
        drawDot(ctx,mouseX,mouseY); 
    }
}

// Get the current mouse position relative to the top-left of the canvas
function getMousePos(e, ctx) {
    if (!e)
     var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
    console.log(mouseX + "," + mouseY);
}

window.onclick = function(event){
	//console.log(event.path[0].tagName);
	if(event.path[0].tagName == "CANVAS"){
		var ctx = event.path[0].getContext("2d");
		getMousePos(event, ctx);
	}

}