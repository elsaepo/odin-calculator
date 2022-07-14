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
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        resetCalc();
        return "☠ DIVIDE 0 ☠";
    };
    return num1 / num2;
}

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
            //numHistory = numHistory.slice(0, (numHistory.length - 1));
        }
        numHistory += convertOperatorToSymbol(input);
    }
    outputHistory.textContent = numHistory;
}

let convertOperatorToSymbol = function(operator) {
    switch (operator) {
        case "add": return "+";
        case "subtract": return "-";
        case "multiply": return "*";
        case "divide": return "/";
        case "equals": return "=";
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


// Button event listeners

buttonNumbers.forEach(button => button.addEventListener("mousedown", function (event) {
    let thisNumber = event.target.getAttribute("id").slice(7);
    if (haveEquated) {
        resetCalc();
    };
    if(numCurrent.match(/[.]/g) && thisNumber === "."){
        return;
    };
    numCurrent += thisNumber;
    outputDisplay.textContent = numCurrent;
}));

buttonOperators.forEach(button => button.addEventListener("mousedown", function (event) {
    let thisOperator = event.target.getAttribute("id").slice(7);
    // If there is nothing to operate on, do nothing
    if (!numCurrent && !numTotal || numTotal === "☠ DIVIDE 0 ☠") {
        return;
    };
    if (haveEquated) {
        numHistory = numTotal;
        haveEquated = false;
    };
    // If numTotal and numCurrent hold numbers, calculate the total before defining the new operator
    if (numTotal !== 0 && numCurrent !== "") {
        numTotal = equateTotal();
        if (numTotal === "☠ DIVIDE 0 ☠"){
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
}));

buttonEquals.addEventListener("mousedown", function () {
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
});

buttonPercentage.addEventListener("mousedown", function(){
    if (outputDisplay.textContent === numTotal.toString()){
        numTotal = numTotal * 100;
        outputDisplay.textContent = `${numTotal}%`
    };
})

// Switches polarity of current variable in main output display
buttonPolarity.addEventListener("mousedown", function(){
    switch(outputDisplay.textContent){
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
});

buttonClear.addEventListener("mousedown", function () {
    resetCalc();
});

buttonBack.addEventListener("mousedown", function(){
    if (outputDisplay.textContent === numCurrent){
        numCurrent = numCurrent.slice(0, numCurrent.length -1)
        outputDisplay.textContent = numCurrent;
    };
})