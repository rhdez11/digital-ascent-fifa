<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Equipos</th>
          <th>ELO</th>
          <th>PJ</th>
          <th>PG</th>
          <th>PE</th>
          <th>PP</th>
          <th>DG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in players" :key="player.id">
          <td>{{ player.nombre }}</td>
          <td>{{ player.elo }}</td>
          <td>
            {{
              player.partidos.ganados +
              player.partidos.perdidos +
              player.partidos.empatados
            }}
          </td>
          <td>{{ player.partidos.ganados }}</td>
          <td>{{ player.partidos.empatados }}</td>
          <td>{{ player.partidos.perdidos }}</td>
          <td>{{ player.goles.afavor - player.goles.encontra }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['players'],
}
</script>

<style scoped>
.table table {
  margin: 0 auto;
  border-spacing: 0;
}

thead th {
  background: white;
  color: gray;
  font-weight: 100;
}

th,
td {
  padding: 5px;
}

.table {
  text-align: left;
}

tr:nth-child(even) {
  background: #efe7ff;
}
tr:nth-child(odd) {
  background: #f3f3f3;
}
</style>
