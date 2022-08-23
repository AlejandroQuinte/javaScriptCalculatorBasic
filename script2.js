class Calculator {
    constructor(currentValueTextElement, previousValueTextElement) {
        this.currentValue = currentValueTextElement.textContent;
        this.previousValue = previousValueTextElement.textContent;
        //this.clear();
    }

    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && currentValueTextElement.textContent.includes('.')) return
        this.currentValue = this.currentValue + number;
    }

    chooseOperation(operation) {
        if (this.currentValue === '') return

        if (this.previousValue != '') {
            this.compute();
        }

        this.previousValue = this.currentValue;
        this.currentValue = "";
        this.operation = operation;
    }


    delete() {
        this.currentValue = currentValueTextElement.textContent.slice(0, -1);
    }



    compute() {
        let computation = 0;
        let current = parseFloat(this.currentValue);
        let previous = parseFloat(this.previousValue);

        switch (this.operation) {
            case '+': computation = previous + current;
                break;
            case '-': computation = previous - current;
                break;
            case '*': computation = previous * current;
                break;
            case '÷': computation = previous / current;
                break;
        }

        this.currentValue = computation;
        this.previousValue = '';
        this.operation = undefined;
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerNum = parseFloat(stringNumber.split('.')[0]);
        const decimalNum = stringNumber.split('.')[1];

        let displayNum
        if (isNaN(integerNum)) {
            displayNum = '';
        } else {
            displayNum = integerNum.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalNum != null) {
            displayNum = `${displayNum}.${decimalNum}`
        }
        return displayNum

    }



    updateLayout() {
        currentValueTextElement.innerText = this.getDisplayNumber(this.currentValue);
        if (this.operation != null) {
            previousValueTextElement.innerText = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`;
        } else {
            previousValueTextElement.innerText = '';
        }
    }
}


const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');
const currentValueTextElement = document.querySelector('[data-current-value]')
const previousValueTextElement = document.querySelector('[data-previous-value]')

const calculator = new Calculator(currentValueTextElement, previousValueTextElement);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateLayout();
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateLayout();
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateLayout();
})

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateLayout();
})
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateLayout();
})