<style scoped>

</style>

<template>
    <div>
        hi
    </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
    name: 'PracDetail',
    data: function() {
      return {
          content: null,
          loading: true,
          imgPreUrl: "data:image/jpeg;base64,",
      }
    },
    computed: {
        user() {
            return JSON.parse(localStorage.getItem('user'));
        }
    },
    methods:{
    },
    mounted() {
        UserService.getPracticeContent(this.user).then(
            response => {
                if(Object.keys(response.data).length !== 0){
                    this.content = response.data;
                }
                console.log(response.data);
                this.loading=false;
            },
            error => {
                this.content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
        );
    }
}
</script>
