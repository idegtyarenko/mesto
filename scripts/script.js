const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const edit_button = document.querySelector('.profile__button_role_edit');
const close_button = document.querySelector('.popup__close-button');

const togglePopup = function(evt) {
  // Если попап не открыт
  // Заполнить поля значениями со страницы

  if (evt.target === this) {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_popup-opened');
  }
};

// Сохранение изменений

edit_button.addEventListener('click', togglePopup);
close_button.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);
