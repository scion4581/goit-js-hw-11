'use strict';

import PixabayAPI from './js/pixabay-api.js';
import iziToast from 'izitoast';
import errorIcon from '/img/error-icon.png';
import renderGallery from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';

const PIXABAY_API_KEY = '25546966-f3ef2260a4c78c9f4c7cc9e45';
const SEARCH_IMAGES_REQUEST_OPTIONS = {
    'image_type': 'photo',
    'orientation': 'horizontal',
    'safesearch': true
};

const pixabayApi = new PixabayAPI(PIXABAY_API_KEY);
const gallerySlider = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionsPosition: 'bottom',
});

const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loaderElement = document.querySelector('.loader');

function showLoader() {
    loaderElement.classList.remove('hidden');
}

function hideLoader() {
    loaderElement.classList.add('hidden');
}

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchForm = event.currentTarget;
    const searchText = searchForm.searchField.value.trim();
    if (searchText === '') {
        showErrorMessage('You have to write something!');
        return;
    }

    galleryContainer.innerHTML = '';
    showLoader();

    pixabayApi.searchImages({
        ...{ 'q': searchText },
        ...SEARCH_IMAGES_REQUEST_OPTIONS
    }).then(images => {
        if (images.total === 0) {
            showErrorMessage('Sorry, there are no images matching your search query. Please try again!');
        } else {
            galleryContainer.innerHTML = renderGallery(images.hits);
            gallerySlider.refresh();
        }

    }).catch(error => {
        showErrorMessage(error.message);
    }).finally(() => {
        hideLoader();
        searchForm.reset();
    });
});

function showErrorMessage(msgText) {
    iziToast.error({
        title: 'Error',
        message: msgText,
        iconUrl: errorIcon,
        position: 'topRight',
        titleColor: '#FFF',
        messageColor: '#FFF',
        backgroundColor: '#EF4040',
        theme: 'dark',
        progressBar: false,
        close: false,
    });
}