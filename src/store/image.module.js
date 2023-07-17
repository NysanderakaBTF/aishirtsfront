import axios from "axios";
import authHeader from "../service/auth-header.js";

let API_BASE = 'http://127.0.0.1:8000/ai/prompt/i/'

export const images = {
    namespaced: true,
    namespace:'images',
    state: {
        images:null
    },
    actions: {
        getCategores({commit}){
            return axios.get(API_BASE, {
                headers:authHeader()
            }).then(
                value =>{
                    let cats = value.data;
                    commit('setImages', cats);
                    return Promise.resolve(cats);
                }
            )
        }
    },
    mutations: {
        setImages(state, images){
            state.images = images;
        }
    },
    getters:{
        getCats(state){
            return state.categories;
        }

    }
};