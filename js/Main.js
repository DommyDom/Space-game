const ENEMY_SPAWN_RATE = 30;
var timeToNextEnemy = ENEMY_SPAWN_RATE;
var gameText;
var canvas, ctx;
var player;
var bullets = [];
var enemy = [];
var items = [];
var particles =[];
var score;
var progress;
var normalProb;
var spreadProb;
var spiralProb;
var explodeSound;
 var pickUpSound;

window.onload = function(){
	
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	gameText = document.getElementById("gameText");
	loadImages();
}

function imageLoadingDoneSoStartGame(){
	
	
	explodeSound =new SoundOverlapsClass("sound/explode");
	pickUpSound = new SoundOverlapsClass("sound/powerUp");
	var framesPerSecond = 30;
	setupInput();
	restart();
	setInterval(doAll,1000/framesPerSecond);
}

function restart(){
	bullets = [];
	enemy = [];
	items = [];
	particles = [];
	
	score =0;
	progress =0;
	
	normalProb =50;
	spreadProb=0;
	spiralProb=0;
	
	player = new shipClass();
}




function doAll(){
	moveAll();
	drawAll();
	handleBullets();
}

function moveAll(){
	if(!player.isDead){
		player.move();
		
		checkProgress();
		
		//finds a random spawn point at the top of the screen
		if(timeToNextEnemy <=0){
		timeToNextEnemy = ENEMY_SPAWN_RATE;
			spawnEnemy();
		}else{
			timeToNextEnemy--;
		}//end of nested if
	
		
		handleItems();
		
	
		handleCollisionBetweenShips();
		
		//remove dead enemies
		for(var i=0; i<enemy.length;i++){
			if(enemy[i].isDead){
				enemy.splice(i,1);
			}else{
				//otherwise move
				enemy[i].move();
			}
		}//end of for loop
	}else{
		restart();
	}
	
	//move particles
	for(var i = 0; i< particles.length;i++){
		particles[i].move();
	}
	
	
}//end of function


function drawAll(){
	colorRect(0,0,canvas.width,canvas.height,"black");
	
	//draw the player :3
	player.draw();
	
	//draw enemies :)
	for(var i= 0; i<enemy.length;i++){
		enemy[i].draw();
	}
	
	//draw items :)
	for(var i=0; i<items.length;i++){
		items[i].draw();
	}
	
	//draw particles
	for(var i =0; i<particles.length;i++){
		particles[i].draw();
		if(particles[i].isGone){
			particles.splice(i,1);
		}
	}
	
	gameText.innerHTML = "hp: " + player.health + ", score: " + score; 
	
}

function handleBullets(){
	for(var i =0; i<bullets.length;i++)
			if(!bullets[i].isOutOfScreen()){
				bullets[i].move();
				bullets[i].draw();
				
				if(bullets[i].isFriendly){
					for(var j=0;j<enemy.length;j++){
						handleCollisionE(j,i);
					}//end of nested for2
				}else{
					
					handleCollisionP(i);
				}//end of nested if2
			}else{
				bullets.splice(i,1);
			}//end of if1
}//end of for1

function handleCollisionP(index){
	var bullet = bullets[index];
	var bulletX = bullet.getX();
	var bulletY = bullet.getY();
	var shipX = player.getXCoord();
	var shipY = player.getYCoord();
	
	var dist = Math.sqrt((bulletX-shipX)*(bulletX-shipX)+(bulletY-shipY)*(bulletY-shipY));
	
	if(dist <bullet.getRadius()+player.radius){
		player.takeDamage();
		bullets.splice(index,1);
	}
	
}

function handleCollisionE(enemyIndex,bulletIndex){
	var ship = enemy[enemyIndex]
	var bullet = bullets[bulletIndex];
	if( bullet != undefined){
		var bulletX = bullet.getX();
		var bulletY = bullet.getY();
		var shipX = ship.getXCoord();
		var shipY = ship.getYCoord();
		var shipWidth = ship.getWidth();
		var shipHeight = ship.getHeight();
	
		var dist = Math.sqrt((bulletX-shipX)*(bulletX-shipX)+(bulletY-shipY)*(bulletY-shipY));
	
		if(dist< bullet.getRadius()+ship.radius){
			ship.takeDamage();
			bullets.splice(bulletIndex,1);
		}
	}
}

function handleCollisionBetweenShips(){
	for(var i = 0; i<enemy.length;i++){
		var dist = Math.sqrt((player.x-enemy[i].x)*(player.x-enemy[i].x)+(player.y-enemy[i].y)*(player.y-enemy[i].y));
		if(dist < enemy[i].radius+player.radius){
			player.takeDamage();
		}
		
	}
}

function checkProgress(){
	if(progress>=100){
		progress -=100;
		var randomNumber = Math.random();
		if(randomNumber >=0 && randomNumber < 0.33){
			if(normalProb<100){
				normalProb++;
			}else if(spreadProb <100){
				spreadProb++;
			}else if(spiralProb <100){
				spiralProb++;
			}
		}
		if(randomNumber >=0.33 && randomNumber <=0.66){
				if(spreadProb <100){
					spreadProb++;
				}else if(normalProb<100){
					normalProb++;
				}else if(spiralProb<100){
					spiralProb++;
				}
		}
		if(randomNumber > 0.66 && randomNumber <=1){
			if(spiralProb<100){
				spiralProb++;
			}else if(normalProb<100){
				normalProb++;
			}else if(spreadProb<100){
				spreadProb++;
			}
		}
	}
}

function spawnEnemy(){
	var normalRoll = 100*Math.random();
	var spreadRoll = 100*Math.random();
	var spiralRoll = 100*Math.random();
	
	if(normalRoll <= normalProb){
		var x = canvas.width*Math.random();
		enemy.push(new standardEnemyClass(x,0,"normal"));
	}
	
	if(spreadRoll <= spreadProb){
		var x = canvas.width*Math.random();
		enemy.push(new standardEnemyClass(x,0,"spread"));
	}
	
	if(spiralRoll <= spiralProb){
		var x = canvas.width*Math.random();
		enemy.push(new standardEnemyClass(x,0,"spiral"));
	}
	
	
	
	
}

function handleItems(){
	var itemRadius = Math.sqrt(ITEMWH*ITEMWH/4);
	for(var i= 0; i<items.length;i++){
		items[i].move();
		
		var distBetweenItemAndPlayer = Math.sqrt((items[i].x-player.x)*(items[i].x-player.x)+(items[i].y-player.y)*(items[i].y-player.y));
		
		if(distBetweenItemAndPlayer <itemRadius +player.radius){
			items[i].applyEffect();
		}
		
		if(items[i].isUsed){
			items.splice(i,1);
		}
		
	}
}
