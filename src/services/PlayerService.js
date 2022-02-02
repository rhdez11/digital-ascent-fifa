import axios from 'axios'

const apiClient = axios.create({
  baseURL: `https://fifa-json-server.herokuapp.com`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getPlayers() {
    return apiClient.get('/jugadores')
  },
  getPlayer(id) {
    return apiClient.get('/jugadores/' + id)
  },
  postPlayer(player) {
    return apiClient.post('/jugadores', player)
  },
  updatePlayer(id, change) {
    return apiClient.put('/jugadores/' + id, change)
  },
}
