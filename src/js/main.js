'use strict';

const billElem = document.querySelector('#bill');
const peopleElem = document.querySelector('#people');
const customTipElem = document.querySelector('#custom-tip');
const numberElems = document.querySelectorAll('.num-input');
const resultTipElem = document.querySelector('#result-tip');
const resultTotalElem = document.querySelector('#result-total');


function validateInput(val) {
    const value = parseFloat(val);
    return (value !== Infinity && value > 0) ? value : 0;
}

function tip() {
    // Get selected or custom tip.
    const checkedTip = document.querySelector(':checked');
    const tipValue = checkedTip ? checkedTip.value : customTipElem.value;

    // Validate tip and convert to decimal for the calculation.
    return validateInput(tipValue) * 0.01;
}

function calculate() {

    const bill = validateInput(billElem.value);
    const people = validateInput(peopleElem.value);

    if (people < 1 || bill <= 0) {
        // Both bill and people need to be present for the calculation.
        resetResults();
        return;
    }

    const tipAmount = bill * tip();

    if (tipAmount > 0 || resultTipElem.textContent > 0) {
        // Update tip when it has a value or reset previous.
        setResult(resultTipElem, (tipAmount / people));
    }

    // Update total.
    const totalPerPerson = (bill + tipAmount) / people;
    setResult(resultTotalElem, totalPerPerson);
}

// Update result value.
function setResult(elem, value = 0) {
    elem.textContent = value.toFixed(2);
}

// Clear custom tip.
function resetCustom() {
    customTipElem.value = '';
}

// Clear all number inputs.
function resetNumbers() {
    numberElems.forEach(function (nElem) {
        nElem.value = '';
    });
}

// Clear tip input.
function resetRadio() {
    const checkedElem = document.querySelector(':checked');

    if (checkedElem) {
        checkedElem.checked = false;
    }
}

// Reset results only when there's a value (not zero).
// Keeping DOM updates to a minimal for aria-live.
function resetResults() {
    if (resultTipElem.textContent > 0) {
        setResult(resultTipElem, 0);
    }
    if (resultTotalElem.textContent > 0) {
        setResult(resultTotalElem, 0);
    }
}

// Clear form input and result.
function resetAll() {

    resetNumbers();

    resetRadio();

    resetResults();
}

document.addEventListener('input', function (evt) {

    // "Focus" only on one tip input.
    if (evt.target.id === 'custom-tip') {
        resetRadio();
    } else if (evt.target.id.startsWith('tip-')) {
        resetCustom();
    }

    // Calculate result.
    calculate();

}, false);

document.addEventListener('click', function (evt) {

    if (evt.target.value !== 'reset') {
        return;
    }

    evt.preventDefault();

    // Clear form input and result.
    resetAll();

}, false);
