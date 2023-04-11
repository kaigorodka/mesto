export class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
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
    this._likeButton = this._element.querySelector(".like-button");
    this._likeButtonIcon = this._likeButton.querySelector(".like-button__icon");
    this._;
    this._setEventListeners();
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._element.querySelector(".element__title").textContent = this._name;
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
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
    this._likeButtonIcon.classList.toggle("like-button__icon_active");
  }
}
