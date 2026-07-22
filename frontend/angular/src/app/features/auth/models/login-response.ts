import { User } from './user.model';

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}
