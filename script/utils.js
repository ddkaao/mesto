/* Функция для открытия попапов */
function appearPopup(item) {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', hidePopupOnButton);
};

/* Функция для закрытия попапов */
function hidePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', hidePopupOnButton);
};

/* Функция для закрытия попапов по нажатию ESC */
function hidePopupOnButton(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') { 
        hidePopup(openedPopup);
    }
};

/* Функция для закрытия попапов по нажатию на оверлэй */
function hidePopupOnOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        hidePopup(evt.currentTarget);
    }
};

export { appearPopup, hidePopup, hidePopupOnButton, hidePopupOnOverlay };