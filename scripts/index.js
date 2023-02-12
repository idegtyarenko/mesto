// Инициализируем карточки

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const initPlaces = function (cards) {
  const template = document.querySelector('#place-template');
  for (const card of cards) {
    const placeNode = template.content.cloneNode(true);
    placeNode.querySelector('.places__place-photo').src = card.link;
    placeNode.querySelector('.places__place-name').textContent = card.name;
    document.querySelector('.places').append(placeNode);
  }
};

initPlaces(initialCards);


// Попап

const popup = document.querySelector('.popup');
const page = document.querySelector('.page');

const togglePopup = function (evt) {
  if (
    evt.target === this ||
    evt.target.classList.contains('popup__wrapper') ||
    evt.target.classList.contains('profile__button_role_edit') ||
    evt.type === 'submit'
  ) {
    popup.classList.toggle('popup_opened');
    page.classList.toggle('page_popup-opened');
  }
};

const closeButton = document.querySelector('.popup__close-button');
closeButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup);


// Форма

const name = document.querySelector('.profile__name');
const title = document.querySelector('.profile__title');
const form = document.querySelector('.form');
const nameField = document.querySelector('.form__input_name_name');
const titleField = document.querySelector('.form__input_name_title');

const initForm = function (evt) {
  nameField.value = name.textContent;
  titleField.value = title.textContent;
  togglePopup(evt);
};

const editButton = document.querySelector('.profile__button_role_edit');
editButton.addEventListener('click', initForm);

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  name.textContent = nameField.value;
  title.textContent = titleField.value;
  togglePopup(evt);
}

form.addEventListener('submit', handleFormSubmit);
