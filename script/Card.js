import { appearPopup } from "./utils.js";

class Card {
    constructor (data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateSelector = templateSelector;
        this._popupImage = document.querySelector('.popup_type-view');
    }

    _getTemplate() {
        const newTemplate = document.
            querySelector(this._templateSelector).
            content.querySelector('.element').
            cloneNode(true);

        return newTemplate;
    }

    _setData() {
        const name = this._newCard.querySelector('.element__name');
        const cardImage = this._newCard.querySelector('.element__image');

        name.textContent = this._name;
        cardImage.src = this._link;
        cardImage.alt = this._name;
    }

    _like() {
        this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _delete() {
        this._newCard.remove();
    }

    _viewCard() {
        this._popupImage.querySelector('.popup__image').src = this._link;
        this._popupImage.querySelector('.popup__image').alt = this._name;
        this._popupImage.querySelector('.popup__caption').textContent = this._name;
        appearPopup(this._popupImage);
    }

    _setEventListeners() {
        this._newCard.querySelector('.element__like').addEventListener('click', () => this._like());
        this._newCard.querySelector('.element__trash').addEventListener('click', () => this._delete());
        this._newCard.querySelector('.element__image').addEventListener('click', () => this._viewCard());
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setEventListeners();


        return this._newCard;
    }
}

export default Card;