export class UserInfo {
  constructor({ selectorOfName, selectorOfStatus }) {
    this._selectorOfName = document.querySelector(selectorOfName);
    this._selectorOfStatus = document.querySelector(selectorOfStatus);
  }
  getUserInfo() {
    return {
      name: this._selectorOfName.textContent,
      about: this._selectorOfStatus.textContent,
    };
  }
  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
