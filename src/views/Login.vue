<template>
  <div class="flex h-screen">
    <div class="items-center justify-around hidden w-full lg:flex lg:w-1/2 login_img_section">
      <div
          class="inset-0 z-0 bg-black opacity-20"
      >
      </div>
        <img src="../assets/phone-wallpaper-g0f01fd4ff_1920.jpg" alt="img" class="h-full">
    </div>
    <div class="flex justify-center items-center max-w-xl w-full p-8 rounded-lg ">
      <Form name="form" @submit="handleLogin" class="flex flex-col p-5 bg-white rounded-md shadow-2xl w-full">
        <h1 class="mb-1 text-2xl font-bold text-gray-800">Hello Again!</h1>
        <p class="mb-8 text-sm font-normal text-gray-600">Welcome Back</p>
        <div class="flex items-center px-3 py-2 mb-8 border-2 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <Field
              v-model="user.email"
              class="w-full pl-2 border-none outline-none"
              type="text"
              name="username"
              placeholder="username"
              :rules="validareEmail"
          />
          <ErrorMessage name="username"/>
        </div>
        <div class="flex items-center px-3 py-2 mb-12 border-2 rounded-2xl ">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <Field
              class="w-full pl-2 border-none outline-none"
              placeholder="Password"
              v-model="user.password"
              type="password"
              name="password"
              :rules="validatepassword"
          />
          <ErrorMessage name="password"/>
        </div>
        <button class="block w-full py-2 mt-5 mb-2 font-semibold text-white transition-all duration-500 bg-indigo-600 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1">Login</button>
        <div class="form-group">
          <div v-if="message" class="block mt-5 text-red-700 w-fit" role="alert">{{message['non_field_errors'][0]}}</div>
        </div>

        <div class="flex justify-between mt-4">

          <router-link to="/register" class="ml-2 text-sm transition-all duration-500 cursor-pointer hover:text-blue-500 hover:-translate-y-1">Don't have an account yet?</router-link>
          <router-link
              class="ml-2 text-sm transition-all duration-500 cursor-pointer hover:text-blue-500 hover:-translate-y-1"
              to="/restore"
          >
            Forgot Password?
          </router-link>
        </div>

      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field ,ErrorMessage } from 'vee-validate';
import store from  "../store";

export default {
  name: 'Login',
  components: {
    Form,
    Field,
    ErrorMessage
  },
  data() {
    return {
      user: {
        email:'',
        password:''
      },
      loading: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return store.state.auth.token != null;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/user');
    }
  },
  methods: {
    validareEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // All is good
      return true;
    },
    validatepassword(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // All is good
      return true;
    },
    handleLogin() {
      this.loading = true;
      if (this.user.email && this.user.password) {
        store.dispatch("auth/login", this.user).then(
            value => {
              this.$router.push('/home');
            },
            error => {
              this.loading = false;
              this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
            }
        );
        store.commit('auth/fetchUserInf');
      }
    }
  }
};
</script>

<style>

</style>