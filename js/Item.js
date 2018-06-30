const ITEMVEL = 5;
const ITEMWH = 10;

function itemClass(x,y, effect){
	this.x = x;
	this.y = y;
	this.effect = effect;
	var color;
	this.isUsed = false;
	switch(this.effect){
		case "rad":
			color = "blue";
			break;
		case "shot":
			color = "green";
			break;
		default:
			color = "red";
			break;
	}
	
	this.move = function(){
		this.y +=ITEMVEL;
		if(this.y > canvas.height){
			this.isUsed = true;
		}
	}
	
	this.draw = function(){
		colorRect(this.x-ITEMWH/2,this.y-ITEMWH/2,ITEMWH,ITEMWH,color);
	}
	
	this.applyEffect = function(){
		pickUpSound.play();
		switch(this.effect){
			case "rad":
				player.increaseBulletRadius();
				break;
			case "shot":
				player.addAdditionalCannons();
				break;
			default:
				player.heal();
				break;
		}
		this.isUsed = true;
	}
	
}