<script>
    import frontSingleAsso from '@/components/frontoffice/frontSingleAsso.vue';
    import backSingleAsso from '@/components/backoffice/backSingleAsso.vue';

    export default {
        name: 'Index',

        components: {
            frontSingleAsso,
            backSingleAsso
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
        <frontSingleAsso />
    </div>

    <div v-else>
        <backSingleAsso />
    </div>

</template>