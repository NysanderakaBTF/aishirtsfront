import {createRouter, createWebHistory} from 'vue-router'
import Welcome from "../views/Welcome.vue";
import Login from "../views/Login.vue";
import user from "../views/User.vue";
import store from "../store/index.js";
import Registration from "../views/Registration.vue";
import RestorePassword from "../views/RestorePassword.vue";
import AddingAddress from "../components/AddingAddress.vue";
import Proompter from "../views/Proompter.vue";
import Store from "../views/Store.vue";
import ProductDetailPage from "../views/ProductDetailPage.vue";
import CartPage from "../views/CartPage.vue";
import MorePrompsCheckout from "../views/payments/MorePrompsCheckout.vue";
import OnPaySuccess from "../views/payments/OnPaySuccess.vue";
import Contact from "../views/Contact.vue";
import EditUser from "../views/EditUser.vue";
import PromptsPurshuase from "../views/PromptsPurshuase.vue";
import PasswirdResetConfirm from "../views/PasswirdResetConfirm.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            alias: '/',
            component: Welcome,
            name: 'home'
        },
        {
            path: '/login',
            component : Login,
            name: 'login'
        },
        {
            path: '/user',
            component: user,
            name: 'user'
        },
        {
            path: '/register',
            component: Registration
        },
        {
            path: '/restore',
            component:RestorePassword
        },
        {
            path: '/restore/confirm/',
            component:PasswirdResetConfirm
        },
        {
            path: '/generator',
            component: Proompter
        },
        {
            path: '/store',
            component: Store
        },
        {
            path: '/product/:id',
            component: ProductDetailPage,
            name: 'product',
            props: true
        },
        {
            path: '/cart',
            component: CartPage
        },
        {
            path: '/checkout/p',
            component: MorePrompsCheckout
        },
        {
            path: '/payment/success',
            component: OnPaySuccess,
            name: 'payment-success',
            props: (route) => ({ oid: route.query.oid , is_for_prompts: route.query.is_for_prompts})
        },
        {
            path: '/contact',
            component: Contact
        },
        {
            path: '/upd',
            component: EditUser
        },
        {
            path:'/generator/buy',
            component: PromptsPurshuase
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     const publicPages = ['/login', '/register', '/home', '/store', "/"];
//     let authRequired = !publicPages.includes(to.path);
//     const loggedIn = store.state.auth.token != null;
//
//     // const loggedIn = th;
//     // trying to access a restricted page + not logged in
//     // redirect to login page
//     if (authRequired && !loggedIn) {
//         if (to.path.match(/\/product\/*/)) {
//             next()
//         } else {
//             next('/login');
//         }
//     } else {
//         next();
//     }
// });
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/home', '/store', "/", "/restore", '/restore/confirm/'];
    let authRequired = !publicPages.includes(to.path);
    const loggedIn = store.state.auth.token != null;
    console.log(to);
    console.log(from)
    if (authRequired && !loggedIn) {
        if (to.path.match(/\/product\/*/)) {
            next()
        } else {
            next('/login');
        }
    } else if (authRequired && loggedIn) {
        const token = store.state.auth.token;
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000; // JWT exp is in seconds, Date.now() is in milliseconds
        if (expirationTime < Date.now()) {
            next('/login'); // redirect to login page if token is expired
        } else {
            next(); // continue to the requested page
        }
    } else {
        next(); // public page, no authentication required
    }
});
export default router
