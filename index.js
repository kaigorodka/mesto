let popup = document.querySelector(".popup");
let editButton = document.querySelector(".edit-button");
let closeIcon = document.querySelector(".close-icon");
function openClassAdd() {
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", openClassAdd);

function openClassRemove() {
  popup.classList.remove("popup_opened");
}
closeIcon.addEventListener("click", openClassRemove);

let containerData = document.querySelector(".container-data");
let popupName = containerData.querySelector(".popup__name");
let popupStatus = containerData.querySelector(".popup__status");

function handleFormSubmit(evt) {
  evt.preventDefault();
  let nameValue = popupName.value;
  let statusValue = popupStatus.value;
  let profileName = document.querySelector(".profile__name");
  let profileStatus = document.querySelector(".profile__status");
  profileName.textContent = nameValue;
  profileStatus.textContent = statusValue;
  openClassRemove();
}
containerData.addEventListener("submit", handleFormSubmit);
