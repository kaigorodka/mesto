const popup = document.querySelector(".popup");
const editButton = document.querySelector(".edit-button");
const closeIcon = document.querySelector(".close-icon");
const profileName = document.querySelector(".profile__name");
const profileStatus = document.querySelector(".profile__status");
function openClassAdd() {
  popup.classList.add("popup_opened");
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
}
editButton.addEventListener("click", openClassAdd);
function openClassRemove() {
  popup.classList.remove("popup_opened");
}
closeIcon.addEventListener("click", openClassRemove);

const popupNewItem = document.querySelector(".popup_new-item");
const newItemEditButton = popupNewItem.querySelector(".edit-button");
const newItemCloseIcon = popupNewItem.querySelector(".close-icon");
const addButton = document.querySelector(".add-button");

function openClassRemoveNewItem() {
  popupNewItem.classList.remove("popup_opened");
}
addButton.addEventListener("click", openClassNewItem);
function openClassNewItem() {
  popupNewItem.classList.add("popup_opened");
}
newItemCloseIcon.addEventListener("click", openClassRemoveNewItem);
let popupForm = document.querySelector(".popup__form");
let popupName = popupForm.querySelector(".popup__input_type_name");
let popupStatus = popupForm.querySelector(".popup__input_type_status");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameValue = popupName.value;
  let statusValue = popupStatus.value;
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
const newCard = ({ name, link }) => {
  const element = template.querySelector(".element").cloneNode(true);
  const trash = element.querySelector(".trash-button");
  const elementTitle = element.querySelector(".element__title");
  const elementImage = element.querySelector(".element__image");
  const likeButtonIcon = element.querySelector(".like-button__icon");
  const likeButton = element.querySelector(".like-button");
  elementTitle.textContent = name;
  elementImage.src = link;
  elementImage.alt = name;
  elements.append(element);
  // лайк
  likeButton.addEventListener("click", function () {
    likeButtonIcon.classList.toggle("like-button__icon_active");
  });
  // удаление
  trash.addEventListener("click", function () {
    element.remove();
  });
};
// все карточки
const addInitialCards = initialCards.forEach((name, link) => {
  newCard(name, link);
});

const newPopupForm = popupNewItem.querySelector(".popup__form");
const newPopupName = newPopupForm.querySelector(".popup__input_type_name");
const newPopupStatus = newPopupForm.querySelector(".popup__input_type_status");
const elementTitle = document.querySelector(".element__title");
const elementImage = document.querySelector(".element__image");

function handleClosingFormNewItemPopup(evt) {
  evt.preventDefault();
  const newNameValue = newPopupName.value;
  const newStatusValue = newPopupStatus.value;
  elementTitle.textContent = newNameValue;
  elementImage.src = newStatusValue;
  newCard({ name, link });
  openClassRemoveNewItem();
}

newPopupForm.addEventListener("submit", handleClosingFormNewItemPopup);
