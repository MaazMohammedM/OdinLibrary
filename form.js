let form = document.querySelector('form');

function getErrorMessage(input) {
    let value = input.validity;

    if (value.valueMissing) {
        return `${input.name || input.id} is required`
    }
    if (value.typeMismatch) {
        return `please enter a valid ${input.type}`
    }
    if (value.patternMismatch) {
        return `please enter a valid ${input.pattern}`
    }
    if (value.tooShort) {
        return `Minimum ${input.minLength} characters required`;
    }
    if (value.tooLong) {
        return `Maximum ${input.maxLength} characters allowed`;
    }
    if (value.rangeUnderflow) {
        return `Value must be at least ${input.min}`;
    }
    if (value.rangeOverflow) {
        return `Value must be at most ${input.max}`;
    }
    if (value.stepMismatch) {
        return `Invalid step value`;
    }

    return "";

}

const handleInputValidation = (input) => {

    if (input.type === 'radio') {
        const group = form.querySelectorAll(`input[name="${input.name}"]`);
        const checked = [...group].some(r => r.checked);
        const errorElem =
            input.closest('.formBlock')?.querySelector('.error-text');
        if (checked) {
            errorElem.textContent = '';
        } else {
            errorElem.textContent = 'Required';
            input.focus();
        }
    }

    if (input.type === 'text' || input.type === 'number') {
        const errorElem = input.nextElementSibling;
        if (!(errorElem && errorElem.tagName.toLowerCase() === 'span' && errorElem.classList.contains('error-text'))) return;
        if (input.validity.valid) {
            errorElem.textContent = ''
        } else {
            errorElem.textContent = getErrorMessage(input);
            input.focus();
        }
    }


}





const inputElems = form.querySelectorAll('input');
inputElems.forEach((elem) => {
    elem.addEventListener('input', () => handleInputValidation(elem))
});

export function Validator(){
    let isValid = true;
    inputElems.forEach((elem) => {
        if (!elem.checkValidity()) {
            handleInputValidation(elem);
            isValid = false;
        }
    })
    if (!isValid) return;

    return isValid
}