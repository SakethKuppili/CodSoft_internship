var operators = ["+", "-", "/", "*"];

var box = null;
var lastOperationHistory = null;
var operator = null;
var equal = null;
var dot = null;

var firstNum = true;

var numbers = [];
var operatorValue;
var lastButton;
var calcOperator;

var total;

var keyCombination = [];

function buttonNumber(button) {

    operator = document.getElementsByClassName("operator");
    box = document.getElementById("output-box");
    lastOperationHistory = document.getElementById("last-operation-history");
    equal = document.getElementById("equal-sign").value;
    dot = document.getElementById("dot").value;
    
    lastButton = button;

    // if button is not an operator or = sign
    if (!operators.includes(button) && button!=equal){
        // if it is the first button clicked
        if (firstNum){
            // and it's a dot, show 0.
            if (button == dot){
                box.innerText = "0"+dot;
            }
            // else clear box and show the number
            else {
                box.innerText = button;
            }
            firstNum = false;
        }
        else {

            // return if the box value is 0
            if (box.innerText.length == 1 && box.innerText == 0){

                if (button == dot){
                    box.innerText += button;
                }
                return;
            }
            // return if the box already has a dot and clicked button is a dot
            if (box.innerText.includes(dot) && button == dot){
                return;
            }
            // maximum allowed numbers inputted are 20
            if (box.innerText.length == 20){
                return;
            }

            // if pressed dot and box already has a - sign, show -0.
            if (button == dot && box.innerText == "-"){
                box.innerText = "-0"+dot;
            }
            // else append number
            else {
                box.innerText += button;
            }  
        }
    }
    // if it's an operator or = sign
    else {

        // return if operator is already pressed
        if (operatorValue != null && button == operatorValue){
            return;
        }

        // show minus sign if it's the first value selected and finally return
        if (button == "-" && box.innerText == 0){
            box.innerText = button;
            firstNum = false;
            operatorValue = button;
            showSelectedOperator();
            return;
        }
        // return if minus operator pressed and it's already printed on screen 
        else if (operators.includes(button) && box.innerText == "-"){
            return;
        }
        // return if minus operator pressed and history already has equal sign
        else if (button == "-" && operatorValue == "-" && lastOperationHistory.innerText.includes("=")){
            return;
        }

        // set value of operator if it's one
        if (operators.includes(button)){
            if (typeof lastOperator != "undefined" && lastOperator != null){
                calcOperator = lastOperator;
            }
            else {
                calcOperator = button;
            }
            if (button == "*"){
                lastOperator = "×";
            }
            else if (button == "/"){
                lastOperator = "÷";
            }
            else {
                lastOperator = button;
            }
            operatorValue = button;
            firstNum = true;
            showSelectedOperator();
        }

        // add first number to numbers array and show it on history
        if (numbers.length == 0){
            numbers.push(box.innerText);
            if (typeof lastOperator != "undefined" && lastOperator != null){
                lastOperationHistory.innerText = box.innerText + " " + lastOperator;
            }
        }
        // rest of calculations
        else {   
            if (numbers.length == 1){
                numbers[1] = box.innerText;
            }
            var tempNum = box.innerText;

            // calculate total
            if (button==equal && calcOperator != null){
                var total = calculate(numbers[0], numbers[1], calcOperator);
                box.innerText = total;

                // append second number to history
                if (!lastOperationHistory.innerText.includes("=")){
                    lastOperationHistory.innerText += " " + numbers[1] + " =";
                }

                tempNum = numbers[0];

                numbers[0] = total;
                operatorValue = null;
                showSelectedOperator();

                // replace first number of history with the value of total
                var historyArr = lastOperationHistory.innerText.split(" ");
                historyArr[0] = tempNum;
                lastOperationHistory.innerText = historyArr.join(" ");
            }
            // update history with the value on screen and the pressed operator
            else if (calcOperator != null) {
                 lastOperationHistory.innerText = tempNum + " " + lastOperator;
                 calcOperator = button;
                 numbers = [];
                 numbers.push(box.innerText);
            }
        }
    }

}
 // highlight operator button when selected
function showSelectedOperator(){

    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    if (operatorValue == "+"){
        document.getElementById("plus-op").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "-"){
        document.getElementById("sub-op").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "*"){
        document.getElementById("multi-op").style.backgroundColor  = "#ffd11a";
    }
    else if (operatorValue == "/"){
        document.getElementById("div-op").style.backgroundColor  = "#ffd11a";
    }
}

// function to calculate the result using two number and an operator
function calculate(num1, num2, operator){

    if (operator === "+"){
        total = parseFloat(num1) + parseFloat(num2);
    }
    else if (operator === "-"){
        total = parseFloat(num1) - parseFloat(num2);
    }
    else if (operator === "*"){
        total = parseFloat(num1) * parseFloat(num2);
    }
    else if (operator === "/"){
        total = parseFloat(num1) / parseFloat(num2);
    }
    else {
        if (total == box.innerText){
            return total;
        }
        else {
            return box.innerText;
        }
    }
    // if total is not integer, show maximum 12 decimal places
    if (!Number.isInteger(total)){
        total = total.toPrecision(12);
    }
    return parseFloat(total);
}

// function to clear box and reset everything
function buttonClear(){
    window.location.reload();
}

