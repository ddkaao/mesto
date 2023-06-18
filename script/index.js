let editButton = document.querySelector('.profile__edit-btn');
let closeButton = document.querySelector('.popup__close-btn');
let popupWindow = document.querySelector('.popup');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_type_name');
let jobInput = formElement.querySelector('.form__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');

function appearPopup() {
    popupWindow.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function hidePopup() {
    popupWindow.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    hidePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', appearPopup);
closeButton.addEventListener('click', hidePopup);