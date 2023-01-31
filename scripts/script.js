const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button_role_edit');
const closeButton = document.querySelector('.popup__close-button');
const name = document.querySelector('.profile__name');
const title = document.querySelector('.profile__title');
const nameField = document.querySelector('.popup__form-input_name_name');
const titleField = document.querySelector('.popup__form-input_name_title');

const togglePopup = function(evt) {
  if (evt.target === this) {
    if (!popup.classList.contains('popup_opened')) {
      nameField.value = name.textContent;
      titleField.value = title.textContent;
    }
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_popup-opened');
  }
};

// Сохранение изменений

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);
