<script>
    import axios from "axios"

    export default {
        data(){
            return{
                search:[],
                searchInput: '',
            }
        },

        methods:{
            
            async searchEvent(){
                try {
                    this.search = []
                    let response = await axios.get(`http://localhost:4000/events/search/${this.searchInput}`)
                    this.search = response.data
                    this.searchInput= ''
                } catch(err) {
                    console.log(err)
                }
            },
        },
    }
</script>

<template>
        <div>
            <div>
                <input type="text" placeholder="Rechercher par nom, lieu, etc." v-model="searchInput">
            </div>

            <div>
                <button @click="searchEvent">Rechercher</button>
            </div>
        
        </div>

    <div>
        <table>

            <thead>
                <tr>
                    <th>Evènement</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="searched in search" :key='searched.id'>
                    <td>
                        <router-link :to="{name:'SingleEvent', params:{id: searched.id}}">{{ searched.name }}</router-link>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>


</template>
  
<style>
  
</style>
  