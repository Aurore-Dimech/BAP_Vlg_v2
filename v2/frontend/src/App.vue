<script>
import { RouterLink, RouterView } from "vue-router";
import axios from "axios";
import pipes from "@/assets/images/pipes.png"

export default {
    name:'App',

    data(){
        return{
            superadmin(){
              return false
            },
            pipes: pipes 
        }
    },

    computed:{
        token(){
            return localStorage.getItem('token')
        }
    },

    watch: {
        '$route': function() {
            return this.token
        }
    },

    created: function(){
        this.verifyRole();
    },

    methods:{
        disconnect(){
            localStorage.removeItem('token')
            window.location.href = '/'
        },

        async verifyRole(){
            const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/connection`, {headers: {'x-access-token' : this.token}});
            
            if (!response.data.error){
              this.superadmin = true
            }
        }
    }
};
</script>

<template>

    <header v-if="token" class="header-backoffice">
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Accueil</RouterLink>
                <img :src="pipes" alt="pipes">
                <RouterLink to="/associations/create">Créer une association</RouterLink>
                <img :src="pipes" alt="pipes">
                <RouterLink to="/associations/search">Rechercher une association</RouterLink>
                <img :src="pipes" alt="pipes">
                <RouterLink to="/events/create">Créer un évènement</RouterLink>
                <img :src="pipes" alt="pipes">
                <RouterLink to="/events/search">Rechercher un évènement</RouterLink>
                <img :src="pipes" alt="pipes">
                <RouterLink to="/users/list" v-if="superadmin ==true">Liste d'utilisateurs</RouterLink>
                <img src="./assets/images/pipes.png" alt="pipes" v-if="superadmin ==true">
                <RouterLink to="/closed">Archives</RouterLink>
                <img :src="pipes" alt="pipes">
                <button @click="disconnect" class="deconnection">Se déconnecter</button>
            </nav>
        </div>
    </header>


    <header v-else class="header-frontoffice">
        <div class="wrapper-frontoffice">
            <nav>
                <div id="logo">
                    <img src="./assets/images/logo.svg" alt="logo" />
                </div>

                <div id="second-zone">
                    <div id="mainNav">
                        <RouterLink to="/">Accueil</RouterLink>
                        <RouterLink to="/associations"
                            > Associations</RouterLink
                        >
                        <RouterLink to="/events"
                            > Évènements</RouterLink
                        >
                    </div>
    
                </div>

            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style scoped lang="scss">

.header-frontoffice {
    padding-top: 1%;
    margin-inline: auto;


    nav {
        display: grid;
        grid-template-columns: 20vw 62vw;
        gap: 4vw;
        align-items: center;
        justify-content: center;
    }
    
    #logo {
        margin-inline: auto;
    }
    
    #second-zone {
        display: flex;
        justify-content: space-between;
    }
    
    #mainNav {
        display: flex;
        background-color: #313131;
        border-radius: 20px;
        align-items: center;
        justify-content: space-evenly;
        height: 50px;
        width: 55%;
    }
    
    nav li {
        text-decoration: none;
        margin-right: 20px;
    }
    
    nav li:hover {
        color: #f5a623;
    }
    
    nav a {
        text-decoration: none;
        color: rgb(255, 255, 255);
        font-size: 17px;
        font-family: "Poppins";
    
        text-align: center;
    }
}


.header-backoffice {
    display: flex;
    width: 86vw;
    margin: 0 auto;
    align-items: center;
    padding-block: 15px;
    background-color: #CECECE;
    border-radius: 15px;
    margin-bottom: 6vh;

    a {
        color: inherit;
        text-decoration: none;
        color: black;
    }

    .wrapper{
        padding-inline: 15px;
        width: 100%;
    }

    nav{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 100%;
        flex-wrap: wrap;
        row-gap: 0.5em;
    }

    nav a {
        position: relative;
        padding-inline: 10px;
    }

    nav a:hover::after {
        content: '';
        position: absolute;
        left: 25%; 
        right: 25%; 
        bottom: 0;
        border-bottom: 1px solid black;
    }

    .deconnection {
        padding: 7px 14px;
        border-radius: 10px;
        border: none;
        background-color: #9F81A1;
        cursor: pointer;
        text-align: center;
        font-family: Poppins;
        font-weight: 600;
    }
}
</style>
