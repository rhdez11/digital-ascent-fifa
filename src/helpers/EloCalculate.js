export default class EloCalculate {
  constructor(player1, player2) {
    this.player1 = player1
    this.player2 = player2
  }

  expected = () => {
    let QA = Math.pow(10, this.player1.elo / 400)
    let QB = Math.pow(10, this.player2.elo / 400)

    this.player1.expected = QA / (QA + QB) //.toFixed(2) * 1
    this.player2.expected = 1 - this.player1.expected //.toFixed(2) * 1

    return [this.player1.expected.toFixed(2), this.player2.expected.toFixed(2)]
  }

  calculate = (res) => {
    let res_p1 = res
    let res_p2 = 1 - res

    let K = 25

    this.player1.elo = Math.floor(
      this.player1.elo + K * (res_p1 - this.player1.expected)
    )

    this.player2.elo = Math.floor(
      this.player2.elo + K * (res_p2 - this.player2.expected)
    )

    return [this.player1.elo, this.player2.elo]
  }
}
