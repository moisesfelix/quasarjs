<template>
    <div class="q-ma-md">
        <q-card>
            <q-card-section>
                <div class="text-h6">{{ item.name }}</div>
                <div>ID: {{ item.id }}</div>
                <div>Active: {{ item.active }}</div>
                <div>Order: {{ item.order }}</div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn icon="edit" class="cursor-pointer" @click="editItem" />
                <q-btn icon="delete" color="negative" @click="confirmDelete" />
            </q-card-actions>
        </q-card>

        <q-dialog v-model="showDeleteConfirmation">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Confirmar exclusão</div>
                    <div>Deseja realmente excluir este item?</div>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="Cancelar" color="primary" @click="cancelDelete" />
                    <q-btn label="Excluir" color="negative" @click="deleteItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <q-btn label="Voltar" color="green" @click="goBack" />
    </div>
</template>
  
<script>
import { QCard, QCardSection, QCardActions, QBtn, QDialog } from 'quasar'

export default {
    name: 'DetailPage',
    components: {
        QCard,
        QCardSection,
        QCardActions,
        QBtn,
        QDialog
    },
    data() {
        return {
            item: {},
            showDeleteConfirmation: false
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
                this.item = response.data.data
            } catch (error) {
                console.error(error)
            }
        },
        goBack() {
            this.$router.go(-1) // Volta para a página anterior
        },
        editItem() {
            const itemId = this.$route.params.id
            this.$router.push(`/edit/${itemId}`) // Redireciona para a página de edição com o formulário
        },
        confirmDelete() {
            this.showDeleteConfirmation = true
        },
        cancelDelete() {
            this.showDeleteConfirmation = false
        },
        async deleteItem() {
            try {
                const itemId = this.$route.params.id
                await this.$api.delete(`/${itemId}`)
                this.showDeleteConfirmation = false
                this.$router.push('/') // Redireciona para a página de listagem após excluir
                this.$q.notify({
                    message: 'Item excluído com sucesso.',
                    type: 'positive'
                })
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>
  