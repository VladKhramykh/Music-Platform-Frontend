import { UserUpdateRequest } from './user-update-request';

export interface UsersData {
  countOfPages: number;
  countOfRecords: number;
  users: UserUpdateRequest[];
}
