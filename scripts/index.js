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

const validationParams = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'button_state_disabled',
  inputErrorClass: 'form__input_state_invalid',
  errorIdPostfix: '-error'
};

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
const formAddPlaceSubmitButton = formAddPlace.querySelector('.form__submit-button');
const lightboxPopup = document.querySelector('#lightbox-popup');
const lightboxImage = lightboxPopup.querySelector('.lightbox__image');
const lightboxCaption = lightboxPopup.querySelector('.lightbox__caption');


// Попап

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  page.classList.add('page_popup-opened');
  document.addEventListener("keydown", closePopupOnEscape);
}

const closePopup = (evt, popupNode) => {
  if (evt) {
    evt.stopPropagation();
  }
  const popup = evt ? evt.target.closest('.popup') : popupNode;
  popup.classList.remove('popup_opened');
  page.classList.remove('page_popup-opened');
  document.removeEventListener("keydown", closePopupOnEscape);
};

const setClosePopupClickListeners = (popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.currentTarget === evt.target) {
      closePopup(evt);
    }
  });
  for (const element of popup.querySelectorAll('.popup__close')) {
    element.addEventListener('click', closePopup);
  }
}

const closePopupOnEscape = (evt) => {
  if("key" in evt && (evt.key === "Escape" || evt.key === "Esc")){
    closePopup(null, document.querySelector('.popup_opened'));
  }
}

const initPopups = () => {
  for (const popup of popups) {
    setClosePopupClickListeners(popup);
  }
};

initPopups();


// Открытие лайтбокса

const openLightbox = (evt) => {
  const name = evt.target.closest('.places__place').querySelector('.places__place-name').textContent;
  const src = evt.target.closest('.places__place').querySelector('.places__place-photo').src;
  lightboxImage.src = src;
  lightboxImage.alt = 'Фотография места: ' + name;
  lightboxCaption.textContent = name;
  openPopup(lightboxPopup);
};


// Карточки мест

const toggleLike = (evt) => {
  evt.stopPropagation();
  evt.target.classList.toggle('places__like-icon_active');
}

const deletePlace = (evt) => {
  evt.stopPropagation();
  evt.target.closest('.places__place').remove();
}

const initPlace = (placeElement) => {
  placeElement.querySelector('.places__place-photo').addEventListener('click', openLightbox);
  placeElement.querySelector('.places__delete-icon').addEventListener('click', deletePlace);
  placeElement.querySelector('.places__like-icon').addEventListener('click', toggleLike);
}

const buildPlace = (placeObj) => {
  const placeNode = placeTemplate.content.cloneNode(true);
  placeNode.querySelector('.places__place-photo').src = placeObj.link;
  placeNode.querySelector('.places__place-photo').alt = 'Фотография места: ' + placeObj.name;
  placeNode.querySelector('.places__place-name').textContent = placeObj.name;
  initPlace(placeNode);
  return placeNode;
}

const addPlace = (placeObj) => {
  places.prepend(buildPlace(placeObj));
};

const initPlaces = (placesArray) => {
  for (const placeObj of placesArray) {
    addPlace(placeObj);
  }
};

initPlaces(initialPlaces);


// Объявление форм

const forms = {
  'edit-profile': {
    openingElementSelector: '.profile__button_role_edit',
    popupElement: popupEditProfile,
    initFunction: () => {
      inputUserName.value = profileName.textContent;
      inputTitle.value = profileTitle.textContent;
    },
    submitFunction: () => {
      profileName.textContent = inputUserName.value;
      profileTitle.textContent = inputTitle.value;
    }
  },
  'add-place': {
    openingElementSelector: '.profile__button_role_add',
    popupElement: popupAddPlace,
    initFunction: () => {
      formAddPlace.reset();
      formAddPlaceSubmitButton.classList.add(validationParams.inactiveButtonClass);
    },
    submitFunction: () => {
      addPlace({
        name: inputPlaceName.value,
        link: inputLink.value
      });
    }
  }
}


// Открытие форм

const addFormOpenListeners = () => {
  for (const formElement of document.forms) {
    const formDescription = forms[formElement.name];
    document.querySelector(formDescription.openingElementSelector).addEventListener('click', () => {
      formDescription.initFunction();
      openPopup(formDescription.popupElement);
      formDescription.popupElement.querySelector('.form__input').focus();
    });
  }
}

addFormOpenListeners();
