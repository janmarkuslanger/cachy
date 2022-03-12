import { Cachy } from '../lib';
import FetchClient from './fetch-client';
import LocalStorage from './local-storage'; 
import TimeCache from './time-cache';

const url = (username: string) => `https://api.github.com/users/${username}`;

const storage = new LocalStorage();
const cache = new TimeCache({ storage });
const client = new FetchClient();

const apiClient = new Cachy({
    cache,
    client,
});


const elements = {
    bio: document.querySelector('.user-info__bio'),
    location: document.querySelector('.user-info__location'),
    input: document.querySelector('.user-form__input'),
    button: document.querySelector('.user-form__button')
};

elements.button.addEventListener('click', async () => {
    const result = await apiClient.request({ url: url(elements.input.value), method: 'get' });
    elements.bio.textContent = result.response.bio;
    elements.location.textContent = result.response.location;
});