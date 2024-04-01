<script>
    import AssociationList from '@/components/AssociationList.vue';
    import EventList from '@/components/EventList.vue'

    export default {
        name: 'Index',

        components: {
            AssociationList,
            EventList
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
            }
        }
}
</script>

<template>

<div class="view-selection">
        <button id="associations" @click="view = 'associations'" :class="{ active: view === 'associations' }">Associations</button>
        <button id="events" @click="view = 'events'" :class="{ active: view === 'events' }">Évènements</button>
    </div>
    
    <div v-if="view == 'associations'">
        <AssociationList />
    </div>
    <div v-if="view == 'events'">
        <EventList />
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
</style>