function backspaceRemove(){

    box = document.getElementById("output-box");
    var elements = document.getElementsByClassName("operator");

    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }

    var lastNum = box.innerText;
    lastNum = lastNum.slice(0, -1);
    
    box.innerText = lastNum;

    // show 0 zero if all characters on screen are removed
    if (box.innerText.length == 0){
        box.innerText = 0;
        firstNum = true;
    }

}


// function to change the sign of the number currently on screen
function plusMinus(){
    box = document.getElementById("output-box");

    // if any operator is already pressed
    if (typeof lastOperator != "undefined"){
        if (numbers.length>0){
            // if last button pressed is an operator
            if (operators.includes(lastButton)){
                // if the displayed text is just a negative sign, replace it with a 0
                if (box.innerText == "-"){
                    box.innerText = 0;
                    firstNum = true;
                    return;
                }
                // if the displayed text is not a just a negative sign, replace it with a negative sign
                else {
                    box.innerText = "-";
                    firstNum = false;
                }
            }
            // if last button pressed is not an operator, change its sign
            else {
                box.innerText = -box.innerText;

                if (numbers.length==1){
                    numbers[0] = box.innerText;
                }
                else {
                    numbers[1] = box.innerText;
                }
            }
        }
        return;
    }

    // if displayed text is 0, replace it with a negative sign
    if (box.innerText == 0){
        box.innerText = "-";
        firstNum = false;
        return;
    }
    box.innerText = -box.innerText;
}

// function to calculate square root of the number currently on screen
function squareRoot(){
    box = document.getElementById("output-box");
    var squareNum = Math.sqrt(box.innerText);
    box.innerText = squareNum;
    numbers.push(squareNum);
}

// function to calculate the division of 1 with the number currently on screen
function divisionOne(){
    box = document.getElementById("output-box");
    var squareNum = 1 / box.innerText;
    box.innerText = squareNum;
    numbers.push(squareNum);
}

// function to calculate the power of the number currently on screen
function powerOf(){
    box = document.getElementById("output-box");
    var squareNum = Math.pow(box.innerText, 2);
    box.innerText = squareNum;
    numbers.push(squareNum);
}

// function to calculate the percentage of a number
function calculatePercentage(){
    var elements = document.getElementsByClassName("operator");
    box = document.getElementById("output-box");

    if (numbers.length > 0 && typeof lastOperator != "undefined"){

        var percValue = ((box.innerText / 100) * numbers[0]);
        if (!Number.isInteger(percValue)) {
            percValue = percValue.toFixed(2);
        }
        box.innerText = percValue;
        numbers.push(box.innerText);
    
        // append second number to history
        if (!lastOperationHistory.innerText.includes("=")){
            lastOperationHistory.innerText += " " + numbers[1] + " =";
        }
    }
    else {
        box.innerText = box.innerText / 100;
    }

    numbers.push(box.innerText);
    var res = calculate(numbers[0], numbers[1], lastOperator);
    box.innerText = res;
    operatorValue = "=";

    // deselect operator if any selected
    for (var i=0; i<elements.length; i++){
        elements[i].style.backgroundColor  = "#e68a00";
    }
}

// function to clear last number typed into the display
function clearEntry(){
    box = document.getElementById("output-box");

    if (numbers.length > 0 && typeof lastOperator != "undefined"){
        box.innerText = 0;
        var temp = numbers[0];
        numbers = [];
        numbers.push(temp);
        firstNum = true;
    }
}

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyReleased);

// function to capture keydown events
function keyPressed(e) {
    e.preventDefault();
    var equal = document.getElementById("equal-sign").value;
    var dot = document.getElementById("dot").value;

    if (e.key == "Delete"){
        buttonClear();
        return;
    }

    var isNumber = isFinite(e.key);
    var enterPress;
    var dotPress;
    var commaPress = false;

    if (e.key == "Enter"){
        enterPress = equal;
    }
    if (e.key == "."){
        dotPress = dot;
    }
    if (e.key == ","){
        commaPress = true;
    }
    
    if (isNumber || operators.includes(e.key) || e.key == "Enter" || e.key == dotPress || 
        commaPress || e.key == "Backspace"){
        if (e.key == "Enter"){
            buttonNumber(enterPress);
        }
        else if (e.key == "Backspace"){
            document.getElementById("backspace-btn").style.backgroundColor  = "#999999";
            backspaceRemove();
        }
        else if (commaPress){
            buttonNumber(dot);
        }
        else {
            buttonNumber(e.key);
        }   
    }
    if (e.key) {
        keyCombination[e.code] = e.key;
    }
}

// function to capture keyup events
function keyReleased(e){
    if (keyCombination['ControlLeft'] && keyCombination['KeyV']) {
        navigator.clipboard.readText().then(text => {
            box = document.getElementById("output-box");
            var isNumber = isFinite(text);
            if (isNumber){
                var copyNumber = text;
                firstNum = true;
                buttonNumber(copyNumber);
            }
        }).catch(err => {
            console.error('Failed to read clipboard contents: ', err);
        });
    }
    if (keyCombination['ControlLeft'] && keyCombination['KeyC']) {
        box = document.getElementById("output-box");
        navigator.clipboard.writeText( box.innerText);
    }
    keyCombination = [];
    e.preventDefault();
    // set the color of the backspace button back to its original
    if (e.key == "Backspace"){
        document.getElementById("backspace-btn").style.backgroundColor  = "#666666";
    }
}
