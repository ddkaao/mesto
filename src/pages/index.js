import '../pages/index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from '../components/PopupWithDelete';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api';
import { ValidationConfig, editButton, saveAvatarButton, createButton, saveProfileButton, addButton, avatarButton, profileName, profileDescription, profileAvatar, formProfile, nameInput, jobInput, formCard, formAvatar } from "../constants/constants.js";
import { FormValidator } from "../components/FormValidator.js";

/* Создание экземпляров Api */
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-76',
    headers: {
        authorization: '959d7cc0-87b9-4cba-875b-1e8baf43cd4e',
        'Content-Type': 'application/json',
    }
});

const myId = '1556e2ec8ed5961792c47680';

/* Получение информации о пользователе */
api.getProfileInformation()
    .then(data => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        profileAvatar.src = data.avatar;
    })
    .catch((err) => {
        console.log(err); 
    });

/* Создание экземпляров попапов */
const popupFormCard = new PopupWithForm('.popup_type-add', cardFormSubmit);
popupFormCard.setEventListeners();

const popupFormProfile = new PopupWithForm('.popup_type-edit', profileFormSubmit);
popupFormProfile.setEventListeners();

const popupFormAvatar = new PopupWithForm('.popup_type-avatar', avatarFormSubmit);
popupFormAvatar.setEventListeners();

const popupBigImage = new PopupWithImage('.popup_type-view');
popupBigImage.setEventListeners();

const popupCardDelete = new PopupWithDelete('.popup_type-delete', cardDelete);
popupCardDelete.setEventListeners();

/* Создание экземпляра профиля */
const profileInfo = new UserInfo({nameSelector: '.profile__name', descriptionSelector: '.profile__description', avatarSelector: 'profile__avatar'});

/* Функция для изменения аватара */
function changeAvatar(data) {
    profileAvatar.src = data.avatar;
}

/* Функция для изменения аватара */
function avatarFormSubmit(avatar) {
    saveAvatarButton.textContent = 'Сохранение...';
    api.changeAvatar(avatar)
    .then(avatar => {
       changeAvatar(avatar);
       popupFormAvatar.close();
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(() => {
        saveAvatarButton.textContent = 'Сохранить';
    });
}

/* Функция для изменения данных профиля */
function profileFormSubmit(data) {
    const name = data['name'];
    const about = data['description'];
    const object = {name, about};

    saveProfileButton.textContent = 'Сохранение...';
    api.changeProfileInformation(object)
    .then(data => {
        profileInfo.setUserInfo(data);
        popupFormProfile.close();
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(() => {
        saveProfileButton.textContent = 'Сохранить';
    });
}

/* Функция для добавления новой карточки */
function cardFormSubmit(data) {
    const name = data['name'];
    const link = data['link'];
    const object = {name, link};

    createButton.textContent = 'Создание...';
    api.addNewCard(object)
    .then(data => {
        const newCard = cardInstantiation(data);
        defaultCardList.addItem(newCard);
        popupFormCard.close();
    })
    .catch((err) => {
        console.log(err); 
    })
    .finally(() => {
        createButton.textContent = 'Создать';
    })
}

/* Функция для открытия попапа с картинкой */
function handleCardClick(link, name) {
    popupBigImage.open(link, name);
}

/* Функция для удаления карточки */
function cardDelete(id, card) {
    api.deleteCard(id)
    .then(() => {
        card.delete();
        popupCardDelete.close();
    })
    .catch((err) => {
        console.log(err); 
    });
}

/* Вывод карточек из массива */
const defaultCardList = new Section({ 
    renderer: (item) => {
        const newCard = cardInstantiation(item);
        defaultCardList.addItem(newCard);}
    }, '.elements');

api.getAllCards()
    .then(data => {
        data.reverse();
        defaultCardList.renderItems(data);
    })
    .catch((err) => {
        console.log(err); 
    });

function changeLikeCondition(id, card, likeNumber) {
    if (card.likesArray.some((like) => {
        return like._id === myId;
    })) {
        removeLike(id, card, likeNumber);
    } else {
        addLike(id, card, likeNumber);
    }
}
    
/* Функция добавления лайка */
function addLike(id, card, likeNumber) {
    api.like(id)
    .then((res) => {
        likeNumber.textContent = res.likes.length;
        card.likesArray = res.likes;
        card.like();
    })
    .catch((err) => {
        console.log(err); 
    });
}

/* Функция удаления лайка */
function removeLike(id, card, likeNumber) {
    api.unlike(id)
    .then((res) => {
        likeNumber.textContent = res.likes.length;
        card.likesArray = res.likes;
        card.like();
    })
    .catch((err) => {
        console.log(err); 
    });
}    

/* Создание экземпляров карточки */
function cardInstantiation(data) {
    const cardElement = new Card(data, '.card-template', myId, handleCardClick, cardDelete, popupCardDelete, changeLikeCondition);
    const card = cardElement.getView();
	return card;
}

/* Создание экземпляров валидаций форм */
const formNewProfileValidate = new FormValidator(ValidationConfig, formProfile);
formNewProfileValidate.enableValidation();

const formNewCardValidate = new FormValidator(ValidationConfig, formCard);
formNewCardValidate.enableValidation();

const formNewAvatarValidate = new FormValidator(ValidationConfig, formAvatar);
formNewAvatarValidate.enableValidation();

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

/* Отслеживания клика по кнопке открытия попапа для изменения аватара */
avatarButton.addEventListener('click', () => {
    formNewAvatarValidate.disableSubmitButton();
    formNewAvatarValidate.removeErrors();
    popupFormAvatar.open();
})

