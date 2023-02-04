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
