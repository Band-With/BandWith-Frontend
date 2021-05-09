<template>
    <div></div>
</template>
<style lang="scss" scoped>
$color_bar: #29D9C2;
$color_high: #FF3B77;
$color_background: #2F2933;
html,
body {
  height: 100%;
  background-color: $color_background;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
}

div {
  width: 100px;
  height: 20px;
  background: $color_bar;
  position: relative;
  transform: translate(-110px, 50px);
  box-shadow: 0 -30px 0 $color_bar, 0 -60px 0 $color_bar, 0 -90px 0 $color_bar, 0 -120px 0 $color_bar;
  animation-name: bar1;
  animation-duration: 0.3s;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes bar1 {
  0%,
  19.9% {
    box-shadow: 0 -30px 0 $color_bar, 0 -60px 0 mix($color_high, $color_bar, 50%), 0 -90px 0 mix($color_high, $color_bar, 75%), 0 -120px 0 mix($color_high, $color_bar, 100%);
  }
  20%,
  39.9% {
    box-shadow: 0 -30px 0 $color_bar, 0 -60px 0 mix($color_high, $color_bar, 50%), 0 -90px 0 mix($color_high, $color_bar, 75%);
  }
  40%,
  59.9% {
    box-shadow: 0 -30px 0 $color_bar, 0 -60px 0 mix($color_high, $color_bar, 50%);
  }
  60%,
  79.9% {
    box-shadow: 0 -30px 0 $color_bar;
  }
  80%,
  100% {
    box-shadow: none;
  }

}
</style>