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
                items:[],
                map: null,
                markers: [],
                categories:[ //ajouter toutes les catégories
                {
                    name: "Scolarité et jeunesse",
                    value: "education",
                    color: "#CB98FD",
                    image: '<svg class="image" width="34" height="38" viewBox="0 0 34 38" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M33.3505 7.81797C33.2248 7.7191 33.074 7.65557 32.9142 7.63418C32.7545 7.61279 32.5918 7.63435 32.4436 7.69654L18.0104 13.816C17.3829 14.0838 16.597 14.211 15.7902 14.211C14.6651 14.2154 13.5012 13.9594 12.6899 13.6112C12.4427 13.5093 12.2072 13.3818 11.9877 13.2309C12.0474 13.2016 12.1221 13.1694 12.2043 13.1372L25.3316 7.57219L27.2889 8.39144V5.9966C27.2918 5.82582 27.2553 5.65659 27.1821 5.50156C27.1089 5.34652 27.0009 5.20969 26.866 5.10128C26.7409 5.00252 26.5906 4.93903 26.4313 4.91764C26.272 4.89624 26.1098 4.91775 25.9621 4.97985L11.529 11.0994C11.0837 11.2749 10.7012 11.4914 10.3785 11.806C10.0048 12.167 9.79254 12.6583 9.78832 13.1723C9.78832 13.187 9.7928 13.2118 9.7928 13.2118V34.761L9.78981 34.7903C9.78981 34.7962 9.79429 34.7991 9.79429 34.8049V34.8283H9.79728C9.82717 35.5817 10.2156 36.0616 10.5862 36.401C11.7516 37.4075 13.7089 37.9707 15.7917 38C16.7778 38 17.7788 37.8537 18.7052 37.4646L33.1428 31.3436C33.5238 31.1827 33.7733 30.7833 33.7733 30.3312V8.71329C33.7756 8.54261 33.7389 8.37359 33.6657 8.21865C33.5925 8.06371 33.4848 7.9268 33.3505 7.81797ZM24.1961 3.72172C24.1707 3.39987 24.0347 3.09265 23.7927 2.90832C23.6669 2.80945 23.5161 2.74592 23.3564 2.72453C23.1966 2.70315 23.0339 2.7247 22.8857 2.7869L8.45258 8.90347C7.82505 9.16973 7.03765 9.29847 6.23233 9.29847C5.10726 9.30139 3.94334 9.04538 3.13204 8.69574C2.88455 8.59548 2.64906 8.4689 2.42981 8.3183C2.48957 8.28904 2.56428 8.25685 2.64645 8.22467L15.7752 2.65962L17.7325 3.47887V1.08695C17.7352 0.91607 17.6984 0.746803 17.6249 0.591777C17.5515 0.436752 17.4432 0.299969 17.3082 0.191632C17.1827 0.0928908 17.0322 0.0294274 16.8727 0.00803814C16.7132 -0.0133512 16.5507 0.00813926 16.4028 0.0702078L1.96962 6.19117C1.52437 6.36673 1.14337 6.58178 0.81915 6.89778C0.445982 7.25902 0.234291 7.75037 0.230469 8.26417C0.230469 8.28172 0.234951 8.30513 0.234951 8.30513V29.9231H0.237939C0.267822 30.6765 0.656291 31.1563 1.02683 31.4957C2.19224 32.5023 4.14953 33.064 6.23382 33.0933C6.79985 33.09 7.36406 33.0302 7.91769 32.9148V13.2104C7.90275 12.1863 8.3211 11.2032 9.0562 10.4952C9.56549 10.0114 10.1706 9.63505 10.8342 9.38917L24.1961 3.72172Z" fill="#313131" /> </svg>',
                    marker: "hue-rotate(50deg)"
                },
                {
                    name: "Solidarité",
                    value: "solidarity",
                    color: "#F28A5D",
                    image: ' <svg class="image" width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.9273 1.91875C33.3139 1.3 30.2089 0.625 26.1648 0.625C20.3573 0.625 12.5756 2.03125 7.38143 7.1125C-1.41607 15.7188 0.558094 31.6 2.07226 33.0812C2.68559 33.7 5.79059 34.375 9.83476 34.375C15.6423 34.375 23.4239 32.9688 28.6181 27.8875C37.4156 19.2813 35.4414 3.4 33.9273 1.91875ZM9.83476 30.625C7.64976 30.625 5.96309 30.4 4.98559 30.1938C4.64059 28.7125 4.41059 26.05 4.65976 23.0125L12.3456 30.5313C11.3489 30.6063 10.4864 30.625 9.83476 30.625ZM25.9156 25.2437C23.3664 27.7375 20.0506 29.0875 16.9839 29.8187L5.40726 18.4937C6.21226 15.3438 7.63059 12.175 10.1031 9.775C12.6331 7.3 15.9489 5.95 18.9964 5.21875L30.5923 16.5625C29.7873 19.6938 28.3498 22.8437 25.9156 25.2437ZM31.3398 12.0438L23.6156 4.4875C24.6123 4.39375 25.4939 4.375 26.1648 4.375C28.3498 4.375 30.0364 4.6 31.0139 4.80625C31.3589 6.2875 31.5889 8.96875 31.3398 12.0438Z" fill="#313131"/><path d="M13.6427 21.809C13.0286 21.2082 13.0286 20.2198 13.6427 19.619L20.2142 13.1905C20.8095 12.608 21.7612 12.608 22.3565 13.1905C22.9707 13.7913 22.9707 14.7796 22.3565 15.3804L15.7851 21.809C15.1897 22.3914 14.2381 22.3914 13.6427 21.809Z" fill="#313131"/></svg>',
                    marker: "hue-rotate(160deg)"
                },
                {
                    name: "Sport",
                    value: "sport",
                    color: "#86CCE8",
                    image: '<svg class="image" width="57" height="45" viewBox="0 0 57 45" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.8505 24.0357C38.4888 24.2704 37.0823 24.1285 35.8074 23.6278C34.5325 23.127 33.4459 22.2897 32.6836 21.2207M41.4711 17.5951C41.9204 17.3997 42.4093 17.2942 42.9058 17.2854C43.4023 17.2767 43.8952 17.365 44.3522 17.5445C44.8092 17.724 45.22 17.9907 45.5578 18.3271C45.8956 18.6635 46.1526 19.062 46.3122 19.4966M31.7309 13.7709C32.1802 13.5755 32.6691 13.4699 33.1656 13.4612C33.6621 13.4525 34.1549 13.5408 34.6119 13.7203C35.069 13.8998 35.4798 14.1664 35.8176 14.5028C36.1553 14.8393 36.4124 15.2378 36.572 15.6724M55.5045 11.3468C55.5816 11.1845 55.6139 11.0071 55.5987 10.8305C55.5835 10.6539 55.5211 10.4835 55.4173 10.3345C55.3134 10.1856 55.1712 10.0628 55.0035 9.97699C54.8357 9.89122 54.6476 9.84519 54.4559 9.84302C52.0806 9.76585 47.6111 9.38251 43.1622 7.63509C38.7132 5.88766 35.3126 3.17981 33.6041 1.65295C33.4693 1.5269 33.3029 1.43366 33.1196 1.38156C32.9364 1.32945 32.742 1.32011 32.5539 1.35437C32.3658 1.38863 32.1898 1.46541 32.0416 1.57787C31.8935 1.69033 31.7778 1.83495 31.7048 1.99882L28.5037 8.95986C24.4406 17.7955 26.4754 27.0492 33.0474 29.6305C39.6194 32.2118 48.2403 27.1434 52.3034 18.3078L55.5045 11.3468M22.4093 34.8968C21.4719 35.8395 20.2545 36.5056 18.9094 36.8116C17.5643 37.1176 16.1514 37.05 14.8477 36.6172M19.5275 28.8417C19.7602 28.4363 20.0829 28.0808 20.4745 27.7986C20.8661 27.5164 21.3177 27.3138 21.7999 27.2041C22.2821 27.0944 22.7839 27.0801 23.2725 27.162C23.7611 27.244 24.2254 27.4204 24.6352 27.6796M9.25213 31.1737C9.48479 30.7683 9.80749 30.4128 10.1991 30.1306C10.5907 29.8484 11.0424 29.6459 11.5245 29.5362C12.0067 29.4265 12.5085 29.4121 12.9971 29.4941C13.4857 29.576 13.9501 29.7524 14.3598 30.0117M25.4097 15.2472C25.2198 15.2716 25.0394 15.3391 24.8846 15.4436C22.9339 16.6985 19.1088 18.8693 14.4149 19.9372C9.72102 21.0051 5.24264 20.7235 2.88458 20.4488C2.69496 20.4227 2.50127 20.4403 2.32083 20.5002C2.14039 20.5601 1.97881 20.6604 1.85052 20.7921C1.72224 20.9237 1.63125 21.0827 1.58568 21.2549C1.5401 21.427 1.54137 21.6068 1.58937 21.7784L3.54567 29.1227C6.02881 38.4449 13.6626 44.7213 20.5964 43.1438C26.281 41.8505 29.7307 35.6799 29.421 28.3616" stroke="#313131" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                    marker: "hue-rotate(00deg)"
                },
                {
                    name: "Culture",
                    value: "culture",
                    color: "#85E192",
                    image: '<svg class="image" width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M42.8611 14.0445C45.5147 11.5922 44.3046 8.72797 42.8611 7.33508L36.4925 1.4496C33.8177 -1.00268 30.7395 0.115559 29.2323 1.4496L25.6234 4.80432H20.1252C16.0917 4.80432 13.7566 6.76615 12.5678 9.02225L3.14224 17.7328V25.5801L1.635 26.9533C-1.01858 29.4252 0.191451 32.2699 1.635 33.6628L8.0036 39.5482C9.14995 40.6076 10.3812 41 11.5488 41C13.056 41 14.4359 40.3134 15.2638 39.5482L20.9956 34.2317H28.6166C32.2255 34.2317 34.0512 32.1522 34.7093 30.1119C37.1081 29.5233 38.4243 27.8362 38.955 26.1882C42.2455 25.4035 43.4767 22.5196 43.4767 20.4989V14.6134H42.2242L42.8611 14.0445ZM39.231 20.4989C39.231 21.3817 38.8276 22.4607 37.1081 22.4607H34.9853V24.4226C34.9853 25.3054 34.5819 26.3844 32.8624 26.3844H30.7395V28.3462C30.7395 29.229 30.3362 30.3081 28.6166 30.3081H19.2548L12.2918 36.7428C11.6337 37.3118 11.2516 36.9783 11.0181 36.7625L4.6707 30.9162C4.05507 30.3081 4.41596 29.9549 4.64947 29.7391L7.38797 27.1888V19.3414L11.6337 15.4178V18.5371C11.6337 20.9109 13.332 24.4226 18.0023 24.4226C22.6726 24.4226 24.3709 20.9109 24.3709 18.5371H39.231V20.4989ZM39.8466 11.2587L36.2377 14.6134H20.1252V18.5371C20.1252 19.4199 19.7218 20.4989 18.0023 20.4989C16.2828 20.4989 15.8794 19.4199 15.8794 18.5371V12.6516C15.8794 11.7492 16.2403 8.72797 20.1252 8.72797H27.3642L32.2043 4.25501C32.8624 3.68608 33.2445 4.01959 33.478 4.23539L39.8254 10.0816C40.441 10.6898 40.0801 11.0429 39.8466 11.2587Z" fill="#313131"/></svg>',
                    marker: "hue-rotate(250deg)"
                },
                {
                    name: "Autres",
                    value: "others",
                    color: "#E1D885",
                    image: null,
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
                    const response = await axios.get("http://localhost:3000/associations");
                    this.items = response.data

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

            getBackgroundColor(item) {
                const categoryAssociated = this.categories.find(category => category.value === item.category);
                return categoryAssociated ? categoryAssociated.color : 'defaultColor';
            },

            async deleteAssociation(id){
                try{
                    await axios.delete(
                        `http://localhost:3000/associations/${id}`
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

                const response = await axios.get(`http://localhost:3000/associations/category/${category}`);
                this.items = response.data

                this.items.forEach((item) =>{
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
                        <div
                            v-html="category.image"
                            style="width: 34px; height: 38px"
                        ></div>
                        <svg
                            class="arrow"
                            width="20"
                            height="15"
                            viewBox="0 0 20 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19.3007 8.21848C19.6047 7.93723 19.7754 7.55598 19.7754 7.15848C19.7754 6.76098 19.6047 6.37973 19.3007 6.09848L13.1808 0.439481C12.8763 0.158086 12.4633 -4.19311e-09 12.0327 0C11.6021 4.19311e-09 11.1892 0.158086 10.8847 0.439481C10.5802 0.720875 10.4092 1.10253 10.4092 1.50048C10.4092 1.89843 10.5802 2.28009 10.8847 2.56148L14.2347 5.65848L1.75342 5.65848C1.32297 5.65848 0.910138 5.81652 0.605758 6.09782C0.301378 6.37912 0.130378 6.76066 0.130378 7.15848C0.130378 7.55631 0.301378 7.93784 0.605758 8.21914C0.910138 8.50045 1.32297 8.65848 1.75342 8.65848L14.2347 8.65848L10.8847 11.7545C10.7339 11.8938 10.6143 12.0592 10.5327 12.2413C10.4511 12.4233 10.4092 12.6184 10.4092 12.8155C10.4092 13.0125 10.4511 13.2076 10.5327 13.3897C10.6143 13.5717 10.7339 13.7371 10.8847 13.8765C11.0354 14.0158 11.2144 14.1263 11.4114 14.2017C11.6084 14.2771 11.8195 14.316 12.0327 14.316C12.2459 14.316 12.4571 14.2771 12.654 14.2017C12.851 14.1263 13.03 14.0158 13.1808 13.8765L19.3007 8.21848Z"
                                fill="#313131"
                                />
                            </svg>
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
                        <th>Associations</th>
                        <th>Actions</th>
                    </tr>
                </thead>
    
                <tbody>
        
                    <tr v-for="item in items" :key='item.id' :style="{ backgroundColor: getBackgroundColor(item) }">
                        <td>
                            <router-link :to="{name:'SingleAsso', params:{id: item.id}}">{{ item.name }}</router-link>
                        </td>
                        <td class="boutons">
                            <router-link :to="{name:'EditAsso', params:{id: item.id}}" class="bouton bouton-modifier">Modifier</router-link>
                            <button class="bouton bouton-supprimer" @click="deleteAssociation(searched.id)">Supprimer</button>
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
        grid-template-columns: repeat(2, 1fr);
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