import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor({ popupSelector, callback }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-button");
    this._callback = callback;
    this._inputList = this._popupElement.querySelectorAll(".popup__input");
    this._initialSaveButtonText = this._saveButton.textContent;
  }
  _getInputValues() {
    this._inputsValue = {};
    this._inputList.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }
  close() {
    super.close();
    this._form.reset();
  }
  renderLoading(status) {
    if (status === true) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = this._initialSaveButtonText;
    }
  }
}
