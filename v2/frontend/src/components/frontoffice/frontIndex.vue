<script>
import arrow from '@/assets/images/arrow.svg'

import iconeOthers from '@/assets/images/IconeOthers.svg'
import iconeCulture from '@/assets/images/IconeCulture.svg'
import iconeSolidarity from '@/assets/images/IconeSolidarity.svg'
import iconeSport from '@/assets/images/IconeSport.svg'
import iconeEducation from '@/assets/images/IconeEducation.svg'

import logo from "@/assets/images/logo.svg"

import axios from "axios";
import L, { map, marker } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerIconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

export default {
    name: "Index",
    
    data() {
        return {
            arrow: arrow,

            items: [],
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
            categoryAssociated: null,

            search:[],
            searchInput: '',
        };
    },

    mounted() {
        this.map = L.map("map").setView([48.93595, 2.3315], 16);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(this.map);
    },

    created() {
        this.getAssociations();
    },

    methods: {
        async getAssociations() {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/associations`	
                );
                this.items = response.data;

                this.items.forEach((item) => {
                    const marker = L.marker([
                        item.longitude,
                        item.latitude,
                    ]).addTo(this.map);
                    marker.bindPopup(`${item.name}`);

                    this.categoryAssociated = this.categories.find(category => category.value === item.category)

                        marker._icon.style.filter = this.categoryAssociated.marker;

                        this.markers.push(marker)
                });
            } catch (err) {
                console.log(err);
            }
        },

        async getAssociationsByCategories(category) {
            this.items = [];
            this.markers.forEach((marker) => marker.remove());
            this.markers = [];

            const response = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/associations/category/${category}`
            );
            this.items = response.data;

            this.items.forEach((item) =>{
                    const marker = L.marker([item.longitude, item.latitude]).addTo(this.map)
                    marker.bindPopup(`${item.name}`)

                    marker._icon.style.filter = this.categories.find(cat => cat.value === category).marker;

                    this.markers.push(marker);
                })
        },

        async searchAssociation(){
                try {
                    this.items = [];
                    this.markers.forEach((marker) => marker.remove());
                    this.markers = [];

                    this.search = []
                    let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations/search/${this.searchInput}`)
                    this.items = response.data
                    this.searchInput= ''

                    this.items.forEach((item) =>{
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
    },
};
</script>

<template>
    <head>
        <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossorigin=""
        />
    </head>

    <body>

        <div id="main">
            <div id="first-section">
    
                <div class="asso-controller">
                    <div class="list-asso">
                        <div class="search-section">
                            <form @submit.prevent="searchAssociation">
                                <input
                                    class="searchbar"
                                    type="text"
                                    placeholder="Rechercher une association"
                                    v-model="searchInput"/>
                                <button type="submit"><img src="@/assets/images/search.svg" alt="bouton rechercher"></button>
                            </form>
                        </div>
    
                        <div id="assoList">
                            <div v-for="item in items" :key="item.id">
                                <router-link
                                    :to="{
                                        name: 'SingleAsso',
                                        params: { id: item.id },
                                    }"
                                    >{{ item.name }}</router-link
                                >
                            </div>
                        </div>
                    </div>
    
                    <div class="filters">
                    
                        <div class="boxes">
                            <button
                                v-for="category in categories"
                                :key="category.value"
                                @click="getAssociationsByCategories(category.value)"
                                :style="{ backgroundColor: category.color }"
                                class="box"
                            >
                                <h3>{{ category.name }}</h3>
                                <div>
                                    <img 
                                        :src="category.image"
                                        alt=""
                                        style="width: 34px; height: 38px; filter: brightness(0%) contrast(100%);">
                                    <img :src="arrow" alt="arrow" style=" filter: brightness(0%) contrast(100%);"/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fullmap">
                <div id="map"></div>
            </div>
        </div>
    </body>
</template>

<style scoped lang="scss">
@font-face {
    font-family: "Poppins";
    src: url("../assets/Poppins/Poppins-Regular.ttf");
}

#main {
    display: grid;
    grid-template-columns: 20vw 62vw;
    gap: 4vw;
    justify-content: center;
}

#map {
    height: 82vh;
    width: 100%;
    border-radius: 15px;
}

.asso-controller {
    height: 82vh;
    display: grid;
    // grid-template-rows: 40% 50%;
    gap: 2%;
}

.list-asso {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #313131;
    border-radius: 20px;
    padding: 3.5%;
    flex-grow: 2;
    max-height: 80vh;
    overflow-y: auto;

    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;

    div {
        align-self: flex-start;
        width: 95%;
        margin-inline: auto;
        overflow-y: auto;

        :not(:last-of-type){
            border-bottom: 1px solid white;
        }

        a {
            border: none;
        }
    }

    .search-section {
        min-height: 31px;
        display: flex;
        justify-content: center;

        form {
            display: flex;
            background-color: white;
            border-radius: 10px;
            align-items: center;

            button {
                background-color: white;
            }
        }
    }
}

.searchbar {
    width: 85%;
    padding: 7px;
    border-radius: 10px;
    border: none;
    outline: none;
}

.filters {
    align-content: end;
    width: 100%;
}

h3 {
    margin: 0;
    padding: 0;
    font-weight: 900;
    text-decoration: none;
    font-size: 15px;
    font-family: "Poppins";
}

button {
    border: none;
    border-radius: 10px;
}

button:hover {
    cursor: pointer;
}
.box {
    gap: 0.7vh;
    display: flex;
    flex-direction: column;
    padding: 3%;
    width: 100%;
    flex-shrink: 0;
}

.box div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
}
.boxes {
    display: flex;
    flex-direction: column;
    gap: 0.7vh;
}

a {
    text-decoration: none;
    color: rgb(255, 255, 255);
    margin: 10px;
    display: flex;
    align-items: center;
    font-family: "Poppins", sans-serif;
}

.arrow {
    margin-right: 10px;
}

@media screen and (max-width: 768px) {
    #map {
        width: 100%;
        margin: 0;
        margin-top: 0;
        border-radius: 50px 50px 0px 0px;
        height: 74vh;
        margin-left: -10px;
    }

    .filters {
        flex-wrap: wrap;
        z-index: 2;
        align-items: center;
        justify-content: center;
        padding-top: 0%;
        background-color: #353535;
        border-radius: 0px;
        width: 99%;
        margin-right: auto;
        margin-left: auto;
        border-radius: 20px 20px 20px 20px;
        margin-right: -2px;
    }
    .autre {
        width: 48.6%;
        height: 30px;
        background-color: #9c9c9c;
        border-radius: 10px;
        border: 3px solid #858484;
        display: flex;
        color: white;
    }
    .list-asso {
        display: none;
        flex-direction: column;
        width: 93%;
        padding-left: 2%;
        margin-top: 10%;
        background-color: #9c9c9c;
        border-radius: 20px;
        padding: 20px;
        border-radius: 0px;
        margin-left: auto;
        margin-right: auto;
    }
    .btn-asso[data-v-cd2fec39] {
        height: 30px;
        width: 50%;
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
    .searchbar {
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
        display: flex;
        margin-top: 5%;
    }
    .search-container {
        padding: 10px;
    }
    .boxes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    body {
        display: flex;
        flex-direction: column;
    }
    #fullmap {
        order: -1;

        z-index: 1;
        width: 100vw;
        height: 100vw;
    }
    .boxes[data-v-cd2fec39] {
        display: grid;
        grid-template-columns: 1fr 1fr;
        flex-wrap: wrap;
        padding: 6%;
    }

    .box:last-of-type {
        grid-column: 1 / 3;
    }

    #assoList {
        display: none;
    }
    .relief-asso {
        height: 0px;
    }

}
</style>
