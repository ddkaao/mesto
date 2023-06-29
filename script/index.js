let editButton = document.querySelector('.profile__edit-btn');
let closeProfileButton = document.querySelector('.popup__close-btn_profile');
let closeNewCardButton = document.querySelector('.popup__close-btn_new-card');
let closeCardButton = document.querySelector('.popup__close-btn_card');
let addButton = document.querySelector('.profile__add-btn')
let popupProfile = document.querySelector('.popup__type_edit-profile');
let popupCards = document.querySelector('.popup__type_add-card');
let popupImage = document.querySelector('.popup__type_view-card');
let formElement = document.querySelector('.form__type_profile');
let nameInput = formElement.querySelector('.form__text_type_name');
let jobInput = formElement.querySelector('.form__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
const cardsTemplate = document.querySelector('.card-template');
const elementList = document.querySelector('.elements');
let formItem = document.querySelector('.form__type_card');
let elementImage = document.querySelector('.element__image');
let labelInput = document.querySelector('.form__text_type_label');
let linkInput = document.querySelector('.form__text_type_link');

/* Функция для открытия попапов */
function appearPopup(item) {
    item.classList.add('popup_opened');
};

/* Функция для закрытия попапов */
function hidePopup(item) {
    item.classList.remove('popup_opened');
};

/* Функция для редактирования профиля */
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    hidePopup(popupProfile);
};

/* Функция для создание карточки, отслеживание лайка, удаление карточки и открытие попапа карточки */
const createCard = ({name, link}) => {
    const clone = cardsTemplate.content.cloneNode(true);
    const cardElement = clone.querySelector('.element');
    const cardImage = cardElement.querySelector('.element__image');

    cardElement.querySelector('.element__name').textContent = name; 
    cardElement.querySelector('.element__image').src = link;
    cardElement.querySelector('.element__image').alt = name;

    const likeButton = cardElement.querySelector('.element__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like_active');
    });

    const deleteButton = cardElement.querySelector('.element__trash');
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });

    cardImage.addEventListener('click', () => {
        popupImage.querySelector('.popup__image').src = link;
        popupImage.querySelector('.popup__image').alt = name;
        popupImage.querySelector('.popup__caption').textContent = name;
        appearPopup(popupImage);

        closeCardButton.addEventListener('click', () => hidePopup(popupImage));
    });

    return cardElement;
};

/* Функция для добавления карточки */
const cardFormSubmit = (evt) => {
    evt.preventDefault();

    const name = labelInput.value;
    const link = linkInput.value;
    const card = createCard({name, link});
    elementList.prepend(card);

    hidePopup(popupCards);
};

/* Функция для заполнения контейнера карточками */
initialCards.forEach((item) => {
    const cardElement = createCard(item);
    elementList.append(cardElement);
});

formItem.addEventListener('submit', cardFormSubmit); /* Подтверждение заполненной формы для добавления новой карточки */
formElement.addEventListener('submit', handleFormSubmit); /* Подтверждение заполненной формы для редактирования профиля */

/* Отслеживания клика по кнопке открытия для попапа редактирования профиля */
editButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    appearPopup(popupProfile)});

addButton.addEventListener('click', () => appearPopup(popupCards)); /* Отслеживания клика по кнопке открытия попапа для добавления новой карточки */
closeProfileButton.addEventListener('click', () => hidePopup(popupProfile)); /* Отслеживания клика по кнопке закрытия попапа для редактирования профиля */
closeNewCardButton.addEventListener('click', () => hidePopup(popupCards)); /* Отслеживания клика по кнопке закрытия попапа для добваления новой карточки */
