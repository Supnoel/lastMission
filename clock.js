const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");
let colon = true;

    
function blickColon() {
    if ( colon === true) {
        colon = false;
    } else {
        colon = true;
    }
    return colon;

}

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    blickColon();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}${colon === true ? `:` : ` `}${minutes < 10 ? `0${minutes}` : minutes}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();