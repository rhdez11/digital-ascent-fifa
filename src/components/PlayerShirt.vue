<template>
  <div class="shirt">
    <Shirt :color="player.color" :nombre="player.nombre" />
    <div class="details">
      <div>{{ player.nombre }}</div>
      <div>{{ player.equipo }}</div>
    </div>
  </div>
</template>

<script>
import Shirt from '@/components/Shirt.vue'
export default {
  components: {
    Shirt,
  },
  props: {
    player: {
      type: Object,
    },
  },
}
</script>

<style scoped>
.details {
  position: relative;
  top: -15px;
}
</style>
