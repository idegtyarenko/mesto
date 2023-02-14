// Карточки мест

let initialPlaces = [
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

const template = document.querySelector('#place-template');

function toggleLike (evt) {
  evt.stopPropagation();
  evt.target.classList.toggle('places__like-icon_active');
}

function deletePlace (evt) {
  evt.stopPropagation();
  evt.target.parentNode.remove();
}

function addPlace (place) {
  const placeNode = template.content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = place.link;
  placeNode.querySelector('.places__place-name').textContent = place.name;
  document.querySelector('.places').prepend(placeNode);
  const newPlace = document.querySelector('.places__place');
  newPlace.addEventListener('click', renderLightbox);
  newPlace.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  newPlace.querySelector('.places__like-icon').addEventListener('click', toggleLike);
};

function initPlaces (places) {
  for (const place of places) {
    addPlace(place);
  }
};

initPlaces(initialPlaces);


// Попап

function isCorrectClick (evt) {
  const current = evt.currentTarget === evt.target;
  const closeButton = evt.target.classList.contains('popup__close-button');
  const submit = evt.type === 'submit';
  const outOfPopup = !evt.target.closest('.popup__window');
  const lightbox = evt.target.classList.contains('lightbox__image');

  return current && (closeButton || submit) || outOfPopup || lightbox;
};

function togglePopup (evt) {
  if (isCorrectClick(evt)) {
    document.querySelector('.popup').classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('page_popup-opened');
  }
};

function resetPopup () {
  while (popupWindow.children.length > popupWindowInitialLength) {
    popupWindow.removeChild(popupWindow.lastChild);
  }
  document.querySelector('.popup__window').classList.remove('popup__window_type_form');
};

const popupWindow = document.querySelector('.popup__window');
const popupWindowInitialLength = popupWindow.children.length;
document.querySelector('.popup__close-button').addEventListener('click', togglePopup);
document.querySelector('.popup').addEventListener('click', togglePopup);


// Открытие лайтбокса

function renderLightbox (evt) {
  resetPopup();

  const template = document.querySelector('#lightbox-template');
  lb = template.content.querySelector('.lightbox').cloneNode(true);
  const name = evt.target.parentNode.querySelector('.places__place-name').textContent;
  const src = evt.target.parentNode.querySelector('.places__place-photo').src;
  lb.querySelector('.lightbox__image').src = src;
  lb.querySelector('.lightbox__caption').textContent = name;
  document.querySelector('.popup__window').append(lb);
  togglePopup(evt);
};


// Открытие формы

function renderField (fieldDescription) {
  const field_template = document.querySelector('#field-template');
  field = field_template.content.querySelector('.form__input').cloneNode(true);
  field.name = fieldDescription.name;
  field.placeholder = fieldDescription.placeholder;
  if (fieldDescription.hasOwnProperty('defaultValue')) {
    field.value = fieldDescription.defaultValue;
  }
  if (fieldDescription.hasOwnProperty('type')) {
    field.type = fieldDescription.type;
  }
  return field;
};

function renderForm (evt, formDescription) {
  resetPopup();
  const formHtml = document.querySelector('#form-template').content.cloneNode(true);
  formHtml.querySelector('.popup__title').textContent = formDescription.title;
  const formTag = formHtml.querySelector('.form');
  formTag.name = formDescription.name;
  formTag.querySelector('.form__submit-button').textContent = formDescription.buttonName;
  formTag.addEventListener('submit', formDescription.submitHandler);
  const popupWindow = document.querySelector('.popup__window');
  popupWindow.append(formHtml);
  popupWindow.classList.add('popup__window_type_form');
  for (field of formDescription.fields) {
    const form = document.querySelector('.form');
    form.insertBefore(renderField(field), form.lastElementChild);
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


// Форма добавления места

const placeAddForm = {
  name: 'add-place',
  title: 'Новое место',
  fields: [
    {
      name: 'name',
      placeholder: 'Название'
    },
    {
      name: 'image_link',
      placeholder: 'Ссылка на картинку',
      type: 'url'
    }
  ],
  buttonName: 'Создать',
  submitHandler: evt => {
    evt.preventDefault();
    const inputName = document.querySelector('.form__input[name="name"]').value;
    const inputLink = document.querySelector('.form__input[name="image_link"]').value;
    addPlace({
      name: inputName,
      link: inputLink
    });
    togglePopup(evt);
  }
};

document.querySelector('.profile__button_role_add').addEventListener('click', (evt) => {
  renderForm(evt, placeAddForm);
});
