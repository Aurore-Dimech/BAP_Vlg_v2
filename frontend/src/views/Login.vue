<script>
    import axios from "axios"

    export default {
        name: 'Login',

        data(){
            return{   
                user: {
                    email: "",
                    password: "",
                },

                token: localStorage.getItem('token'),
                data: null
            }
        },

        created(){
            this.verifyConnection();
        },

        methods:{
            async logIn(){
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, this.user);

                this.data = response.data

                if(!this.token && !this.data.error) {
                    try{
                        localStorage.setItem('token', this.data)
    
                        window.location.href = '/'
                    } catch(err){
                        console.log(err.response.data)
                    }
                }
            },

            async importUsers() {
                await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/import`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    window.alert("Compte importé !")
                })
            },

            verifyConnection() {
                if(this.token) {
                    this.$router.push('/')
                }
            }
            
        }
    }
</script>

<template>

    <form @submit.prevent="logIn"> 

      <div class="form">

          <h1>Se connecter</h1>
              
          <div class="inputs">
                <input type="email" class="input-email" placeholder="Adresse mail" v-model="user.email">
                <input type="password" class="input-password" placeholder="Mot de passe" v-model="user.password">
                <p class="error" v-if="data && data.error">{{ data.error }}</p>
             </div>
              
              <button class="button-connecter">Se connecter</button>
              

              <button class="boutton-importer" @click="importUsers()">Importer</button>
        </div>
       
    <div>
    </div>
    </form>
  </template>
    
  <style scoped>
.form{
    width: 30vw;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    background: #CECECE;
    margin-inline: auto;
    padding: 4vh 2vw;
    gap: 2vh;
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

.error {
    color: red;
    font-size: 16px;
    margin-block: 0;
}

.inputs {
    padding-block: 2vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2vh;
}

.input-email, .input-password{
    background-color: rgba(236, 236, 236);
    border: 1px solid black;
    border-radius: 10px;
    width: 65%;
    height: 52px;
    margin-inline: auto;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
}

.button-connecter {
  width: 50%;
  padding-block: 2.5%;
  margin-inline: auto;
  background: #60E886; 
  border-radius: 15px;
  font-size: 24px;
  font-family: Poppins;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.boutton-importer {
  width: 40%;
  padding-block: 2%;
  margin-inline: auto;
  background: #9F81A1; 
  border-radius: 15px;
  font-size: 16px;
  font-family: Poppins;
  font-weight: 600;
  border: none;
  cursor: pointer;
} 

</style>