<template>
  <div class="about">
    <div class="title">Juego Nuevo</div>
    <Match :players="players" />
    <Teams :players="sortedPlayers" />
  </div>
</template>

<script>
import Match from '@/components/Match.vue'
import Teams from '@/components/Table.vue'
import PlayerService from '@/services/PlayerService.js'
export default {
  components: {
    Match,
    Teams,
  },
  data() {
    return {
      players: [],
    }
  },
  created() {
    PlayerService.getPlayers().then((res) => {
      this.players = res.data
    })
  },
  computed: {
    sortedPlayers() {
      let p_copy = [...this.players]
      return p_copy.sort((a, b) => (a.elo < b.elo ? 1 : -1))
    },
  },
}
</script>
<style scoped>
.title {
  color: #894dff;
  font-weight: bold;
  margin: 40px 0;
}
</style>
