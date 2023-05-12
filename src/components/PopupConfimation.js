import { Popup } from "./Popup";
export class PopupConfirm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._popupElement = document.querySelector(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._cardElement = null;
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._cardElement); //при сабмите удалить карточку.
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
