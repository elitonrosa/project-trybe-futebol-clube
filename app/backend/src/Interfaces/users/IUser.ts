export type UserRole = 'admin' | 'user';

export default interface IUser {
  id: number,
  username: string,
  role: UserRole,
  email: string,
  password: string,
}
