let popup = document.querySelector(".popup");
let editButton = document.querySelector(".edit-button");
let closeIcon = document.querySelector(".close-icon");
let profileName = document.querySelector(".profile__name");
let profileStatus = document.querySelector(".profile__status");
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

let popupNewItem = document.querySelector(".popup_new-item");
let newItemEditButton = popupNewItem.querySelector(".edit-button");
let newItemCloseIcon = popupNewItem.querySelector(".close-icon");
let addButton = document.querySelector(".add-button");

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

let likeButtonIcon = document.querySelectorAll(".like-button__icon");
console.log(likeButtonIcon);
let likeButton = document.querySelectorAll(".like-button");
console.log(likeButton);

function likeButtonSwitch() {
  likeButtonIcon.classList.toggle("like-button__icon_active");
}
likeButton.addEventListener("click", likeButtonSwitch);

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
