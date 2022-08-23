class Calulator {

    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.clear();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }

    delete() { //slice toma todo el array, osea devuelve el array menos el ultimo o el valor que se indique
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }

    appendNumber(number) {

        if (number === '.' && this.currentValue.includes('.')) return

        this.currentValue = this.currentValue + number;
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return
        if (this.previousValue !== '') {
            this.compute();
        }
        this.previousValue = this.currentValue;
        this.currentValue = '';
        this.operation = operation
    }

    compute() {

        let calculator = 0;
        let current = parseFloat(this.currentValue);
        let previous = parseFloat(this.previousValue);

        if (isNaN(previous) || isNaN(current)) return

        switch (this.operation) {
            case '+': calculator = current + previous;
                break;
            case '-': calculator = current - previous;
                break;
            case '*': calculator = current * previous;
                break;
            case '÷': calculator = current / previous;
                break;
            default: return;
        }

        this.currentValue = calculator;
        this.previousValue = "";
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        console.log(parseFloat(stringNumber.split('.')[0]))
        const integerNum = parseFloat(stringNumber.split('.')[0])
        const decimal = stringNumber.split('.')[1];

        let integerDisplay
        if (isNaN(integerNum)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerNum.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimal != null) {
            return `${integerDisplay}.${decimal}`;
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        currentValueTextElement.innerText = this.getDisplayNumber(this.currentValue);
        if (this.operation != null) {
            previousValueTextElement.innerText = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`
        } else {
            previousValueTextElement.innerText = "";
        }
    }


}


const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousValueTextElement = document.querySelector('[data-previous-value]');
const currentValueTextElement = document.querySelector('[data-current-value]');

const calculator = new Calulator(previousValueTextElement, currentValueTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})