const buttonNumbers = document.querySelectorAll(".number");
const buttonOperators = document.querySelectorAll(".operator");
const buttonEquals = document.querySelector("#button-equals");
const buttonClear = document.querySelector("#button-clear");
const buttonBack = document.querySelector("#button-back");
const buttonPercentage = document.querySelector("#button-percentage");
const buttonPolarity = document.querySelector("#button-polarity")
const outputHistory = document.querySelector("#hist-output");
const outputDisplay = document.querySelector("#num-output");

// Operator functions
function add(num1, num2) {
    return num1 + num2;
};
function subtract(num1, num2) {
    return num1 - num2;
};
function multiply(num1, num2) {
    return num1 * num2;
};
function divide(num1, num2) {
    if (num2 === 0) {
        resetCalc();
        return "☠ YIKES ☠";
    };
    return num1 / num2;
};
function operate(operator, num1, num2) {
    return operator(num1, num2);
}

// equateTotal is defined as a function so numTotal can be updated through multiple operator presses
// window[...] uses bracket notation to access the method in window. Turns string into function
let equateTotal = function () {
    return operate(window[currentOperator], numTotal, Number(numCurrent));
}

let resetCalc = function () {
    numHistory = "";
    numCurrent = "";
    numTotal = 0;
    currentOperator = "";
    haveEquated = false;
    outputHistory.textContent = "";
    outputDisplay.textContent = "";
}

// When passed a number or operator, addHistory() will add it in the correct format
let addHistory = function (input) {
    let lastInput = numHistory.toString().slice((numHistory.length - 1));
    let blockArray = ["+", "-", "*", "/"];
    if (Number(input)) {
        numHistory += input;
    } else {
        // Determines if the last input was an operator - if so, replace it with current operator
        if (blockArray.includes(lastInput)) {
            numHistory = `${numTotal}`
        }
        numHistory += convertOperatorToSymbol(input);
    }
    outputHistory.textContent = numHistory;
}

let convertOperatorToSymbol = function (operator) {
    switch (operator) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "*";
        case "divide": return "/";
        case "equals":
        case "Enter":
            return "=";
        default: return operator;
    }
}

let numHistory = "";
let numCurrent = "";
let numTotal = 0;
let lastNumber;
let currentOperator;
// haveEquated determines if the last button press equated a total - number & operator buttons utilise this logic
let haveEquated = false;


// Functions for inputs, called in the event listeners (mousedown and keydown)

const pressNumber = function(event){
    if (numCurrent.length >= 10){
        return;
    }
    // Checking for event.target stops the error thrown if .getAtrribute() is called on a keydown event
    let thisNumber;
    if (event.target){
        thisNumber = event.target.getAttribute("id").slice(7);
    } else {
        thisNumber = event;
    }
    if (haveEquated) {
        resetCalc();
    };
    if (numCurrent.toString().match(/[.]/g) && thisNumber === ".") {
        return;
    };
    numCurrent += thisNumber;
    outputDisplay.textContent = numCurrent;
}

const pressOperator = function(event){
    let thisOperator;
    if (event.target){
        thisOperator = event.target.getAttribute("id").slice(7);
    } else {
        thisOperator = event;
    }
    // If there is nothing to operate on, do nothing
    if (!numCurrent && !numTotal || numTotal === "☠ YIKES ☠") {
        return;
    };
    if (haveEquated) {
        numHistory = numTotal;
        haveEquated = false;
    };
    // If numTotal and numCurrent hold numbers, calculate the total before defining the new operator
    if (numTotal !== 0 && numCurrent !== "") {
        numTotal = equateTotal();
        if (numTotal === "☠ YIKES ☠") {
            resetCalc();
            return;
        };
    } else {
        numTotal += Number(numCurrent);
    };
    currentOperator = thisOperator;
    if (!numHistory) {
        addHistory(numCurrent);
    };
    addHistory(currentOperator);
    outputDisplay.textContent = "";
    numCurrent = "";
}

const pressEquals = function(){
    // If there is nothing to operate on, or no operator selected, do nothing (unless we just equated)
    if (!numCurrent && !haveEquated || !currentOperator) {
        return;
    };
    // Use lastNumber for clicking the equals button multiple times in a row
    // This is a single edge case and bypasses addHistory()
    if (haveEquated === true) {
        numCurrent = lastNumber;
        outputHistory.textContent = `${numTotal}${convertOperatorToSymbol(currentOperator)}${numCurrent}=`;
    } else {
        addHistory(numCurrent);
        addHistory("equals");
    }
    numTotal = equateTotal();
    lastNumber = numCurrent;
    numCurrent = "";
    outputDisplay.textContent = numTotal;
    haveEquated = true;
}

const pressPercentage = function(){
    if (outputDisplay.textContent === numTotal.toString()) {
        numTotal = numTotal * 100;
        outputDisplay.textContent = `${numTotal}%`
    };
}

// Switches polarity of current variable in main output display
const pressPolarity = function(){
    switch (outputDisplay.textContent) {
        case "":
            numCurrent += "-";
            outputDisplay.textContent = numCurrent;
            break;
        case numCurrent.toString():
            numCurrent *= -1;
            outputDisplay.textContent = numCurrent;
            break;
        case numTotal.toString():
            numTotal *= -1;
            outputDisplay.textContent = numTotal;
            break;
        default: return;
    }
}

const pressClear = function(){
    resetCalc();
}

const pressBack = function(){
    if (numCurrent.toString().match(/-[0-9]{1}$/)){
        numCurrent = "";
        outputDisplay.textContent = "";
    }
    if (outputDisplay.textContent === numCurrent.toString()) {
        numCurrent = Number(numCurrent.toString().slice(0, numCurrent.toString().length - 1))
        outputDisplay.textContent = numCurrent;
    };
}

// Button event listeners
buttonNumbers.forEach(button => button.addEventListener("mousedown", event => pressNumber(event)));
buttonOperators.forEach(button => button.addEventListener("mousedown", event => pressOperator(event)));
buttonEquals.addEventListener("mousedown", pressEquals);
buttonPercentage.addEventListener("mousedown", pressPercentage);
buttonPolarity.addEventListener("mousedown", pressPolarity);
buttonClear.addEventListener("mousedown", pressClear);
buttonBack.addEventListener("mousedown", pressBack);

// Keydown event listeners
document.addEventListener("keydown", function (event) {
    if (Number(event.key) || event.key === "0" || event.key === ".") {
        pressNumber(event.key)
    } else {
        switch (event.key) {
            case "+":
                pressOperator("add");
                break;
            case "-":
                pressOperator("subtract");
                break;
            case "*":
                pressOperator("multiply");
                break;
            case "/":
                pressOperator("divide");
                break;
            case "Enter":
            case "=":
                pressEquals()
                break;
            case "Backspace":
                pressBack();
                break;
            case "%":
                pressPercentage();
                break;
            default:
                return;
        }
    }

})
