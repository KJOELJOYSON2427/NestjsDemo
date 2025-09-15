import { UserRole } from "../entities/user.entity";

export const roleHierarchy = {
  [UserRole.USER]: 1,
  [UserRole.ADMIN]: 2,
};