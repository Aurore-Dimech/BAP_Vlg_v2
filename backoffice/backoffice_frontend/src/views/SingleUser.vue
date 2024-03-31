<script>
    import axios from "axios"

    export default {
        name: 'SingleUser',

        data(){
            return {
                token: localStorage.getItem('token'),
                user: {}, 
                token: localStorage.getItem('token'),
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
                    const response = await axios.get(`http://localhost:3000/users/${this.$route.params.id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    });
                    this.user = response.data
                } catch(err){
                    console.log(err)
                }
            },

            async deleteUser(id){
                try{
                    await axios.delete(`http://localhost:3000/users/${id}`, {
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
        <div class="fond">
            <h1>{{ user.email }}</h1>
            <div id="main">
                <p>Role : {{ user.role }}</p>

                <div class="boutons">
                    <router-link :to="{name:'EditUser', params:{id: user.id}}" class="bouton bouton-modifier">Modifier</router-link>
                    <button class="bouton bouton-supprimer" @click="deleteUser(user.id)">Supprimer</button>
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

    p{
        text-align: center;
    }
}

.bouton{

&s{
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    margin-inline: auto;
    padding-top: 4vh;
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
}

</style>
  