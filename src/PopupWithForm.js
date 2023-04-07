import { Popup } from "./Popup";
export class PopupWithForm extends Popup {
  constructor(popupSelector, callback) {
    this._popupSelector = popupSelector;
    this._callback = callback;
  }
  _getInputValues({ name, link }) {
    const newNameValue = this._popupSelector.querySelector(
      ".popup__input_type_name"
    ).value;
    const newStatusValue = this._popupSelector.querySelector(
      ".popup__input_type_status"
    ).value;
    newNameValue = name;
    newStatusValue = link;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector
      .querySelector(".popup__form")
      .addEventListener("submit", this._callback);
  }
  close() {
    super.close();
    evt.target.reset();
  }
}
