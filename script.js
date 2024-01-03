const number = document.querySelectorAll('.number');
const operator = document.querySelectorAll('.operator');
const allCLear = document.querySelector('.all-clear');
const clear = document.querySelector('.clear');
const result = document.querySelector('.result');
const floatPoint = document.querySelector('.float-point');
const currentText = document.querySelector('.current-text');
const resultText = document.querySelector('.result-text');

let calculation = [];
let indexC = 0;
let newNumber = false;
let ans = 0;
let recalculate = false;
let ansState = 0;

number.forEach(button => {
    calculation[indexC] = 0;

    button.addEventListener('click', function(){
        if(ansState == 1 && indexC == 1) {
            ClearResult();
        }
        if(calculation[indexC] == '0'){
            calculation[indexC] = this.textContent
        }
        else {
            calculation[indexC] = (calculation[indexC] || '') + this.textContent;
            newNumber = false;
        }
        currentText.textContent = calculation.join(' ');
        recalculate = false;
    });
});

operator.forEach(button => {
    button.addEventListener('click', function() {
        if(newNumber === true) {
            calculation[indexC - 1] = this.textContent;
        }
        else if (newNumber === false) {
            calculation.push(this.textContent);
            indexC += 2;
            newNumber = true;
        }
        currentText.textContent = calculation.join(' ');
        recalculate = false;
    });
});

clear.addEventListener('click', function() {
    if(ansState == 1 && indexC == 1) {
        ClearResult();
    }
    else {
        if(newNumber === true) {
            calculation.pop();
            newNumber = false;
            indexC -= 2;
        }
        else {
            if(calculation[indexC].length > 0) {
                calculation[indexC] = calculation[indexC].slice(0, -1);
            }
    
            if(indexC > 0 && calculation[indexC] == '')
            {
                newNumber = true;
                calculation.pop();
            }
            else if(calculation[0] == '')
            {
                calculation[0] = '0';
            }
        }
        currentText.textContent = calculation.join(' ');
    }

});

allCLear.addEventListener('click', function() {
    ClearResult();
    resultText.textContent = '';
});

floatPoint.addEventListener('click', function() {
    if (newNumber === false && calculation[indexC] && calculation[indexC].length > 0) {
            if (!calculation[indexC].includes(".")) {
                calculation[indexC] = calculation[indexC] + this.textContent;
            }    
    }
    currentText.textContent = calculation.join(' ');
});

result.addEventListener('click', function() {
    if(recalculate === false) {
        let conversion = calculation.slice();
        let changeX = conversion.indexOf('x');

        if(changeX !== -1) {
            conversion[changeX] = '*';

            ans = eval(conversion.join(' '));
            ans = parseFloat(ans.toFixed(5));

            conversion[changeX] = 'x';
        }
        else {
            ans = eval(conversion.join(' '));
            ans = parseFloat(ans.toFixed(5));
        }
        conversion.push(this.textContent);
        resultText.textContent = conversion.join(' ');
        recalculate = true;
        currentText.textContent = ans;
        calculation = [];
        calculation[0] = ans;
        indexC = 1;
        ansState = 1;
    }

});

function ClearResult() {
    calculation = [];
    indexC = 0;
    calculation[indexC] = 0;
    newNumber = false;
    recalculate = false;
    currentText.textContent = calculation.join(' ');
}