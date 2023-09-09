import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = document.querySelector('.popup__image');
        this._popupImageCaption = document.querySelector('.popup__caption');
    }

    open(link, text) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = text;
        this._popupImageCaption.textContent = text;
    }
}