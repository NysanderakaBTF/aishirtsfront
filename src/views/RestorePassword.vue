<template>
    <div>
        <h1>Password Reset</h1>
        <form @submit.prevent="requestPasswordReset">
            <label for="email">Email</label>
            <input id="email" type="email" v-model="email" required>
            <button type="submit">Reset Password</button>
        </form>
        <div v-if="successMessage">{{ successMessage }}</div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            successMessage: '',
            errorMessage: '',
        }
    },
    methods: {
        requestPasswordReset() {
            axios.post('http://127.0.0.1:8000/auth/password/reset/', { email: this.email })
                .then(response => {
                    this.successMessage = response.data.detail;
                })
                .catch(error => {
                    this.errorMessage = error.message;
                    this.$notify({
						type:'error',
						text:error.message
					})
                });
        },
    }
}
</script>