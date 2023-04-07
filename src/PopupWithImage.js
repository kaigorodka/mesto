import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector, item) {
    this._popupSelector = document.querySelector(popupSelector);
    this._link = item.link;
    this._name = item.name;
  }
  open() {
    const picture = this._popupSelector.querySelector(".img-popup__picture");
    const pictureTitle = this._popupSelector.querySelector(".img-popup__title");
    pictureTitle.textContent = this._name;
    picture.src = this._link;
    picture.alt = this._name;
    super.open();
  }
}
