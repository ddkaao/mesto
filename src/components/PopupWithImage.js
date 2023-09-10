import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupImageCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(link, text) {
        super.open();
        this._popupImage.src = link;
        this._popupImage.alt = text;
        this._popupImageCaption.textContent = text;
    }
}