<script>
    import axios from "axios"

    import logo from '@/assets/images/logo.svg'

    import bgCulture from '@/assets/images/BgCulture.svg'
    import bgEducation from '@/assets/images/BgEducation.svg'
    import bgSolidarity from '@/assets/images/BgSolidarity.svg'
    import bgSport from '@/assets/images/BgSport.svg'
    import bgOthers from '@/assets/images/BgOthers.svg'

    import IconeCulture from '@/assets/images/IconeCulture.svg'
    import IconeEducation from '@/assets/images/IconeEducation.svg'
    import IconeSolidarity from '@/assets/images/IconeSolidarity.svg'
    import IconeSport from '@/assets/images/IconeSport.svg'
    import IconeOthers from '@/assets/images/IconeOthers.svg'

    export default {
        name: "SingleAsso",

        data(){
            return{
                association: {},

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

                selectedImage : null,
            }
        },

        created: function(){
            this.getAssociationById();
        },
        
        methods:{
            async getAssociationById() {
                try {
                    const response = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/associations/${this.$route.params.id}`
                    );
                    this.association = response.data;

                    this.association.color = this.categories.find(category => category.value === this.association.category).color;
                    this.association.bg = this.categories.find(category => category.value === this.association.category).bg;
                    this.association.icone = this.categories.find(category => category.value === this.association.category).icone;
                    this.association.categoryName = this.categories.find(category => category.value === this.association.category).name;

                    
                    if(this.association.image === null){
                        this.selectedImage = logo;
                    } else {
                        this.selectedImage = `${import.meta.env.VITE_SERVER_URL}/${this.association.image.replace('\public', '')}`
                    }

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

            <h1>Association</h1>

        </div>

        <div class="backgroundImage" :style="{backgroundImage: `url(${this.association.bg})`}">

            <div class="asso-information" :style="{ backgroundColor: this.association.color }">
                
                <div class="section-first">
                    <img v-if="selectedImage" :src="selectedImage" alt="image de l'association" class="img">
                    <div class="section category">
                        <h2>{{ this.association.categoryName }}</h2>
                        <img :src="this.association.icone" alt="Icone de la catégorie">
                    </div>

                </div>

                <h2>{{ this.association.name }}</h2>

                <div v-if="(this.association.representative_name != null && this.association.representative_name != '') || (this.association.representative_surname != null && this.association.representative_surname != '')" class="section representative">
                    <h3>Représentant.e</h3>
                    <p>{{ this.association.representative_name }} {{ this.association.representative_surname }}</p>
                </div>

                <div v-if="(this.association.phone != null && this.association.phone != '') || (this.association.mail != null && this.association.mail != '')" class="section contacts">
                    <h3>Contacts</h3>
                    <div>
                        <p>Courriel : {{ this.association.mail }}</p>
                        <p>Téléphone : {{ this.association.phone }}</p>
                    </div>
                </div>

                <div v-if="this.association.description !='' && this.association.description != null">
                    <p>{{ this.association.description }}</p>
                </div>

                <div class="section address">
                    <img src="@/assets/images/locationMarkerOutline.svg" alt="Icone de marker sur une carte">
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

h1 {
    width: 80%;
    margin-inline: auto;
    text-align: center;
    font-size: 40px;
    padding-bottom: 2vh;
    margin-block: 0;
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

.asso-information{
    width: 60%;
    margin: 0 auto;
    padding: 5vh 10vh;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 2vh;

    h2 {
        color: #313131;
        font-family: "PoppinsBold";
        font-size: 30px;
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
        max-height: 35vh;
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

.representative {
    flex-direction: column;
}

.contacts {
    flex-direction: column;

    div {
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        p {
            color: #313131;
            font-weight: 600;
        }
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