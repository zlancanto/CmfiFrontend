import { RoleUser } from '@core/auth/role-user';

export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleUser;
}

export interface RegisterResponseDto {
  message: string;
}
