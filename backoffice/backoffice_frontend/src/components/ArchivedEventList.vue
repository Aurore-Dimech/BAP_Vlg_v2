<script>
    import axios from "axios"

    
    export default {
        data(){
            return{
                events: []
            }
        },

        created(){
            this.getArchivedEvents();
        },

        methods:{
            async getArchivedEvents(){
                try {
                    const response = await axios.get("http://localhost:3000/events/archived");
                    this.events = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div class="container-modif">

        <table>

            <thead>
                <tr id="tab-titles">
                    <th>Evenements</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="event in events" :key='event.id' >
                    <td>
                        <router-link :to="{name:'SingleEvent', params:{id: event.id}}"> {{ event.name }}</router-link>
                    </td>
                    <td class="boutons">
                        <router-link :to="{name:'EditEvent', params:{id: event.id}}" class="bouton bouton-modifier">Modifier</router-link>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>


</template>

<style scoped lang="scss">

table{
    margin-inline: auto;
    
    tr{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        width: 58vw;
        border-radius: 15px;
        padding:10px;

        
        th{
            padding: 1% 5%;
            margin-inline: auto;
            background-color: #CECECE;
            width: 50%;
            border-radius: 5px;
            padding-block: 2%;
        }
        
        td{
            margin-inline: auto;
        }
    }
    
    #tab-titles{
        padding-top: 0;
    }
    tbody{
        display: flex;
        flex-direction: column;
        gap: 1vh;
    }
}

table tr td:first-child {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;

    a {
        text-decoration: none;
        color: black;
    }
}

.container-modif {
    background-color: #fbf6f2;
    padding: 3.5vh 0 4vh 0;
    width: 100%;
    margin-top: 2vh;
}

.bouton{

    &s{
        width: 80%;
        display: flex;
        justify-content: space-evenly;
    }

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 10px;
    width: 37%;
    border-radius: 10px;
    border: none;
    padding-block: 1.5%;
    font-weight: 600;
    font-size: 15px;
    font-family: Poppins;

    &-modifier {
        background: #60E886;
        text-decoration: none;
        color: black;
    }
}
</style>