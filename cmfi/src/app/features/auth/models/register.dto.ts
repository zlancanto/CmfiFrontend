export type RegisterRole = 'CUSTOMER' | 'ORGANIZER';

export interface RegisterRequestDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RegisterRole;
}

export interface RegisterResponseDto {
  message: string;
}
