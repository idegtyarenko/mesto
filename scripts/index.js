"use strict";

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
const popupEditProfile = document.querySelector('#edit-profile-popup');
const formEditProfile = document.forms['edit-profile'];
const inputUserName = formEditProfile.elements['user-name'];
const inputTitle = formEditProfile.elements.title;
const popupAddPlace = document.querySelector('#add-place-popup');
const formAddPlace = document.forms['add-place'];
const inputPlaceName = formAddPlace.elements['place-name'];
const inputLink = formAddPlace.elements['image-link'];
const lightboxPopup = document.querySelector('#lightbox-popup');
const lightboxImage = lightboxPopup.querySelector('.lightbox__image');
const lightboxCaption = lightboxPopup.querySelector('.lightbox__caption');

// Карточки мест

function toggleLike (evt) {
  evt.stopPropagation();
  evt.target.classList.toggle('places__like-icon_active');
}

function deletePlace (evt) {
  evt.stopPropagation();
  evt.target.closest('.places__place').remove();
}

function initPlace (placeElement) {
  placeElement.querySelector('.places__place').addEventListener('click', openLightbox);
  placeElement.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  placeElement.querySelector('.places__like-icon').addEventListener('click', toggleLike);
}

function buildPlace (placeObj) {
  const placeNode = placeTemplate.content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = placeObj.link;
  placeNode.querySelector('.places__place-photo').alt = 'Фотография места: ' + placeObj.name;
  placeNode.querySelector('.places__place-name').textContent = placeObj.name;
  initPlace(placeNode);
  return placeNode;
}

function addPlace (placeObj) {
  places.prepend(buildPlace(placeObj));
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
  const name = evt.target.closest('.places__place').querySelector('.places__place-name').textContent;
  const src = evt.target.closest('.places__place').querySelector('.places__place-photo').src;
  lightboxImage.src = src;
  lightboxImage.alt = 'Фотография места: ' + name;
  lightboxCaption.textContent = name;
  openPopup(lightboxPopup);
};


// Формы

function openForm(element) {
  openPopup(element);
  element.querySelector('.form__input').focus();
}


// Форма редактирования профиля

function openProfileEditForm () {
  inputUserName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  openForm(popupEditProfile);
}

document.querySelector('.profile__button_role_edit').addEventListener('click', openProfileEditForm);

function submitProfileEditForm (evt) {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(evt);
}

formEditProfile.addEventListener('submit', submitProfileEditForm);


// Форма добавления места

document.querySelector('.profile__button_role_add').addEventListener('click', () => {
  formAddPlace.reset();
  openForm(popupAddPlace);
});

function submitAddPlaceForm (evt) {
  evt.preventDefault();
  addPlace({
    name: inputPlaceName.value,
    link: inputLink.value
  });
  closePopup(evt);
}

popupAddPlace.addEventListener('submit', submitAddPlaceForm);


// Валидация форм

function enableValidation (params) {

}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
