import axios from 'axios';
import { baseUrl } from "../utils/Endpoint";

const BASE_URL = baseUrl;

export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});