
const ENEMY_MOVEMENT_SPEED = 3;

standardEnemyClass.prototype = new unitClass(100,100,30,50,false,normalEnemyPic);

function standardEnemyClass(x,y,type){
	var fireRate = 30;
	this.type = type;
	this.x = x;
	this.y = y;
	this.fireAngle = -Math.PI/2;
	this.isDead = false;
	this.oldMove = this.move;
	this.oldDraw = this.draw;
	this.ySpeed = ENEMY_MOVEMENT_SPEED;
	var fireCountdown = fireRate;
	var health = 1;
	var scoreReward = 10;
	var shootSound = new SoundOverlapsClass("sound/shoot");
	switch(this.type){
		case "spread":
			health = 3;
			this.picture = spreadEnemyPic;
			scoreReward = 30;
			fireRate = 60;
			break;
		
		case "spiral":
			health = 5;
			this.picture = spiralEnemyPic;
			scoreReward = 50;
			fireRate = 10;
			break;
	}
	
	
	this.oldMove = this.move;
	
	this.move = function(){
	
		if(health <=0){
			this.die();
		}
	
		if(this.y <canvas.height){
			this.shoot();
			this.oldMove();
		}else{
			this.isDead = true
		}

		
	}
	
	this.shoot = function(){
		
		if(fireCountdown <=0){
			shootSound.play();
		if(type=="spiral"){
			this.fireAngle += 0.5;
		}	
		
		if(type == "spread"){
			
			this.fireAngle = Math.atan2(this.y-player.y,this.x-player.x);
			if(this.y < player.y){
				bullets.push(new bulletClass(this,this.isFriendly,this.fireAngle,5));
				bullets.push(new bulletClass(this,this.isFriendly,this.fireAngle + Math.PI/4,5));
				bullets.push(new bulletClass(this,this.isFriendly,this.fireAngle-Math.PI/4,5));
			}
		}else{
			
			bullets.push(new bulletClass(this,this.isFriendly,this.fireAngle,5));
		}
		fireCountdown = fireRate;
		
		}else{
			fireCountdown--;
		}
	}
	
	this.takeDamage = function(){
		health--;
	}
	
	this.die = function(){
		score +=scoreReward;
		progress +=scoreReward;
		
		//roll for item drop
		if(Math.random()<=0.1){
			var rollType = Math.random();
			var type;
			
			if(rollType <0.33){
				type = "rad";
			}else if(rollType >=0.33 && rollType <0.66){
				type = "shot";
			}else{
				type = "hp";
			}
		
			items.push(new itemClass(this.x,this.y,type));
		}
		
		this.explode();
		
		this.isDead = true;
	}
	
	this.explode = function(){
		for(var i = 0; i<10;i++){
			explodeSound.play();
			particles.push(new explosionParticleClass(this.x,this.y,i*Math.PI/5));
		}
	}
	
}