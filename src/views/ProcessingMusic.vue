<style scoped>

</style>

<template>
    <div id="body" class="d-flex flex-column align-items-center">
        <div class="main">
            <div class="pb-3 px-5">
               테스트아아ㅏ

               앙ㄴ
               ㅁ라
               낭ㄹ
               ㄴ망ㄹ
               ㄴㅁㅇㄹㅈ두ㅐㅑ루제대루ㅐㄷ죽래ㅔㄷㅂ주ㅐㄱ레ㅜ댖;
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'processing-music',
    data: function() {
        return {
                    content: null,

        }
    },
    components: {
    },
    computed: {
         user() {
            return JSON.parse(localStorage.getItem('user'));
        },
    },
    methods: {
    },
    mounted() {
    }
}
</script>
