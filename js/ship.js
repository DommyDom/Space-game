const SHIP_SPEED = 10;
const RELOAD = 5;

shipClass.prototype = new unitClass(canvas.width/2,canvas.height/2,30,50,true,playerPic);

function shipClass(){
	
	var timeToReload = 0;
	this.health = 100;
	this.invurnabilityTime = 0;
	//movement directions
	var up = false;
	var right = false;
	var left = false;
	var down = false;
	var space = false;
	this.bulletRadius = 5;
	this.additionalCannons =0;
	 
	 var shootSound = new SoundOverlapsClass("sound/shoot");
	

	this.oldMove = this.move;
	
	this.move = function(){
		
		this.xSpeed = 0;
		this.ySpeed = 0;
		if(up && this.y>this.shipHeigth/2){
			this.ySpeed = -SHIP_SPEED;
		}
		if(down && this.y<canvas.height-this.shipHeigth/2){
			this.ySpeed = SHIP_SPEED;
		}
		if(up && down){
			this.ySpeed = 0;
		}
		if(left && this.x>this.shipWidth/2){
			this.xSpeed =-SHIP_SPEED;
		}
		if(right && this.x<canvas.width-this.shipWidth/2 ){
			this.xSpeed = SHIP_SPEED;
		}
		if(left && right){
			this.xSpeed =0;
		}
		
		if(space){
			if(timeToReload <=0){
				this.shoot();
				timeToReload = RELOAD;
			}else{
				timeToReload--;
			}
		}
		
		if(this.health <= 0){
		this.isDead = true;
		}
		
		if(this.invurnabilityTime != 0){
			this.invurnabilityTime--;
		}
		
		this.oldMove();
		
		

	}
	
	//this.oldDraw = this.draw;
	
	this.draw = function(){
		//this.oldDraw();
		drawBitmapCenteredAtLocationWithRotation(playerPic,this.x,this.y,0);
	}
	
	//function to tell if a certain button is being held
	this.holdButton = function(direction,condition){
		switch(direction){
			case LEFT_ARROW:
				left = condition;
				break;
			
			case UP_ARROW:
				up = condition;
				break;
			
			case RIGHT_ARROW:
				right = condition;
				break;
			case DOWN_ARROW:
				down = condition;
				break;
			case SPACEBAR:
				space = condition;
				if(condition == false){
					this.resetReload();
				}
				break;
		}
	}
	
	this.getVerticalSpeed = function(){
		return ySpeed;
	}
	
	this.resetReload = function(){
		timeToReload = 0;
	}
	
	this.takeDamage = function(){
		if(this.invurnabilityTime<= 0){
		this.health -= 10;
		this.invurnabilityTime = 10;
		}
		
	}
	
	this.heal = function(){
		this.health += 10;
	}
	
	this.increaseBulletRadius = function(){
		this.bulletRadius++;
	}
	
	this.addAdditionalCannons = function(){
		this.additionalCannons++;
	}
	
	this.shoot = function(){
		
		
		shootSound.play();
		for(var i=0;i<this.additionalCannons;i++){
		bullets.push(new bulletClass(this,this.isFriendly,Math.PI/2+(2*(i+1)*Math.PI/100),this.bulletRadius));
		bullets.push(new bulletClass(this,this.isFriendly,Math.PI/2-   (2*(i+1)*Math.PI/100),this.bulletRadius));
		}
		
		bullets.push(new bulletClass(this,this.isFriendly,Math.PI/2,this.bulletRadius));
		
	}
	
	


	
}



