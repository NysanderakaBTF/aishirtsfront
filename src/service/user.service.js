import axios from 'axios';
import authHeader from './auth-header';
import store from "../store";

const API_URL = 'http://127.0.0.1:8000/';

class UserService {
    getPersonalInfo(id) {
        try {
            const a = axios.get(API_URL + 'users/customers/' + id, {headers: authHeader()}).then(
                value =>{
                    store.commit('auth/setUserInfo', value.data);
                    console.log(value.data)
                    console.log(value.data);
                    return value.data;
                }
            );
            return a;
        }catch (e){
            alert(e);
        }

    }

    updateInfo(id, userinfo) {
        return axios.put(API_URL + 'users/customers/' + `${id}`, userinfo, {headers: authHeader()});
    }

    deleteAccount(id){
        return axios.delete(API_URL + `${id}`, {
            headers: authHeader()
        })
    }

    changePassword({oldpass, newpass1, newpass2}){
        return axios.post(API_URL+'auth/password/change/', {
            new_password1:newpass1,
            new_password2:newpass2,
            old_password:oldpass
        })
    }

}

export default new UserService();