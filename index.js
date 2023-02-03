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
