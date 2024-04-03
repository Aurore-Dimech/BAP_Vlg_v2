<script>
    import axios from "axios"
    import L from "leaflet"
    import markerIcon from 'leaflet/dist/images/marker-icon.png';
    import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

    let DefaultIcon = L.icon({
        iconUrl: markerIcon,
        shadowUrl: markerIconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    L.Marker.prototype.options.icon = DefaultIcon;

    export default {
        name: 'SingleAsso',

        data(){
            return {
                token: localStorage.getItem('token'),

                association: {},
                events: {},

                map: null,
                marker: null,

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
                ],

                states: [
                    {
                        name: "Ouverte",
                        value: false,
                    },
                    {
                        name: "Fermée",
                        value: true,
                    }
                ],

                selectedImage : null,
            }
        },

        mounted() {
            this.map = L.map('map').setView([48.93595, 2.3315], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(this.map);
        },

        created: function(){
            this.verifyConnection();
            this.getAssociationById();
            this.getEventsByAsso()
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },

            async getAssociationById() {
                try {
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/associations/${this.$route.params.id}`
                    );
                    this.association = response.data;

                    this.association.closed = this.states.find(state => state.value === this.association.closed).name;

                    this.association.category = this.categories.find(category => category.value === this.association.category).name;

                    this.marker = L.marker([this.association.longitude, this.association.latitude]).addTo(this.map);
                    this.marker.bindPopup(`${this.association.name}`);

                    if(this.association.image === null){
                        this.selectedImage = null;
                    } else {
                        this.selectedImage = `${import.meta.env.VITE_SERVER_URL}/${this.association.image.replace('\public', '')}`
                    }
                } catch (err) {
                    console.log(err);
                }
            },

            async getEventsByAsso() {
                try {
                    await this.getAssociationById()

                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations/events/${this.association.id}`
                    )
                    this.events = response.data
                } catch (err) {
                    console.log(err);
                }
            },

            async deleteAssociation(id){
                try{
                    await axios.delete(
                        `${import.meta.env.VITE_SERVER_URL}/associations/${id}`
                    )
                    this.$router.push('/')
                }catch(err){
                    console.log(err)
                }
            },
        }
    }
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

    <div class="fond">
        <h1>{{ association.name }}</h1>

      <div id="main">
        <h2>Identité de l'association</h2>
        <div>
            <div>
                <p v-if="this.association.siret != '' && this.association.siret != null">Siret : {{ this.association.siret }}</p>
                <p v-if="this.association.description != '' && this.association.description != null">Description : {{ this.association.description }}</p>
                <p>Catégorie : {{ this.association.category }}</p>
            </div>
            <div class="img-container">
                <img v-if="selectedImage" :src="selectedImage" alt="image de l'évènement" class="img">
            </div>
        </div>

        <div>
            <h2 v-if="this.association.representative_name != '' && this.association.representative_name != null && this.association.representative_surname != '' && this.association.representative_surname != null">Représentant.e</h2>
            <div>
                <p v-if="this.association.representative_name != '' && this.association.representative_name != null">{{ this.association.representative_name }}</p>
                <p v-if="this.association.representative_surname != '' && this.association.representative_surname != null">{{ this.association.representative_surname }}</p>
            </div>
        </div>

        <div>
            <h2 v-if="this.association.mail != '' && this.association.mail != null && this.association.phone != '' && this.association.mail != null">Contacts</h2>
            <div>
                <p v-if="this.association.mail != '' && this.association.mail != null">Courriel : {{ this.association.mail }}</p>
                <p v-if="this.association.phone != '' && this.association.phone != null">Téléphone : {{ this.association.phone }}</p>
            </div>
        </div>
        <h2>Coordonnées</h2>
        <div>
            <div>
                <p>{{ this.association.address }} <span v-if="this.association.complement_address != '' && association.complement_address != null"> {{ this.association.complement_address }}</span> {{ this.association.postal_code }} {{ this.association.town }}</p>
            </div>
        </div>
        <h2>Évènements</h2>
        <div>
            <div>
                <p v-if="this.events.length === 0"> Pas d'évènements prévus</p>
                <tbody v-else>
                    <tr v-for="event in events" :key='event.id'>
                        <td>
                            <router-link :to="{name:'SingleEvent', params:{id: event.id}}">{{ event.name }}</router-link>
                        </td>
                    </tr>
                </tbody>
            </div>
        </div>
        <div id="fullmap">
            <div id="map"></div>
        </div>

        <div class="boutons">
            <router-link :to="{name:'EditAsso', params:{id: association.id}}" class="bouton bouton-modifier">Modifier</router-link>
            <button class="bouton bouton-supprimer" @click="deleteAssociation(association.id)">Supprimer</button>
        </div>

        
    </div>
    </div>
    
</template>

<style scoped lang="scss">
#map {
    border-radius: 15px;
    margin-top: 40px;
    border-radius: 15px;
    width: 50vw;
    height: 50vh;
    margin-inline: auto;
}

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
    width: 80%;
    margin-inline: auto;
}

.img-container{
    display: flex;
    justify-content: center;
    margin-top: 2vh;

    .img {
        width: 30vw;
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