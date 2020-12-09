import {UserModel} from './user.model';

export class Artist {
  id: number;
  name: string;
  description: string;
  createdDate: number;
  likes: UserModel[]
}
