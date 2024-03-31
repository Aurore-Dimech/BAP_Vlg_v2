<script>
    import axios from "axios"
    import L, { map, marker } from "leaflet"
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
        data(){
            return{
                items: [],
                map: null,
                markers: [],
            }
        },

        mounted() {
                this.map = L.map('map').setView([48.93595, 2.3315], 16);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(this.map);
        },

        created(){
            this.getEvents();
        },

        methods:{
            async getEvents(){
                try {
                    const response = await axios.get("http://localhost:3000/events");
                    this.items = response.data

                    this.items.forEach((item) =>{
                        const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                        marker.bindPopup(`${item.name}`)

                        this.markers.push(marker)
                    })
                } catch(err) {
                    console.log(err)
                }
            },

            async deleteEvent(id){
                try{
                    await axios.delete(
                        `http://localhost:3000/events/${id}`
                    )
                    this.getEvents()
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

    <div id="main">
        <div id="fullmap">
            <div id="map"></div>
        </div>

    <div class="container-modif">

        <table>

            <thead>
                <tr id="tab-titles">
                    <th>Evènements</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key='item.id'>
                    <td>
                        <router-link :to="{name:'SingleEvent', params:{id: item.id}}">{{ item.name }}</router-link>
                    </td>
                    <td class="boutons">
                        <router-link :to="{name:'EditEvent', params:{id: item.id}}" class="bouton bouton-modifier">Modifier</router-link>
                        <button @click="deleteEvent(item.id)" class="bouton bouton-supprimer">Supprimer</button>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>
</div>


</template>

<style scoped lang="scss">
#main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2vh;
}

#map {
    height: 70vh;
    width: 86vw;
    border-radius: 25px;
}

table{
    margin-inline: auto;
    
    tr{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        width: 58vw;
        border-radius: 15px;
        padding:10px;

        border-bottom: 1px solid;
        border-style: solid;
        border-image: linear-gradient(0.25turn, rgba(0, 0, 139, 0), rgba(0, 0, 0, 0.412), rgba(153, 50, 204, 0)) 1;
        border-image-slice: 0 0 1 0;


        
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
    background-color: #fbf6f2;
    padding: 3.5vh 0 4vh 0;
    width: 100%;
    margin-top: 2vh;
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
        background: #60E886;
        text-decoration: none;
        color: black;
    }

    &-supprimer {
        background: #FF5D5D;
    }
}
</style>