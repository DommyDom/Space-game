const LEFT_ARROW = 37;
const UP_ARROW = 38;
const RIGHT_ARROW = 39;
const DOWN_ARROW = 40;
const SPACEBAR = 32;

function keydownHandler(evt){
	var keyCode = evt.keyCode;
	player.holdButton(keyCode,true); 
	
	evt.preventDefault();
	
}

function keyupHandler(evt){
	var keyCode = evt.keyCode;
	player.holdButton(keyCode,false); 

}


function setupInput(){
	document.addEventListener("keydown",keydownHandler);
	document.addEventListener("keyup",keyupHandler);
}