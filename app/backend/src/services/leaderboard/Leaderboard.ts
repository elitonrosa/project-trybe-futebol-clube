import { ID, IMatch, ITeam } from '../../interfaces';
import ILeaderboard, {
  LeaderboardType,
  MatchResult,
} from '../../interfaces/leaderboard/ILeaderboard';
import { ITeamWithMatches } from '../../interfaces/teams/ITeam';

export default abstract class Leaderboard {
  static leaderboardBase: ILeaderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  static getMatchesByTeam(
    teams: ITeam[],
    matches: IMatch[],
    matchType: LeaderboardType,
  ): ITeamWithMatches[] {
    if (matchType !== 'ALL') {
      return teams.map((team) => ({
        ...team,
        matches: matches.filter((match) =>
          match[matchType === 'HOME' ? 'homeTeamId' : 'awayTeamId']
          === team.id),
      }));
    }

    return teams.map((team) => ({
      ...team,
      matches: matches.filter(
        (match) => match.homeTeamId === team.id || match.awayTeamId === team.id,
      ),
    }));
  }

  static matchResult(match: IMatch, teamId: ID): MatchResult {
    const goals = Leaderboard.matchGoals(match, teamId);
    if (match.homeTeamGoals === match.awayTeamGoals) { return { result: 'D', goals }; }
    if (
      match.homeTeamGoals > match.awayTeamGoals
      && match.homeTeamId === teamId
    ) {
      return { result: 'W', goals };
    }
    if (
      match.awayTeamGoals > match.homeTeamGoals
      && match.awayTeamId === teamId
    ) {
      return { result: 'W', goals };
    }
    return { result: 'L', goals };
  }

  static matchGoals(
    match: IMatch,
    teamId: ID,
  ): { goalsFavor: number; goalsOwn: number } {
    const { homeTeamGoals, awayTeamGoals } = match;
    if (match.homeTeamId === teamId) {
      return { goalsFavor: homeTeamGoals, goalsOwn: awayTeamGoals };
    }
    return { goalsFavor: awayTeamGoals, goalsOwn: homeTeamGoals };
  }

  static getTeamResults(team: ITeamWithMatches): ILeaderboard {
    const { leaderboardBase } = Leaderboard;
    const leaderboard = { ...leaderboardBase };
    team.matches.forEach((match) => {
      const { goals, result } = Leaderboard.matchResult(match, team.id);
      leaderboard.goalsFavor += goals.goalsFavor;
      leaderboard.goalsOwn += goals.goalsOwn;
      if (result === 'W') leaderboard.totalVictories += 1;
      if (result === 'D') leaderboard.totalDraws += 1;
      if (result === 'L') leaderboard.totalLosses += 1;
    });
    leaderboard.name = team.teamName;
    leaderboard.totalPoints = leaderboard.totalVictories * 3 + leaderboard.totalDraws;
    leaderboard.totalGames = team.matches.length;
    leaderboard.goalsBalance = leaderboard.goalsFavor - leaderboard.goalsOwn;
    leaderboard.efficiency = String(
      ((leaderboard.totalPoints / (leaderboard.totalGames * 3)) * 100).toFixed(2),
    );
    return leaderboard;
  }

  static createLeaderboard(matchesByTeam: ITeamWithMatches[]): ILeaderboard[] {
    return matchesByTeam
      .map((team) => Leaderboard.getTeamResults(team))
      .sort((a, b) => {
        if (a.totalPoints > b.totalPoints) return -1;
        if (a.totalPoints < b.totalPoints) return 1;
        if (a.goalsBalance > b.goalsBalance) return -1;
        if (a.goalsBalance < b.goalsBalance) return 1;
        if (a.goalsFavor > b.goalsFavor) return -1;
        return 1;
      });
  }

  static getLeaderbord(
    teams: ITeam[],
    matches: IMatch[],
    matchType: LeaderboardType,
  ): ILeaderboard[] {
    const matchesByTeam = Leaderboard.getMatchesByTeam(
      teams,
      matches,
      matchType,
    );
    const leaderboard = Leaderboard.createLeaderboard(matchesByTeam);
    return leaderboard;
  }
}
