import axios from 'axios';
import store from "../store";

const API_URL = 'http://127.0.0.1:8000/';

class AuthService {
    login(user) {
        console.log("!!!!!!!!!!!!!!!")
        console.log(user)
        return axios
            // .post(API_URL + 'users/accounts/login/', {
            .post('http://127.0.0.1:8000/auth/login/', {
                email: user.email,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    store.commit('auth/loginSuccess', JSON.stringify(response.data));
                }
                console.log(response)
                return {token: response.data, username:user.username};
            });
    }

    logout() {
        store.state.auth.status.loggedIn = false;
        store.commit('auth/setToken', null)
        store.commit('auth/setUserInfo', null);
    }

    register(user) {
        return axios.post(API_URL + 'user/register', {
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName:user.lastName
        }).then(value => console.log(value.data));
    }
}

export default new AuthService();