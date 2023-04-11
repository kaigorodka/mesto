import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "../pages/index.css";
import { Section } from "../components/Section.js";
import { Popup } from "../components/Popup.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { validationConfig } from "../utils/constants.js";
import { initialCards } from "../utils/constants.js";

// открытие img-popup
const selectorOfImgPopup = ".img-popup";
const newPopupWithImage = new PopupWithImage(selectorOfImgPopup);
newPopupWithImage.setEventListeners();
function handleCardClick({ name, link }) {
  newPopupWithImage.open({
    name,
    link,
  });
}
const popupEditProfile = document.querySelector(".popup_edit-profile");
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
function createCard(data) {
  const card = new Card({ data, handleCardClick }, "#new-card");
  const cardElement = card.generateCard();
  return cardElement;
}
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      createCard(data);
      cardList.addItem(createCard(data));
    },
  },
  cardListSelector
);
cardList.renderItems();

//открытие попапа редактирования профиля
const buttonOpenEditProfileForm = document.querySelector(".edit-button");
const popupName = formEditProfile.querySelector(".popup__input_type_name");
const popupStatus = formEditProfile.querySelector(".popup__input_type_status");
//то что происхожит при нажатии сабмита формы
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  callback: (data) => {
    userInfo.setUserInfo(data);
    popupWithFormEditProfile.close();
  },
});
popupWithFormEditProfile.setEventListeners();

buttonOpenEditProfileForm.addEventListener("click", () => {
  popupWithFormEditProfile.open();
  validationEditForm.disableSubmitButton();
  popupName.value = userInfo.getUserInfo().name;
  popupStatus.value = userInfo.getUserInfo().about;
});

//создание карточки
const popupNewCard = "#popup_new-item";
const popupWithFormAddCard = new PopupWithForm({
  popupSelector: popupNewCard,
  callback: (data) => {
    createCard(data);
    cardList.addItemPreend(createCard(data));
  },
});
popupWithFormAddCard.setEventListeners();
const buttonOpenAddCardForm = document.querySelector(".add-button");
///открытие попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  popupWithFormAddCard.open();
  validationAddCardForm.disableSubmitButton();
});
