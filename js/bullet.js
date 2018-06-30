const BULLET_SPEED = 5

function bulletClass(fromShip,friendly,angle,radius){
	
	var speed = -SHIP_SPEED - BULLET_SPEED;
	this.isFriendly = friendly;
	//coordinates
	var x = fromShip.getXCoord();
	var y = fromShip.getYCoord();
	var bulletRadius = radius;
	var bulletAngle = angle;
	var color;
	
	if(this.isFriendly){
		color = "blue";
	}else{
		color = "red";
	}
	
	this.move = function(){
		y  += speed*Math.sin(bulletAngle);
		x += speed*Math.cos(bulletAngle);
	}
	
	this.draw = function(){
		colorCircle(x,y, bulletRadius,color);
	}
	
	this.isOutOfScreen = function(){
		return (y+bulletRadius<0 || y+bulletRadius > canvas.height || x+bulletRadius <0 || x+bulletRadius > canvas.width);
	}
	
	this.getX = function(){
		return x;
	}
	
	this.getY = function(){
		return y;
	}
	
	this.getRadius = function(){
		return bulletRadius;
	}
	
}