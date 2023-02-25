const popup = document.querySelectorAll(".popup");
const editButton = document.querySelector(".edit-button");
const closeIcon = document.querySelector(".close-icon");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
function openClassAdd() {
  popup[0].classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
}
editButton.addEventListener("click", openClassAdd);
function openClassRemove() {
  for (let i = 0; i < popup.length; ++i) {
    popup[i].classList.remove("popup_opened");
  }
}
closeIcon.addEventListener("click", openClassRemove);
const popupNewItem = document.querySelector("#popup_new-item");
const newItemCloseIcon = popupNewItem.querySelector(".close-icon");
const addButton = document.querySelector(".add-button");

addButton.addEventListener("click", openClassNewItem);
function openClassNewItem() {
  popupNewItem.classList.add("popup_opened");
}
newItemCloseIcon.addEventListener("click", openClassRemove);
const popupForm = document.querySelector(".popup__form");
const popupName = popupForm.querySelector(".popup__input_type_name");
const popupStatus = popupForm.querySelector(".popup__input_type_status");

function handleFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = popupName.value;
  const statusValue = popupStatus.value;
  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;
  openClassRemove();
}
popupForm.addEventListener("submit", handleFormSubmit);

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
const newCard = ({ name, link }) => {
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

  elements.prepend(element);
  // появление попап картинки
  function openImgPopup() {
    pictureTitle.textContent = `${name}`;
    picture.src = elementImage.src;
    picture.alt = `${name}`;
    imgPopup.classList.add("img-popup_opened");
  }
  elementImage.addEventListener("click", openImgPopup);

  //удаление попап картинки
  pictureDeleteIcon.addEventListener("click", removePicture);
  // лайк
  likeButton.addEventListener("click", function () {
    likeButtonIcon.classList.toggle("like-button__icon_active");
  });
  // удаление
  trash.addEventListener("click", function () {
    element.remove();
  });
};

function removePicture() {
  imgPopup.classList.remove("img-popup_opened");
}
// все карточки
const addInitialCards = initialCards.forEach((item) => {
  newCard(item);
});

const newPopupForm = popupNewItem.querySelector(".popup__form");
const newPopupName = newPopupForm.querySelector(".popup__input_type_name");
const newPopupStatus = newPopupForm.querySelector(".popup__input_type_status");

function handleClosingFormNewItemPopup(evt) {
  evt.preventDefault();
  const newNameValue = newPopupName.value;
  const newStatusValue = newPopupStatus.value;
  newCard({ name: newNameValue, link: newStatusValue });
  openClassRemove();
  evt.target.reset();
}

newPopupForm.addEventListener("submit", handleClosingFormNewItemPopup);
