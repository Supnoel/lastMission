const body = document.querySelector("body");

const IMAGES_NUMBER = 4;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function getRandomNumber(number) {
    const randomNumber = Math.floor(Math.random()*(number-0.00001)+1);
    return randomNumber;
}

function init(){
    const randomBgNumber = getRandomNumber(IMAGES_NUMBER);
    paintImage(randomBgNumber);
}

init();