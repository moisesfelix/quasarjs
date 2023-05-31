<template>
    <div>
        <q-form @submit="saveChanges" class="q-ma-md">
            <q-input v-model="form.name" label="Nome" type="text" required></q-input>
            <q-input v-model="form.active" label="Ativo" type="number" required></q-input>
            <q-btn label="Voltar" color="green" @click="goBack" />
            <q-btn label="Salvar" color="primary" type="submit"></q-btn>
        </q-form>
    </div>
</template>
  
<script>
export default {
    name: 'EditPage',
    data() {
        return {
            form: {
                name: '',
                active: ''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            try {
                const itemId = this.$route.params.id
                const response = await this.$api.get(`/${itemId}`)
                this.form = response.data.data
            } catch (error) {
                console.error(error)
            }
        },
        async saveChanges() {
            try {
                const itemId = this.$route.params.id
                const data = {
                    house_rules: {
                        ...this.form
                    }
                }
                await this.$api.put(`/${itemId}`, data)
                this.$router.push('/') // Redireciona para a página de listagem após salvar
            } catch (error) {
                console.error(error)
            }
        },
        goBack() {
            this.$router.go(-1) // Volta para a página anterior
        }
    }
}
</script>
  