<template>
    <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-bold text-gray-900">Orders</h3>
        <div class="mt-5 flex flex-col items-center">
            <div class="w-full names">
                <div class=" bg-gray-50 grid grid-cols-5 gap-2 font-bold text-gray-600 uppercase tracking-wider py-3 px-6">
                    <div>ID</div>
                    <div>Creation Date</div>
                    <div>Status</div>
                    <div>Total Price</div>
                    <div>Delivery method</div>
                </div>
            </div>
            <div class="w-full data">
                <div class="bg-white divide-y divide-gray-200">
                    <template :key="`row-${order.id}`" v-for="order in orders">
                        <div @click="toggleOrderDetails(order.id)" class="grid grid-cols-5 gap-2 hover:bg-gray-100 cursor-pointer px-6 py-4">
                            <div class="text-md font-medium text-gray-900" aria-label="ID"> <span class="vert font-bold">ID:</span> <span>{{ order.id }}</span> </div>
                            <div class="text-md font-medium text-gray-900" aria-label="Creation Date"><spna class="vert font-bold">Date:</spna> {{ formatDate(order.order_date) }}</div>
                            <div class="text-md font-medium text-gray-900" aria-label="Status"> <span class="vert font-bold">Status:</span> {{ order.shipped.status }}</div>
                            <div class="text-md font-medium text-gray-900" aria-label="Total Price"> <span class="vert font-bold">Price:</span> {{ order.total_price }}</div>
                            <div class="text-md font-medium text-gray-900" aria-label="Delivery method"> <span class="vert font-bold">Delivery:</span> {{ order.shipping_method.name }}</div>
                        </div>
                        <Transition name="slide-fade">
                            <div v-if="this.selecred_order === order.id" :key="`details-${order.id}`" class="bg-gray-100 p-4 rounded flex flex-wrap">
                                <OrderInfoItem class="ml-3" v-for="item in order.items" :key="item.id" :product="item"/>
                            </div>
                        </Transition>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import OrderInfoItem from "./OrderInfoItem.vue";

export default {
    components: {OrderInfoItem},
    data() {
        return {
            selecred_order: null,
        }
    },
    props: {
        orders: null
    },
    methods: {
        formatDate(date) {
            const jsDate = new Date(date);
// Format the JavaScript Date d to your desired format
            const options = {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                hour12: false
            };
            return jsDate.toLocaleString("en-US", options);

        },
        toggleOrderDetails(orderId) {
            if (this.selecred_order === orderId) {
                this.selecred_order = null;
            } else {
                this.selecred_order = orderId;
            }
        },
    }
}
</script>


<style>
.vert{
    ;
}
@media screen and (min-width: 557px){
    .vert{
        display: none;
    }
}

@media screen and (max-width: 557px)  {
    .data{
        display: flex;
        flex-direction: column;
    }
    .data span{
        margin-left: 0;
    }
    .data > div > div{
        display: flex;
        flex-direction: column;
    }
    .names{
        display: none;
        //display: flex;
        flex-direction: column;
    }
    .names div{
        display: flex;
        flex-direction: column;
    }
    .head{

    }
}
/* Add transition styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
    animation: slideDown 0.5s ease both;
}

.slide-fade-enter,
.slide-fade-leave-to {
    padding: 0;
    margin: 0;
    height: 0;
    opacity: 0;
    overflow: hidden;
    transition: all 0.5s ease; /* Add easing */
}

/* Add keyframes for the slideDown animation */
@keyframes slideDown {
    0% {
        max-height: 0;
    }
    100% {
        max-height: 100%; /* Adjust this value to fit the height of your expanded rows */
    }
}
/*.v-enter-active,*/
/*.v-leave-active {*/
/*    transition: opacity 0.5s ease;*/
/*}*/

/*.v-enter-from,*/
/*.v-leave-to {*/
/*    opacity: 0;  }*/
</style>