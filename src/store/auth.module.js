import AuthService from '../service/auth.service';
import UserService from "../service/user.service";
import axios from "axios";
import authHeader from "../service/auth-header.js";
import store from "./index.js";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? {status: {loggedIn: true}, user}
    : {status: {loggedIn: false}, user: null};

export const auth = {
    namespaced: true,
    namespace: 'auth',
    state: {
        ...initialState,
        userInfo: null,
        token: null,
        user_id: null
    },
    actions: {
        initialize({commit}) {
            const token = localStorage.getItem('token');
            if (token != null && token != 'null') {
                commit('setToken', token);
            }
        },
        login({commit}, user) {
            console.log('!!!!!!!!')
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    commit('setToken', user.token.access_token)
                    commit('fetchUserInf');
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({commit}) {
            AuthService.logout();
            commit('logout');
        },
        register({commit}, user) {
            return AuthService.register(user).then(
                response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                },
                error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                }
            );
        },

    },
    mutations: {
        async fetchUserInf(state) {
            state.userInfo = await UserService.getPersonalInfo(state.user_id);
        },
        async fetchUpdatedUserInf(state) {
            state.userInfo = await UserService.getPersonalInfo(state.user.id);
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token); // Here we store the token in localStorage
            // Assuming your token is stored in a variable called 'token'
            if (state.token !== null && token !== null) {
                const payload = token.split('.')[1]; // Get the payload part of the token
                console.log(payload)
                console.log(token)
                const decodedPayload = JSON.parse(atob(payload)); // Decode the payload and parse it as JSON
                const userId = decodedPayload.user_id; // Get the user_id property from the payload
                state.user_id = userId;
            }

        },

        setUserInfo(state, user) {
            state.user = user;
            state.userInfo = user;
        },
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        setUserAdresses(state, adresses) {
            state.user.delivery_address = adresses
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
            state.user_id = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        }
    },
    getters: {
        getToken(state) {
            return state.token
        },
        getAuth(state) {
            return state.status.loggedIn;
        },
        getUserInf(state) {
            if (state.userInfo == null) {
                if (state.user_id == null) {
                    return null;
                }
            }
            return state.userInfo;
        },
        getUsername(state) {
            return state.user.username;
        },
        getLeftPromps(state) {
            return state.user.gen_left
        }
    }
};