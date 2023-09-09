export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
        this._popupCloseButton = this._popupSelector.querySelector('.popup__close-btn');
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscapeClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    _handleEscapeClose(evt) {
        if (evt.key === 'Escape') { 
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })

        this._popupCloseButton.addEventListener('click', () => this.close());
    }
}