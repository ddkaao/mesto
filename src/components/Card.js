class Card {
    constructor (data, templateSelector, myId, handleCardClick, deleteCard, popupCardDelete, handleCardLike) {
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._myId = myId; 
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes.length;
        this.likesArray = data.likes;
        this._handleCardClick = handleCardClick;
        this._popupCardDelete = popupCardDelete;
        this._deleteCard = deleteCard;
        this._handleCardLike = handleCardLike;
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

    delete() {
        this._newCard.remove();
    }

    likeSet(res) {

        if (this.likesArray.some((like) => {
            return like._id === this._myId;
        })) {
            this._newCard.querySelector('.element__like').classList.add('element__like_active');
            this._likeNumber.textContent = res.length;
            this.likesArray = res;
        } else {
            this._newCard.querySelector('.element__like').classList.remove('element__like_active');
            this._likeNumber.textContent = res.length;
            this.likesArray = res;
        }

    }

    like() {
        this._newCard.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _setEventListeners() {

        this._newCard.querySelector('.element__like').addEventListener('click', () => {
            this._handleCardLike(this._id, this, this.likesArray);
        });
        this._newCard.querySelector('.element__trash').addEventListener('click', () => this._popupCardDelete.open(this._id, this));
        this._newCard.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._link, this._name)
        });
    }

    _appearTrashIcon() {
        if (this._ownerId === this._myId){
            this._newCard.querySelector('.element__trash').classList.remove('element__trash_disabled');
        }
    }

    getView() {
        this._newCard = this._getTemplate();
        this._likeNumber = this._newCard.querySelector('.element__counter');
        this._setData();
        this.likeSet(this.likesArray);
        this._appearTrashIcon();
        this._setEventListeners();


        return this._newCard;
    }
}

export default Card;