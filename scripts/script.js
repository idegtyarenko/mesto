const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const edit_button = document.querySelector('.profile__button_role_edit');
const close_button = document.querySelector('.popup__close-button');
const name = document.querySelector('.profile__name');
const title = document.querySelector('.profile__title');
const name_field = document.querySelector('.popup__form-input_name_name');
const title_field = document.querySelector('.popup__form-input_name_title');

const togglePopup = function(evt) {
  if (evt.target === this) {
    if (!popup.classList.contains('popup_opened')) {
      name_field.value = name.textContent;
      title_field.value = title.textContent;
    }
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_popup-opened');
  }
};

// Сохранение изменений

edit_button.addEventListener('click', togglePopup);
close_button.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);
