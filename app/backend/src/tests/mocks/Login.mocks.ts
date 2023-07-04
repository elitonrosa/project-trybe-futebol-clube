import { IUser } from "../../interfaces";

export const validLogin = {
  email: "user@user.com",
  password: "secret_user",
};

export const loginWithoutEmail = {
  password: validLogin.password,
};

export const loginWithoutPassword = {
  email: validLogin.email,
};

export const invalidEmailLogin = {
  email: "invalid@user.com",
  password: "secret_user",
};

export const invalidPasswordLogin = {
  email: validLogin.email,
  password: "invalid_password",
};

export const user: IUser = {
  id: 1,
  username: "User",
  role: "user",
  email: "user@user.com",
  password: "$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO",
};

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJVc2VyIiwicm9sZSI6InVzZXIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpYXQiOjE2ODg0MzU1MTV9.gJoi3_Rbf0vSVmF-vo9r1J1GEj8Aa3se95TsFrkVqaU'
