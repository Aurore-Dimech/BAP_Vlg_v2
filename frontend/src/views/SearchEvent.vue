<script>
    import axios from "axios"
    import logo from "../assets/images/logo.svg"

    export default {
        name: 'SearchEvent',

        data(){
            return {
                token: localStorage.getItem('token'),
                search:[],
                searchInput: '',
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

            async searchEvent(){
                try {
                    this.search = []
                    let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events/search/${this.searchInput}`)
                    this.search = response.data

                    this.search.forEach((searched) =>{
                        if(searched.image === null){
                            searched.image = logo;
                        } else {
                            searched.image = `${import.meta.env.VITE_SERVER_URL}/${searched.image.replace('\public', '')}`
                        }
                    })

                    this.searchInput= ''
                } catch(err) {
                    console.log(err)
                }
            },

            async deleteEvent(id){
                try{
                    await axios.delete(
                        `${import.meta.env.VITE_SERVER_URL}/events/${id}`
                    )
                    this.getEvents()
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<template>
    <div class="fond">
       <h1 id="Titre">Rechercher un évènement</h1>

       <div class="container">
            <div class="search-bar">
                <input class= "search" type="text" placeholder="Rechercher par nom, lieu, etc." v-model="searchInput">

                <button class="bouton bouton-rechercher" @click="searchEvent">Rechercher</button>
           </div>
       </div>

       <div class="container-modif">
           <table>
   
               <thead v-if="search.length > 0">
                   <tr>
                        <th>Images</th>
                       <th>Evènements</th>
                       <th>Actions</th>
                   </tr>
               </thead>
   
               <tbody>
                   <tr v-for="searched in search" :key='searched.id'>
                        <td>
                            <img v-if="searched.image" :src="searched.image" alt="image de l'évènement" width="100px">
                        </td>
                       <td>
                           <router-link :to="{name:'SingleEvent', params:{id: searched.id}}">{{ searched.name }}</router-link>
                       </td>
                       <td class="boutons">
                           <router-link :to="{name:'EditEvent', params:{id: searched.id}}" class="bouton bouton-modifier">Modifier</router-link>
                           <button class="bouton bouton-supprimer" @click="deleteEvent(searched.id)">Supprimer</button>
                       </td>
                   </tr>
               </tbody>
   
           </table>
       </div>
   </div>
   
</template>
     
<style scoped lang="scss">
   
.fond {
    width: 86vw;
    background: #CECECE;
    border-radius: 34px;
    margin-inline: auto;
    align-content: center;
    padding-block: 6vh;
}

h1 {
    width: 80%;
    margin-inline: auto;
    text-align: center;
    font-size: 40px;
    padding-bottom: 2vh;
    border-bottom: 1px solid #000;
    margin-block: 0;
}
   
.container {
    margin-top: 4vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search-bar {
    display: flex;
    align-items: center;
    gap: 2%;
}

.search {
    width: 35vw;
    height: 40px;
    border: 1px solid #424242;
    border-radius: 10px;
    background-color: rgba(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
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
        text-decoration: none;
        color: black;
        background: #60E886;
    }

    &-supprimer {
        background: #FF5D5D;
    }

    &-rechercher{
        background-color: #9F81A1;
    }
}

table{
    margin-inline: auto;
    
    tr{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        width: 58vw;
        border-radius: 15px;
        padding:10px;
        
        th{
            padding: 1% 5%;
            margin-inline: auto;
            border: 1px solid black;
            width: 50%;
            border-radius: 5px;
            padding-block: 2%;
        }
        
        td{
            margin-inline: auto;
            text-align: center;

            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    
    #tab-titles{
        padding-top: 0;
    }
    tbody{
        display: flex;
        flex-direction: column;
        gap: 1vh;

        tr {
            background-color: rgba(236, 236, 236);
        }
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
    padding: 3.5vh 0 4vh 0;
    width: 100%;
}
   
</style> 