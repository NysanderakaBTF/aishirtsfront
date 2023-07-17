<template>
  <AddingAddress :show-modal="showModal" :modal-toggler="toggleModal"/>
  <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
    <div class="flex flex-row but" style="align-content: space-between">
      <div><h3 class="text-lg leading-6 font-bold text-gray-900 w-fit">Addresses</h3></div>
      <button  class="px-4 py-2 bg-purple-400 text-white rounded hover:bg-blue-700 block ml-3" @click="toggleModal">Add</button>
    </div>
    <div class="mt-5 flex flex-col items-center space-between table-responsive">
      <div class="table-responsive flex flex-col">
        <table class="table">
          <thead class="bg-gray-50">
          <tr>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              Street Address
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              City
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              State
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              Zip Code
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              Country
            </th>
            <th scope="col"
                class="px-6 py-3 text-left text-md font-bold text-gray-600 uppercase tracking-wider">
              Del
            </th>
          </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="address in addresse" :key="address.id" :id='address.id' class="">
            <td class="px-6 py-4 whitespace-nowrap" aria-label="Street Address">
              <div class="text-md font-medium text-right text-gray-900">{{ address.street_address }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap" aria-label="City">
              <div class="text-md font-medium text-gray-900">{{ address.city }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap" aria-label="State">
              <div class="text-md font-medium text-gray-900">{{ address.state }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap" aria-label="Zip Code">
              <div class="text-md font-medium text-gray-900">{{ address.zip_code }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap" aria-label="Country">
              <div class="text-md font-medium text-gray-900">{{ address.country }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap flex align-center" aria-label="Delete">
              <button class="text-md font-medium bg-red-400 w-7 rounded" @click="deleteAdreessFromUser">
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 64 64" id="cross">
                  <line x1="9.37" x2="54.63" y1="9.37" y2="54.63" fill="none" stroke="#010101" stroke-miterlimit="10"
                        stroke-width="4"></line>
                  <line x1="9.37" x2="54.63" y1="54.63" y2="9.37" fill="none" stroke="#010101" stroke-miterlimit="10"
                        stroke-width="4"></line>
                </svg>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
import axios from "axios";
import store from "../store/index.js";
import authHeader from "../service/auth-header.js";
import AddingAddress from "./AddingAddress.vue";
import UserService from "../service/user.service.js";

export default {
  components: {AddingAddress},
  props: {
    addresses: {
      type: Array,
      required: true
    }
  },
  data(){
    return{
      showModal:false,
      addresse:null
    }
  },
  mounted() {
    this.addresse = store.getters["auth/getUserInf"].delivery_address
  },
  methods: {
    async deleteAdreessFromUser(ev) {
      let iddd = ev.target.closest('tr').id;
      console.log(ev.target.closest('tr').id);
      let newa = this.addresse.filter(value => value.id != iddd);
      this.addresse = newa;
      await axios.delete(`http://127.0.0.1:8000/users/delivery-addresses/${iddd}`, {
        headers: authHeader()
      });
      let usr = await UserService.getPersonalInfo(store.getters["auth/getUserInf"].id);
      console.log(usr)
    },
    toggleModal(){
      this.showModal = !this.showModal;
    }
  }
}
</script>
<style scoped>
.table-responsive, table{
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}
@media screen and (max-width: 800px) {

  table thead {
    display: none;
  }

  table tr {
    display: block;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e8e9eb;
  }

  table td {
    display: block;
    text-align: right;
  }

  table td:before {
    content: attr(aria-label);
    float: left;
    font-weight: bold;
  }
}
.but{
  display: flex;
  align-items: center;

}
</style>