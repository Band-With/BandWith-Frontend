<style scoped>

</style>

<template>
    <div class="d-flex flex-column py-4">
        
    </div>
</template>

<script>
export default {
    name: 'BandWorkon',
    data(){
        return {
            imgPreUrl: "data:image/jpeg;base64,"
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
    computed:{
        content(){
			return this.$store.bandmusic.bandmusics
		}
    }
}
</script>
