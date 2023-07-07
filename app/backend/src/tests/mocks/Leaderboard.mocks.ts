import SequelizeMatch from "../../database/models/SequelizeMatch";
import SequelizeTeam from "../../database/models/SequelizeTeam";

export const matches = [
  {
    Id: 1,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    Id: 2,
    homeTeamId: 1,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    Id: 3,
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    Id: 4,
    homeTeamId: 2,
    homeTeamGoals: 2,
    awayTeamId: 3,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    Id: 5,
    homeTeamId: 2,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    Id: 6,
    homeTeamId: 3,
    homeTeamGoals: 2,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    Id: 7,
    homeTeamId: 1,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    Id: 8,
    homeTeamId: 3,
    homeTeamGoals: 1,
    awayTeamId: 2,
    awayTeamGoals: 2,
    inProgress: false,
  },
] as unknown as SequelizeMatch[];

export const teams = [
  {
    id: 1,
    teamName: "Palmeiras",
  },
  {
    id: 2,
    teamName: "Santos",
  },
] as unknown as SequelizeTeam[];

export const homeLeaderboard = [
  {
    name: 'Palmeiras',
    totalPoints: 7,
    totalGames: 3,
    totalVictories: 2,
    totalDraws: 1,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 1,
    goalsBalance: 3,
    efficiency: '77.78'
  },
  {
    name: 'Santos',
    totalPoints: 5,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 2,
    totalLosses: 0,
    goalsFavor: 4,
    goalsOwn: 2,
    goalsBalance: 2,
    efficiency: '55.56'
  }
];

export const awayLeaderboard = [
  {
    name: 'Santos',
    totalPoints: 4,
    totalGames: 3,
    totalVictories: 1,
    totalDraws: 1,
    totalLosses: 1,
    goalsFavor: 3,
    goalsOwn: 3,
    goalsBalance: 0,
    efficiency: '44.44'
  },
  {
    name: 'Palmeiras',
    totalPoints: 2,
    totalGames: 3,
    totalVictories: 0,
    totalDraws: 2,
    totalLosses: 1,
    goalsFavor: 2,
    goalsOwn: 4,
    goalsBalance: -2,
    efficiency: '22.22'
  }
];

export const allLeaderboard = [
  {
    name: 'Santos',
    totalPoints: 9,
    totalGames: 6,
    totalVictories: 2,
    totalDraws: 3,
    totalLosses: 1,
    goalsFavor: 7,
    goalsOwn: 5,
    goalsBalance: 2,
    efficiency: '50.00'
  },
  {
    name: 'Palmeiras',
    totalPoints: 9,
    totalGames: 6,
    totalVictories: 2,
    totalDraws: 3,
    totalLosses: 1,
    goalsFavor: 6,
    goalsOwn: 5,
    goalsBalance: 1,
    efficiency: '50.00'
  }
];
