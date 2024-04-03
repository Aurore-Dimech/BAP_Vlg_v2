<script>
    import ClosedAssociationList from '@/components/backoffice/components/ClosedAssociationList.vue';
    import ArchivedEventList from '@/components/backoffice/components/ArchivedEventList.vue';


    export default {
        name: 'Closed&Archived',

        components: {
            ClosedAssociationList,
            ArchivedEventList
        },

        data(){
            return {
                token: localStorage.getItem('token'),
                view: 'associations',
            }
        },

        created: function(){
            this.verifyConnection();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },
        }
}
</script>

<template>

    <div class="view-selection">
        <button id="associations" @click="view = 'associations'" :class="{ active: view === 'associations' }">Associations fermées</button>
        <button id="events" @click="view = 'events'" :class="{ active: view === 'events' }">Évènements terminés</button>
    </div>

    <div v-if="view == 'associations'">
        <ClosedAssociationList />
    </div>

    <div v-if="view == 'events'">
        <ArchivedEventList />
    </div>
    

</template>
  
<style scoped lang="scss">

.view-selection{
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    margin: 2vh auto;
    align-items: center;
    
    button{
        border-radius: 50px;
        border: none;
        padding: 1.5%;
        font-weight: 600;
        font-size: 20px;
        font-family: Poppins;
        color: grey;
    }
}

.view-selection button.active {
    background-color: #CECECE;
    color: black
}

.container-modif {
    margin: 0;
}
</style>