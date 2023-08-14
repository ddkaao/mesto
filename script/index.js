import Card from "./Card.js";
import { initialCards, ValidationConfig } from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { appearPopup, hidePopup, hidePopupOnOverlay } from "./utils.js";

const editButton = document.querySelector('.profile__edit-btn');
const closeProfileButton = document.querySelector('.popup__close-btn_profile');
const closeNewCardButton = document.querySelector('.popup__close-btn_new-card');
const closeCardButton = document.querySelector('.popup__close-btn_card');
const addButton = document.querySelector('.profile__add-btn');
const popupProfile = document.querySelector('.popup_type-edit');
const popupCards = document.querySelector('.popup_type-add');
const popupImage = document.querySelector('.popup_type-view');
const formProfile = document.querySelector('.form_type-profile');
const nameInput = formProfile.querySelector('.form__text_type_name');
const jobInput = formProfile.querySelector('.form__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const elementList = document.querySelector('.elements');
const formCard = document.querySelector('.form_type-card');
const labelInput = document.querySelector('.form__text_type_label');
const linkInput = document.querySelector('.form__text_type_link');

/* Функция для редактирования профиля */
function profileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    hidePopup(popupProfile);
};

/* Функция для добавления карточки */
const cardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = labelInput.value;
    const link = linkInput.value;
    const card = cardInstantiation({name, link});
    elementList.prepend(card.getView());

    hidePopup(popupCards);
    formNewCardValidate.disableSubmitButton();
};

/* Создание экземпляров валидаций форм */
const formNewProfileValidate = new FormValidator(ValidationConfig, formProfile);
formNewProfileValidate.enableValidation();

const formNewCardValidate = new FormValidator(ValidationConfig, formCard);
formNewCardValidate.enableValidation();

/* Создание экземпляров карточки */
function cardInstantiation(item) {
    const cardElement = new Card(item, '.card-template');
    return cardElement;
}

/* Функция для заполнения контейнера карточками */
initialCards.forEach((item) => {
    const cardElement = cardInstantiation(item);
    elementList.append(cardElement.getView());
});

formCard.addEventListener('submit', cardFormSubmit); /* Подтверждение заполненной формы для добавления новой карточки */
formProfile.addEventListener('submit', profileFormSubmit); /* Подтверждение заполненной формы для редактирования профиля */

/* Отслеживания клика по кнопке открытия для попапа редактирования профиля */
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    formNewProfileValidate.removeErrors();
    formNewProfileValidate.enableSubmitButton();
    appearPopup(popupProfile)});

/* Отслеживания клика по кнопке открытия попапа для добавления новой карточки */
addButton.addEventListener('click', () => {
    formCard.reset();
    formNewCardValidate.removeErrors();
    formNewCardValidate.disableSubmitButton();
    appearPopup(popupCards)}); 

closeProfileButton.addEventListener('click', () => hidePopup(popupProfile)); /* Отслеживания клика по кнопке закрытия попапа для редактирования профиля */
closeNewCardButton.addEventListener('click', () => hidePopup(popupCards)); /* Отслеживания клика по кнопке закрытия попапа для добваления новой карточки */
closeCardButton.addEventListener('click', () => hidePopup(popupImage)); /* Отслеживания клика по кнопке закрытия попапа для просмотра карточки */
popupProfile.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа редактирования профиля */
popupCards.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа добваления новой карточки */
popupImage.addEventListener('click', hidePopupOnOverlay); /* Отслеживания клика на оверлэй для закрытия попапа просмотра карточки */


