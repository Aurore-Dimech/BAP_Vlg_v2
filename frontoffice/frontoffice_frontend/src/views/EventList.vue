<script>
    import axios from "axios"
    
    export default {
        name: "EventsList",

        data(){
            return{
                items: [],
                categories:[ //ajouter toutes les catégories
                    {
                        name: "Scolarité et jeunesse",
                        value: "education",
                        color: "#CB98FD",
                    },
                    {
                        name: "Solidarité",
                        value: "solidarity",
                        color: "#F28A5D",
                    },
                    {
                        name: "Sport",
                        value: "sport",
                        color: "#86CCE8",
                    },
                    {
                        name: "Culture",
                        value: "culture",
                        color: "#85E192",
                    },
                    {
                        name: "Autres",
                        value: "others",
                        color: "#E1D885",
                    },
                ],
                colorselected: "",
                categoryAssociated: null,
                searchInput: '',
            }
        },

        created(){
            this.getEvents();
        },
        
        methods:{
            async getEvents(){
                try {
                    const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events`);
                    this.items = response.data

                    for (let item of this.items) {
                        const response = await this.findAssociatedAsso(item.id_association);

                        console.log(response)

                        item.association = response

                        item.color = this.categories.find(category => category.value === item.association.category).color
                    }
                    
                } catch(err) {
                    console.log(err)
                }
            },

            async findAssociatedAsso(id) {
                try {
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/events/association/${Number(id)}`
                    );
                    return response.data
                } catch (err) {
                    console.log(err);
                }
            },

            async searchEvent(){
                try {
                    this.items = [];
                    this.search = []

                    let response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/events/search/${this.searchInput}`)
                    this.items = response.data
                    this.searchInput= ''

                    for (let item of this.items) {
                        const response = await this.findAssociatedAsso(item.id_association);

                        item.association = response

                        item.color = this.categories.find(category => category.value === item.association.category).color
                    }

                } catch(err) {
                    console.log(err)
                }
            },

            navigateToEvent(id) {
                this.$router.push(`/events/${id}`);
            },
        }
    }
</script>

<template>
    <section id="main">

        <div class="section">
            <h1>Évènements</h1>

            <div class="search-section">
                <form @submit.prevent="searchEvent">
                    <input
                        class="searchbar"
                        type="text"
                        placeholder="Rechercher un évènement"
                        v-model="searchInput"
                    />
                    <button type="submit"><img src="../assets/search.svg" alt="bouton rechercher"></button>
                </form>
            </div>
        </div>

        <div class="section">
            
            <div class="event-list">
                <div v-for="item in items" :key='item.id'>
                    <button :style="{ backgroundColor: item.color}" @click="navigateToEvent(item.id)">
                        <div class="asso-informations">
                            <h3>{{ item.name }}</h3>
                            <p>{{ item.description }}</p>
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

.event-list {
    display: flex;
    flex-direction: column;
    gap: 2vh;

    align-items: center;
    width: 70%;;
    margin-inline: auto;

    overflow-y: auto;

    div, button {
        width: 100%;
        display: flex;
        gap:1vh;
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