export class Card {
  constructor(
    { data, handleCardClick, handleTrashClick, handleLikeClick },
    templateSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._numbers = data.likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._cardId = data._id;
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
    this._setEventListeners();

    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._likeCounter =
      this._element.querySelector(".element__numbers").textContent;
    this._element.querySelector(".element__title").textContent = this._name;
    this._numbers;
    this._trashButton = this._element.querySelector(".trash-button");
    if (this._userId !== this._ownerId) {
      this._trashButton.remove();
    }
    this._checkLikedOrNot();
    return this._element;
  }
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick({ likes: this._numbers });
    });

    this._elementImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
    this._element
      .querySelector(".trash-button")
      .addEventListener("click", () => {
        this._handleTrashClick({
          name: this._name,
          link: this._link,
          id: this._cardId,
        });
      });
  }
  _checkLikedOrNot() {
    this._likeCounter = this._numbers.length;
    if (this.isLiked()) {
      this.addActiveLikeClass();
    }
  }
  isLiked() {
    return this._numbers.some((element) => {
      element._id === this._userId;
    });
  }
  removeActiveLikeClass() {
    this._likeButtonIcon.classList.remove("like-button__icon_active");
  }
  addActiveLikeClass() {
    this._likeButtonIcon.classList.add("like-button__icon_active");
  }
  countLikes(quantity) {
    this._numbers = quantity.likes;
  }
  remove() {
    this._element.remove();
  }
}
