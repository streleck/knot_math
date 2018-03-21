var width  = 500;
var height = 300;
var click = false;
var tool = "pen";
var stillTyping = false;

var mouseX;
var mouseY;
var text;


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
};


$(".clear").on("click", function(event){
	var thisCanvas = ($(this).parent().prev().prev());
	var context = thisCanvas[0].getContext("2d");
	context.clearRect(0,0,500,300);
	context.beginPath();
});

$(".eraser").click(function(event){
	tool = "eraser";
	$("canvas").css("cursor","url(images/eraser_cursor.png), auto");
});

$(".letter").click(function(event){
	tool = "letter";
	$("canvas").css("cursor","text");
});

$(".pen").click(function(event){
	tool = "pen";
	$("canvas").css("cursor","url(images/pen_cursor.png), auto");
});

mouseenter = function(event){
	if(click){
		console.log(event.target);
		var coords = getMousePos(event, context);
		context.moveTo(coords[0], coords[1]);
	}
}

$("canvas").mousedown(function(event){
	click=true;
	var context = $(this)[0].getContext("2d");
	if(tool === "pen"){
		context.beginPath();
		context.moveTo(mouseX,mouseY);
	}
	else if(tool === "eraser"){
		context.clearRect(mouseX,mouseY,20,20);
	}
});


window.onmouseup = function(event){
	click = false;
	context.closePath();
};


$("canvas").mousemove(function(event){
	
	context = $(this)[0].getContext("2d");
	getMousePos(event, context);	
	
	if(click){

		if(tool === "pen"){	
			context.lineWidth = 2;
			context.lineTo(mouseX,mouseY+9);
			context.stroke();
		}
		else if(tool === "eraser"){
			context.clearRect(mouseX,mouseY,20,20);
			context.closePath();
		}
	}
});


$(window).keypress(function(event){

	if(tool === "letter"){
		context.font = "20px arial";

		//allows user 400ms to enter multiple characters by setting
		if(!stillTyping){
			text = event.key;
			stillTyping = true;
			xposition = mouseX;
			yposition = mouseY;

			var typingTime = setTimeout(
				function(){
					stillTyping = false;
					context.clearRect(xposition, yposition-16,(12*text.length),17);
					context.fillText(text, xposition, yposition);
					text = "";
				},400)
		}
		//until timeout sets stillTyping back to false, characters can be added
		else{
			text += event.key;
		}
	}
});