export interface UserDto {
  firstName?: string;
  lastName?: string;
  username: string|undefined;
  password: string|undefined;
  email?: string;
  roleId?: number;
}
