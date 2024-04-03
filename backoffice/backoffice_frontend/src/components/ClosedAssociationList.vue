<script>
    import axios from "axios"
    import logo from "../assets/images/logo.svg"

    
    export default {
        data(){
            return{
                associations: []
            }
        },

        created(){
            this.getClosedAssos();
        },

        methods:{
            async getClosedAssos(){
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations/deleted`);
                    this.associations = response.data

                    this.associations.forEach(association => {
                        if(association.image === null){
                            association.image = logo;
                        } else {
                            association.image = `${import.meta.env.VITE_SERVER_URL}/${association.image.replace('\public', '')}`
                        }
                    });
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
                    <th>Images</th>
                     <th>Associations</th>
                     <th>Actions</th>
                 </tr>
             </thead>
 
             <tbody>
                 <tr v-for="association in associations" :key='association.id' >
                    <td>
                        <img v-if="association.image" :src="association.image" alt="image de l'association" width="100px">
                    </td>
                     <td>
                         <router-link :to="{name:'SingleAsso', params:{id: association.id}}"> {{ association.name }}</router-link>
                     </td>
                     <td class="boutons">
                         <router-link :to="{name:'EditAsso', params:{id: association.id}}" class="bouton bouton-modifier">Modifier</router-link>
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
        grid-template-columns: repeat(3, 1fr);
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
            text-align: center;

            display: flex;
            align-items: center;
            justify-content: center;

            a {
                text-decoration: none;
                color: black;
            }
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
}
 </style>