export class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
  }
  // _handleEscClose(evt) {
  //   if (evt.key === "Escape") {
  //     close(this._popupSelector);
  //   }
  // }
  setEventListeners() {
    this._popupSelector.addEventListener("keydown", (evt) => {
      if (evt.target === this._popupSelector) {
        close();
      }
    });
    // this._handleEscClose();
    const closeButton = this._popupSelector.querySelector(".close-icon");
    closeButton.addEventListener("click", close());
  }
}
