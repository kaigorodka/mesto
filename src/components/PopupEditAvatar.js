import { Popup } from "./Popup";
export class PopupEditAvatar extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._form = document
      .querySelector(popupSelector)
      .querySelector(".popup__form");
    this._saveButton = this._form.querySelector(".popup__save-button");
    this._popupSelector = document.querySelector(popupSelector);
    this._handleSubmit = handleSubmit;
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");
  }
  _getInputValues() {
    debugger;
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
      this._handleSubmit(this._getInputValues());
    });
  }
  close() {
    super.close();
  }
  renderLoading(status) {
    if (status === true) {
      this._saveButton.textContent = "Сохранение...";
    } else {
      this._saveButton.textContent = "Сохранить";
    }
  }
}
