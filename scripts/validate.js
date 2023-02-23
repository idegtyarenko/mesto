"use strict";

function showInputError (formElement, inputElement, errorMessage, validationParams) {
  const errorElementSelector = '#' + inputElement.name + validationParams.errorIdPostfix;
  const errorElement = formElement.querySelector(errorElementSelector);
  inputElement.classList.add(validationParams.inputErrorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (formElement, inputElement, validationParams) {
  const errorElement = formElement.querySelector('#' + inputElement.name + validationParams.errorIdPostfix);
  inputElement.classList.remove(validationParams.inputErrorClass);
  errorElement.textContent = '';
}

function checkInputValidity (formElement, inputElement, validationParams) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationParams);
  } else {
    hideInputError(formElement, inputElement, validationParams);
  }
}

function hasInvalidInput (inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement, validationParams) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationParams.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(validationParams.inactiveButtonClass);
  }
}

function setValidationListeners (formElement, validationParams) {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  const buttonElement = formElement.querySelector(validationParams.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationParams);
  for (const inputElement of inputList) {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, validationParams);
      toggleButtonState(inputList, buttonElement, validationParams);
    })
  }
}

function enableValidation (validationParams) {
  for (const formElement of document.forms) {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      forms[formElement.name].submitFunction();
      closePopup(evt);
    })
    setValidationListeners(formElement, validationParams);
  }
}

enableValidation(validationParams);
