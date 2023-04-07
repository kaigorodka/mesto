export class Card {
  constructor(data, templateSelector, openImgPopup, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openImgPopup = openImgPopup;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _getElementImage() {
    const elementImage = this._element.querySelector(".element__image");
    return elementImage;
  }
  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._getElementImage();
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
  _setEventListeners() {
    this._element
      .querySelector(".like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._elementImage.addEventListener("click", () => {
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
