<script>
    import axios from "axios"

    import bgCulture from '@/assets/BgCulture.svg'
    import bgEducation from '@/assets/BgEducation.svg'
    import bgSolidarity from '@/assets/BgSolidarity.svg'
    import bgSport from '@/assets/BgSport.svg'
    import bgOthers from '@/assets/BgOthers.svg'

    import IconeCulture from '@/assets/IconeCulture.svg'
    import IconeEducation from '@/assets/IconeEducation.svg'
    import IconeSolidarity from '@/assets/IconeSolidarity.svg'
    import IconeSport from '@/assets/IconeSport.svg'
    import IconeOthers from '@/assets/IconeOthers.svg'

    export default {
        name: "SingleEvent",
        
        data(){
            return{
                event: {},
                startDate: '',
                association: '',
                
                categories:[ //ajouter toutes les catégories
                    {
                        name: "Scolarité et jeunesse",
                        value: "education",
                        color: "#CB98FD",
                        bg: bgEducation,
                        icone: IconeEducation,
                    },
                    {
                        name: "Solidarité",
                        value: "solidarity",
                        color: "#F28A5D",
                        bg: bgSolidarity,
                        icone: IconeSolidarity,
                    },
                    {
                        name: "Sport",
                        value: "sport",
                        color: "#86CCE8",
                        bg: bgSport,
                        icone: IconeSport,
                    },
                    {
                        name: "Culture",
                        value: "culture",
                        color: "#85E192",
                        bg: bgCulture,
                        icone: IconeCulture,
                    },
                    {
                        name: "Autres",
                        value: "others",
                        color: "#E1D885",
                        bg: bgOthers,
                        icone: IconeOthers,
                    },
                ],

                loading: true,
            }
        },

        created: function(){
            this.getAssociationById()
            this.getEventById();
        },
        
        methods:{
            async getEventById() {
                try {
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/events/${this.$route.params.id}`
                    );
                    this.event = response.data;

                    this.startDate = (new Date(this.event.start_date)).toLocaleString('fr-FR')
                    this.endDate = (new Date(this.event.end_date)).toLocaleString('fr-FR')

                    this.loading = false;
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

                    this.event.color = this.categories.find(category => category.value === this.association.category).color;
                    this.event.bg = this.categories.find(category => category.value === this.association.category).bg;
                    this.event.icone = this.categories.find(category => category.value === this.association.category).icone;
                    this.event.categoryName = this.categories.find(category => category.value === this.association.category).name;
                } catch (err) {
                    console.log(err);
                }
            },
        }, 

    }

</script>

<template>

    <section id="main">

        <div class="title">

            <h1>Évènement</h1>

        </div>

        <div class="backgroundImage" :style="{backgroundImage: `url(${this.event.bg})`}">

            <div class="event-information" :style="{ backgroundColor: this.event.color }">
            
                <div class="section-first">
                    <img src="../assets/imgTest.png" alt="">
                    <div class="section category">
                        <h2>{{ this.event.categoryName }}</h2>
                        <img :src="this.event.icone" alt="Icone de la catégorie" class="categoryImg">
                    </div>
                </div>

                <div class="section main-info">
                    <h2>{{ this.event.name }}</h2>
                    <p v-if="!loading">Du {{ startDate.slice(0, 10) }} à {{ startDate.slice(11, 16) }} jusqu'au {{ endDate.slice(0,10) }} à {{ endDate.slice(11, 16) }}</p>
                </div>


                <div v-if="this.event.description !='' && this.event.description != null">
                    <p>{{ this.event.description }}</p>
                </div>

                <div class="section address">
                    <img src="../assets/locationMarkerOutline.svg" alt="Icone de marker sur une carte">
                    <p>{{ this.association.address }} <span v-if="this.association.complement_address != '' && this.association.complement_address != null"> {{ this.association.complement_address }}</span>, {{ this.association.postal_code }} {{ this.association.town }}</p>
                </div>

            </div>

        </div>

    </section>

</template>
 
<style scoped lang="scss">
h1, h2, h3, p {
    margin: 0;
    font-family: 'Poppins', sans-serif;
}

#main{
    width: 86vw;
    margin: 0 auto;

    display: flex;
    flex-direction: column;

    margin-block: 3vh;
}

h1{
    text-align: center;
    font-weight: 900;
}

.backgroundImage{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 78vh;
}

.event-information{
    width: 60%;
    margin: 0 auto;
    padding: 3vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2vh;

    h2 {
        color: #313131;
        font-weight: 700;
    }
}

.section {
    display: flex;
}

.section-first {
    display: grid;
    grid-template-columns: 60% 40%;

    > img {
        width: 100%;
        border-radius: 10px;
    }
}

.category {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    h2{
        color: white;
        text-align: center;
    }
    
    img {
        width: 50%;
    }
}

.main-info {
    flex-direction: column;

    h2 {
        color: white;
    }

}

.address {
    align-items: center;
    gap: 0.3vw;

    img {
        height: 20px;
    }
}

</style>