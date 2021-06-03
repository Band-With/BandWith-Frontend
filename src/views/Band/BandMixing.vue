<style scoped>
#body{
    background-color: #fafafa;
}

.main{
    max-width: 1320px;
    width: calc(100% - 40px);
    padding-left: 20px;
    padding-right: 20px;
    margin: 0 auto;
    margin-top: 60px;
}

</style>

<template>  
    <div id="body" class="d-flex">
        <div class="main d-flex" style="min-height: calc(100vh - 60px)">
        </div>
    </div>
</template>

<script>
// import BandService from "@/services/band.service"
export default {
    name: 'BandMixing',
    created() {
    },
    data: function() {
        return {
            content: null,
            loading: true,
            imgPreUrl: "data:image/jpeg;base64,"
        }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        },
        bandnameParam() {
            return this.$route.params.bandname;
        }
    },
    methods:{
        toDate(timestamp){
            if (timestamp === null)
                return " ";
            const d = new Date(timestamp);
            let month = '' + (d.getMonth() + 1);
            let date = '' + d.getDate();

            if (month.length < 2)
                month = '0' + month;
            if (date.length < 2)
                date = '0' + date;

            return [d.getFullYear(), month, date].join("-");
        }
    },
    mounted() {
    }
}
</script>
