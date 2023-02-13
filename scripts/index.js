// Карточки мест

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

const togglePopup = function (evt) {
  if (
    evt.target === this ||
    evt.target.classList.contains('popup__wrapper') ||
    evt.target.classList.contains('profile__button_role_edit') ||
    evt.type === 'submit'
  ) {
    document.querySelector('.popup').classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('page_popup-opened');
  }
};

document.querySelector('.popup__close-button').addEventListener('click', togglePopup);
document.querySelector('.popup').addEventListener('click', togglePopup);


// Рендер формы

const renderForm = function (evt, formDescription) {
  const popup_window = document.querySelector('.popup__window');
  while (popup_window.children.length > 2) {
    popup_window.removeChild(popup_window.lastChild);
  }

  const formHtml = document.querySelector('#form-template').content.cloneNode(true);
  formHtml.querySelector('.popup__title').textContent = formDescription.title;
  const formTag = formHtml.querySelector('.form');
  formTag.name = formDescription.name;
  formTag.querySelector('.form__submit-button').textContent = formDescription.buttonName;
  formTag.addEventListener('submit', formDescription.submitHandler);
  popup_window.append(formHtml);

  const field_template = popup_window.querySelector('#field-template');
  for (fieldDescription of formDescription.fields) {
    field = field_template.content.querySelector('.form__input').cloneNode(true);
    field.name = fieldDescription.name;
    field.placeholder = fieldDescription.placeholder;
    field.value = fieldDescription.defaultValue;
    const form = popup_window.querySelector('.form');
    form.insertBefore(field, form.lastElementChild);
  }

  togglePopup(evt);
};


// Форма редактирования профиля

const profileEditForm = {
  name: 'edit-profile',
  title: 'Редактировать профиль',
  fields: [
    {
      name: 'name',
      placeholder: 'Имя',
      defaultValue: document.querySelector('.profile__name').textContent
    },
    {
      name: 'title',
      placeholder: 'Кратко о себе',
      defaultValue: document.querySelector('.profile__title').textContent
    }
  ],
  buttonName: 'Сохранить',
  submitHandler: evt => {
    evt.preventDefault();
    const profileName = document.querySelector('.profile__name');
    const profileTitle = document.querySelector('.profile__title');
    const inputName = document.querySelector('.form__input[name="name"]');
    const inputTitle = document.querySelector('.form__input[name="title"]');
    profileName.textContent = inputName.value;
    profileTitle.textContent = inputTitle.value;
    togglePopup(evt);
  }
};

document.querySelector('.profile__button_role_edit').addEventListener('click', (evt) => {
  renderForm(evt, profileEditForm);
});
