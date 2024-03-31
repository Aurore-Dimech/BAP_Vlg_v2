<script>
    import axios from "axios"

    export default {
        name: 'Signup',

        data(){
            return {
                token: localStorage.getItem('token'),
                user: {
                    email: "",
                    password: "",
                },
                data: null
            }
        },

        created: function(){
            this.verifyConnection();
        },

        methods:{
            verifyConnection() {
                if (this.token) {
                    this.$router.push('/');
                }
            },

            async signUp(){
                try{
                    const response = await axios.post("http://localhost:3000/auth/signup", this.user);

                    this.data = response.data
                        
                    this.user = {
                        email: "",
                        password: "",
                    }
                } catch(err){
                    console.log(err.response.data)
                    this.data = err.response.data
                }
            }
        }
    }
</script>

<template>

    <div>
         <div class="form">

            <h1 >Créer un compte</h1>

            <div class="inputs">
                <input type="email" class="input-email" placeholder="Adresse mail" v-model="user.email">
                <input type="password" class="input-password" placeholder="Mot de passe" v-model="user.password">
                <p class="error" v-if="data && data.error">{{ data.error }}</p>
            </div>

            
            <button class="button-enregistrer" @click="signUp">Enregistrer</button>
            
        </div>
    </div>

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

.button-enregistrer {
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
</style>
  