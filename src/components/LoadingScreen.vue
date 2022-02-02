<template>
  <div class="container">
    <div class="logo">
      <div>
        <img src="../assets/logo-white.png" />
      </div>
      <div>FIFA App</div>
    </div>
    <div class="ball">
      <img src="../assets/ball-white.png" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: 1;
  background: #333333;
}

.logo {
  position: relative;
  top: 30%;
  color: white;
  /* left: 50%; */
}

.ball {
  position: absolute;
  top: 75vh;
  left: 0vh;
}
</style>
