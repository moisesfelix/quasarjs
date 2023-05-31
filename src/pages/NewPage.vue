<template>
    <div>
        <q-form @submit="saveChanges" class="q-ma-md">
            <q-input v-model="form.name" label="Nome" type="text" required></q-input>
            <q-input v-model="form.active" label="Ativo" type="number" required></q-input>
            <q-btn label="Cancelar" color="negative" @click="goBack" />
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
                active: 1 // Definindo o valor padrão como 1
            }
        }
    },
    mounted() { },
    methods: {
        async saveChanges() {
            try {
                const itemId = this.$route.params.id
                const data = {
                    house_rules: {
                        ...this.form
                    }
                }
                await this.$api.post(`/`, data)
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
  