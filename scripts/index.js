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

const addPlace = function (place) {
  const placeNode = template.content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = place.link;
  placeNode.querySelector('.places__place-name').textContent = place.name;
  document.querySelector('.places').prepend(placeNode);
};

const initPlaces = function (places) {
  for (const place of places) {
    addPlace(place);
  }
};

initPlaces(initialPlaces);


// Лайк карточки

const toggleLike = function (evt) {
  evt.target.classList.toggle('places__like-icon_active');
}

const like_buttons = document.querySelectorAll('.places__like-icon');
for (btn of like_buttons) {
  btn.addEventListener('click', toggleLike);
}


// Удаление карточки

const deletePlace = function (evt) {
  evt.target.parentNode.remove();
}

const delete_buttons = document.querySelectorAll('.places__delete-icon');
for (btn of delete_buttons) {
  btn.addEventListener('click', deletePlace);
}


// Попап

const isCorrectClick = function (evt) {
  const current = evt.currentTarget === evt.target;
  const closeButton = evt.target.classList.contains('popup__close-button');
  const submit = evt.type === 'submit';
  const outOfPopup = !evt.target.closest('.popup__window');
  const lightbox = evt.target.classList.contains('lightbox__image');

  return current && (closeButton || submit) || outOfPopup || lightbox;
};

const togglePopup = function (evt) {
  if (isCorrectClick(evt)) {
    document.querySelector('.popup').classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('page_popup-opened');
  }
};

const resetPopup = function() {
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

const renderLightbox = function(evt) {
  resetPopup();

  const template = document.querySelector('#lightbox-template');
  lb = template.content.querySelector('.lightbox').cloneNode(true);
  const name = evt.target.parentNode.querySelector('.places__place-name').textContent;
  const src = evt.target.parentNode.querySelector('.places__place-photo').src;
  lb.querySelector('.lightbox__image').src = src;
  lb.querySelector('.lightbox__caption').textContent = name;
  document.querySelector('.popup__window').append(lb);
  console.log('rendering lb');
  togglePopup(evt);
};

const places = document.querySelectorAll('.places__place');
for (place of places) {
  place.addEventListener('click', renderLightbox);
}


// Открытие формы

const renderField = function(fieldDescription) {
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

const renderForm = function (evt, formDescription) {
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
