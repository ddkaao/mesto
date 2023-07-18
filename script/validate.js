/* Файл валидации форм оптравки */

/* Функция для показа ошибок */
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__text_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

/* Функция для скрытия ошибок при открытите попапов */
const removeErrors = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__text'));
  inputList.forEach((inputElement) => hideInputError(formElement, inputElement));
};

/* Функция для скрытия ошибок */
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__text_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

/* Функция для определения валидности введенного теста */
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
};

/* Функция для проверки валидности каждого поля */
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
};

/* Функция для отключения кнопки отправки формы */
const disableSubmitButton = (buttonElement) => {
  buttonElement.classList.add('popup__submit-btn_disabled');
};

/* Функция для включения кнопки отправки формы */
const enableSubmitButton = (buttonElement) => {
  buttonElement.classList.remove('popup__submit-btn_disabled');
};

/* Функция для определения состояния кнопки отправки формы */
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
      disableSubmitButton(buttonElement);
    } else {
      enableSubmitButton(buttonElement);
    };
};

/* Функция для установления слушателей на поле для определения валидности */
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__text'));
    const buttonElement = formElement.querySelector('.popup__submit-btn');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

/* Функция для валидации нескольких форм*/
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
  
      formList.forEach((formElement) => {
        setEventListeners(formElement);
      });
    });
};
  
enableValidation();