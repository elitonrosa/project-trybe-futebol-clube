import IMatch from './matches/IMatch';
import ITeam from './teams/ITeam';
import IUser, { UserRole } from './users/IUser';

export type NewEntity<T> = Omit<T, 'id'>;

export type ID = number;

export { IMatch, ITeam, IUser, UserRole };
