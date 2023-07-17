<template>
    <nav class="z-10 bg-white shadow-lg">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                    <div class="flex-shrink-0">
                        <img class="h-10" src="../assets/logo.svg" alt="Logo">
                        <!--                        <font-awesome-icon icon="fa-duotone fa-cart-shopping" style="&#45;&#45;fa-primary-color: #592e76; &#45;&#45;fa-secondary-color: #7d6da2;" />-->
                    </div>
                    <div class="hidden sm:block sm:ml-6">
                        <div class="flex space-x-4">
                            <router-link to="/home"
                                         class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">
                                Home
                            </router-link>
                            <router-link to="/store"
                                         class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">
                                Shop
                            </router-link>
                            <router-link to="/generator"
                                         class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">
                                Generator
                            </router-link>
                            <router-link
                                to="/contact"
                                class="px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">
                                Contact
                            </router-link>
                        </div>
                    </div>
                </div>
                <router-link v-if="store.state.auth.status.loggedIn" to="/cart">
                    <button class="flex w-10 h-10 mr-2 text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                        <img src="/src/assets/shopping-cart-svgrepo-com.svg" alt="cart">
                        <div v-if="store.state.cart.products.length >0" class="absolute text-white bg-purple-700 rounded-full w-5 h-5 ml-5">
                            {{store.state.cart.products.length}}
                        </div>
                    </button>
                </router-link>
                <div class="z-10 hidden sm:block sm:ml-6" v-if="store.state.auth.status.loggedIn">
                    <div class="flex items-center">

                        <!-- Profile dropdown -->
                        <div class="relative ml-3" @click="toggleDropdown">
                            <div>
                                <button class="flex text-sm transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300">
                                    <img class="w-8 h-8 rounded" src="../assets/profile-round-1342-svgrepo-com.svg"
                                         alt="">
                                </button>


                            </div>
                            <div :class="{'hidden': !dropdownOpen}"
                                 class="absolute right-0 w-48 mt-2 origin-top-right rounded-md shadow-lg">
                                <div class="py-1 bg-white rounded-md shadow-xs" style="padding-bottom: 0;">
                                    <router-link to="/user"
                                                 class="block px-4 py-2 text-sm text-center text-gray-700 hover:bg-gray-100">
                                        Profile
                                    </router-link>
                                    <button @click="logout"
                                            class="block w-full px-4 py-2 mb-0 text-sm bg-purple-400 text-gray-50 hover:bg-gray-100 rounded-b-md">
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                        <!--            cart icon-->

                    </div>
                </div>
                <div v-else>
                    <router-link to="/login">
                        <button class="px-3 py-2 font-medium text-purple-600 bg-white border border-transparent rounded-md hover:text-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Login
                        </button>
                    </router-link>
                    <router-link class="registerb" to="/register">
                        <button class="px-3 py-2 ml-3 font-medium text-white border border-transparent rounded-md bg-gradient-to-r from-purple-600 to-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            Register
                        </button>
                    </router-link>
                </div>
                <div class="flex items-center -mr-2 sm:hidden">
                    <!-- Mobile menu button -->
                    <button @click="toggleMobileMenu" type="button"
                            class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-100 rounded-md hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <!--
                          Heroicon name: outline/menu
                           Menu open: "hidden", Menu closed: "block"
                        -->
                        <svg class="block w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                        <!--
                          Heroicon name: outline/x
                           Menu open: "block", Menu closed: "hidden"
                        -->
                        <svg class="hidden w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile menu, show/hide based on menu state. -->
        <div :class="{'hidden': !mobileMenuOpen}" class="sm:hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <router-link to="/home"
                             class="block px-3 py-2 font-medium text-center text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">
                    Home
                </router-link>
                <router-link to="/generator"
                   class="block px-3 py-2 font-medium text-center text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">Generator</router-link>
                <router-link to="/store"
                   class="block px-3 py-2 font-medium text-center text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">Shop</router-link>
                <router-link to="/contact"
                   class="block px-3 py-2 font-medium text-center text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100">Contact</router-link>
                <hr class="my-2 border-gray-200"/>
                <router-link
                        to="/user"
                        class="block px-3 py-2 font-medium text-center text-white rounded-md bg-gradient-to-r from-purple-600 to-purple-400 hover:bg-purple-500"
                        @click="toggleMobileMenu"
                >
                    Profile
                </router-link>
                <button @click="logout"
                        class="block w-full px-3 py-2 font-medium text-center text-white rounded-md bg-gradient-to-r from-red-600 to-purple-400 hover:bg-purple-500">
                    Sign out
                </button>
            </div>
        </div>
    </nav>
</template>
<script>
import store from "../store/index.js";
import Login from "../views/Login.vue";
import AuthService from "../service/auth.service.js";
import UserService from "../service/user.service.js";
import login from "../views/Login.vue";

export default {
    name: 'Navbar',
    computed: {
        Login() {
            return Login
        },
        store() {
            return store
        }
    },
    data() {
        return {
            dropdownOpen: false,
            mobileMenuOpen: false,
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        toggleMobileMenu() {
            this.mobileMenuOpen = !this.mobileMenuOpen;
        },
        logout() {
            store.dispatch('auth/logout');
            this.$router.push('/login')
        }
    },
}
</script>

<style scoped>
.dropdown-menu {
    transition: all 0.3s ease-in;
}

.dropdown-menu.hidden {
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
}

@media screen and (max-width: 700px) {
    .registerb{
        display: none;
    }
}

</style>