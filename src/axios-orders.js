import axios from 'axios';

const instance =axios.create({
    // baseURL:'https://my-burger-3b920.firebaseio.com/'
    baseURL:'http://localhost:3000/'
});

export default instance;