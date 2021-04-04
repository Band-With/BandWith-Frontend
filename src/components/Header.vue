<template>
    <div class="header d-flex align-items-center px-5" id='nav'>
        <a href="/">
            <img src="../assets/images/logo.png"
                    width="50" height="50">
        </a>
    </div>  
</template>

<script>
export default {
  name: 'bandwith-header',
  props: {
    user: Object
  }
}
</script>