<style scoped>
  .logo{
    width: 550px;
    height: 550px;
  }

  .banner{
    flex: auto;
    height: 600px;
  }

  .main-search{
    height: 110px;
  }

  .search-input-wrapper{
    width: 450px;
    height: 50px;
    border-radius: 30px;
    box-shadow: 0px 3px 7px #aaa;
  }
  .search-input{
    width: 400px;
    height: 45px;
    border: none;
    border-radius: 30px;
    padding-left: 30px;
  }
  .search-input:focus{
    outline: none;
  }
  .search-button{
    width: 22px;
    height: 23px;
    border: none;
    cursor: pointer;
    background: no-repeat center/100% url("../assets/images/search_icon.png");
  }
  .search-button:focus{
    outline: none;
  }

  .background {
    background-position:top center; background-repeat:no-repeat; background-size:cover;
  }
  #home {
    width: 100%; position: absolute; top: 0; z-index: -1;
  }

  #banner {
    height: 100vh; background-image: url("../assets/images/home/banner.jpg"); color: white;
  }
    #banner-p {
    line-height: 150%;
  }
</style>

<template>
  <div id="home">
    <div id="banner" class="background d-flex align-items-center">
      <div id="banner-contents" class="container d-flex align-items-center">
        <article class="d-flex flex-column">
          <h1 id="banner-title" class="display-4 font-weight-bold mb-3">
            Band With
          </h1>
          <p id="banner-p" class="h4 mb-5">
            내 연주를 등록하고 <br>
            다른 사람들과 합주 해보세요!
          </p>
          <footer>
            <a class="btn btn-primary font-weight-bold" href="/join">시작하기</a>
          </footer>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data: function() {
      return { 
      }
    },
    components: {
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    methods: {
    },
    created() {      
      if(this.loggedIn){
        this.$router.push('/profile');
      }
      this.fetchData();
      this.test();
    }
  }
  
</script>
