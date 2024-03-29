export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  //показывает класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error_${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error_${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  };

  // Функция, которая проверяет валидность поля
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  };
  // Функция для валидации по каждому символу
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList);
      });
    });
  }
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton();
    } else {
      this._deleteDisableButton();
    }
  };
  disableSubmitButton() {
    this._submitButton.classList.add(this._config.inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "disabled");
    return this._submitButton;
  }
  _deleteDisableButton() {
    this._submitButton.classList.remove(this._config.inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }
  enableValidation() {
    this._setEventListeners();
  }
}
