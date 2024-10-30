// DICE ROLLER PROGRAM

function rollDice() {

    const numInput = document.getElementById("numInput").value;
    const numResult = document.getElementById("numResult");
    const diceImages = document.getElementById("diceImages");
    const displayValues = [];
    const displayImages = [];
    const max = 3;
    const min = 1;

    for (let i = 0; i < numInput; i++) {
        displayValue = Math.floor(Math.random() * 6) + 1;
        displayValues.push(displayValue);
        displayImages.push(`<img src="Images/${displayValue}.png" alt="Dice${displayValue}">`);
    }

    if (numInput < min || numInput > max) {
        numResult.textContent = `Please enter a number between ${min}-${max}`;
        diceImages.textContent = '';
    } else {
        numResult.textContent = `Dice: ${displayValues.join(', ')}`;
        diceImages.innerHTML = displayImages.join('');
    }
}

// DIGITAL CLOCK PROGRAM

function updateTime() {

    const now = new Date();
    let hours = now.getHours();
    const meridian = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0)
    const minutes = now.getMinutes().toString().padStart(2, 0);
    const seconds = now.getSeconds().toString().padStart(2, 0);
    const displayTimer = `${hours}:${minutes}:${seconds} ${meridian}`;
    document.getElementById("clock").textContent = displayTimer;
}

updateTime();
setInterval(updateTime, 1000);

// DATE  PROGRAM

function todaysDate() {

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth().toString().padStart(2, 0);
    const day = today.getDate().toString().padStart(2, 0);
    const dateOutput = `${day}/${month}/${year}`;
    document.getElementById("dateDisplay").textContent = dateOutput;
}

todaysDate();

// STOPWATCH PROGRAM

const stopwatch_display = document.getElementById("stopwatch_display");
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function startRunning() {

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateChrono, 10);
        isRunning = true;
    }
}

function stopRunning() {

    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        startTime = clearInterval(timer);
        isRunning = false;
    }
}

function resetRunning() {
    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    stopwatch_display.textContent = "00:00:00:00.0";
}

function updateChrono() {

    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);
    let milliPoint = Math.floor(elapsedTime / (1) % 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    milliPoint = String(milliPoint).padStart(1, "0");

    stopwatch_display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}.${milliPoint}`;
}

const display = document.getElementById("display");

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error"
    }
}

/* MOVING BOX START */

const myBoxMove = document.getElementById("myBoxMove");

document.addEventListener("keydown", even => {
    myBoxMove.textContent = "😳";
    myBoxMove.style.backgroundColor = "hsl(0, 90%, 60%)";
}
);

document.addEventListener("keyup", even => {
    myBoxMove.textContent = "😃";
    myBoxMove.style.backgroundColor = "hsl(208, 90%, 60%)";
}
);

let moveAmount = 10;
let x = 0;
let y = 0;

document.addEventListener("keydown", even => {

    if (event.key.startsWith("Arrow")) {

        event.preventDefault();
        switch (event.key) {
        case "ArrowUp":
            y -= moveAmount;
            break;
        case "ArrowDown":
            y += moveAmount;
            break;
        case "ArrowLeft":
            x -= moveAmount;
            break;
        case "ArrowRight":
            x += moveAmount;
            break;
        }
        myBoxMove.style.top = `${y}px`;
        myBoxMove.style.left = `${x}px`;
    }

}
);

/* MOVING BOX END */

/* IMAGE SLIDER START */

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

initializeSlider();
// document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 5000);
    }
}

function showSlide(index) {

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    }
    );
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}

/* IMAGE SLIDER END */

// ROCK-PAPER-SCISSORS START

const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let computerScore = 0;
let playerScore = 0;

function playGame(playerChoice) {

    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "It's a tie!"
    } else {
        switch (playerChoice) {
        case "rock":
            result = (computerChoice === "scissors") ? "You Win!" : "You Lose!";
            break;
        case "paper":
            result = (computerChoice === "rock") ? "You Win!" : "You Lose!";
            break;
        case "scissors":
            result = (computerChoice === "paper") ? "You Win!" : "You Lose!";
            break;
        }
    }

    playerDisplay.textContent = `Player: ${playerChoice}`;
    computerDisplay.textContent = `Computer: ${computerChoice}`;
    resultDisplay.textContent = `${result}`;

    resultDisplay.classList.remove("greenText", "redText", "blueText");

    switch (result) {
    case "You Win!":
        resultDisplay.classList.add("greenText");
        playerScoreDisplay.classList.add("greenText");
        playerScore++;
        playerScoreDisplay.textContent = playerScore;
        break;
    case "You Lose!":
        resultDisplay.classList.add("redText");
        computerScoreDisplay.classList.add("redText");
        computerScore++;
        computerScoreDisplay.textContent = computerScore;
        break;
    case "It's a tie!":
        resultDisplay.classList.add("blueText");
    }

}

// ROCK-PAPER-SCISSORS END
