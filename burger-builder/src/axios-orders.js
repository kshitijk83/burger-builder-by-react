import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-builder-fbc31.firebaseio.com'
});

export default instance;