<template>
  <div v-if="dataLoaded" class="home">
    <Table :players="players" />
    <Teams :players="sortedPlayers" />
  </div>
  <LoadingScreen v-else />
</template>

<script>
// @ is an alias to /src
import Table from '@/components/Table.vue'
import Teams from '@/components/Teams.vue'
import LoadingScreen from '@/components/LoadingScreen.vue'
import PlayerService from '@/services/PlayerService.js'

export default {
  name: 'Home',
  components: {
    Table,
    Teams,
    LoadingScreen,
  },
  props: ['txt'],
  data() {
    return {
      dataLoaded: false,
      players: [],
    }
  },
  computed: {
    sortedPlayers() {
      let p_copy = [...this.players]
      return p_copy.sort((a, b) => (a.elo < b.elo ? 1 : -1))
    },
  },
  created() {
    PlayerService.getPlayers().then((res) => {
      this.players = res.data
      this.dataLoaded = true
    })
  },
}
</script>
