import { STAGE, API_URL as PROD_URL, API_URL_ANDROID, API_URL_IOS } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/async-storage";

export const API_URL = (STAGE === 'dev') ? Platform.OS === 'android' ? API_URL_ANDROID : API_URL_IOS : PROD_URL;

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

tesloApi.interceptors.request.use(async (config) => {
    const token = await StorageAdapter.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export { tesloApi };

