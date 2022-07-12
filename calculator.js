const buttonNumbers = document.querySelectorAll(".number");
const buttonOperators = document.querySelectorAll(".operator");
const buttonEquals = document.querySelector("#button-equals");
const buttonClear = document.querySelector("#button-clear");
let outputDisplay = document.querySelector("#output");


// Operator functions

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    if (num2 === 0){
        return "CANNOT DIVIDE BY 0";
    };
    return num1 / num2;
}

function operate(operator, num1, num2){
    return operator(num1, num2);
}


let numCurrent = "";
let numTotal = 0;
let currentOperator;

// equalButton is defined as a function so numTotal can be updated through multiple operator presses
let equalButton = function(){
    return operate(window[currentOperator], numTotal, Number(numCurrent));
}


// Button event listeners

buttonNumbers.forEach(button => button.addEventListener("mousedown", function(event){
    let thisNumber = event.target.getAttribute("id").slice(7);
    numCurrent += thisNumber;
    outputDisplay.textContent = numCurrent;
}))

buttonOperators.forEach(button => button.addEventListener("mousedown", function(event){
    let thisOperator = event.target.getAttribute("id").slice(7);
    if (numTotal && numCurrent){
        numTotal = equalButton();
    } else {
        numTotal += Number(numCurrent);
    }
    currentOperator = thisOperator;
    numCurrent = "";
}))

buttonEquals.addEventListener("mousedown", function(){
    // window[...] uses bracket notation to access the method in window. Turns string into function
    numTotal = equalButton();
    numCurrent = "";
    outputDisplay.textContent = numTotal;
})

buttonClear.addEventListener("mousedown", function(){
    numCurrent = "";
    numTotal = 0;
    currentOperator = "";
    outputDisplay.textContent = "";
})