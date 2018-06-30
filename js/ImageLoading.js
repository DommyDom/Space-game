var playerPic = document.createElement("img");
var normalEnemyPic = document.createElement("img");
var spreadEnemyPic = document.createElement("img");
var spiralEnemyPic = document.createElement("img");

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}



function loadImages() {
	var imageList = [
		{varName: playerPic, theFile: "ship.png"},
		{varName: normalEnemyPic, theFile: "redShip.png" },
		{varName: spreadEnemyPic, theFile: "greenShip.png"},
		{varName:spiralEnemyPic,theFile: "yellowShip.png"}]

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	}
	
}


