import { Popup } from "./Popup";
export class PopupConfirm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._form = document
      .querySelector(popupSelector)
      .querySelector(".popup__form");
    this._popupSelector = document.querySelector(popupSelector);
    this._handleSubmit = handleSubmit;
    this._cardElement = null;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardElement); //при сабмите удалить карточку.
      this.close();
    });
  }
  open(cardElement) {
    this._cardElement = cardElement;
    super.open();
  }
  close() {
    super.close();
  }
}
