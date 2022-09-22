const cardCVC = document.querySelector('.card-backCVC');
const cardNumber = document.querySelector('.card-frontNumber');
const cardName = document.querySelector('.name-date__name');
const cardMonth = document.querySelector('.name-date__date span.month');
const cardYear = document.querySelector('.name-date__date span.year');


const nameInput = document.querySelector('#name');
const numberInput = document.querySelector('#number');
const dateMonthInput = document.querySelector('#dateMonth');
const dateYearInput = document.querySelector('#dateYear');
const cvcInput = document.querySelector('#cc');

const submitBtn = document.querySelector('#submitBtn');

const resets = {
    cardName: 'Jane Appleseed',
    cardNumber: '0000 0000 0000 0000',
    cardMonth: '00',
    cardYear: '00',
    cardCVC: '000'
}

nameInput.addEventListener('input', () => {
    displayCardDetails(nameInput, cardName, resets.cardName);
});

cvcInput.addEventListener('input', () => {
    displayCardDetails(cvcInput, cardCVC, resets.cardCVC, 3);
})

dateMonthInput.addEventListener('input', () => {
    displayCardDetails(dateMonthInput, cardMonth, resets.cardMonth, 2);
})

dateYearInput.addEventListener('input', () => {
    displayCardDetails(dateYearInput, cardYear, resets.cardYear, 2);
})

numberInput.addEventListener('input', event => {
    const number = event.target.value;
    const numberList = []

    for (let i = 0; i < number.length; i+=4) {
        numberList.push(number.slice(i, i+4));
    }
    
    if (event.target.value.length > 0) {
        cardNumber.textContent = numberList.join(' ');
    } else {
        cardNumber.textContent = resets.cardNumber;
        displayError(numberInput);
    }

})


submitBtn.addEventListener('click', makeChecks);




function makeChecks(event) {
    event.preventDefault();
    if (
        validateInputLength(numberInput, 16) && validateInputLength(dateMonthInput, 2) && 
        validateInputLength(dateYearInput, 2) && validateInputLength(cvcInput, 3) && checkInputLength(nameInput)
    ) {
       if (
        checkIfInputIsInteger(numberInput) && checkIfInputIsInteger(dateMonthInput) && 
        checkIfInputIsInteger(dateYearInput) && checkIfInputIsInteger(cvcInput)
        ) {
            console.log('Successful!');
       }  else {
            console.log('Error');
       }
    } else {
        console.log('Not Successful!!1');
    }
}


function displayCardDetails (inputElement, item, resetValue){
    if (checkInputLength) {
        item.textContent = inputElement.value;
        removeError(inputElement);
        return true;
    } else {
        item.textContent = resetValue;
        displayError(inputElement);
        return false;
    }
}


function checkIfInputIsInteger (inputElement) {
    const cardNumberArray = Array.from(inputElement.value);
    if (cardNumberArray.every(value => isFinite(parseInt(value)))) {
        removeError(inputElement);
        return true;
    } else {
        displayError(inputElement);
        return false;
    }
}

function checkInputLength (inputElement) {
    if (inputElement.value.length > 0) {
        return true;
    } else {
        return false;
    }
}

function validateInputLength (inputElement, length) {
    if (inputElement.value.length < length || inputElement.value.length > length) {
        displayError(inputElement);
        return false;
    } else {
        removeError(inputElement);
        return true;
    }
}

function displayError (inputElement) {
    inputElement.classList.remove('active-success');
    inputElement.classList.add('active-error');
    inputElement.parentElement.querySelector('.error').style.display = 'block';
}

function removeError (inputElement) {
    inputElement.classList.add('active-success');
    inputElement.classList.remove('active-error');
    inputElement.parentElement.querySelector('.error').style.display = 'none';
}