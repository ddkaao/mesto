export default class UserInfo {
    constructor({nameSelector, descriptionSelector}) {
        this._nameSelector = document.querySelector(nameSelector);
        this._descriptionSelector = document.querySelector(descriptionSelector);
    }

    setUserInfo(data) {
        this._nameSelector.textContent = data.name;
        this._descriptionSelector.textContent = data.description;
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent, 
            description: this._descriptionSelector.textContent
        };
    }
}