let actionables = [];

function useNumber(i) {
    if (actionables.length == 0) {
        actionables.push({
            value: `${i}`,
            type: 'NUMBER'
        })
        updateDisplay();
        return;
    }
    const lastInLine = actionables[actionables.length-1];

    if (lastInLine.type == 'NUMBER') {
        lastInLine.value += `${i}`;
        actionables[actionables.length-1] = lastInLine;
    } else {
        actionables.push({
            value: `${i}`,
            type: 'NUMBER'
        });
    }
    updateDisplay();
}
function useOperator(op) {
    if (actionables.length == 0 && op != '-') {
        return;
    } 
    if (actionables.length == 0 && op == '-') {
        actionables.push({
            value: '-',
            type: 'OPERATOR'
        });
        updateDisplay();
        return;
    }
    const lastInLine = actionables[actionables.length-1];
    if (actionables.length == 1 && lastInLine.value == '-') {
        return;
    }
    if (lastInLine.type == 'NUMBER') {
        actionables.push({
            value: op,
            type: 'OPERATOR'
        });
    } else {
        actionables[actionables.length-1].value = op;
    }
    updateDisplay();
}
function addDot() {
    if (actionables.length == 0) {
        return;
    }
    const lastInLine = actionables[actionables.length-1];
    if (lastInLine.type != 'NUMBER') {
        return;
    }
    if (lastInLine.value.includes('.')) {
        return;
    }
    lastInLine.value += '.';
    updateDisplay();
}


function reset() {
    actionables = [];
    updateDisplay();
}
function updateDisplay() {
    const el = document.getElementById('tela');
    console.log(actionables);
    let fullStr = '';
    for (let index = 0; index < actionables.length; index++) {
        fullStr = fullStr + actionables[index].value + ' ';
    }
    el.textContent = fullStr;
}
function getResult() {
    const el = document.getElementById('tela');
    console.log(actionables);
    if (actionables.length == 0) {
        reset();
        return;
    }
    
    const last = actionables[actionables.length - 1];
    if (last.type === 'OPERATOR') {
        actionables.pop();
    }

    let expression = '';
    for (let i = 0; i < actionables.length; i++) {
        expression += actionables[i].value;
    }

    expression = expression.replace(/x/g, '*');

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        el.textContent = result;
        actionables = [{
            value: result.toString(),
            type: 'NUMBER'
        }];
    } catch (error) {
        el.textContent = 'Error';
        actionables = [];
    }
}



    