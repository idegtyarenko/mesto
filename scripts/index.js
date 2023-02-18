const page = document.querySelector('.page');
const lightbox = document.querySelector('#lightbox');
const editProfilePopup = document.querySelector('#edit-profile');
const addPlacePopup = document.querySelector('#add-place');
const addPlaceForm = addPlacePopup.querySelector('.form');

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

function buildPlace (placeObj) {
  const placeNode = document.querySelector('#place-template').content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = placeObj.link;
  placeNode.querySelector('.places__place-name').textContent = placeObj.name;
  return placeNode;
}

function initPlace (placeElement) {
  placeElement.addEventListener('click', openLightbox);
  placeElement.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  placeElement.querySelector('.places__like-icon').addEventListener('click', toggleLike);
}

function addPlace (placeObj) {
  newPlace = buildPlace(placeObj);
  document.querySelector('.places').prepend(newPlace);
  initPlace(document.querySelector('.places__place'));
};

function initPlaces (placesArray) {
  for (const placeObj of placesArray) {
    addPlace(placeObj);
  }
};

initPlaces(initialPlaces);


// Попап

function openPopup (popup) {
  popup.classList.add('popup_opened');
  page.classList.add('page_popup-opened');

  firstInput = popup.querySelector('.form__input');
  if (firstInput) {
    firstInput.focus();
  }
}

function closePopup (evt) {
    const popup = evt.target.closest('.popup');
    popup.classList.remove('popup_opened');
    page.classList.remove('page_popup-opened');
    evt.stopPropagation();
};

function initPopups () {
  const popups = document.querySelectorAll('.popup');
  for (const popup of popups) {
    popup.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopup(evt);
      }
    });
    for (const element of popup.querySelectorAll('.popup__close')) {
      element.addEventListener('click', closePopup);
    }
  }
}

initPopups();


// Открытие лайтбокса

function openLightbox (evt) {
  const name = evt.target.parentNode.querySelector('.places__place-name').textContent;
  const src = evt.target.parentNode.querySelector('.places__place-photo').src;
  lightbox.querySelector('.popup__lightbox-image').src = src;
  lightbox.querySelector('.popup__lightbox-caption').textContent = name;
  openPopup(lightbox);
};


// Форма редактирования профиля

const profileName = document.querySelector('.profile__name');
const profileTitle = document.querySelector('.profile__title');
const inputName = document.querySelector('.form__input[name="user_name"]');
const inputTitle = document.querySelector('.form__input[name="title"]');

function openProfileEditForm () {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  openPopup(editProfilePopup);
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

document.querySelector('.profile__button_role_add').addEventListener('click', () => {
  addPlaceForm.reset();
  openPopup(addPlacePopup);
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

addPlacePopup.addEventListener('submit', submitAddPlaceForm);
