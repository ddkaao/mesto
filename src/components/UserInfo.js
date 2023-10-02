export default class UserInfo {
    constructor({nameSelector, descriptionSelector, avatarSelector}) {
        this._nameSelector = document.querySelector(nameSelector);
        this._descriptionSelector = document.querySelector(descriptionSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._descriptionSelector.textContent = data.about;
        this._avatarSelector.src = data.avatar;
        this._avatarSelector.alt = data.name;
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent, 
            description: this._descriptionSelector.textContent,
        };
    }
}