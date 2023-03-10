//ВАЛИДАЦИЯ ФОРМ
const formElement = document.querySelector(".popup__form");
const inputElement = formElement.querySelector(".popup__input");
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(
    `.popup__error_${inputElement.id}-error`
  );
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(
    `.popup__error_${inputElement.id}-error`
  );
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, validationConfig);
  }
};
// Функция для валидации по каждому символу
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}
const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
