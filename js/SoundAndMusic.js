var audioFormat;

function setFormat(){
		
	var audio = new Audio()
	
	if (audio.canPlayType("audio/mp3")){
		audioFormat =".mp3";
	}else{
		audioFormat =".ogg";
	}

}





function SoundOverlapsClass(filenameWithPath){
	
	setFormat();
	
	var mainSound = new Audio(filenameWithPath + audioFormat);
	var altSound = new Audio(filenameWithPath + audioFormat);
	mainSound.volume = 0.2;
	altSound.volume = 0.2;
	var altSoundTurn  =false;
	
	
	this.play = function(){
		if(this.altSoundTurn){
			altSound.currentTime = 0;
			altSound.play();
		}else{
			mainSound.currentTime =0;
			mainSound.play();
		}
		
		this.altSoundTurn = !this.altSoundTurn
	}
	

}

function BackgroundMusicClass(){
	var musicSound = null;
	
	this.loopSong = function(filenameWithPath){
		setFormat();
		
		if(musicSound != null){
			musicSound.pause();
			musicSound = null;
		}
		musicSound = new Audio(filenameWithPath+audioFormat);
		musicSound.loop =true;
		musicSound.play();
		
	}
	
	this.startOrStopMusic = function(){
		if(musicSound.paused){
			musicSound.play();
		}else{
			musicSound.pause();
		}
	}
	
}


