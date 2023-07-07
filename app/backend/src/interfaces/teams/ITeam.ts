import IMatch from '../matches/IMatch';

export default interface ITeam {
  id: number,
  teamName: string,
}

export interface ITeamWithMatches extends ITeam {
  matches: IMatch[],
}
