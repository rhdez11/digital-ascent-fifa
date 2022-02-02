<template>
  <div class="team-container">
    <div>
      <h1>Equipos</h1>
    </div>
    <div class="shirt-container">
      <PlayerShirt
        v-for="player in players"
        :key="player.id"
        :player="player"
        class="shirt"
      />
      <div class="new-player" @click="toggleForm">
        <img src="../assets/add-new-player.png" />
        <div>Añade Jugador</div>
      </div>
      <NewPlayerForm
        v-if="showForm"
        :qty="players.length"
        @close="toggleForm"
      />
    </div>
  </div>
</template>

<script>
import PlayerShirt from '@/components/PlayerShirt.vue'
import NewPlayerForm from '@/components/NewPlayerForm.vue'
export default {
  components: {
    PlayerShirt,
    NewPlayerForm,
  },
  props: ['players'],
  data() {
    return {
      showForm: false,
    }
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm
    },
  },
}
</script>

<style scoped>
h1 {
  color: #894dff;
}

.new-player {
  color: #894dff;
  padding: 10px;
  cursor: pointer;
}

.shirt-container {
  display: flex;
  flex-wrap: wrap;
  /* flex-basis: 300px; */
  flex-grow: 1;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
}

.shirt {
  width: 33.33%;
}

.team-container {
  margin-top: 20px;
}

.shirt-container {
  margin-top: 30px;
}

.new-player {
  position: fixed;
  top: 75vh;
  right: 0;
}

.new-player img {
  height: 40px;
}

.new-player div {
  font-size: 12px;
}
/* .shirt-container {
  min-width: 300px;
} */
</style>
