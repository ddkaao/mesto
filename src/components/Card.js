class Card {
    constructor (data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
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

    _setEventListeners() {
        this._newCard.querySelector('.element__like').addEventListener('click', () => this._like());
        this._newCard.querySelector('.element__trash').addEventListener('click', () => this._delete());
        this._newCard.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
        });
    }

    getView() {
        this._newCard = this._getTemplate();
        this._setData();
        this._setEventListeners();


        return this._newCard;
    }
}

export default Card;