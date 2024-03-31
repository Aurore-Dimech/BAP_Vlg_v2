<script>
    import axios from "axios"

    export default {
        name: 'EditEvent',

        data(){
            return {
                token: localStorage.getItem('token'),
                event: {
                    name: "",
                    start_date : "",
                    end_date: "",
                    id_association: "none",
                    address: "",
                    complement_address: "",
                    town: "",
                    postal_code: "",
                    longitude: "",
                    latitude: "",
                    archived: false
                },
                associations: [],
                startDate: '',
                endDate: '' 
            }
        },

        created: function(){
            this.verifyConnection();
            this.getEventById();
            this.getAssociations();
        },

        methods:{
            verifyConnection() {
                if (!this.token) {
                    this.$router.push('/login');
                }
            },

            async getEventById(){
                try{
                    const response = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`);
                        
                    this.event = {
                        name: response.data.name,
                        start_date : response.data.start_date,
                        end_date: response.data.end_date,
                        id_association: response.data.id_association,
                        address: response.data.address,
                        complement_address: response.data.complement_address,
                        town: response.data.town,
                        postal_code: response.data.postal_code,
                        longitude: response.data.longitude,
                        latitude: response.data.latitude,
                        archived: response.data.archived
                    }

                    this.event.start_date = this.event.start_date.slice(0,16)
                    this.event.end_date = this.event.end_date.slice(0,16)
                } catch(err){
                    console.log(err)
                }
            },

            async updateEvent(){
                try{
                    const boolString = document.querySelector("#archived").value
                    const boolean = (/true/).test(boolString)
                    this.event.archived = boolean

                    await axios.patch(`http://localhost:3000/events/${this.$route.params.id}`, this.event);
                    const response = await axios.get(`http://localhost:3000/events/${this.$route.params.id}`);
                    
                    this.event = {
                        name: response.data.name,
                        start_date : response.data.start_date,
                        end_date: response.data.end_date,
                        id_association: response.data.id_association,
                        address: response.data.address,
                        complement_address: response.data.complement_address,
                        town: response.data.town,
                        postal_code: response.data.postal_code,
                        longitude: response.data.longitude,
                        latitude: response.data.latitude,
                        archived: response.data.archived
                    }

                    this.event.start_date = this.event.start_date.slice(0,16)
                    this.event.end_date = this.event.end_date.slice(0,16)

                    window.alert(`${this.event.name} mise à jour !`)
                } catch(err){
                    console.log(err.response.data)
                }
            },
            async getAssociations(){
                try {
                    const response = await axios.get("http://localhost:3000/associations");
                    this.associations = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div class="fond">
    
        <div>
            <h1>Modifier un évènement</h1>

            <div id="main">

                <h2>Evènement</h2>
                <div class="form-group">
                    <div>
                        <input class="form-control" type="text" placeholder="Nom de l'évènement" v-model="event.name">
                        <p class="error" v-if="event.name.length <= 0">Champ obligatoire</p>
                    </div>

                    <div>
                        <select class="select" name="associations" id="associations" v-model="event.id_association">
                            <option value="none" disabled selected>Association</option>
                            <option v-for="association in associations" :value="association.id">{{ association.name }}</option>
                        </select>
                        <p v-if="event.id_association == 'none'" class="error">Champ obligatoire</p>
                    </div>
                </div>

                <div class="form-group">
                    <div class="dates">
                        <label>Date de début</label>
                        <input class="form-control"  type="datetime-local" placeholder="Date et heure de début" v-model="event.start_date">
                        <p v-if="event.start_date.length < 1" class="error">Champ obligatoire</p>
                    </div>
                    <div class="dates">
                        <label>Date de fin</label>
                        <input class="form-control"  type="datetime-local" placeholder="Date et heure de fin" v-model="event.end_date">
                        <p v-if="event.end_date.length < 1" class="error">Champ obligatoire</p>
                    </div>
                </div>

                <h2>Coordonnées</h2>

                <div class="form-group-address">
                    <div>
                        <input class="form-control" type="text" placeholder="Voie/ Rue" v-model="event.address">
                        <p class="error" v-if="event.address.length <= 0">Champ obligatoire</p>
                    </div>

                    <div>
                        <input class="form-control" type="text" placeholder="Complément d'adresse" v-model="event.complement_address">
                    </div>

                    <div>
                        <input class="form-control" type="text" placeholder="Code postal" v-model="event.postal_code">
                        <p class="error" v-if="event.postal_code.length <= 0">Champ obligatoire</p>
                    </div>

                    <div>
                        <input class="form-control" type="text" placeholder="Ville" v-model="event.town">
                        <p class="error" v-if="event.town.length <= 0">Champ obligatoire</p>
                        <div>
                    </div>

                    <div>
                        <input class="form-control" type="text" placeholder="Longitude" v-model="event.longitude">
                        <p class="error" v-if="event.longitude.length <= 0">Champ obligatoire</p>
                    </div>

                    <div>
                        <input class="form-control" type="text" placeholder="Latitude" v-model="event.latitude">
                        <p class="error" v-if="event.latitude.length <= 0">Champ obligatoire</p>
                    </div>

                    </div>

                    <h2>Etat</h2>
                    <select class="select" name="archived" id="archived" v-model="event.archived">
                        <option value="" disabled selected>Etat</option>
                        <option value="false">En cours</option>
                        <option value="true">Archivé</option>
                    </select>
                </div>
            </div>
    
            <div>
                <button class="ajouter" @click="updateEvent">Enregistrer</button>
            </div>

            </div>
            
        </div>
    
    </template>
      
    <style>
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
    width: 87%;
    margin-inline: auto;
}

.form-group {
    display: flex;
    flex-direction: row;
    gap: 4vw;
}

.form-group-address {
    display: grid;
    grid-template-columns: repeat(3, 17vw);
    gap: 2vh 4vw;
}

.error {
    color: red;
    font-size: 16px;
    margin-block: 5px 15px;
}

.form-control {
    width: 17vw;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #424242;
    background-color: rgb(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
} 
    
.select {
    width: 17vw;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #424242;
    background-color: rgba(236, 236, 236);
    font-family: Poppins;
    font-size: 16px;
    font-weight: 600;
}

.dates{
    display: flex;
    flex-direction: column;
    gap: 1.5%;
}

.ajouter{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17vw;
    background: #60E886;
    border-radius: 10px;
    font-size: 24px;
    font-family: Poppins;
    font-weight: 600;
    border: none;
    margin-inline: auto;
    margin-top: 50px;
    padding-block: 1%;
}
</style>
  