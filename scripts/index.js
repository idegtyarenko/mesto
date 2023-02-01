const page = document.querySelector('.page');
const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__button_role_edit');
const closeButton = document.querySelector('.popup__close-button');
const name = document.querySelector('.profile__name');
const title = document.querySelector('.profile__title');
const form = document.querySelector('.form');
const nameField = document.querySelector('.form__input_name_name');
const titleField = document.querySelector('.form__input_name_title');

const initForm = function() {
  nameField.value = name.textContent;
  titleField.value = title.textContent;
};

const togglePopup = function(evt) {
  if (
    evt.target === this ||
    evt.target.classList.contains('popup__wrapper') ||
    evt.type === 'submit'
    ) {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_popup-opened');
  }
};

const handleFormSubmit = function(evt) {
  evt.preventDefault();
  name.textContent = nameField.value;
  title.textContent = titleField.value;
  togglePopup(evt);
}

initForm();
editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);
form.addEventListener('submit', handleFormSubmit);
