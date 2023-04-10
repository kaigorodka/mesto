import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import "./pages/index.css";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

// переменные редактирования профиля
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditContainer = popupEditProfile.querySelector(".popup__container");
const buttonOpenEditProfileForm = document.querySelector(".edit-button");

export const profileName = document.querySelector(".profile__name");
export const profileStatus = document.querySelector(".profile__status");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const popupName = formEditProfile.querySelector(".popup__input_type_name");
const popupStatus = formEditProfile.querySelector(".popup__input_type_status");

//переменные попапа добавления карточки
const popupNewItem = document.querySelector("#popup_new-item");
const popupNewItemForm = popupNewItem.querySelector(".popup__form");
const popupNewName = popupNewItemForm.querySelector(".popup__input_type_name");
const popNewStatus = popupNewItemForm.querySelector(
  ".popup__input_type_status"
);
const buttonOpenAddCardForm = document.querySelector(".add-button");

//слушатели кнопок попапа добавления карточки

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

const elements = document.querySelector(".elements");

const formAddCard = popupNewItem.querySelector(".popup__form");
const newPopupName = formAddCard.querySelector(".popup__input_type_name");
const newPopupStatus = formAddCard.querySelector(".popup__input_type_status");
const popupNewItemSubmitButton = popupNewItem.querySelector(
  ".popup__save-button"
);
const elementImage = document.querySelector(".element__image");
const elementTitle = document.querySelector(".element__title");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const selectorOfImgPopup = ".img-popup";
function handleCardClick({ name, link }) {
  const newPopupWithImage = new PopupWithImage(selectorOfImgPopup);
  newPopupWithImage.open({
    name,
    link,
  });
  newPopupWithImage.setEventListeners();
}
const validationEditForm = new FormValidator(validationConfig, formEditProfile);
validationEditForm.enableValidation();

const validationAddCardForm = new FormValidator(validationConfig, formAddCard);
validationAddCardForm.enableValidation();

const cardListSelector = ".elements";

const userInfo = new UserInfo({
  nameElement: ".profile__name",
  statusElement: ".profile__status",
});
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      const card = new Card({ data, handleCardClick }, "#new-card");
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardListSelector
);
cardList.renderItems();

//открытие попапа редактирования профиля
buttonOpenEditProfileForm.addEventListener("click", () => {
  const newPopup = new Popup(".popup_edit-profile");
  newPopup.open();
  newPopup.setEventListeners();
  const userInfo = new UserInfo({
    nameElement: ".profile__name",
    statusElement: ".profile__status",
  });
  popupName.value = userInfo.getUserInfo().name;
  popupStatus.value = userInfo.getUserInfo().about;
});

//то что происхожит при нажатии сабмита формы
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  callback: (data) => {
    userInfo.setUserInfo(data);
    const newPopup = new Popup(".popup_edit-profile");
    newPopup.close();
    validationEditForm.disableSubmitButton();
  },
});
popupWithFormEditProfile.setEventListeners();

///открытие попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  const newPopup = new Popup("#popup_new-item");
  newPopup.open();
  newPopup.setEventListeners();
});

const popupNewCard = "#popup_new-item";

const popupWithFormAddCard = new PopupWithForm({
  popupSelector: popupNewCard,
  callback: (data) => {
    const card = new Card({ data, handleCardClick }, "#new-card");
    const cardElement = card.generateCard();
    cardList.addItemPreend(cardElement);
    validationEditForm.disableSubmitButton();
  },
});
popupWithFormAddCard.setEventListeners();
