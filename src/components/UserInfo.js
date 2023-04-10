export class UserInfo {
  constructor({ nameElement, statusElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._statusElement = document.querySelector(statusElement);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._statusElement.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._statusElement.textContent = about;
  }
}
