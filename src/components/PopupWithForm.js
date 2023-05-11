import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor({ popupElement, callback }) {
    super(popupElement);
    this._form = document
      .querySelector(popupElement)
      .querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-button");
    this._popupSelector = document.querySelector(popupElement);
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
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (evt) => {
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
    } else if (status === false) {
      this._saveButton.textContent = this._initialSaveButtonText;
    } else {
      this._saveButton.textContent = this._initialSaveButtonText;
    }
  }
}
