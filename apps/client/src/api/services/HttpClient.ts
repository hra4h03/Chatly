import { API_URL } from '@configs/index';
import Axios from 'axios';

export const HttpClient = Axios.create({
    baseURL: API_URL,
});
