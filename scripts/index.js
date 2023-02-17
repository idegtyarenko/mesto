// Карточки мест

const initialPlaces = [
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

function toggleLike (evt) {
  evt.stopPropagation();
  evt.target.classList.toggle('places__like-icon_active');
}

function deletePlace (evt) {
  evt.stopPropagation();
  evt.target.parentNode.remove();
}

function addPlace (placeObj) {
  const placeNode = document.querySelector('#place-template').content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = placeObj.link;
  placeNode.querySelector('.places__place-name').textContent = placeObj.name;
  document.querySelector('.places').prepend(placeNode);
  const newPlace = document.querySelector('.places__place');
  newPlace.addEventListener('click', openLightbox);
  newPlace.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  newPlace.querySelector('.places__like-icon').addEventListener('click', toggleLike);
};

function initPlaces (placesArray) {
  for (const placeObj of placesArray) {
    addPlace(placeObj);
  }
};

initPlaces(initialPlaces);


// Попап

const popupElement = document.querySelector('.popup');

function isCorrectClick (evt) {
  const current = evt.currentTarget === evt.target;
  const closeButton = evt.target.classList.contains('popup__close-button');
  const submit = evt.type === 'submit';
  const outOfPopup = !evt.target.closest('.popup__window');
  const lightbox = evt.target.classList.contains('popup__lightbox-image');

  return current && (closeButton || submit) || outOfPopup || lightbox;
};

function togglePopup () {
    popupElement.classList.toggle('popup_opened');
    document.querySelector('.page').classList.toggle('page_popup-opened');
};

function openPopup (id) {
  popupWindow = document.querySelector('#' + id);
  popupWindow.classList.add('popup__window_visible');
  togglePopup();

  firstInput = popupWindow.querySelector('.form__input');
  if (firstInput) {
    firstInput.focus();
  }
}

function closePopup (evt) {
  if (isCorrectClick(evt)) {
    togglePopup();
    for (item of popupElement.children) {
      item.classList.remove('popup__window_visible');
    }
  }
};

function initPopup () {
  popupElement.addEventListener('click', closePopup);
  for (btn of popupElement.querySelectorAll('.popup__close-button')) {
    btn.addEventListener('click', closePopup);
  }
}

initPopup();


// Открытие лайтбокса

function openLightbox (evt) {
  const lb = document.querySelector('#lightbox');
  const name = evt.target.parentNode.querySelector('.places__place-name').textContent;
  const src = evt.target.parentNode.querySelector('.places__place-photo').src;
  lb.querySelector('.popup__lightbox-image').src = src;
  lb.querySelector('.popup__lightbox-caption').textContent = name;
  openPopup('lightbox');
};


// Форма редактирования профиля

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.querySelector('.form__input[name="user_name"]');
const inputTitle = document.querySelector('.form__input[name="title"]');

function openProfileEditForm (evt) {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  openPopup('edit-profile');
}

document.querySelector('.profile__button_role_edit').addEventListener('click', openProfileEditForm);

function submitProfileEditForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(evt);
}

document.querySelector('#edit-profile form').addEventListener('submit', submitProfileEditForm);


// Форма добавления места

const addPlaceForm = document.querySelector('#add-place form');

document.querySelector('.profile__button_role_add').addEventListener('click', () => {
  addPlaceForm.reset();
  openPopup('add-place');
});

function submitAddPlaceForm (evt) {
  evt.preventDefault();
  const inputName = document.querySelector('.form__input[name="place_name"]').value;
  const inputLink = document.querySelector('.form__input[name="image_link"]').value;
  addPlace({
    name: inputName,
    link: inputLink
  });
  closePopup(evt);
}

addPlaceForm.addEventListener('submit', submitAddPlaceForm);
