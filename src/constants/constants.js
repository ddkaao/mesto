const ValidationConfig = {
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.popup__submit-btn',
    inactiveButtonClass: 'popup__submit-btn_disabled',
    inputErrorClass: 'form__text_error',
    errorClass: 'form__input-error_active'
}; 

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const avatarButton = document.querySelector('.profile__avatar-btn');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const formProfile = document.querySelector('.form_type-profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_about');
const formCard = document.querySelector('.form_type-card');
const formAvatar = document.querySelector('.form_type-avatar');
const createButton = document.querySelector('.popup__submit-btn_create');
const saveProfileButton = document.querySelector('.popup__submit-btn_save');
const saveAvatarButton = document.querySelector('.popup__submit-btn_avatar');

export { ValidationConfig, createButton, saveAvatarButton, saveProfileButton, editButton,  addButton, avatarButton, profileName, profileDescription, profileAvatar, formProfile, nameInput, jobInput, formCard, formAvatar};

  