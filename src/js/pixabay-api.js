'use strict';

export default class PixabayAPI {
    static #PIXABAY_API_URL = 'https://pixabay.com/api/';
    #apiKey;
    constructor(apiKey) {
        this.#apiKey = apiKey;
    }

    searchImages(urlParams) {
        return this.#fetch('', urlParams);
    }

    // searchVideos(urlParams) {
    //     return this.#fetch('videos/', urlParams);
    // }

    #fetch(resourcePath, urlParams) {
        return fetch(PixabayAPI.#PIXABAY_API_URL
            + resourcePath
            + '?'
            + new URLSearchParams({ ...{ 'key': this.#apiKey }, ...urlParams }))
            .then(response => response.json());
    }
}