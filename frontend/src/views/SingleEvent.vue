<script>
    import frontSingleEvent from '@/components/frontoffice/frontSingleEvent.vue';
    import backSingleEvent from '@/components/backoffice/backSingleEvent.vue';

    export default {
        name: 'Index',

        components: {
            frontSingleEvent,
            backSingleEvent
        },

        data(){
            return {
                token: localStorage.getItem('token'),
            }
        },

}
</script>

<template>
    
    <div v-if="!token">
        <frontSingleEvent />
    </div>

    <div v-else>
        <backSingleEvent />
    </div>

</template>