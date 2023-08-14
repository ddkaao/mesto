class Card {
    constructor (data) {
        this._name = data.name;
        this._link = data.link;
    }

    _getTemplate() {
        const newTemplate = document.
            querySelector('.card-template').
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

    _appearPopupCard() {
        const popupImage = document.querySelector('.popup_type-view');
        popupImage.classList.add('popup_opened');
    }

    _setEventListeners() {
        const likeButton = this._newCard.querySelector('.element__like');
        const deleteButton = this._newCard.querySelector('.element__trash');
        const popupImage = document.querySelector('.popup_type-view');
        const cardImage = this._newCard.querySelector('.element__image');

        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('element__like_active');
        });

        deleteButton.addEventListener('click', () => {
            this._newCard.remove();
        });

        cardImage.addEventListener('click', () => {
            popupImage.querySelector('.popup__image').src = this._link;
            popupImage.querySelector('.popup__image').alt = this._name;
            popupImage.querySelector('.popup__caption').textContent = this._name;
            this._appearPopupCard();
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