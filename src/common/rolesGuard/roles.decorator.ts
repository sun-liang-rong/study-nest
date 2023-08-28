import { SetMetadata } from "@nestjs/common";
export const Roles = (...roles: string[]) => {
  console.log(roles, 'Roles------->')
  return SetMetadata('roles', roles);
};