<script>
    import axios from "axios"
    import greenDot from "@/assets/images/greenDot.svg"
    import purpleDot from "@/assets/images/purpleDot.svg"
    import orangeDot from "@/assets/images/orangeDot.svg"
    import blueDot from "@/assets/images/blueDot.svg"
    import yellowDot from "@/assets/images/yellowDot.svg"
    
export default {
    name: "AssociationsList",

    data() {
        return {
                items: [],
                categories:[ //ajouter toutes les catégories
                    {
                        name: "Scolarité et jeunesse",
                        value: "education",
                        color: "#CB98FD",
                        img: purpleDot,
                    },
                    {
                        name: "Solidarité",
                        value: "solidarity",
                        color: "#F28A5D",
                        img: orangeDot,
                    },
                    {
                        name: "Sport",
                        value: "sport",
                        color: "#86CCE8",
                        img: blueDot,
                    },
                    {
                        name: "Culture",
                        value: "culture",
                        color: "#85E192",
                        img: greenDot,
                    },
                    {
                        name: "Autres",
                        value: "others",
                        color: "#E1D885",
                        img: yellowDot,
                    },
                ],
                colorselected: "",
                categoryAssociated: null,

                searchInput: '',
            }
        },

        created(){
            this.getAssociations();
        },

        methods:{
            async getAssociations(){
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations`);
                    this.items = response.data

                    this.items.forEach(item => {
                        item.color = this.categories.find(category => category.value === item.category).color
                    })
                } catch(err) {
                    console.log(err)
                }
            },

            async getAssociationsByCategories(category) {
                this.items = [];

                const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/associations/category/${category}`
                );
                this.items = response.data;

                this.items.forEach(item => {
                    item.color = this.categories.find(category => category.value === item.category).color
                })
            },

            async searchAssociation(){
                try {
                    this.items = [];
                    this.search = []

                    let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/associations/search/${this.searchInput}`)
                    this.items = response.data
                    this.searchInput= ''

                    this.items.forEach(item => {
                        item.color = this.categories.find(category => category.value === item.category).color
                    })

                } catch(err) {
                    console.log(err)
                }
            },

            navigateToAssociation(id) {
                this.$router.push(`/associations/${id}`);
            },
        }
    }
</script>

<template>

    <section id="main">

        <div class="section">
            <h1>Associations</h1>
        
            <div class="search-section">
                <form @submit.prevent="searchAssociation">
                    <input
                        class="searchbar"
                        type="text"
                        placeholder="Rechercher une association"
                        v-model="searchInput"
                    />
                    <button type="submit"><img src="@/assets/images/search.svg" alt="bouton rechercher"></button>
                </form>
            </div>
        </div>

        <div class="section">
            <div class="categories">
                <button
                    v-for="category in categories"
                    :key="category.value"
                    @click="getAssociationsByCategories(category.value)"
                >
                <img :src="category.img" alt="couleur de la catégorie">
                {{ category.name }}
                </button>
            </div>
        
            <div class="asso-list">
                <div v-for="item in items" :key='item.id'>
                    <button :style="{ backgroundColor: item.color}" @click="navigateToAssociation(item.id)">
                        <img src="@/assets/images/locationMarkerOutline.svg" alt="icone de marker carte">
                        <div class="asso-informations">
                            <h3>{{ item.name }}</h3>
                            <p v-if="item.description != null && item.description != 'undefined'">{{ item.description }}</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>

    

    </section>

</template>

<style scoped lang="scss">
#main{
    width: 86vw;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 5vh;
}

.section{
    display: flex;
    flex-direction: column;
    gap: 3vh;
}

h1{
    margin-block: 3vh 0;
    text-align: center;
    font-family: "Poppins", sans-serif;
}

.search-section {
    width: 70%;
    margin-inline: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4vh;
    min-height: 50px;

    form {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        input {
            width: 80%;
            height: 100%;
            border: none;
            border-radius: 15px 0 0 15px;
            padding: 0 1rem;
            font-size: 1rem;
        }

        button {
            width: 20%;
            height: 100%;
            border: none;
            border-radius: 0 15px 15px 0;
            background-color: rgb(255, 255, 255);
            cursor: pointer;

            img {
                width: 60%;
                height: 60%;
                align-self: flex-end;
            }
        }
    }
}

.categories {
    width: 70%;
    margin-inline: auto;

    display: flex;
    justify-content: space-evenly;
    background-color: rgb(255, 255, 255);
    min-height: 60px;
    border-radius: 15px;
    flex-wrap: wrap;
    padding: 10px;
    gap: 12px;

    button {
        display: flex;
        align-items: center;
        gap: 1vw;
        border: none;
        background-color: white;
        font-family: "Poppins", sans-serif;
        font-size: 16px;
        min-width: none;
    }
} 

.asso-list {
    display: flex;
    flex-direction: column;
    gap: 2vh;

    align-items: center;
    width: 60%;;
    margin-inline: auto;

    overflow-y: auto;

    div, button {
        width: 100%;
        display: flex;
    }

    button {
        justify-content: center;
        align-items: center;
        padding: 1% 4%;
        border: none;
        border-radius: 30px;
        font-size: 1rem;
        cursor: pointer;
        gap: 5%;

        h3 {
            text-decoration: none;
            font-family: "Poppins", sans-serif;
            align-self: flex-start;
            color: black;
            font-weight: 900;
            margin: 0;
        }

        p {
            margin: 0;
            font-size: 0.8rem;
            text-align: left;
            font-family: "Poppins", sans-serif;
        }
    }

    div {
        flex-direction: column;
    }
}

</style>