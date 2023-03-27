import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
// переменные редактирования профиля
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditContainer = popupEditProfile.querySelector(".popup__container");
const buttonOpenEditProfileForm = document.querySelector(".edit-button");
const buttonCloseEditProfileForm =
  popupEditContainer.querySelector(".close-icon");

const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const popupName = formEditProfile.querySelector(".popup__input_type_name");
const popupStatus = formEditProfile.querySelector(".popup__input_type_status");
//функции открытия и закрытия ВСЕХ попапов
function closePopupAfterEscape(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupAfterEscape);
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupAfterEscape);
}
//функция открытия попапа редактирования профиля
function openEditProfilePopup() {
  openPopup(popupEditProfile);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
}
// слушатель нажатия мимо попапа редактирования профиля
popupEditProfile.addEventListener("click", (evt) => {
  if (evt.target === popupEditProfile) {
    closePopup(popupEditProfile);
  }
});

// обработчик попапа создания новой карточки
function submitEditProfilePopup(evt) {
  evt.preventDefault();
  const nameValue = popupName.value;
  const statusValue = popupStatus.value;
  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;
  closePopup(popupEditProfile);
}
// слушатели открытия,закрытия и сохранения попапа редактирования профиля
formEditProfile.addEventListener("submit", submitEditProfilePopup);
buttonOpenEditProfileForm.addEventListener("click", openEditProfilePopup);
buttonCloseEditProfileForm.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//переменные попапа добавления карточки
const popupNewItem = document.querySelector("#popup_new-item");
const popupNewItemForm = popupNewItem.querySelector(".popup__form");
const popupNewName = popupNewItemForm.querySelector(".popup__input_type_name");
const popNewStatus = popupNewItemForm.querySelector(
  ".popup__input_type_status"
);
const buttonCloseAddCardForm = popupNewItem.querySelector(".close-icon");
const buttonOpenAddCardForm = document.querySelector(".add-button");
//слушатель нажатия мимо попапа создания карточки
popupNewItem.addEventListener("click", (evt) => {
  if (evt.target === popupNewItem) {
    closePopup(popupNewItem);
  }
});
//слушатели кнопок попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  openPopup(popupNewItem);
});
buttonCloseAddCardForm.addEventListener("click", closeAddCardForm);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const template = document.querySelector("#new-card").content;
const elements = document.querySelector(".elements");

const imgPopup = document.querySelector(".img-popup");
const imgPopupContainer = imgPopup.querySelector(".img-popup__container");
const picture = imgPopupContainer.querySelector(".img-popup__picture");
const pictureTitle = imgPopupContainer.querySelector(".img-popup__title");
const pictureDeleteIcon = imgPopupContainer.querySelector(".close-icon");

// появление попап картинки
function openImgPopup(name, link) {
  pictureTitle.textContent = name;
  picture.src = link;
  picture.alt = name;
  openPopup(imgPopup);
}
function createCard(item) {
  const card = new Card(item, "#new-card", openImgPopup);
  const cardElement = card.generateCard();
  return cardElement;
}
function addCard(item) {
  elements.prepend(createCard(item));
}

//удаление попап картинки
pictureDeleteIcon.addEventListener("click", removePicture);
imgPopup.addEventListener("click", (evt) => {
  if (evt.target === imgPopup) {
    closePopup(imgPopup);
  }
});
function removePicture() {
  closePopup(imgPopup);
}
function closeAddCardForm() {
  closePopup(popupNewItem);
  popupNewName.value = "";
  popNewStatus.value = "";
}
const formAddCard = popupNewItem.querySelector(".popup__form");
const newPopupName = formAddCard.querySelector(".popup__input_type_name");
const newPopupStatus = formAddCard.querySelector(".popup__input_type_status");
const popupNewItemSubmitButton = popupNewItem.querySelector(
  ".popup__save-button"
);
function submitAddCardForm(evt) {
  evt.preventDefault();
  const newNameValue = newPopupName.value;
  const newStatusValue = newPopupStatus.value;
  addCard({ name: newNameValue, link: newStatusValue });
  closePopup(popupNewItem);
  evt.target.reset();
  validationAddCardForm.disableSubmitButton();
}
formAddCard.addEventListener("submit", submitAddCardForm);

initialCards.forEach((item) => {
  elements.append(createCard(item));
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const validationEditForm = new FormValidator(validationConfig, formEditProfile);
validationEditForm.enableValidation();

const validationAddCardForm = new FormValidator(validationConfig, formAddCard);
validationAddCardForm.enableValidation();
