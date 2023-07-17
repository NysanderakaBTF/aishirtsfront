import axios from "axios";

export const cart = {
    namespaced: true,
    namespace:'cart',
    state: {
        products:[],
        total:0
    },
    actions: {
    },
    mutations: {
        setProducts(state, {products, total}){
            state.products = products;
            state.total = total
        },
        addProduct(state, product){
            console.log(state.products)
            product.quantity = 1;
            product.total = product.quantity*product.product.price;
            state.products.push(product);
            let q = 0;
            for (const item of state.products) {
                q += item.total;
            }
            state.total = q;
            console.log(state.products);
        },
        removeProductById(state, prodId) {
            console.log(state.products)
            state.products = state.products.filter(value =>
                value["product"]["id"] !== prodId
            )
            console.log(state.products)
            let q = 0;
            for (const item of state.products) {
                q += item.total;
            }
            state.total = q;
        },
        updateQuantityById(state, {payload, increase}) {
            for (const item of state.products) {
                console.log(item ,payload)
                if (item.id === payload.id) {
                    if (increase) {
                        item.quantity += 1;
                    } else {
                        item.quantity -= 1
                    }
                    break;
                }
            }
            let q = 0;
            for (const item of state.products) {
                q += item.quantity * item.item.price;
            }
            state.total = q;
            axios.patch(`http://127.0.0.1:8000/shop/order-items/${payload.id}/`, payload).then(value => {
                payload = value.data
            })
            axios.put('http://127.0.0.1:8000/shop/bucket/', {
                total: state.total
            }).then(value => {
                state.products = value.data.items;
                state.total = value.data.total;
            })
        }

    },
    getters:{
        getAllProducts(state){
            return state.products;
        },
        getTotal(state){
            return state.total;
        },
        getProductById(state, id){
            for (const product of state.products) {
                if(product.product.id === id){
                    return product;
                }
            }
        }
    }
};