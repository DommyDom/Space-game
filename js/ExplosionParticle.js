const EPVELOCITY = 10;
const EPRADIUS = 10;

function explosionParticleClass(x,y,angle){
	this.x = x;
	this.y  =y;
	this.angle = angle;
	this.alpha = 1;
	this.isGone = false;
	
	this.move = function(){
		this.x += EPVELOCITY*Math.cos(this.angle);
		this.y += EPVELOCITY*Math.sin(this.angle);
	}
	this.draw = function(){
		colorAlphaCircle(this.x,this.y,EPRADIUS,"orange",this.alpha);
		this.alpha -= .2;
		if(this.alpha <=0){
			this.isGone = true;
		}
	}
}