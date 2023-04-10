import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._picture = this._popupSelector.querySelector(".img-popup__picture");
    this._pictureTitle = this._popupSelector.querySelector(".img-popup__title");
  }
  open({ name, link }) {
    this._picture.src = link;
    this._pictureTitle.textContent = name;
    super.open();
  }
}
