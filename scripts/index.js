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

const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileTitle = page.querySelector('.profile__title');
const places = document.querySelector('.places');
const placeTemplate = places.querySelector('#place-template');
const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('#edit-profile');
const inputUserName = editProfilePopup.querySelector('.form__input[name="user_name"]');
const inputTitle = editProfilePopup.querySelector('.form__input[name="title"]');
const addPlacePopup = document.querySelector('#add-place');
const addPlaceForm = addPlacePopup.querySelector('.form');
const inputPlaceName = addPlaceForm.querySelector('.form__input[name="place_name"]');
const inputLink = addPlaceForm.querySelector('.form__input[name="image_link"]');
const lightbox = document.querySelector('#lightbox');

// Карточки мест

function toggleLike (evt) {
  evt.stopPropagation();
  evt.target.classList.toggle('places__like-icon_active');
}

function deletePlace (evt) {
  evt.stopPropagation();
  evt.target.parentNode.remove();
}

function initPlace (placeElement) {
  placeElement.querySelector('.places__place').addEventListener('click', openLightbox);
  placeElement.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  placeElement.querySelector('.places__like-icon').addEventListener('click', toggleLike);
}

function addPlace (placeObj) {
  const placeNode = placeTemplate.content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = placeObj.link;
  placeNode.querySelector('.places__place-photo').alt = 'Фотография места: ' + placeObj.name;
  placeNode.querySelector('.places__place-name').textContent = placeObj.name;
  initPlace(placeNode);
  places.prepend(placeNode);
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

  const firstInput = popup.querySelector('.form__input');
  if (firstInput) {
    firstInput.focus();
  }
}

function closePopup (evt, popupNode) {
  if (evt) {
    evt.stopPropagation();
  }
  const popup = evt ? evt.target.closest('.popup') : popupNode;
  popup.classList.remove('popup_opened');
  page.classList.remove('page_popup-opened');
};

function initPopups () {
  for (const popup of popups) {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.currentTarget === evt.target) {
        closePopup(evt);
      }
    });
    for (const element of popup.querySelectorAll('.popup__close')) {
      element.addEventListener('click', closePopup);
    }
  }
  document.addEventListener ("keydown", evt => {
    if("key" in evt && (evt.key === "Escape" || evt.key === "Esc")){
      closePopup(null, document.querySelector('.popup_opened'));
    }
  });
};

initPopups();


// Открытие лайтбокса

function openLightbox (evt) {
  const name = evt.target.parentNode.querySelector('.places__place-name').textContent;
  const src = evt.target.parentNode.querySelector('.places__place-photo').src;
  lightbox.querySelector('.popup__lightbox-image').src = src;
  lightbox.querySelector('.popup__lightbox-image').alt = 'Фотография места: ' + name;
  lightbox.querySelector('.popup__lightbox-caption').textContent = name;
  openPopup(lightbox);
};


// Форма редактирования профиля

function openProfileEditForm () {
  inputUserName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  openPopup(editProfilePopup);
}

document.querySelector('.profile__button_role_edit').addEventListener('click', openProfileEditForm);

function submitProfileEditForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
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
  addPlace({
    name: inputPlaceName.value,
    link: inputLink.value
  });
  closePopup(evt);
}

addPlacePopup.addEventListener('submit', submitAddPlaceForm);
