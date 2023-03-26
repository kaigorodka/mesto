export class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

  //показывает класс с ошибкой
  _showInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error_${inputElement.id}-error`
    );
    this._inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  };
  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `.popup__error_${inputElement.id}-error`
    );
    this._inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  // Функция, которая проверяет валидность поля
  _isValid = (inputElement) => {
    if (!this._inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      _showInputError(inputElement);
    } else {
      // Если проходит, скроем
      _hideInputError(inputElement);
    }
  };
  // Функция для валидации по каждому символу
  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._validationConfig.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._validationConfig.submitButtonSelector
    );
    this._toggleButtonState();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        _isValid(inputElement);
        _toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._deleteDisableButton();
    }
  }
  _disableButton() {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  }
  _deleteDisableButton() {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
  enableValidation() {
    this._setEventListeners();
  }
}
