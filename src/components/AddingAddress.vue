<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75"
       v-show="showModal"
  >
    <div class="bg-white rounded-lg w-1/2">
      <div class="text-gray-900 font-bold py-4 px-6 bg-gray-300">
        Add New Address
      </div>
      <div class="py-4 px-6">
        <form>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="street_address">
              Street Address
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="street_address"
                type="text"
                placeholder="Enter street address"
                v-model="newAddress.street_address"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="city">
              City
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="city"
                type="text"
                placeholder="Enter city"
                v-model="newAddress.city"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="state">
              State
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="state"
                type="text"
                placeholder="Enter state"
                v-model="newAddress.state"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="zip_code">
              Zip Code
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="zip_code"
                type="text"
                placeholder="Enter zip code"
                v-model="newAddress.zip_code"
            />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="country">
              Country
            </label>
            <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="country"
                type="text"
                placeholder="Enter country"
                v-model="newAddress.country"
            />
          </div>
        </form>
      </div>
      <div class="flex justify-end py-4 px-6">
        <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mr-2"
            @click="showModal = false"
        >
          Cancel
        </button>
        <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            @click="addAddress"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import authHeader from "../service/auth-header.js";
import store from "../store/index.js";

export default {
  name: "AddingAddress",
  props:{
    showModal:{
      required:false,
      default:false
    },
    modalToggler:null
  },
  data() {
    return {
      newAddress: {
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      },
    };
  },
  methods: {
    addAddress() {
      // Send the newAddress data to the server to save it
      console.log(this.newAddress);
      // Clear the form data and hide the modal window
      axios.post('http://127.0.0.1:8000/users/delivery-addresses/', this.newAddress, {
        headers: authHeader()

      }).then(value =>{
        let users_adresses = store.getters["auth/getUserInf"].delivery_address
        users_adresses.push(value.data)
        console.log(users_adresses)
        axios.patch(`http://127.0.0.1:8000/users/customers/${store.getters["auth/getUserInf"].id}/`,{
          'delivery_address':users_adresses
        }, {
          headers: authHeader()

        }).then(value1 => {
          store.commit('auth/setUserAdresses', value1.data.delivery_address)
        })
      })
      this.newAddress = {
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
      };
      this.modalToggler();
    },
  },
};
</script>