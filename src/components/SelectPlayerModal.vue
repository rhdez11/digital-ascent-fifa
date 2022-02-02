<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <slot></slot>
      <form @submit.prevent>
        <div class="container">
          <PlayerShirt
            v-for="player in players"
            :key="player.id"
            :player="player"
            class="shirt"
            @click="selectPlayer(player)"
          />
        </div>
        <!-- <div class="submit-btn">
          <input type="submit" value="Submit" />
        </div> -->
      </form>
    </div>
  </div>
</template>

<script>
import PlayerShirt from '@/components/PlayerShirt.vue'
export default {
  components: {
    PlayerShirt,
  },
  props: ['players'],
  methods: {
    closeModal() {
      console.log('nose')
      this.$emit('close')
    },
    selectPlayer(p) {
      this.$emit('selectedPlayer', p)
    },
  },
}
</script>

<style scoped>
.modal {
  width: 80%;
  padding: 20px;
  margin: 40px auto;
  background: white;
  border-radius: 10px;
  overflow: scroll;
}

.backdrop {
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-height: 70vh;
  margin-bottom: 20px;
  margin-top: 20px;
}

.shirt {
  width: 100px;
}
</style>
