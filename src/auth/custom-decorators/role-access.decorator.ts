


//custom decorator
// Decorator = attaches metadata.

// Reflector in Guard = reads that metadata.

// Guard = makes the decision (allow/deny).
import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../entities/user.entity";
export const ROLES_KEY="roles";// Marking roles for protected or normal routes so the gaurds will make the whether they can access them
export const Roles=(...roles: UserRole[])=>SetMetadata(ROLES_KEY, roles)
