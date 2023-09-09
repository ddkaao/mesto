import '../pages/index.css';
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import { initialCards, ValidationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector('.profile__edit-btn');
const addButton = document.querySelector('.profile__add-btn');
const formProfile = document.querySelector('.form_type-profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_about');
const formCard = document.querySelector('.form_type-card');

/* Создание экземпляров попапов */
const popupFormCard = new PopupWithForm('.popup_type-add', cardFormSubmit);
popupFormCard.setEventListeners();

const popupFormProfile = new PopupWithForm('.popup_type-edit', profileFormSubmit);
popupFormProfile.setEventListeners();

const popupBigImage = new PopupWithImage('.popup_type-view');
popupBigImage.setEventListeners();

/* Создание экземпляра профиля */
const profileInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description'});

/* Функция для изменения данных профиля */
function profileFormSubmit(data) {
    profileInfo.setUserInfo(data);
}

/* Функция для добавления новой карточки */
function cardFormSubmit(data) {
    const newCard = cardInstantiation(data);
    defaultCardList.addItem(newCard);
}

/* Функция для открытия попапа с картинкой */
function handleCardClick(link, name) {
    popupBigImage.open(link, name);
}

/* Вывод карточек из массива */
const defaultCardList = new Section({items: initialCards, 
    renderer: (item) => {
        const newCard = cardInstantiation(item);
        defaultCardList.addItem(newCard);}
    }, '.elements');

defaultCardList.renderItems();

/* Создание экземпляров карточки */
function cardInstantiation(data) {
    const cardElement = new Card(data, '.card-template', handleCardClick);
    const card = cardElement.getView();
	return card;
}

/* Создание экземпляров валидаций форм */
const formNewProfileValidate = new FormValidator(ValidationConfig, formProfile);
formNewProfileValidate.enableValidation();

const formNewCardValidate = new FormValidator(ValidationConfig, formCard);
formNewCardValidate.enableValidation();

/* Отслеживания клика по кнопке открытия для попапа редактирования профиля */
editButton.addEventListener('click', () => {
    const data = profileInfo.getUserInfo();
	nameInput.value = data.name;
	jobInput.value = data.description;
    formNewProfileValidate.removeErrors();
    formNewProfileValidate.enableSubmitButton();
    popupFormProfile.open();
});

/* Отслеживания клика по кнопке открытия попапа для добавления новой карточки */
addButton.addEventListener('click', () => {
    formCard.reset();
    formNewCardValidate.removeErrors();
    formNewCardValidate.disableSubmitButton();
    popupFormCard.open();
}); 

