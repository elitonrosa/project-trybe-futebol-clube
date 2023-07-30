import { ServiceResponse } from '../../interfaces/ServiceResponse';
import ILeaderboard, {
  LeaderboardType,
} from '../../interfaces/leaderboard/ILeaderboard';
import MatchModel from '../../models/MatchModel';
import TeamModel from '../../models/TeamModel';
import Leaderboard from './Leaderboard';

export default class LeaderboardService extends Leaderboard {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {
    super();
  }

  async getLeaderboard(
    matchType: LeaderboardType,
  ): Promise<ServiceResponse<ILeaderboard[]>> {
    const teams = await this.teamModel.getAll();
    const matches = await this.matchModel.getAllFinished();
    const leaderboard = Leaderboard.getLeaderboard(
      teams,
      matches,
      matchType,
    );
    return { status: 'SUCCESSFUL', data: leaderboard };
  }
}
