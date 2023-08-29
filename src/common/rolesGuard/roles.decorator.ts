import { SetMetadata } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
export const Roles = (...roles: string[]) => {
  ConfigModule.forRoot({
    envFilePath: '.env.dev',
    isGlobal: true,
  }),
  console.log(roles, 'Roles------->')
  return SetMetadata('roles', roles);
};