const form = document.querySelector(".js-nameForm"), 
    input = form.querySelector("input"),
    welcome = document.querySelector(".js-welcome");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

const hello = ["hi", "welcome", "hello", "greeting", "salutation"];

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}
    
function getNumber(number) {
    const randomNumber = Math.floor(Math.random()*(number-0.00001));
    return randomNumber;
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintWelcome(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintWelcome(text) {
    const randomNumber = getNumber(hello.length);
    form.classList.remove(SHOWING_CN);
    welcome.classList.add(SHOWING_CN);
    welcome.innerText = `${hello[randomNumber]}, ${text}.`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        askForName();
    } else {
        paintWelcome(currentUser);
    }
}

function init() {
    loadName();
}

init();