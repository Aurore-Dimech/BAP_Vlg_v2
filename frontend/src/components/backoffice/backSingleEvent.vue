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
        name: 'SingleEvent',

        data(){
            return {
                token: localStorage.getItem('token'),

                event: {},
                startDate: '',
                endDate: '',
                association: '',

                map: null,
                marker: null,

                states: [
                    {
                        name: "En cours",
                        value: false,
                    },
                    {
                        name: "Archivé",
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
            this.getEventById();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },

            async getEventById() {
                try {
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/events/${this.$route.params.id}`
                    );
                    this.event = response.data;

                    this.event.archived = this.states.find(state => state.value === this.event.archived).name;

                    this.startDate = (new Date(this.event.start_date)).toLocaleString('fr-FR')
                    this.endDate = (new Date(this.event.end_date)).toLocaleString('fr-FR')

                    this.marker = L.marker([this.event.longitude, this.event.latitude]).addTo(this.map);
                    this.marker.bindPopup(`${this.event.name}`);

                    if(this.event.image === null){
                        this.selectedImage = null;
                    } else {
                        this.selectedImage = `${import.meta.env.VITE_SERVER_URL}/${this.event.image.replace('\public', '')}`
                    }
                } catch (err) {
                    console.log(err);
                }
            },

            async getAssociationById() {
                try {
                    await this.getEventById()
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/associations/${Number(this.event.id_association)}`
                    );
                    this.association = response.data;
                } catch (err) {
                    console.log(err);
                }
            },

            async deleteEvent(id){
                try{
                    await axios.delete(
                        `${import.meta.env.VITE_SERVER_URL}/events/${id}`
                    )
                    this.$router.push('/')
                }catch(err){
                    console.log(err)
                }
            }
        }
    }
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

<div class="fond">
    <h1>{{ event.name }}</h1>

    <div id="main">
        <h2>Évènement</h2>
        <div>
            <div>
                <p>Date de début : {{ startDate.slice(0, 10) }}</p>
                <p>Date de fin : {{ endDate.slice(0,10) }}</p>
                <p>Heure de début : {{ startDate.slice(11, 16) }}</p>
                <p>Heure de fin: {{ endDate.slice(11, 16) }}</p>
                <p>Association : {{ this.association.name }}</p>

                <p>Description :  {{ this.event.description }}</p>

                <div class="img-container">
                    <img v-if="selectedImage" :src="selectedImage" alt="image de l'évènement" class="img">
                </div>
            </div>
        </div>
        <h2>Coordonnées</h2>
        <div>
            <div>
                <p>{{ this.event.adress }} <span v-if="this.event.complement_address != ''"> {{ this.event.complement_address }}</span> {{ this.event.postal_code }} {{ this.event.town }}</p>
            </div>
        </div>
        <h2>État</h2>
        <p>{{ this.event.archived }}</p>
        <div id="fullmap">
            <div id="map"> </div>
        </div>

        <div class="boutons">
            <router-link :to="{name:'EditEvent', params:{id: event.id}}" class="bouton bouton-modifier">Modifier</router-link>
            <button class="bouton bouton-supprimer" @click="deleteEvent(event.id)">Supprimer</button>
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
  