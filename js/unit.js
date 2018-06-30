
function unitClass(xSpawn,ySpawn,width,height,isFriendly,pic){
	
	this.x = xSpawn;
	this.y = ySpawn;
	this.xSpeed =0;
	this.ySpeed =0;
	this.projectile = [];
	this.shipWidth  =width;
	this.shipHeigth = height;
	this.isFriendly = isFriendly;
	this.radius = this.shipWidth/2;
	this.picture = pic
	
	this.move = function(){
		this.x += this.xSpeed;
		this.y += this.ySpeed;

	}
	
	this.draw = function(){
		if(this.picture == undefined){
			colorRect(this.x-this.shipWidth/2,this.y-this.shipHeigth/2,this.shipWidth,this.shipHeigth,"white");
		}else{
			if(isFriendly){
			drawBitmapCenteredAtLocationWithRotation(this.picture,this.x,this.y,0);
			}else{
				drawBitmapCenteredAtLocationWithRotation(this.picture,this.x,this.y,Math.PI);
			}
		}
	}
	
	this.getXCoord = function(){
		return this.x;
	}
	
	this.getYCoord = function(){
		return this.y;
	}
	
	this.getWidth = function(){
		return this.shipWidth;
	}
	
	this.getHeight = function(){
		return this.shipHeigth;
	}
	
	this.shoot = function(){
		
		bullets.push(new bulletClass(this,this.isFriendly,Math.PI/2,5));
	}
	
	
	
}