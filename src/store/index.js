import { createStore } from 'vuex'
import {auth} from "./auth.module";
import {cart} from "./cart.module.js";
import {category} from "./category.molude.js";
import axios from "axios";
import authHeader from "../service/auth-header.js";
let API_IMGURL = 'http://127.0.0.1:8000/ai/prompt/i/'

export default createStore({
    state: {
        prompt_images:null
    },
    getters: {
        getImages(state){
            return state.prompt_images
        }
    },
    mutations: {
        setImages(state, images){
            state.prompt_images = images;
        },
        addImages(state, images){
            state.prompt_images.results.unshift(...images)
        }
    },
    actions: {
        fetchImages({commit}){
            return axios.get(API_IMGURL, {
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
    modules: {
        auth,
        cart,
        category

    }
})