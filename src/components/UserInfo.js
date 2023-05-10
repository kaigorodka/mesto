export class UserInfo {
  constructor({ nameElement, statusElement, avatarElement }) {
    this._nameElement = document.querySelector(nameElement);
    this._statusElement = document.querySelector(statusElement);
    this._avatarElement = document.querySelector(avatarElement);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._statusElement.textContent,
      avatar: this._avatarElement.src,
    };
  }
  setUserInfo({ name, about, avatar }) {
    debugger;
    this._nameElement.textContent = name;
    this._statusElement.textContent = about;
    this._avatarElement.src = avatar;
  }
  setUserAvatar(data) {
    this._avatarElement.src = data.avatar;
  }
}
