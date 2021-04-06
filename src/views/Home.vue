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

<style>
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