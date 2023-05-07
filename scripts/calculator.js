const upperDisp = document.querySelector('.upper-display')
const lowerDisp = document.querySelector('.lower-display')
const buttons = document.querySelectorAll('.keyboard button')
const binaryOperators = ['÷', '×', '-', '+']
let currentNumber = ''
let wholeEquation = ''
let evaluated = false
let divBy0Error = false

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        clicked(button.dataset.value)
    })
})

const clicked = (character) => {
    if (divBy0Error) {
        clearAll()
        divBy0Error = false
    }

    if (evaluated) {
        wholeEquation = ''
        writeToDisplay()
    }

    switch (true) {
        case (character === 'C'):
            clearAll();
            break;
        case (character === '+/-'):
            changeSign();
            break;
        case (character == '='):
            evaluate();
            break;
        case character === 'DEL':
            deleteSign();
            break;
        case binaryOperators.includes(character):
            binaryOperation(character)
            break;
        case character >= '0' && character <= '9':
            if (evaluated) {
                currentNumber =''
            }
            appendDigit(character)
            break;
        case character ==='.':
            addComa()
            break;
        case character === '%':
            percentSign()
            break;
    }

    if (character !== '=') {
        evaluated = false
    }
    writeToDisplay()
}

const clearAll = ()=> {
    currentNumber = ''
    wholeEquation = ''
    writeToDisplay();
    return
}

const deleteSign = () => {
    currentNumber = currentNumber.slice(0,-1)
    if (currentNumber === '-') {
        currentNumber = ''
    }
    return
}

const writeToDisplay = () => {
    if (evaluated) {
        upperDisp.innerText = wholeEquation + '='
    }
    else {
        upperDisp.innerText = wholeEquation
    }
    lowerDisp.innerText = currentNumber
    return
}

const appendDigit = (newNumber) => {
    currentNumber = currentNumber + newNumber
    return
}

const binaryOperation = (operator) => {
    if (currentNumber === '' && wholeEquation === '') {
        return
    }
    else if (currentNumber === '' && wholeEquation !== '') {
        if (binaryOperators.includes(wholeEquation.slice(-1))) {
            wholeEquation = wholeEquation.slice(0,-1) + operator
        }
        else {
            wholeEquation = wholeEquation + operator
        }
        return
    }
    else if (currentNumber !== '')
    {
        if (evaluated) {
            wholeEquation = parseFloat(currentNumber).toString() + operator
            evaluated = false
        }
        else if (currentNumber.includes('%')) {
            wholeEquation = wholeEquation + parseFloat(currentNumber.replace('%','')).toString()+'%' + operator
        }
        else {
            wholeEquation = wholeEquation + parseFloat(currentNumber).toString() + operator
        }
        currentNumber = ''
        return
    }
}

const evaluate = () => {
    // catch "divide by 0" error
    if (wholeEquation.slice(-1) === '÷' && parseFloat(currentNumber) == 0) {
        clearAll()
        divBy0Error = true
        currentNumber = 'Cannot divide by 0'
        return
    }
    if (currentNumber.slice(-1) === '.')
    {
        currentNumber = currentNumber.slice(0,-1)
    }
    wholeEquation = (wholeEquation + currentNumber).replace('.%','%')
    currentNumber = eval(wholeEquation.replace('÷', '/').replace('×', '*'). replace('%','/100')).toString()
    evaluated = true
    return
}

const addComa = () => {
    if (currentNumber.includes('.')) {
        return
    }
    else if (currentNumber === '') {
        currentNumber = '0.'
    }
    else {
        currentNumber = currentNumber + '.'
    }
    return
}

const changeSign = () => {
    if (currentNumber === '' || parseFloat(currentNumber) == 0) {
        return
    }
    else {
        currentNumber = (-parseFloat(currentNumber)).toString()
        return
    }
}

const percentSign = () => {
    if (currentNumber ==='') {
        return
    }
    else if (currentNumber.includes('%')) {
        currentNumber = currentNumber.replace('%','')
    }
    else {
        currentNumber = currentNumber + '%'
    }
    return
}