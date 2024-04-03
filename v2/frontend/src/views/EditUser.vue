<script>
    import axios from "axios"

    export default {
        name: 'EditUser',

        data(){
            return {
                token: localStorage.getItem('token'),

                user: {
                    email: "",
                    password : "",
                    role: "",
                }, 
            }
        },

        created: function(){
            this.verifyConnection();
            this.getUserById();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },

            async getUserById(){
                try{
                     const response = await axios({
                        method: 'get',
                        url: `${import.meta.env.VITE_SERVER_URL}/users/${this.$route.params.id}`,
                        headers: {'x-access-token' : this.token}
                    })
                        
                    this.user = {
                        id: response.data.id,
                        email: response.data.email,
                        role: response.data.role,
                    }

                } catch(err){
                    console.log(err)
                }
            },

            async updateUser(){
                try{
                    await axios.patch(`${import.meta.env.VITE_SERVER_URL}/users/update/${this.$route.params.id}`, this.user, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });

                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/users/${this.$route.params.id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });
                    
                    this.user = {
                        email: response.data.email,
                        role: response.data.role,
                    }

                    window.alert(`${this.user.email} mis à jour !`)
                } catch(err){
                    console.log(err.response.data)
                }
            },

            async deleteUser(){
                try{
                    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/${this.user.id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    })
                    this.$router.push('/users/list')
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<template>
    <div>

        <div>
            <div class="fond">
                <h1>Modifier le profil</h1>

                <div id="main">

                
                    <div class="inputs">
                        <input class="input-email" type="email" name="email" placeholder="Adresse mail" v-model="user.email">
                        <p class="error" v-if="user.email.length <= 0">Champ obligatoire</p>
                        <input class="input-password" type="password" name="password" placeholder="Mot de passe" v-model="user.password">
                        <select class="input-select" name="role" id="role" v-model="user.role">
                            <option value="en attente">En attente</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                    </div>
                    </div>
                    <div class="boutons">
                        <button class="bouton bouton-enregistrer" @click="updateUser">Enregistrer</button>
                        <button class="bouton bouton-supprimer" @click="deleteUser">Supprimer</button>
                    </div>
                </div>
                
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

#main{
    padding-top: 2vh;
    width: 80%;
    margin-inline: auto;
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
    width: 40%;
    height: 52px;
    margin-inline: auto;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
}

#role{
    width: 40%;
    height: 52px;
    border-radius: 10px;
    border: 1px solid black;
    background-color: rgba(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
}

.bouton{

&s{
    width: 48%;
    display: flex;
    justify-content: space-evenly;
    margin-inline: auto;
}

display: flex;
justify-content: space-evenly;
align-items: center;
gap: 10px;
width: 25%;
border-radius: 10px;
border: none;
padding-block: 1.5%;
font-weight: 600;
font-size: 20px;
font-family: Poppins;

&-enregistrer {
    text-decoration: none;
    color: black;
    background: #60E886;
}

&-supprimer {
    background: #FF5D5D;
}
}

</style>
  