import { STAGE, API_URL as PROD_URL, API_URL_ANDROID, API_URL_IOS } from "@env";
import axios from "axios";
import { Platform } from "react-native";

export const API_URL = (STAGE === 'dev') ? Platform.OS === 'android' ? API_URL_ANDROID : API_URL_IOS : PROD_URL;

const tesloApi = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// tesloApi.interceptors.request.use(async (config) => {

//     const token = await StorageAdapter
//     return config;
// });


export { tesloApi };

