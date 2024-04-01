<script>
    import axios from "axios"

    
    export default {
        data(){
            return{
                items: []
            }
        },

        created(){
            this.getEvents();
        },

        methods:{
            async getEvents(){
                try {
                    const response = await axios.get("http://localhost:4000/events");
                    this.items = response.data
                } catch(err) {
                    console.log(err)
                }
            },
        }
    }
</script>

<template>

    <div>

        <table>

            <thead>
                <tr>

                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items" :key='item.id'>
                    <td>
                        <router-link :to="{name:'SingleEvent', params:{id: item.id}}">{{ item.name }}</router-link>
                    </td>
                </tr>
            </tbody>

        </table>
        
    </div>


</template>

<style scoped lang="scss">

#newAsso{
    position: fixed;
    background-color: gray;
    height: 50px;
    width: 50px;
    bottom: 15%;
    right: 10%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    text-decoration: none;
    color: white;
}
table{
    width: 100vw;

    tr{
        display: flex;
        justify-content: space-evenly;

        th{
            padding: 1% 5%;
            border: 1px solid grey;
        }
    }
}

    #map {
        height: 700px;
        width: 700px;
        margin: 0 auto;
    }
 
</style>