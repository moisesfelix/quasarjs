<template>
    <div>
        <q-layout>
            <q-page-container>
                <q-page class="login-page">
                    <q-card class="login-card">
                        <q-card-section>
                            <h2 class="text-h5">Login</h2>
                            <q-form @submit="submitForm">
                                <q-input v-model="username" label="Username" outlined dense></q-input>
                                <q-input v-model="password" label="Password" type="password" outlined dense></q-input>
                                <q-btn type="submit" label="Login" color="primary" class="q-mt-md"></q-btn>
                            </q-form>
                        </q-card-section>
                    </q-card>
                </q-page>
            </q-page-container>
        </q-layout>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        async submitForm() {
            try {
                const { username, password } = this;
                await this.$store.dispatch('login', { username, password });
                this.$router.push('/');
            } catch (error) {
                console.error(error);
            }
        },
    },
};
</script>
  
<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-card {
    max-width: 400px;
    width: 100%;
    padding: 20px;
}
</style>
  