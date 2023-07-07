export default interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export type LeaderboardType = 'ALL' | 'HOME' | 'AWAY';

export type MatchResult = {
  result: 'W' | 'D' | 'L';
  goals: {
    goalsFavor: number;
    goalsOwn: number;
  }
};
