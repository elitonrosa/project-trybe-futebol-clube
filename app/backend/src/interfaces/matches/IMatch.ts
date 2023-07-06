export interface IMatchScore {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export default interface IMatch extends IMatchScore {
  id: number,
  homeTeamId: number,
  awayTeamId: number,
  inProgress: boolean,
}
