<script>
    import axios from "axios"

    export default {
        name:'AllUsers',

        data(){
            return {
                token: localStorage.getItem('token'),
                users: [],
            }
        },

        created: function(){
            this.verifyConnection();
            this.getUsers();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },

            async getUsers(){
                try {
                    const response = await axios({
                        method: 'get',
                        url: `${import.meta.env.VITE_SERVER_URL}/users`,
                        headers: {'x-access-token' : this.token}
                    })
                    if (response.data.error){
                        this.$router.push({name: 'Login'})
                    } else {
                        this.users = response.data
                    }
                } catch(err) {
                    console.log(err)
                }
            },

            async deleteUser(id){
                try{
                    await axios.delete(`${import.meta.env.VITE_SERVER_URL}/users/${id}`, {
                        headers: {
                            'x-access-token' : this.token
                        }
                    })
                    this.getUsers()
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<template>
    <div class="fond">
            <h1>Liste des utilisateurs</h1>

        <div id="main">
          
            <table>
    
                <thead>
                    <tr id="tab-titles">
                        <th>Utilisateurs</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
    
                <tbody>
                    <tr v-for="user in users" :key='user.id'>
                        <td>
                            <router-link :to="{name:'SingleUser', params:{id: user.id}}"> {{ user.email }}</router-link>
                        </td>
                        <td>{{ user.role }}</td>
                        <td class="boutons">
                            <router-link :to="{name:'EditUser', params:{id: user.id}}" class="bouton bouton-modifier">Modifier</router-link>
                            <button class="bouton bouton-supprimer" @click="deleteUser(user.id)">Supprimer</button>
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

table{
    margin-inline: auto;
    
    tr{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        width: 70vw;
        padding:10px;
        
        border-bottom: 1px solid;
        border-style: solid;
        border-image: linear-gradient(0.25turn, rgba(0, 0, 139, 0), rgba(0, 0, 0, 0.412), rgba(153, 50, 204, 0)) 1;
        border-image-slice: 0 0 1 0;

        
        th{
            padding: 1% 5%;
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
    background-color: #F2FBF8;
    padding: 3.5vh 0 4vh 0;
    width: 100%;
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
}
    </style>
  