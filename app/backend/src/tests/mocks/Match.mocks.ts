export const createMatch = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 0,
  awayTeamGoals: 0,
}
export const createMatchWithInvalid = {
  ...createMatch,
  homeTeamId: 1000,
}

export const createMatchWithConflict = {
  ...createMatch,
  homeTeamId: 8,
}
export const match = {
  id: 1,
  ...createMatch,
  inProgress: true,
};

export const matchUpdated = {
  ...match,
  homeTeamGoals: 3,
  awayTeamGoals: 1,
}

export const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Internacional",
    },
  },
];

export const matchesInProgess = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Internacional",
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: "Ferroviária",
    },
    awayTeam: {
      teamName: "Avaí/Kindermann",
    },
  },
];

export const matchesFinished = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "São Paulo",
    },
    awayTeam: {
      teamName: "Grêmio",
    },
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: "Internacional",
    },
    awayTeam: {
      teamName: "Santos",
    },
  },
];

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODg0MzU1MTV9.gJoi3_Rbf0vSVmF-vo9r1J1GEj8Aa3se95TsFrkVqaU";

export const matchUpdate = {
  homeTeamGoals: 3,
  awayTeamGoals: 1,
};
