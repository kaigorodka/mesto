import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import "../pages/index.css";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { validationConfig } from "../utils/constants.js";
import { PopupConfirm } from "../components/PopupConfimation.js";
import { Api } from "../components/ Api.js";

// открытие img-popup
const elementOfImgPopup = ".img-popup";
const newPopupWithImage = new PopupWithImage(elementOfImgPopup);
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
  avatarElement: ".profile__image",
});

//рендер всех карточек на странице
const cardListSelector = ".elements";
function createCard(data) {
  const card = new Card(
    {
      data,
      handleCardClick,
      handleTrashClick: () => {
        newPopupConfirm.open(card);
      },
      handleLikeClick: () => {
        if (card.isLiked() === true) {
          api
            .removeLike(data)
            .then((likes) => {
              card.removeActiveLikeClass();
              card.countLikes(likes);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          api
            .likeThePhoto(data)
            .then((likes) => {
              card.addActiveLikeClass();
              card.countLikes(likes);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    },
    "#new-card",
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
}
const cardList = new Section(
  {
    renderer: (data) => {
      createCard(data);
      cardList.addItem(createCard(data));
    },
  },
  cardListSelector
);

//открытие попапа редактирования профиля
const buttonOpenEditProfileForm = document.querySelector(".edit-button");
const popupName = formEditProfile.querySelector(".popup__input_type_name");
const popupStatus = formEditProfile.querySelector(".popup__input_type_status");
//то что происхожит при нажатии сабмита формы
const popupWithFormEditProfile = new PopupWithForm({
  popupSelector: ".popup_edit-profile",
  callback: (data) => {
    editUserInfo(data);
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
    addNewCard(data);
  },
});
popupWithFormAddCard.setEventListeners();
const buttonOpenAddCardForm = document.querySelector(".add-button");
///открытие попапа добавления карточки
buttonOpenAddCardForm.addEventListener("click", () => {
  popupWithFormAddCard.open();
  validationAddCardForm.disableSubmitButton();
});

// открытие попапа редактирования аватара
const buttonEditAvatar = document.querySelector(".profile__edit");
const elementOfPopupEditAvatar = "#avatar-edit";
const popupEditAvatar = new PopupWithForm({
  popupSelector: elementOfPopupEditAvatar,
  callback: (data) => {
    editUserAvatar(data);
  },
});
buttonEditAvatar.addEventListener("click", () => {
  validationAvatarEditForm.disableSubmitButton();
  popupEditAvatar.open();
});
popupEditAvatar.setEventListeners();
const popupEditAvatarForm = document
  .querySelector(elementOfPopupEditAvatar)
  .querySelector(".popup__form");
const validationAvatarEditForm = new FormValidator(
  validationConfig,
  popupEditAvatarForm
);
validationAvatarEditForm.enableValidation();
// работа с API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-65/",
  headers: {
    authorization: "946c735e-253d-40be-bd13-90c7647e3ddc",
    "Content-Type": "application/json",
  },
});

const elementOfPopupConfirm = "#confirm_popup";
// открытие попапа подтверждения удаления картинки
const newPopupConfirm = new PopupConfirm({
  popupSelector: elementOfPopupConfirm,
  handleSubmit: (card) => {
    handleSubmitApi(card);
  },
});
newPopupConfirm.setEventListeners();
// получение данных пользователя
let userId;

Promise.all([api.getUserInfo(), api.getCardList()])
  .then(([info, cards]) => {
    userId = info._id;
    const userInformation = info;
    userInfo.setUserInfo(userInformation);
    cardList.renderItems(cards);
  })
  .catch((err) => {
    console.log(err);
  });
//редактирование имени и статуса
function editUserInfo(data) {
  popupWithFormEditProfile.renderLoading(true);
  api
    .editUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormEditProfile.renderLoading(false);
    });
}

//редактирование аватара
function editUserAvatar(data) {
  popupEditAvatar.renderLoading(true);
  api
    .editUserAvatar(data)
    .then((item) => {
      userInfo.setUserAvatar(item);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    });
}
// создание карточки
function addNewCard(data) {
  popupWithFormAddCard.renderLoading(true);
  api
    .addNewCard(data)
    .then((item) => {
      cardList.addItemPreend(createCard(item));
      popupWithFormAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupWithFormAddCard.renderLoading("ready");
    });
}

function handleSubmitApi(card) {
  api
    .deleteCard(card)
    .then((res) => {
      console.log(res);
      card.remove();
      newPopupConfirm.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
}
