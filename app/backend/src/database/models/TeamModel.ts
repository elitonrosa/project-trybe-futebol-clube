import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import MatchModel from './MatchModel';

class TeamModel extends Model<InferAttributes<TeamModel>, InferCreationAttributes<TeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

TeamModel.hasMany(MatchModel, { foreignKey: 'home_team_id', as: 'homeTeam' });
TeamModel.hasMany(MatchModel, { foreignKey: 'away_team_id', as: 'awayTeam' });

export default TeamModel;
