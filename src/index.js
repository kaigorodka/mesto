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
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      popup.classList.remove("popup_opened");
    }
  });
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      popup.classList.remove("popup_opened");
    }
  });
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
//функция открытия попапа редактирования профиля
function openEditProfilePopup() {
  openPopup(popupEditProfile);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
}
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

const createCard = ({ name, link }) => {
  //заполнение карточки
  const element = template.querySelector(".element").cloneNode(true);
  const trash = element.querySelector(".trash-button");
  const elementTitle = element.querySelector(".element__title");
  elementTitle.textContent = `${name}`;
  const elementImage = element.querySelector(".element__image");
  elementImage.src = `${link}`;
  const likeButtonIcon = element.querySelector(".like-button__icon");
  const likeButton = element.querySelector(".like-button");
  elementImage.alt = `${name}`;
  // появление попап картинки
  function openImgPopup() {
    pictureTitle.textContent = `${name}`;
    picture.src = elementImage.src;
    picture.alt = `${name}`;
    openPopup(imgPopup);
  }
  elementImage.addEventListener("click", openImgPopup);
  // лайк
  likeButton.addEventListener("click", function () {
    likeButtonIcon.classList.toggle("like-button__icon_active");
  });
  // удаление
  trash.addEventListener("click", function () {
    element.remove();
  });
  return element;
};
function addCard({ name, link }) {
  elements.prepend(createCard({ name, link }));
}
// все карточки
const addInitialCards = initialCards.forEach((item) => {
  addCard(item);
});
//удаление попап картинки
pictureDeleteIcon.addEventListener("click", removePicture);
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

function submitAddCardForm(evt) {
  evt.preventDefault();
  const newNameValue = newPopupName.value;
  const newStatusValue = newPopupStatus.value;
  addCard({ name: newNameValue, link: newStatusValue });
  closePopup(popupNewItem);
  evt.target.reset();
}
formAddCard.addEventListener("submit", submitAddCardForm);

//ВАЛИДАЦИЯ ФОРМ
const formElement = document.querySelector(validationConfig.formSelector);
const inputElement = formElement.querySelector(validationConfig.inputSelector);
const fieldset = formElement.querySelector(".popup__set");
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};
// Функция для валидации по каждому символу
setEventListeners = (formElement) => {
  const inputList = Array.from(
    document.querySelectorAll(validationConfig.inputSelector)
  ); /// отредактировать класс
  const buttonElement = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    const fieldsetList = Array.from(
      formElement.querySelectorAll(".popup__set")
    );
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_disabled");
  } else {
    buttonElement.classList.remove("popup__save-button_disabled");
  }
}
enableValidation();
