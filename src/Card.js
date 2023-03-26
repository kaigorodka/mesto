export class Card {
  constructor(data, templateSelector, openImgPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._openImgPopup(this._name, this._link);
      });
    this._element
      .querySelector(".trash-button")
      .addEventListener("click", () => {
        this._handleTrashClick();
      });
  }
  _handleTrashClick() {
    this._element.remove();
  }
  _handleLikeClick() {
    this._element
      .querySelector(".like-button__icon")
      .classList.toggle("like-button__icon_active");
  }
}
