<script>
    import axios from "axios"
    import arrow from '@/assets/images/arrow.svg'
    import iconeOthers from '@/assets/images/IconeOthers.svg'
    import iconeCulture from '@/assets/images/IconeCulture.svg'
    import iconeSolidarity from '@/assets/images/IconeSolidarity.svg'
    import iconeSport from '@/assets/images/IconeSport.svg'
    import iconeEducation from '@/assets/images/IconeEducation.svg'

    import logo from "@/assets/images/logo.svg"

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
                arrow: arrow,
                items:[],
                map: null,
                markers: [],
                categories:[ //ajouter toutes les catégories
                {
                    name: "Scolarité et jeunesse",
                    value: "education",
                    color: "#CB98FD",
                    image: iconeEducation,
                    marker: "hue-rotate(50deg)"
                },
                {
                    name: "Solidarité",
                    value: "solidarity",
                    color: "#F28A5D",
                    image: iconeSolidarity,
                    marker: "hue-rotate(160deg)"
                },
                {
                    name: "Sport",
                    value: "sport",
                    color: "#86CCE8",
                    image: iconeSport,
                    marker: "hue-rotate(00deg)"
                },
                {
                    name: "Culture",
                    value: "culture",
                    color: "#85E192",
                    image: iconeCulture,
                    marker: "hue-rotate(250deg)"
                },
                {
                    name: "Autres",
                    value: "others",
                    color: "#E1D885",
                    image: iconeOthers,
                    marker: "hue-rotate(210deg)"
                },
                ],
                colorselected: "",
                categoryAssociated: null
            }
        },

        mounted() {
                this.map = L.map('map').setView([48.93595, 2.3315], 16);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(this.map);
        },

        created(){
            this.getAssociations()
        },

        methods:{
            async getAssociations(){
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations`);
                    this.items = response.data

                    this.items.forEach((item) =>{
                        if(item.image === null){
                            item.image = logo;
                        } else {
                            item.image = `${import.meta.env.VITE_SERVER_URL}/${item.image.replace('\public', '')}`
                        }

                        const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                        marker.bindPopup(`${item.name}`)

                        this.categoryAssociated = this.categories.find(category => category.value === item.category)

                        marker._icon.style.filter = this.categoryAssociated.marker;

                        this.markers.push(marker)
                    })
                } catch(err) {
                    console.log(err)
                }
            },

            getBackgroundColor(item) {
                const categoryAssociated = this.categories.find(category => category.value === item.category);
                return categoryAssociated ? categoryAssociated.color : 'defaultColor';
            },

            async deleteAssociation(id){
                try{
                    await axios.delete(
                        `${import.meta.env.VITE_SERVER_URL}/associations/${id}`
                    )
                    this.getAssociations()
                }catch(err){
                    console.log(err)
                }
            },

            async getAssociationsByCategories(category){
                this.items = []
                this.markers.forEach(marker => marker.remove());
                this.markers = []

                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations/category/${category}`);
                this.items = response.data

                this.items.forEach((item) =>{
                    if(item.image === null){
                        item.image = logo;
                    } else {
                        item.image = `${import.meta.env.VITE_SERVER_URL}/${item.image.replace('\public', '')}`
                    }
                    
                    const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                    marker.bindPopup(`${item.name}`)

                    marker._icon.style.filter = this.categories.find(cat => cat.value === category).marker;

                    this.markers.push(marker);
                })
            }
        }
    }
</script>

<template>
    <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>
    </head>

    <div id="main">
            <div class="first-section">
                <div class="boxes">
                    <button
                        v-for="category in categories"
                        :key="category.value"
                        @click="getAssociationsByCategories(category.value), this.colorselected = category.color"
                        :style="{ backgroundColor: category.color }"
                        class="box"
                    >
                        <h3>{{ category.name }}</h3>
                        <div>
                        <div>
                            <img 
                            :src="category.image"
                            alt="Image représentative de l'association"
                            style="width: 34px; height: 38px; filter: brightness(0%) contrast(100%);">
                        </div>
                            <img :src="arrow" alt="arrow" />
                        </div>
                    </button>
                </div>
    
                <div id="fullmap">
                    <div id="map"></div>
                </div>
            </div>
            
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
        
                    <tr v-for="item in items" :key='item.id' :style="{ backgroundColor: getBackgroundColor(item) }">
                        <td>
                            <img v-if="item.image" :src="item.image" alt="image de l'association" width="100px">
                        </td>
                        <td>
                            <router-link :to="{name:'SingleAsso', params:{id: item.id}}">{{ item.name }}</router-link>
                        </td>
                        <td class="boutons">
                            <router-link :to="{name:'EditAsso', params:{id: item.id}}" class="bouton bouton-modifier">Modifier</router-link>
                            <button class="bouton bouton-supprimer" @click="deleteAssociation(item.id)">Supprimer</button>
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

.first-section {
    display: grid;
    grid-template-columns: 27vw 55vw;
    gap: 4vw;
}

#map {
    height: 70vh;
    width: 100%;
    border-radius: 25px;
}

.boxes {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2%;
}

.box {
    border: none;
    border-radius: 10px;
    height: 18.4%;
    padding: 2% 4%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    &:hover {
        cursor: pointer;
    }

    h3{
        margin: 0;
    }

    div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    }
}


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
    min-width: 90px;
    min-height: 30px;

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