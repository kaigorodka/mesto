import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._picture = this._popupElement.querySelector(".img-popup__picture");
    this._pictureTitle = this._popupElement.querySelector(".img-popup__title");
  }
  open({ name, link }) {
    this._picture.src = link;
    this._pictureTitle.textContent = name;
    this._picture.alt = name;
    super.open();
  }
}
