export interface JwtPayload {
  sub: number;   // user id
  email: string;
  name: string;
  role: string;
}