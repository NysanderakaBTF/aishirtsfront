import store from "../store/index.js";
import axios from "axios";

export default function authHeader() {
    let token = store.state.auth.token;

    if (token) {
        return { Authorization: 'Bearer ' + store.getters["auth/getToken"] };
    } else {
        return {};
    }
}

axios.interceptors.request.use(
    (config) => {
        config.headers = { ...config.headers, ...authHeader() };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);