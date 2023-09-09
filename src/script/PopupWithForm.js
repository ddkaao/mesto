import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formSubmit = formSubmit;
        this._allValues = {};
        this._form = this._popupSelector.querySelector('.form');
        this._allInputs = this._form.querySelectorAll('.form__text');
    }

    _getInputValues() {
        this._allInputs.forEach(input => {
            this._allValues[input.name] = input.value;
        })

        return this._allValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const data = this._getInputValues();
            this._formSubmit(data);
            this.close();
        })
    }

    open() {
        super.open();
    }

    close() {
        super.close();
        this._form.reset();
    }
}