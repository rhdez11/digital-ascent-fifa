<template>
  <div class="match-container">
    <div class="player">
      <div v-if="!showPlayer1">
        <div id="player1-select">
          <img src="../assets/add-new-player.png" @click="toggleModalP1" />
          <SelectPlayerModal
            :players="players"
            v-if="showModalP1"
            @close="toggleModalP1"
            @selectedPlayer="selectPlayer1"
          >
            <div><h1>Jugador 1</h1></div>
          </SelectPlayerModal>
          <!-- <select v-model="player1" @change="selectPlayer1">
            <option v-for="player in players" :key="player.id" :value="player">
              {{ player.nombre }}
            </option>
          </select> -->
        </div>
      </div>
      <PlayerShirt :player="player1" v-if="showPlayer1" />
      <div class="score" v-if="bothPlayers">
        <div>
          <span>{{ Math.round(expected[0] * 100 * 100) / 100 }}%</span>
        </div>
        <button class="minus" @click="decrementGoal(this.$refs.input1)">
          -
        </button>
        <input ref="input1" type="number" readonly min="0" value="0" />
        <button class="plus" @click="incrementGoal(this.$refs.input1)">
          +
        </button>
      </div>
    </div>
    <div class="vs">VS</div>
    <div class="player">
      <div v-if="!showPlayer2">
        <div id="player2-select">
          <img src="../assets/add-new-player.png" @click="toggleModalP2" />
          <SelectPlayerModal
            :players="players"
            v-if="showModalP2"
            @close="toggleModalP2"
            @selectedPlayer="selectPlayer2"
          >
            <div><h1>Jugador 2</h1></div>
          </SelectPlayerModal>
          <!-- <select v-model="player2" @change="selectPlayer2">
            <option v-for="player in players" :key="player.id" :value="player">
              {{ player.nombre }}
            </option>
          </select> -->
        </div>
      </div>
      <PlayerShirt :player="player2" v-if="showPlayer2" />
      <div class="score" v-if="bothPlayers">
        <div>
          <span>{{ Math.round(expected[1] * 100 * 100) / 100 }}%</span>
        </div>
        <button class="minus" @click="decrementGoal(this.$refs.input2)">
          -
        </button>
        <input ref="input2" type="number" readonly min="0" value="0" />
        <button class="plus" @click="incrementGoal(this.$refs.input2)">
          +
        </button>
      </div>
    </div>
  </div>
  <div class="end-match">
    <button @click="endMatch" :disabled="!bothPlayers">
      Finalizar Partido
    </button>
  </div>
</template>

<script>
import PlayerShirt from '@/components/PlayerShirt.vue'
import SelectPlayerModal from '@/components/SelectPlayerModal.vue'
import EloRating from '../helpers/EloCalculate.js'
import PlayerService from '../services/PlayerService.js'
export default {
  components: {
    PlayerShirt,
    SelectPlayerModal,
  },
  props: ['players'],
  data() {
    return {
      showPlayer1: false,
      showPlayer2: false,
      player1: null,
      player2: null,
      eloCalculate: null,
      expected: [],
      showModalP1: false,
      showModalP2: false,
    }
  },
  methods: {
    selectPlayer(p) {
      console.log(p)
    },
    toggleModalP1() {
      this.showModalP1 = !this.showModalP1
    },
    toggleModalP2() {
      this.showModalP2 = !this.showModalP2
    },
    selectPlayer1(p) {
      this.player1 = p
      if (this.player1 != this.player2) {
        this.showPlayer1 = true
      } else {
        alert('Este jugador ya fue elegido')
      }
      if (this.bothPlayers) {
        this.createEloCalculate()
      }
    },
    selectPlayer2(p) {
      this.player2 = p
      if (this.player2 != this.player1) {
        this.showPlayer2 = true
      } else {
        alert('Este jugador ya fue elegido')
      }
      if (this.bothPlayers) {
        this.createEloCalculate()
      }
    },
    decrementGoal(i) {
      if (i.value > 0) {
        i.value--
      }
    },
    incrementGoal(i) {
      i.value++
    },
    endMatch() {
      PlayerService.updatePlayer(this.player1.id, this.playerChanges[0])
      PlayerService.updatePlayer(this.player2.id, this.playerChanges[1])
      // .then(() => {
      //   console.log('si se pudo')
      // })
      // .catch(() => {
      //   console.log('error')
      // })
      console.log(this.playerChanges[0].elo)

      this.$router.push('/')
    },
    createEloCalculate() {
      this.eloCalculate = new EloRating(this.player1, this.player2)
      this.expected = this.eloCalculate.expected()
      // console.log(this.expected)
    },
  },
  computed: {
    bothPlayers() {
      return this.showPlayer1 && this.showPlayer2 ? true : false
    },
    playerChanges() {
      let player1Changes = this.player1
      let player2Changes = this.player2

      let player1Goals = parseInt(this.$refs.input1.value)
      let player2Goals = parseInt(this.$refs.input2.value)

      player1Changes.goles.afavor += player1Goals
      player1Changes.goles.encontra += player2Goals

      player2Changes.goles.afavor += player2Goals
      player2Changes.goles.encontra += player1Goals

      let res = 0.5

      if (player1Goals > player2Goals) {
        res = 1
        player1Changes.partidos.ganados += 1
        player2Changes.partidos.perdidos += 1
      } else if (player1Goals < player2Goals) {
        res = 0
        player1Changes.partidos.perdidos += 1
        player2Changes.partidos.ganados += 1
      } else {
        player1Changes.partidos.empatados += 1
        player2Changes.partidos.empatados += 1
      }
      let new_elo = this.eloCalculate.calculate(res)
      player1Changes.elo = new_elo[0]
      player2Changes.elo = new_elo[1]

      return [player1Changes, player2Changes]
    },
  },
}
</script>

<style scoped>
div select {
  display: block;
  margin: 0 auto;
}

.end-match button {
  border-radius: 40px;
  font-size: 16px;
  width: 270px;
  padding: 12px 10px;
  border: 0;
  /* color: white; */
  background: #68dbe4;
  margin-bottom: 30px;
}

.player select {
  width: 100px;
}

.end-match button:disabled {
  background: lightgray;
  color: black;
}

.match-container {
  display: flex;
  justify-content: center;
  margin: 30px 0px;
}

.score input {
  width: 50px;
  border: 0;
  background: #eee;
  padding: 3px;
  text-align: center;
  font-size: 16px;
}

.score .minus {
  border-radius: 15px 0 0 15px;
  border: 0;
  padding: 3px 7px;
  font-size: 16px;
}

.score .plus {
  border-radius: 0 15px 15px 0;
  border: 0;
  padding: 3px 7px;
  font-size: 16px;
}

.player {
  /* flex-grow: 2; */
  width: 40%;
  max-width: 200px;
}

.vs {
  /* flex-grow: 1; */
  margin: 0 50px;
  text-align: center;
  font-weight: bold;
  vertical-align: middle;
}
</style>
