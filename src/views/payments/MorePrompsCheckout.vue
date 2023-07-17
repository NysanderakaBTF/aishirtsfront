<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">Checkout</h1>
        <form class="w-full max-w-lg">
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="name">
                    Name
                </label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="John Doe"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="email">
                    Email
                </label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="johndoe@example.com"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="card-number">
                    Card Number
                </label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="card-number"
                        type="text"
                        placeholder="**** **** **** ****"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="exp-date">
                    Expiration Date
                </label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="exp-date"
                        type="text"
                        placeholder="MM/YY"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="cvc">
                    CVC
                </label>
                <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="cvc"
                        type="text"
                        placeholder="***"
                />
            </div>
            <div class="flex items-center justify-between">
                <button
                        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        @click="submitForm"
                >
                    Submit
                </button>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    methods: {
        submitForm() {
            // Handle form submission logic here
        },
    },
};
</script>