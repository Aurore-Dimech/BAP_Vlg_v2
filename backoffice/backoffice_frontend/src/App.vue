<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from "axios"

export default {
        name:'App',

        components: {

        },

        data(){
          return{
            superadmin(){
              return false
            } 
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
            this.verifyConnection();
            this.verifyRole();
        },

        methods:{
          verifyConnection() {
            if (!this.token) {
              this.$router.push('/login');
            }
          },

          disconnect(){
            localStorage.removeItem('token')
            location.reload()
          },

          async verifyRole(){
            const response = await axios.get("http://localhost:3000/users/connection", {headers: {'x-access-token' : this.token}});
            
            if (!response.data.error){
              this.superadmin = true
            }
          }
        }
    }


</script>

<template>

  <header>
    <div class="wrapper">
      <nav v-if="token">
        <RouterLink to="/">Accueil</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <RouterLink to="/associations/create">Créer une association</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <RouterLink to="/associations/search">Rechercher une association</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <RouterLink to="/events/create">Créer un évènement</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <RouterLink to="/events/search">Rechercher un évènement</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <RouterLink to="/users/list" v-if="superadmin ==true">Liste d'utilisateurs</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes" v-if="superadmin ==true">
        <RouterLink to="/closed">Archives</RouterLink>
        <img src="./assets/images/pipes.png" alt="pipes">
        <button @click="disconnect" class="deconnection">Se déconnecter</button>
      </nav>

      <nav v-else>
        <RouterLink to="/signup">Créer un compte</RouterLink>
        <RouterLink to="/login">Se connecter</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

</template>

<style scoped>

header {
  display: flex;
  width: 86vw;
  margin: 0 auto;
  align-items: center;
  padding: 15px 0;
  background-color: #CECECE;
  border-radius: 15px;
  height: 40px;
  margin-bottom: 6vh;
}

header a {
  color: inherit;
  text-decoration: none;
}

.wrapper{
  width: 100%;
}

nav{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}

nav a {
  position: relative;
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

</style>