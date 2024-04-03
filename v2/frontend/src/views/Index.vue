<script>
    import frontIndex from '@/components/frontoffice/frontIndex.vue';
    import backIndex from '@/components/backoffice/backIndex.vue';

    export default {
        name: 'Index',

        components: {
            frontIndex,
            backIndex
        },

        data(){
            return {
                token: localStorage.getItem('token'),
            }
        },

        methods:{
            
        }
}
</script>

<template>
    
    <div v-if="!token">
        <frontIndex />
    </div>

    <div v-else>
        <backIndex />
    </div>

</template>