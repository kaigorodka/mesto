import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import "./pages/index.css";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { validationConfig } from "./validationConfig.js";
import { initialCards } from "./initialCards.js";

// открытие img-popup
const selectorOfImgPopup = ".img-popup";
function handleCardClick({ name, link }) {
  const newPopupWithImage = new PopupWithImage(selectorOfImgPopup);
  newPopupWithImage.open({
    name,
    link,
  });
  newPopupWithImage.setEventListeners();
}

//валидация форм
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const validationEditForm = new FormValidator(validationConfig, formEditProfile);
validationEditForm.enableValidation();

const popupNewItem = document.querySelector("#popup_new-item");
const formAddCard = popupNewItem.querySelector(".popup__form");
const validationAddCardForm = new FormValidator(validationConfig, formAddCard);
validationAddCardForm.enableValidation();

const userInfo = new UserInfo({
  nameElement: ".profile__name",
  statusElement: ".profile__status",
});

//рендер всех карточек на странице
const cardListSelector = ".elements";
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
const buttonOpenEditProfileForm = document.querySelector(".edit-button");
const popupName = formEditProfile.querySelector(".popup__input_type_name");
const popupStatus = formEditProfile.querySelector(".popup__input_type_status");
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

const buttonOpenAddCardForm = document.querySelector(".add-button");
///открытие попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  const newPopup = new Popup("#popup_new-item");
  newPopup.open();
  newPopup.setEventListeners();
});

//создание карточки
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
