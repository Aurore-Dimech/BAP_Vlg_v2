<script>
   import axios from "axios"

    export default {
        name: 'CreateAsso',

        data(){
            return {
                token: localStorage.getItem('token'),

                association: {
                    name: "",
                    siret : "",
                    description: "",
                    category: "none",
                    representative_name: "",
                    representative_surname: "",
                    mail: "",
                    phone: "",
                    address: "",
                    complement_address: "",
                    town: "",
                    postal_code: "",
                    longitude: "",
                    latitude: "",
                    closed: false
                },

                categories:[ //ajouter toutes les catégories
                    {
                        name: "Scolarité et jeunesse",
                        value: "education",
                    },
                    {
                        name: "Solidarité",
                        value: "solidarity",
                    },
                    {
                        name: "Sport",
                        value: "sport",
                    },
                    {
                        name: "Culture",
                        value: "culture",
                    },
                    {
                        name: "Autres",
                        value: "others",
                    },
                ]
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

            async saveAssociation(){
                try{
                    const boolString = document.querySelector("#closed").value
                    const boolean = (/true/).test(boolString)
                    this.association.closed = boolean
                    
                    await axios.post("http://localhost:3000/associations", this.association);

                    window.alert(`L'association ${this.association.name} a bien été ajoutée`)
                        
                    this.association = {
                        name: "",
                        siret : "",
                        description: "",
                        category: "none",
                        representative_name: "",
                        representative_surname: "",
                        mail: "",
                        phone: "",
                        address: "",
                        complement_address: "",
                        town: "",
                        postal_code: "",
                        longitude: "",
                        latitude: "",
                        closed: false
                    }
                } catch(err){
                    if (err.response) {
                        console.log(err.response.data);
                    } else {
                        console.log(err);
                    }
                }
            }
        }
    }
</script>

<template>

    <div class="fond">
            <div>
                <h1>Ajouter une association</h1>

                <div id="main">

                    <h2>Identité de l'association</h2>
                    <div class="form-group">
                        <div>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Nom de l'association" v-model="association.name">
                            <p v-if="association.name.length < 1" class="error">Champ obligatoire</p>
                        </div>
    
                        <input type="text" class="form-control" placeholder="Numéro SIRET" v-model="association.siret">
    
                        <div>
                            <select class="select" name="category" id="category" v-model="association.category">
                                <option value="none" disabled selected>Catégorie</option>
                                <option v-for="category in categories" :value="category.value">{{ category.name }}</option>
                            </select>
                            <p v-if="association.category === 'none'" class="error">Champ obligatoire</p>
                        </div>
                    </div>
                        
                    <div class="form-group">
                        <textarea class="form-control" id="description" rows="3" placeholder="Description" v-model="association.description"></textarea>
                    </div>
    
                    <h2 class="Titre2">Représentant-e</h2>
                    <div class="form-group">
                        <div>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Nom" v-model="association.representative_name">
                        </div>
                        <div>
                            <input type="text" class="form-control" id="inputPassword5" placeholder="Prénom" v-model="association.representative_surname">
                        </div>
                    </div>
                    
                    <h2 class="Titre2">Contact-s</h2>
                    <div class="form-group">
                        <div>
                            <input type="email" class="form-control" id="inputAddress" placeholder="Courriel" v-model="association.mail">
                        </div>
                        <div>
                            <input type="tel" class="form-control" id="inputAddress2" placeholder="Téléphone" v-model="association.phone">
                        </div>
                    </div>
                    
                    <h2 class="Titre2">Coordonnées</h2>
                    <div class="form-group-address">
                        <div>
                            <input type="text" class="form-control" id="Voie/Rue" placeholder="Voie/Rue" v-model="association.address">
                            <p class="error" v-if="association.address.length <= 0">Champ obligatoire</p>
                        </div>
                        <div>
                            <input type="text" class="form-control" id="Complément d'adresse" placeholder="Complément d'adresse" v-model="association.complement_address">
                        </div>

                        <div>
                            <input type="text" class="form-control" id="Code postal" placeholder="Code postal" v-model="association.postal_code">
                            <p class="error" v-if="association.postal_code.length <= 0">Champ obligatoire</p>
                        </div>
                        
                        <div>
                            <input type="text" class="form-control" id="Ville" placeholder="Ville" v-model="association.town">
                            <p class="error" v-if="association.town.length <= 0">Champ obligatoire</p>
                        </div>

                        <div>
                            <input type="text" class="form-control" id="Longitude" placeholder="Longitude" v-model="association.longitude">
                            <p class="error" v-if="association.longitude.length <= 0">Champ obligatoire</p>
                        </div>
                        <div>
                            <input type="text" class="form-control" id="Latitude" placeholder="Latitude" v-model="association.latitude">
                            <p class="error" v-if="association.latitude.length <= 0">Champ obligatoire</p>
                        </div>
                    </div>
                    
                    <div>
                        <h2 class="Titre2">Etat</h2>
                        <div>
                            <select class="select" name="closed" id="closed" v-model="association.closed">
                                <option value="false">ouverte</option>
                                <option value="true">fermée</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="bouton">
                        <button type="submit" class="ajouter" @click="saveAssociation">Ajouter</button>
                    </div>
                </div>
            </div>

            
    </div>
    </template>
      
<style scoped>

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

h2:not(:first-of-type) {
    padding-top: 1.5%;
}

#main{
    padding-top: 2vh;
    width: 87%;
    margin-inline: auto;
}

.form-group {
    display: flex;
    flex-direction: row;
    gap: 4vw;
}

.form-group-address {
    display: grid;
    grid-template-columns: repeat(3, 17vw);
    gap: 2vh 4vw;
}

.error {
    color: red;
    font-size: 16px;
    margin-block: 5px 15px;
}

.form-control {
    width: 17vw;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #424242;
    background-color: rgb(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
} 
    
.select {
    width: 17vw;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #424242;
    background-color: rgba(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
}

.ajouter{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17vw;
    background: #60E886;
    border-radius: 10px;
    font-size: 24px;
    font-family: Poppins;
    font-weight: 600;
    border: none;
    margin-inline: auto;
    margin-top: 50px;
    padding-block: 1%;
}

</style>
  