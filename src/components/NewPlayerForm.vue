<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <div><h1>Info Nuevo Jugador</h1></div>
      <form @submit.prevent="addNewPlayer">
        <div class="name field">
          <label>Nombre: </label>
          <input
            v-model="name"
            type="text"
            placeholder="Nombre del participante"
          />
        </div>
        <div class="team field">
          <label>Equipo: </label>
          <input v-model="team" type="text" placeholder="Nombre del equipo" />
        </div>
        <div class="color field">
          <label for="colorpicker">Color Picker:</label>
          <input
            type="color"
            id="colorpicker"
            value="#0000ff"
            @change="changeColor($event)"
          />
        </div>
        <div class="submit-btn field">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import PlayerService from '@/services/PlayerService.js'
export default {
  props: {
    qty: {
      type: Number,
    },
  },
  data() {
    return {
      name: null,
      team: null,
      teamcolor: null,
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    changeColor(e) {
      console.log(e.target.value)
      this.teamcolor = e.target.value
    },
    async addNewPlayer() {
      if (this.name != null && this.team != null && this.teamcolor != null) {
        let player = {
          id: this.qty,
          nombre: this.name,
          elo: 1000,
          equipo: this.team,
          color: this.teamcolor,
          partidos: {
            ganados: 0,
            empatados: 0,
            perdidos: 0,
          },
          goles: {
            afavor: 0,
            encontra: 0,
          },
        }

        PlayerService.postPlayer(player)
      }
      await this.$router.go()
    },
  },
}
</script>

<style scoped>
.modal {
  width: 80%;
  padding: 20px;
  margin: 100px auto;
  background: white;
  border-radius: 10px;
}

.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.field {
  margin-top: 10px;
}

.field label {
  margin-right: 5px;
}

.submit-btn input {
  /* height: 20px; */
  padding: 5px 60px;
  font-size: 16px;
  border-radius: 20px;
  border: 0;
  background: #68dbe4;
  cursor: pointer;
}
</style>
