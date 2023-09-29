import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
    constructor(popupSelector, handleCardDelete) {
        super(popupSelector);
        this._handleDeleteCard = handleCardDelete;
        this._deleteButton = this._popupElement.querySelector('.popup__delete-btn');
    }

    open(id, card){
        super.open();

        this._id = id;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();

        this._deleteButton.addEventListener('click', () => this._handleDeleteCard(this._id, this._card));
    }

}